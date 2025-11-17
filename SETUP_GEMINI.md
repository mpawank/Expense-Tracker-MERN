# Setup Gemini API Key - Quick Guide

## Error: "Gemini API key not configured"

This means your `GEMINI_API_KEY` is not being loaded. Follow these steps:

## Step 1: Create/Edit .env File

1. Navigate to: `backend/config/`
2. Create or edit a file named `.env` (note the dot at the beginning)
3. Add this line:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

**Important:**
- Replace `your_actual_api_key_here` with your actual Gemini API key
- No spaces around the `=` sign
- No quotes around the value
- The file must be named exactly `.env` (with the dot)

## Step 2: Get Your Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the key (it starts with `AIzaSy...`)

## Step 3: Add to .env File

Your `backend/config/.env` file should look like this:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvw
NODE_ENV=development
```

## Step 4: Restart Backend Server

**CRITICAL:** After adding/changing the .env file, you MUST restart your backend server:

1. Stop the server (Ctrl+C in the terminal)
2. Start it again: `npm run dev`

## Step 5: Verify It's Working

After restarting, try the chatbot again. You should see in the backend console:
- "Calling Gemini API..."
- "API Key present: true"

## Troubleshooting

### Still getting the error?

1. **Check file location:**
   - Must be: `backend/config/.env`
   - NOT: `backend/.env`
   - NOT: `backend/config/env` (missing the dot)

2. **Check file format:**
   ```env
   # ✅ CORRECT
   GEMINI_API_KEY=AIzaSy...
   
   # ❌ WRONG (spaces)
   GEMINI_API_KEY = AIzaSy...
   
   # ❌ WRONG (quotes)
   GEMINI_API_KEY="AIzaSy..."
   ```

3. **Verify the key:**
   - Make sure you copied the ENTIRE key
   - Keys are usually 39 characters long
   - Should start with `AIzaSy`

4. **Check server restart:**
   - Did you restart the backend server?
   - Environment variables are only loaded when the server starts

5. **Check console output:**
   - Look at your backend terminal
   - You should see: "API Key present: true"
   - If you see "API Key present: false", the key isn't loading

## Quick Test

To test if your .env is being read, add this temporarily to `backend/app.js` after line 17:

```javascript
console.log("GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
```

If it shows `false`, the .env file isn't being loaded correctly.

