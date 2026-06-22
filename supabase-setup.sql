-- Supabase Portfolio Table Setup
-- Run this in your Supabase SQL Editor
-- THIS IS SAFE - IT WILL NOT DELETE YOUR EXISTING DATA

-- Create the portfolio table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial portfolio data (only if row with id=1 doesn't exist)
INSERT INTO portfolio (id, data)
VALUES (
  1,
  $$
  {
    "hero": {
      "name": "",
      "titles": ["Developer"],
      "description": "",
      "profileImage": ""
    },
    "about": {
      "description": "",
      "counters": [
        { "value": 0, "label": "Years Experience" },
        { "value": 0, "label": "Projects Completed" },
        { "value": 0, "label": "Technologies" }
      ]
    },
    "skills": [],
    "projects": [],
    "experience": [],
    "contact": {
      "email": "",
      "phone": "",
      "location": "",
      "socialLinks": []
    },
    "admin": {
      "password": "admin123"
    }
  }
  $$::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS (recommended for security)
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (to avoid errors if they already exist)
DROP POLICY IF EXISTS "Allow public read access on portfolio" ON portfolio;
DROP POLICY IF EXISTS "Allow public write access on portfolio" ON portfolio;

-- Create RLS policies to allow public read/write access (since this is a portfolio)
CREATE POLICY "Allow public read access on portfolio"
  ON portfolio
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public write access on portfolio"
  ON portfolio
  FOR ALL
  USING (true)
  WITH CHECK (true);
