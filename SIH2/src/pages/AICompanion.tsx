import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Mic, 
  Volume2, 
  Globe, 
  Calendar, 
  MapPin, 
  Clock,
  Star,
  Camera,
  MessageCircle
} from 'lucide-react';
import { chatWithGeminiStream, type ChatTurn, type ChatRole } from '../services/gemini';

const AICompanion = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Travel Companion. I can help you plan personalized itineraries, translate languages, and provide real-time travel assistance. What would you like to explore today?",
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      content: "I'm planning a 3-day trip to Paris. Can you help me create an itinerary?",
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      type: 'ai',
      content: "I'd love to help you plan your Paris adventure! Here's a personalized 3-day itinerary:\n\n🗼 **Day 1: Classic Paris**\n- Morning: Eiffel Tower & Trocadéro\n- Afternoon: Seine River Cruise\n- Evening: Dinner in Saint-Germain\n\n🎨 **Day 2: Art & Culture**\n- Morning: Louvre Museum\n- Afternoon: Montmartre & Sacré-Cœur\n- Evening: Moulin Rouge Show\n\n🌿 **Day 3: Local Experience**\n- Morning: Marché des Enfants Rouges\n- Afternoon: Luxembourg Gardens\n- Evening: Latin Quarter exploration\n\nWould you like me to adjust this based on your specific interests?",
      timestamp: '10:33 AM'
    }
  ]);

  const languages = ['English', 'French', 'Spanish', 'Japanese', 'German', 'Italian', 'Chinese'];

  const quickActions = [
    { icon: MapPin, text: 'Find attractions nearby', color: 'bg-blue-100 text-blue-600' },
    { icon: Calendar, text: 'Plan my day', color: 'bg-green-100 text-green-600' },
    { icon: Globe, text: 'Translate text', color: 'bg-purple-100 text-purple-600' },
    { icon: Camera, text: 'Identify landmark', color: 'bg-orange-100 text-orange-600' }
  ];

  const suggestions = [
    "What's the weather like in Tokyo?",
    "Find vegetarian restaurants near me",
    "How do I say 'thank you' in French?",
    "Best photo spots in Barcelona"
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    try {
      setIsLoading(true);
      // Build minimal chat context (map ai->model) and trim to last 6 turns
      const prior = [...messages, userMsg];
      const trimmed = prior.slice(-6);
      const turns: ChatTurn[] = trimmed.map(m => ({
        role: (m.type === 'ai' ? 'model' : 'user') as ChatRole,
        content: m.content,
      }));

      // Create an AI placeholder to stream into
      const aiPlaceholder = {
        id: userMsg.id + 1,
        type: 'ai' as const,
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiPlaceholder]);

      await chatWithGeminiStream(
        turns,
        (delta) => {
          // Append chunk into the last AI message
          setMessages(prev => {
            const updated = [...prev];
            const lastIndex = updated.findIndex(m => m.id === aiPlaceholder.id);
            if (lastIndex !== -1) {
              updated[lastIndex] = { ...updated[lastIndex], content: updated[lastIndex].content + delta } as any;
            }
            return updated;
          });
        },
        () => setIsLoading(false),
        () => setIsLoading(false)
      );
    } catch (err) {
      console.error('AI Chatbot Error:', err);
      const aiMsg = {
        id: userMsg.id + 1,
        type: 'ai' as const,
        content: '⚠️ **AI Service Error**\n\nI could not reach the AI service. Please ensure:\n\n1. You have set `VITE_GEMINI_API_KEY` in your `.env` file\n2. Get your API key from: https://makersuite.google.com/app/apikey\n3. Restart the dev server after adding the key\n4. Check your internet connection',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      // isLoading is turned off in stream onDone/onError; keep as safety
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input simulation
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setMessage("Find the best coffee shops in Paris");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Travel
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Companion
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your intelligent travel assistant powered by advanced AI. Get personalized recommendations, 
            real-time translations, and expert travel advice 24/7.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Travel Assistant</h2>
                      <p className="text-purple-100 text-sm">Always ready to help • Multilingual</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={currentLanguage}
                      onChange={(e) => setCurrentLanguage(e.target.value)}
                      className="bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-sm text-white"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang} className="text-gray-800">{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-line">{msg.content}</p>
                      <p className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything about your travel..."
                      className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleVoiceInput}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                        isListening
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'text-gray-400 hover:text-purple-600'
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(suggestion)}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-purple-100 hover:text-purple-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-700">{action.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* AI Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI Features</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">50+ Languages</div>
                    <div className="text-xs text-gray-500">Real-time translation</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Volume2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Voice Assistant</div>
                    <div className="text-xs text-gray-500">Natural conversation</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Smart Recommendations</div>
                    <div className="text-xs text-gray-500">Personalized suggestions</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">24/7 Available</div>
                    <div className="text-xs text-gray-500">Always ready to help</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Conversations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Chats</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-sm text-gray-900 mb-1">Paris Itinerary Planning</div>
                  <div className="text-xs text-gray-500">Yesterday</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-sm text-gray-900 mb-1">Tokyo Restaurant Tips</div>
                  <div className="text-xs text-gray-500">3 days ago</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-sm text-gray-900 mb-1">Barcelona Photo Spots</div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Our AI companion learns from millions of travel experiences to provide 
            you with the most relevant and personalized travel assistance.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <MessageCircle className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Natural Conversations</div>
              <div className="text-sm text-purple-100">Chat like with a human travel expert</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Globe className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Multilingual Support</div>
              <div className="text-sm text-purple-100">Communicate in 50+ languages</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Star className="h-12 w-12 mx-auto mb-4" />
              <div className="font-semibold mb-2">Smart Personalization</div>
              <div className="text-sm text-purple-100">Tailored recommendations for you</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AICompanion;