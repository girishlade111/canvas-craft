
-- Create interactive_elements table for animated/interactive builder components
CREATE TABLE public.interactive_elements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general',
  subcategory TEXT NOT NULL DEFAULT '',
  thumbnail TEXT NOT NULL DEFAULT '✨',
  animation_type TEXT NOT NULL DEFAULT 'fade',
  element_schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  preview_css TEXT DEFAULT NULL,
  compatible_sections TEXT[] NOT NULL DEFAULT '{body}'::text[],
  tags TEXT[] NOT NULL DEFAULT '{}'::text[],
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_public BOOLEAN NOT NULL DEFAULT true,
  installs INTEGER NOT NULL DEFAULT 0,
  author_id UUID DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interactive_elements ENABLE ROW LEVEL SECURITY;

-- Public read for published elements
CREATE POLICY "Anyone can read public interactive elements"
  ON public.interactive_elements
  FOR SELECT
  USING (is_public = true);

-- Authors can manage their own elements
CREATE POLICY "Users can create interactive elements"
  ON public.interactive_elements
  FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own interactive elements"
  ON public.interactive_elements
  FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can delete own interactive elements"
  ON public.interactive_elements
  FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Users can read own interactive elements"
  ON public.interactive_elements
  FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

-- Index for faster queries
CREATE INDEX idx_interactive_elements_category ON public.interactive_elements(category);
CREATE INDEX idx_interactive_elements_animation_type ON public.interactive_elements(animation_type);
