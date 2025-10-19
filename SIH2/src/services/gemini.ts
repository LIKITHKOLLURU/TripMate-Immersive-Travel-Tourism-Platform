import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!API_KEY) {
  // Do not throw to avoid crashing dev; caller can handle graceful error
  console.warn('[Gemini] Missing VITE_GEMINI_API_KEY. Add it to your .env file.');
  console.warn('[Gemini] Get your API key from: https://makersuite.google.com/app/apikey');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : undefined;

// Choose a safe, widely available model
const MODEL_NAME = 'gemini-1.5-flash';

export type ChatRole = 'user' | 'model' | 'system';
export interface ChatTurn {
  role: ChatRole;
  content: string;
}

/**
 * Sends a chat-style request to Gemini and returns the model text.
 * Falls back to a friendly message if the API key or SDK is not available.
 */
export async function chatWithGemini(turns: ChatTurn[]): Promise<string> {
  if (!genAI) {
    return 'Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.';
  }

  const systemPreamble = `You are an expert AI travel planner and guide. Be concise, helpful, and practical.\n` +
    `When asked for itineraries, propose clear day-by-day bullets with time windows and estimated durations.\n` +
    `When asked for places, propose a short list and include open hours if relevant.\n` +
    `Prefer Indian and international destinations relevant to the user context.\n`;

  // Trim to last 6 turns to keep latency low
  const recentTurns = turns.slice(-6);
  // Convert turns to a single prompt for simplicity.
  const userText = recentTurns
    .filter(t => t.role === 'user')
    .map(t => t.content)
    .join('\n\n');

  const prompt = `${systemPreamble}\nUser:\n${userText}`.trim();

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    safetySettings,
  });

  const text = result.response.text();
  return text || 'No response from model.';
}

/**
 * Streaming helper. Calls onDelta(textChunk) as the model responds, and onDone() when finished.
 */
export async function chatWithGeminiStream(
  turns: ChatTurn[],
  onDelta: (text: string) => void,
  onDone: () => void,
  onError?: (err: unknown) => void,
) {
  if (!genAI) {
    onDelta('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
    onDone();
    return;
  }

  const systemPreamble = `You are an expert AI travel planner and guide. Be concise, helpful, and practical.`;
  const recentTurns = turns.slice(-6);
  const userText = recentTurns
    .filter(t => t.role === 'user')
    .map(t => t.content)
    .join('\n\n');
  const prompt = `${systemPreamble}\nUser:\n${userText}`.trim();

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];
    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
    });
    for await (const chunk of result.stream) {
      const t = chunk.text();
      if (t) onDelta(t);
    }
    onDone();
  } catch (err) {
    if (onError) onError(err);
    else onDelta('Sorry, I could not reach the AI service right now.');
    onDone();
  }
}
