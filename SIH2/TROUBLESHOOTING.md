# Troubleshooting Guide

## AI Chatbot Not Working

### Problem
The AI chatbot shows an error message or doesn't respond to queries.

### Root Cause
The Gemini API key is not configured in the `.env` file.

### Solution

1. **Get a Gemini API Key:**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated API key

2. **Configure the API Key:**
   - Open or create the `.env` file in the project root
   - Add the following line:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```
   - Replace `your_actual_api_key_here` with your actual API key

3. **Restart the Development Server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart it
   npm run dev
   ```

4. **Verify:**
   - Navigate to the AI Companion page
   - Send a test message
   - You should receive AI-generated responses

### Console Warnings
If the API key is missing, you'll see warnings in the browser console:
```
[Gemini] Missing VITE_GEMINI_API_KEY. Add it to your .env file.
[Gemini] Get your API key from: https://makersuite.google.com/app/apikey
```

---

## Street View Not Working in Digital Universe

### Problem
Google Street View embeds are not loading or showing blank iframes.

### Possible Causes & Solutions

#### 1. **Network/Connectivity Issues**
- **Check:** Ensure you have a stable internet connection
- **Test:** Try opening the Google Maps URL directly in a new browser tab
- **Solution:** If the URL works in a browser but not in the iframe, proceed to other solutions

#### 2. **Browser Security/Privacy Settings**
- **Check:** Some browsers block third-party iframes by default
- **Solution:** 
  - Disable strict tracking protection for localhost
  - Allow third-party cookies for development
  - Try a different browser (Chrome/Edge recommended for development)

#### 3. **Google Maps Embed Restrictions**
- **Check:** Google may restrict embedding in certain contexts
- **Solution:** 
  - The URLs are using Google's embed format which should work
  - If issues persist, you may need to set up a Google Maps API key
  - Visit: https://console.cloud.google.com/google/maps-apis/

#### 4. **Ad Blockers or Extensions**
- **Check:** Browser extensions may block iframe content
- **Solution:** 
  - Temporarily disable ad blockers
  - Try in an incognito/private window
  - Whitelist localhost in your ad blocker

#### 5. **CORS or Referrer Policy Issues**
- **Check:** The iframe has `referrerPolicy="no-referrer-when-downgrade"`
- **Solution:** This is already configured correctly in the code

### Testing Street View

1. **Test a specific place:**
   - Navigate to the Metaverse Hub page
   - Click on any location (e.g., "Charminar", "Eiffel Tower")
   - The street view should load in an iframe

2. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for any error messages
   - Check the Network tab for failed requests

3. **Verify iframe loading:**
   - Right-click on the blank area where street view should appear
   - Select "Inspect Element"
   - Check if the iframe element exists and has the correct `src` attribute

### Example Working URL
Test this URL directly in your browser:
```
https://www.google.com/maps/embed?pb=!4v1757701346698!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRDJtYmVkeHdF!2m2!1d17.35404246746228!2d78.47705919264827!3f244.98680786291425!4f26.682037925576537!5f0.7820865974627469
```

If this URL works in your browser, the street view functionality should work in the app.

---

## General Debugging Tips

### Check Environment Variables
```bash
# View all environment variables (Windows PowerShell)
Get-Content .env

# Verify the app can read them
# Add this temporarily to your component:
console.log('API Key exists:', !!import.meta.env.VITE_GEMINI_API_KEY);
```

### Clear Browser Cache
Sometimes cached data can cause issues:
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Check Console for Errors
Always check the browser console (F12 → Console tab) for error messages that can help identify issues.

### Verify Dev Server is Running
```bash
# Check if port 5173 is in use
netstat -ano | findstr :5173

# You should see LISTENING on port 5173
```

---

## Need More Help?

If you're still experiencing issues:

1. Check the browser console for specific error messages
2. Verify all dependencies are installed: `npm install`
3. Try deleting `node_modules` and reinstalling: 
   ```bash
   rm -rf node_modules
   npm install
   ```
4. Ensure you're using a compatible Node.js version (v16 or higher recommended)
