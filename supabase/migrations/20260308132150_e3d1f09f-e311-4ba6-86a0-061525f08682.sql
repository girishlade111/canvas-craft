
-- Templates table for storing website builder templates
CREATE TABLE public.templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'starter',
  thumbnail text NOT NULL DEFAULT '🗒️',
  schema jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_public boolean NOT NULL DEFAULT true,
  is_premium boolean NOT NULL DEFAULT false,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  installs integer NOT NULL DEFAULT 0,
  tags text[] NOT NULL DEFAULT '{}'::text[],
  preview_image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Public templates are readable by everyone (including anonymous)
CREATE POLICY "Anyone can read public templates"
  ON public.templates FOR SELECT
  USING (is_public = true);

-- Authenticated users can read their own private templates
CREATE POLICY "Users can read own templates"
  ON public.templates FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

-- Authenticated users can create templates
CREATE POLICY "Users can create templates"
  ON public.templates FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

-- Users can update their own templates
CREATE POLICY "Users can update own templates"
  ON public.templates FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Users can delete their own templates
CREATE POLICY "Users can delete own templates"
  ON public.templates FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- Auto-update updated_at
CREATE TRIGGER handle_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Index for faster category/public queries
CREATE INDEX idx_templates_category ON public.templates (category);
CREATE INDEX idx_templates_public ON public.templates (is_public) WHERE is_public = true;
