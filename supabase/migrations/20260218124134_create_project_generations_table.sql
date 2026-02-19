/*
  # Create project generations table for Structify AI

  1. New Tables
    - `project_generations`
      - `id` (uuid, primary key) - Unique identifier for each generation
      - `project_description` (text) - User's input description of the project
      - `tech_stack` (jsonb) - Recommended technologies and frameworks
      - `folder_structure` (jsonb) - Complete folder/file hierarchy
      - `architecture_type` (text) - Architecture pattern (MVC, microservices, etc.)
      - `database_suggestion` (text) - Recommended database solution
      - `tools_integrations` (jsonb) - Optional tools and integrations
      - `deployment_recommendations` (text) - Deployment strategy suggestions
      - `module_breakdown` (jsonb) - Module organization details
      - `created_at` (timestamptz) - Timestamp of generation

  2. Security
    - Enable RLS on `project_generations` table
    - Add policy for public insert (anyone can generate)
    - Add policy for public read (anyone can view their generations)

  Note: For this MVP, we're allowing public access. In production, this would be
  tied to authenticated users.
*/

CREATE TABLE IF NOT EXISTS project_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_description text NOT NULL,
  tech_stack jsonb DEFAULT '[]'::jsonb,
  folder_structure jsonb DEFAULT '{}'::jsonb,
  architecture_type text DEFAULT '',
  database_suggestion text DEFAULT '',
  tools_integrations jsonb DEFAULT '[]'::jsonb,
  deployment_recommendations text DEFAULT '',
  module_breakdown jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for project generations"
  ON project_generations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read for project generations"
  ON project_generations
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_project_generations_created_at 
  ON project_generations(created_at DESC);