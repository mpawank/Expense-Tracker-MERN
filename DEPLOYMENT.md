# Deployment Guide - Expense Tracker MERN App

This guide will walk you through deploying your Expense Tracker application with:

- **Frontend**: Vercel
- **Backend**: Render

## Prerequisites

- Git repository (GitHub/GitLab/Bitbucket)
- Vercel account (https://vercel.com)
- Render account (https://render.com)
- MongoDB Atlas database (or any MongoDB connection string)

---

## Part 1: Deploy Backend on Render

### Step 1: Prepare Your Backend

✅ Your backend is already configured with:

- `start` script in `package.json`
- `.env.example` file for reference
- Health check endpoint at `/health`

### Step 2: Push Your Code to Git

Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 3: Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository
4. Select your repository and branch (usually `main`)

### Step 4: Configure the Web Service

Fill in the following settings:

- **Name**: `expense-tracker-backend` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **CRITICAL: Must be set to `backend`**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free (or paid for better performance)

**IMPORTANT**: The Root Directory MUST be set to `backend` otherwise Render will look for package.json in the wrong location and fail with "ENOENT: no such file or directory" error.

### Step 5: Add Environment Variables

Click on **"Advanced"** → **"Add Environment Variable"** and add:

| Key              | Value                                                       |
| ---------------- | ----------------------------------------------------------- |
| `MONGO_URL`      | Your MongoDB connection string                              |
| `PORT`           | `5000` (or leave empty, Render provides PORT automatically) |
| `GEMINI_API_KEY` | Your Gemini API key                                         |
| `NODE_ENV`       | `production`                                                |

**Important**: Replace the placeholder values with your actual credentials.

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Wait for the deployment to complete (usually 2-5 minutes)
3. Once deployed, copy your backend URL (e.g., `https://expense-tracker-backend-xxxx.onrender.com`)

### Step 7: Test Your Backend

Visit `https://your-backend-url.onrender.com/health` to verify it's running.

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Prepare Your Frontend

✅ Your frontend is already configured with:

- `vercel.json` for routing
- Environment variable support in `ApiRequest.js`
- `.env.example` file for reference

### Step 2: Create Environment Variable

1. In your `frontend` folder, create a `.env` file (if not exists)
2. Add your Render backend URL:

```env
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

**Note**: Replace `https://your-backend-url.onrender.com` with your actual Render backend URL from Part 1, Step 6.

### Step 3: Push Changes to Git

```bash
git add .
git commit -m "Add backend URL for production"
git push origin main
```

### Step 4: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Configure project settings:

   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)

5. Add Environment Variable:

   - Click **"Environment Variables"**
   - Add: `REACT_APP_BACKEND_URL` = `https://your-backend-url.onrender.com`

6. Click **"Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend folder
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

When prompted:

- Set up and deploy? **Y**
- Scope: Select your account
- Link to existing project? **N**
- Project name: `expense-tracker-frontend` (or your choice)
- Directory: `./` (current directory)
- Override settings? **N**

### Step 5: Add Environment Variable (if using CLI)

Go to your Vercel project dashboard and add the environment variable:

- `REACT_APP_BACKEND_URL` = `https://your-backend-url.onrender.com`

Then redeploy or trigger a new deployment.

### Step 6: Test Your Application

1. Vercel will provide you with a URL (e.g., `https://expense-tracker-frontend.vercel.app`)
2. Visit the URL and test all features:
   - Register/Login
   - Add/Edit/Delete transactions
   - View analytics

---

## Part 3: Post-Deployment Configuration

### Update CORS (if needed)

If you encounter CORS issues, ensure your backend `app.js` has:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend-url.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
```

### Enable Auto-Deploy

Both Render and Vercel support auto-deployment:

- **Render**: Enable "Auto-Deploy" in service settings
- **Vercel**: Automatically enabled for connected Git repos

Every push to your main branch will trigger a new deployment.

---

## Troubleshooting

### Backend Issues

1. **Build fails with "ENOENT: no such file or directory, open package.json"**:

   - ✅ **Solution**: Go to Render Dashboard → Your Service → Settings → Root Directory
   - Set Root Directory to `backend` (not empty, not `/`, just `backend`)
   - Click "Save Changes" and manually redeploy
   - This is the most common deployment error!

2. **Database connection fails**:

   - Verify `MONGO_URL` in Render environment variables
   - Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
   - Ensure MONGO_URL is properly formatted with username and password

3. **Build fails on Render**:

   - Check build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

4. **Backend sleeps (Free tier)**:
   - Render free tier sleeps after 15 minutes of inactivity
   - Cold starts can take 30-60 seconds
   - Consider upgrading or using a cron job to ping your endpoint

### Frontend Issues

1. **API calls fail**:

   - Verify `REACT_APP_BACKEND_URL` is set correctly in Vercel
   - Check browser console for CORS errors
   - Ensure backend URL doesn't have trailing slash

2. **Routes return 404**:

   - Verify `vercel.json` exists in frontend folder
   - Check Vercel build logs

3. **Environment variables not working**:
   - Rebuild/redeploy after adding environment variables
   - Environment variables must start with `REACT_APP_`

---

## Environment Variables Reference

### Backend (.env)

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

### Frontend (.env)

```env
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

---

## Important Notes

⚠️ **Security**:

- Never commit `.env` files to Git
- Use `.env.example` files as templates
- Store sensitive data in environment variables only

⚠️ **Free Tier Limitations**:

- **Render Free**: Backend sleeps after 15 minutes of inactivity, cold starts can take 30-60 seconds
- **Vercel Free**: Generous limits but has bandwidth restrictions

⚠️ **MongoDB Atlas**:

- Whitelist all IPs (`0.0.0.0/0`) or specific Render IPs
- Enable network access in MongoDB Atlas dashboard

---

## Useful Commands

### Check Backend Status

```bash
curl https://your-backend-url.onrender.com/health
```

### View Logs

- **Render**: Dashboard → Your Service → Logs
- **Vercel**: Dashboard → Your Project → Deployments → View Function Logs

### Redeploy

- **Render**: Dashboard → Your Service → Manual Deploy → Deploy Latest Commit
- **Vercel**: Dashboard → Your Project → Deployments → Redeploy

---

## Success Checklist

- [ ] Backend deployed on Render
- [ ] Backend health check returns `{"ok": true}`
- [ ] Frontend deployed on Vercel
- [ ] Environment variable `REACT_APP_BACKEND_URL` set in Vercel
- [ ] User registration/login works
- [ ] Transactions can be created, edited, deleted
- [ ] Analytics display correctly
- [ ] No CORS errors in browser console

---

## Support

If you encounter issues:

1. Check deployment logs (Render/Vercel dashboard)
2. Verify all environment variables are set correctly
3. Test backend health endpoint
4. Check browser console for frontend errors

**Your deployed URLs**:

- Backend: `https://your-backend-name.onrender.com`
- Frontend: `https://your-frontend-name.vercel.app`

Happy deploying! 🚀
