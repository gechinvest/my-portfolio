-- Supabase Portfolio Table Setup
-- Run this in your Supabase SQL Editor

-- Create the portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial portfolio data using dollar quoting (avoids apostrophe issues)
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

-- IMPORTANT: After creating the table, you need to disable RLS or create policies
-- Option 1: Disable RLS entirely (not recommended for production, but easy for testing)
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;
