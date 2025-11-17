# Gemini AI Chatbot Setup Guide

This guide will help you set up the Gemini AI chatbot for the Expense Tracker app.

## Prerequisites

1. A Google account
2. Access to Google AI Studio (https://makersuite.google.com/app/apikey)

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API Key" or "Create API Key"
4. Copy your API key (it will look something like: `AIzaSy...`)

## Step 2: Add API Key to Backend

1. Navigate to the `backend/config` directory
2. Open or create a `.env` file
3. Add the following line:

```
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key you copied.

**Example:**
```
GEMINI_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvw
```

## Step 3: Verify Setup

1. Make sure your backend server is running
2. The chatbot should now work when you click the chat icon in the app

## Features

The chatbot can help you with:
- Analyzing your spending patterns
- Answering questions about your transactions
- Providing financial insights and advice
- Summarizing your expenses by category
- Calculating totals and balances

## Troubleshooting

### Chatbot not responding?
- Check that the `GEMINI_API_KEY` is set in your `.env` file
- Verify the API key is correct (no extra spaces or quotes)
- Check the backend console for error messages
- Make sure your backend server is running

### API Key errors?
- Ensure your API key is valid and active
- Check if you have exceeded the free tier limits
- Verify the API key has the necessary permissions

## Notes

- The chatbot uses your transaction data to provide personalized responses
- It analyzes your last 20 transactions for context
- All data is sent securely to Google's Gemini API
- The API key should be kept secret and never committed to version control

