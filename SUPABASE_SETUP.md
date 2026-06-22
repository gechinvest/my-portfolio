# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** and fill in the details:
   - Name: `Portfolio`
   - Database Password: Choose a secure password (save this!)
   - Region: Choose the closest one to you
3. Click **Create new project** (it takes a few minutes to provision)

## Step 2: Configure Site URL (IMPORTANT - Fixes CORS Errors!)

1. Go to **Project Settings** → **Authentication**
2. Under **Site URL**, add your Vercel URL (e.g., `https://my-portfolio-7je2v8v5r-geta1.vercel.app`)
3. Also add `http://localhost:5173` (for local development) to **Redirect URLs** (optional but helpful)

## Step 3: Create the Portfolio Table and RLS Policies

Once your project is ready:

1. Go to **SQL Editor** → **New Query**
2. Paste the SQL code from `supabase-setup.sql` file in your project
3. Click **Run** to execute it!

This will:
- Create the `portfolio` table
- Insert default data
- Enable Row Level Security (RLS)
- Create policies to allow public read/write access (suitable for a portfolio)

## Step 4: Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy:
   - Project URL
   - anon/public key

## Step 5: Configure Your .env File

Create a `.env.local` (or rename `.env`) file in your project root:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```
