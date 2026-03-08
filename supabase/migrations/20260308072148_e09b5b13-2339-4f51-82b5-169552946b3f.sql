-- Fix all RLS policies to be PERMISSIVE (default/correct behavior)

-- PROJECTS
DROP POLICY IF EXISTS "Users manage own projects" ON public.projects;
CREATE POLICY "Users manage own projects" ON public.projects
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- PAGES
DROP POLICY IF EXISTS "Users manage own pages" ON public.pages;
CREATE POLICY "Users manage own pages" ON public.pages
  FOR ALL TO authenticated
  USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));

-- ASSETS
DROP POLICY IF EXISTS "Users manage own assets" ON public.assets;
CREATE POLICY "Users manage own assets" ON public.assets
  FOR ALL TO authenticated
  USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));

-- COMPONENTS: fix the restrictive bug where both policies had to pass
DROP POLICY IF EXISTS "Users manage own components" ON public.components;
DROP POLICY IF EXISTS "Users view global components" ON public.components;

CREATE POLICY "Users manage own components" ON public.components
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users view global components" ON public.components
  FOR SELECT TO authenticated
  USING (is_global = true);

-- DEPLOYMENTS
DROP POLICY IF EXISTS "Users manage own deployments" ON public.deployments;
CREATE POLICY "Users manage own deployments" ON public.deployments
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- PAGE_VERSIONS
DROP POLICY IF EXISTS "Users manage own page versions" ON public.page_versions;
CREATE POLICY "Users manage own page versions" ON public.page_versions
  FOR ALL TO authenticated
  USING (page_id IN (SELECT p.id FROM pages p JOIN projects pr ON p.project_id = pr.id WHERE pr.user_id = auth.uid()))
  WITH CHECK (page_id IN (SELECT p.id FROM pages p JOIN projects pr ON p.project_id = pr.id WHERE pr.user_id = auth.uid()));

-- PROJECT_SETTINGS
DROP POLICY IF EXISTS "Users manage own settings" ON public.project_settings;
CREATE POLICY "Users manage own settings" ON public.project_settings
  FOR ALL TO authenticated
  USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()));