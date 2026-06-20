# Geta Tenaw - Portfolio

A professional full-stack developer and cybersecurity researcher portfolio built with React, Vite, and Supabase!

## Features

- **Admin Dashboard - Login with password protection (admin123)
- Fully customizable portfolio sections
- Profile and project image upload
- Supabase database integration
- LocalStorage fallback if no database
- Responsive design with Tailwind CSS
- Framer Motion animations

## Local Development

### Prerequisites

1. Node.js installed

### Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase (see [SUPABASE_SETUP.md for detailed instructions):
   - Create a Supabase project
   - Create the portfolio table
   - Add your Supabase URL and anon key to `.env`

3. Create a `.env` file:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
```

## Admin Access

Visit `/admin` in your browser, login with password: `admin123`

## Deployment

### Frontend on Vercel

1. Push your code to GitHub
2. Go to Vercel, import your repo
3. Add environment variables in Vercel project settings:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

4. Deploy!

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Supabase
- @supabase/supabase-js
