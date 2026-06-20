# Portfolio Deployment Guide 🚀

## Your Portfolio is Ready!
Your portfolio is fully working locally with:
- ✅ Frontend (React + Vite)
- ✅ Backend (Express + SQLite)
- ✅ Admin Panel (password: admin123)

## Deployment Steps

---

### 1. Push Your Code to GitHub
1. Go to https://github.com and create a new repository
2. In your project folder, initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/[YOUR-USERNAME]/[YOUR-REPO].git
   git push -u origin main
   ```

---

### 2. Deploy Backend on Render (Free!)
1. Go to https://render.com/ and sign up with GitHub
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure your web service:
   - **Name**: `portfolio-api` (or any name)
   - **Region**: Choose the closest to you
   - **Branch**: `main`
   - **Root Directory**: `./` (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
5. Click "Create Web Service"
6. Wait for it to deploy (takes ~2-5 mins)
7. Copy the deployed URL (e.g., `https://portfolio-api-abc123.onrender.com`)

---

### 3. Deploy Frontend on Vercel (Free!)
1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Add Environment Variable in Vercel project settings:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your backend URL from Render (e.g., `https://portfolio-api-abc123.onrender.com`)
5. Click "Deploy"!
6. That's it! Your portfolio is live!

---

### Your Portfolio Features:
- **SQL Database**: SQLite (built-in, no extra setup needed!)
- **Admin Panel**: Visit `[YOUR-VERCEL-URL]/admin` (password: admin123)
- **Image Uploads**: Full support for image uploads (stored as base64 in SQLite)
- **Editable Everything**: Update all sections via admin!

---

## Local Development (to test locally anytime):
```bash
# Install dependencies (only once)
npm install

# Start both frontend and backend at the same time
npm run start:all

# Or start them separately:
npm run server  # Backend (port 3000)
npm run dev     # Frontend (port 5173)
```

---

## To Update Your Portfolio:
1. Make your changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```
3. Vercel and Render will automatically redeploy! 🎉
