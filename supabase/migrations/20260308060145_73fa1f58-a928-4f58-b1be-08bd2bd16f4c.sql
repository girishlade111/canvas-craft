
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Pages table (stores JSON schema)
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Home',
  slug TEXT NOT NULL DEFAULT 'index',
  schema JSONB NOT NULL DEFAULT '{"id":"page-1","name":"Home","sections":[]}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pages" ON public.pages FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = pages.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can create own pages" ON public.pages FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = pages.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can update own pages" ON public.pages FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = pages.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can delete own pages" ON public.pages FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = pages.project_id AND projects.user_id = auth.uid()));

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Page versions (version history)
CREATE TABLE public.page_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  schema JSONB NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own page versions" ON public.page_versions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pages
    JOIN public.projects ON projects.id = pages.project_id
    WHERE pages.id = page_versions.page_id AND projects.user_id = auth.uid()
  ));
CREATE POLICY "Users can create own page versions" ON public.page_versions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pages
    JOIN public.projects ON projects.id = pages.project_id
    WHERE pages.id = page_versions.page_id AND projects.user_id = auth.uid()
  ));

CREATE INDEX idx_page_versions_page_id ON public.page_versions(page_id, version_number DESC);

-- Project settings (SEO, favicon, analytics)
CREATE TABLE public.project_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
  site_title TEXT,
  meta_description TEXT,
  favicon_url TEXT,
  og_image_url TEXT,
  custom_domain TEXT,
  analytics_scripts TEXT,
  custom_head_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.project_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own project settings" ON public.project_settings FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_settings.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can create own project settings" ON public.project_settings FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_settings.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can update own project settings" ON public.project_settings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_settings.project_id AND projects.user_id = auth.uid()));

CREATE TRIGGER update_project_settings_updated_at BEFORE UPDATE ON public.project_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Assets table
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assets" ON public.assets FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = assets.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can create own assets" ON public.assets FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = assets.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can delete own assets" ON public.assets FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = assets.project_id AND projects.user_id = auth.uid()));

-- Storage bucket for project assets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-assets', 'project-assets', true);

CREATE POLICY "Users can view project assets" ON storage.objects FOR SELECT
  USING (bucket_id = 'project-assets');
CREATE POLICY "Authenticated users can upload assets" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own assets" ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own assets" ON storage.objects FOR DELETE
  USING (bucket_id = 'project-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
