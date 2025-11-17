# Environment Variables Verification

## Required Environment Variables

Based on the code analysis, your `.env` file in `backend/config/.env` should contain these variables:

### Line 1: PORT
```env
PORT=5000
```
**Used in:** `backend/app.js` (line 21, 87)
- ✅ Correct variable name: `PORT`
- ✅ Should be a number (default: 5000)

### Line 2: MONGO_URL
```env
MONGO_URL=your_mongodb_connection_string_here
```
**Used in:** `backend/DB/Database.js` (line 5, 9)
- ✅ Correct variable name: `MONGO_URL`
- ✅ Should be a MongoDB connection string (e.g., `mongodb://localhost:27017/expense-tracker` or MongoDB Atlas connection string)

### Line 3: GEMINI_API_KEY
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
**Used in:** `backend/controllers/chatbotController.js` (line 69)
- ✅ Correct variable name: `GEMINI_API_KEY`
- ✅ Should be your Gemini API key from Google AI Studio

## Complete .env File Template

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/expense-tracker
GEMINI_API_KEY=AIzaSy...
NODE_ENV=development
```

## Verification Checklist

- [ ] Line 1: `PORT=5000` (or your desired port number)
- [ ] Line 2: `MONGO_URL=your_mongodb_connection_string`
- [ ] Line 3: `GEMINI_API_KEY=your_gemini_api_key`
- [ ] No spaces around the `=` sign
- [ ] No quotes around values (unless the value itself contains spaces)
- [ ] File is located at: `backend/config/.env`

## Common Issues

❌ **Wrong:** `PORT = 5000` (spaces around =)
✅ **Correct:** `PORT=5000`

❌ **Wrong:** `MONGO_URL="mongodb://..."` (unnecessary quotes)
✅ **Correct:** `MONGO_URL=mongodb://...`

❌ **Wrong:** `MONGO_URI=...` (wrong variable name)
✅ **Correct:** `MONGO_URL=...`

❌ **Wrong:** `GEMINI_KEY=...` (wrong variable name)
✅ **Correct:** `GEMINI_API_KEY=...`

