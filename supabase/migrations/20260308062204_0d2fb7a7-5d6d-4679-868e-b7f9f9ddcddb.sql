
-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pages table
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled',
  slug TEXT NOT NULL DEFAULT 'index',
  schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Page versions table
CREATE TABLE public.page_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  version_number INT NOT NULL DEFAULT 1,
  schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Project settings table
CREATE TABLE public.project_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL UNIQUE,
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

-- Assets table
CREATE TABLE public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_projects BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_pages BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_project_settings BEFORE UPDATE ON public.project_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users manage own projects" ON public.projects FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Pages policies (via project ownership)
CREATE POLICY "Users manage own pages" ON public.pages FOR ALL TO authenticated USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())) WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- Page versions policies
CREATE POLICY "Users manage own page versions" ON public.page_versions FOR ALL TO authenticated USING (page_id IN (SELECT p.id FROM public.pages p JOIN public.projects pr ON p.project_id = pr.id WHERE pr.user_id = auth.uid())) WITH CHECK (page_id IN (SELECT p.id FROM public.pages p JOIN public.projects pr ON p.project_id = pr.id WHERE pr.user_id = auth.uid()));

-- Project settings policies
CREATE POLICY "Users manage own settings" ON public.project_settings FOR ALL TO authenticated USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())) WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- Assets policies
CREATE POLICY "Users manage own assets" ON public.assets FOR ALL TO authenticated USING (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())) WITH CHECK (project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('project-assets', 'project-assets', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users upload assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-assets');
CREATE POLICY "Authenticated users read assets" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'project-assets');
CREATE POLICY "Authenticated users delete assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-assets');
