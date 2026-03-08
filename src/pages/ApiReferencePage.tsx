import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCode2, Database, Globe, Shield, Zap, Copy } from 'lucide-react';
import { toast } from 'sonner';

const ApiReferencePage = () => {
  const navigate = useNavigate();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard');
  };

  const CodeBlock = ({ code, language = 'typescript' }: { code: string; language?: string }) => (
    <div className="relative group">
      <button
        onClick={() => copyCode(code)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-background/80 hover:bg-background border border-border"
      >
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      <pre className="bg-muted rounded-xl p-5 overflow-x-auto text-sm leading-relaxed border border-border">
        <code>{code}</code>
      </pre>
    </div>
  );

  const endpoints = [
    {
      category: 'Projects',
      icon: Globe,
      description: 'Manage website projects — create, read, update, and delete.',
      apis: [
        {
          method: 'GET',
          path: '/rest/v1/projects',
          description: 'List all projects for the authenticated user.',
          params: 'select=* &order=created_at.desc',
          example: `const { data, error } = await supabase
  .from('projects')
  .select('*')
  .order('created_at', { ascending: false });`,
          response: `[
  {
    "id": "uuid",
    "name": "My Website",
    "description": "A portfolio site",
    "user_id": "uuid",
    "created_at": "2026-03-08T00:00:00Z",
    "updated_at": "2026-03-08T00:00:00Z"
  }
]`,
        },
        {
          method: 'POST',
          path: '/rest/v1/projects',
          description: 'Create a new project.',
          example: `const { data, error } = await supabase
  .from('projects')
  .insert({ name: 'New Site', user_id: user.id })
  .select()
  .single();`,
        },
        {
          method: 'PATCH',
          path: '/rest/v1/projects?id=eq.{id}',
          description: 'Update a project by ID.',
          example: `const { error } = await supabase
  .from('projects')
  .update({ name: 'Updated Name' })
  .eq('id', projectId);`,
        },
        {
          method: 'DELETE',
          path: '/rest/v1/projects?id=eq.{id}',
          description: 'Delete a project and all associated data.',
          example: `const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);`,
        },
      ],
    },
    {
      category: 'Pages',
      icon: FileCode2,
      description: 'Manage pages within a project, including schema and version history.',
      apis: [
        {
          method: 'GET',
          path: '/rest/v1/pages?project_id=eq.{projectId}',
          description: 'List all pages for a project, ordered by sort position.',
          example: `const { data, error } = await supabase
  .from('pages')
  .select('*')
  .eq('project_id', projectId)
  .order('sort_order');`,
          response: `[
  {
    "id": "uuid",
    "project_id": "uuid",
    "name": "Home",
    "slug": "index",
    "schema": { "id": "...", "name": "Home", "sections": [] },
    "sort_order": 0,
    "created_at": "...",
    "updated_at": "..."
  }
]`,
        },
        {
          method: 'POST',
          path: '/rest/v1/pages',
          description: 'Create a new page with a default schema.',
          example: `const { data, error } = await supabase
  .from('pages')
  .insert({
    project_id: projectId,
    name: 'About',
    slug: 'about',
    schema: { id: crypto.randomUUID(), name: 'About', sections: [] }
  })
  .select()
  .single();`,
        },
        {
          method: 'GET',
          path: '/rest/v1/page_versions?page_id=eq.{pageId}',
          description: 'Get version history for a page (up to 50 versions).',
          example: `const { data } = await supabase
  .from('page_versions')
  .select('*')
  .eq('page_id', pageId)
  .order('version_number', { ascending: false })
  .limit(50);`,
        },
      ],
    },
    {
      category: 'Blog Posts',
      icon: FileCode2,
      description: 'Create and manage blog content with categories, tags, and scheduling.',
      apis: [
        {
          method: 'GET',
          path: '/rest/v1/blog_posts?project_id=eq.{projectId}',
          description: 'List all blog posts for a project.',
          example: `const { data, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('project_id', projectId)
  .order('created_at', { ascending: false });`,
          response: `[
  {
    "id": "uuid",
    "title": "Getting Started with DevBuilder",
    "slug": "getting-started",
    "content": "Full post content...",
    "excerpt": "A brief summary",
    "author": "John Doe",
    "category": "Tutorial",
    "tags": ["devbuilder", "tutorial"],
    "status": "published",
    "featured": true,
    "read_time": "5 min",
    "publish_date": "2026-03-08"
  }
]`,
        },
        {
          method: 'POST',
          path: '/rest/v1/blog_posts',
          description: 'Create a new blog post.',
          example: `const { data, error } = await supabase
  .from('blog_posts')
  .insert({
    project_id: projectId,
    user_id: user.id,
    title: 'My New Post',
    content: 'Post content here...',
    status: 'draft'
  })
  .select()
  .single();`,
        },
      ],
    },
    {
      category: 'Products',
      icon: Database,
      description: 'eCommerce product management with inventory and variant support.',
      apis: [
        {
          method: 'GET',
          path: '/rest/v1/products?project_id=eq.{projectId}',
          description: 'List all products for a project.',
          example: `const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('project_id', projectId)
  .order('created_at', { ascending: false });`,
          response: `[
  {
    "id": "uuid",
    "name": "Premium T-Shirt",
    "price": 29.99,
    "compare_price": 39.99,
    "category": "Apparel",
    "inventory": 150,
    "variants": 3,
    "status": "active",
    "image": "https://..."
  }
]`,
        },
      ],
    },
    {
      category: 'Orders',
      icon: Database,
      description: 'Order tracking with customer info and status management.',
      apis: [
        {
          method: 'GET',
          path: '/rest/v1/orders?project_id=eq.{projectId}',
          description: 'List all orders for a project.',
          example: `const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('project_id', projectId)
  .order('created_at', { ascending: false });`,
        },
      ],
    },
    {
      category: 'Assets',
      icon: Database,
      description: 'File management for images, videos, and documents.',
      apis: [
        {
          method: 'GET',
          path: '/rest/v1/assets?project_id=eq.{projectId}',
          description: 'List all uploaded assets for a project.',
          example: `const { data, error } = await supabase
  .from('assets')
  .select('*')
  .eq('project_id', projectId)
  .order('created_at', { ascending: false });`,
        },
        {
          method: 'POST',
          path: '/storage/v1/object/assets/{path}',
          description: 'Upload a file to project storage.',
          example: `const { data, error } = await supabase.storage
  .from('assets')
  .upload(\`\${projectId}/\${file.name}\`, file);`,
        },
      ],
    },
    {
      category: 'Deployments',
      icon: Zap,
      description: 'Deployment history and publish management.',
      apis: [
        {
          method: 'GET',
          path: '/rest/v1/deployments?project_id=eq.{projectId}',
          description: 'List deployment history for a project.',
          example: `const { data, error } = await supabase
  .from('deployments')
  .select('*')
  .eq('project_id', projectId)
  .order('created_at', { ascending: false });`,
          response: `[
  {
    "id": "uuid",
    "project_id": "uuid",
    "status": "completed",
    "provider": "vercel",
    "deployment_url": "https://my-site.vercel.app",
    "version_number": 3,
    "build_log": "Generated 5 files..."
  }
]`,
        },
      ],
    },
  ];

  const methodColors: Record<string, string> = {
    GET: 'bg-green-500/10 text-green-600 border-green-500/20',
    POST: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    PATCH: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    DELETE: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-primary" />
            <h1 className="font-bold text-lg">API Reference</h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">API Reference</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DevBuilder uses Supabase as its backend. All data is accessible via the Supabase client library with full TypeScript support and Row-Level Security.
          </p>
        </div>
      </section>

      {/* Auth info */}
      <section className="py-10 px-6 border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-bold">Authentication</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            All API calls require authentication. The Supabase client automatically handles auth tokens. Initialize your client:
          </p>
          <CodeBlock code={`import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
});`} />
        </div>
      </section>

      {/* Endpoints */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        {endpoints.map((group, gi) => (
          <section key={group.category} className={gi > 0 ? 'mt-16' : ''} id={group.category.toLowerCase().replace(/\s/g, '-')}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <group.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{group.category}</h2>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {group.apis.map((api, ai) => (
                <div key={ai} className="rounded-xl border border-border overflow-hidden">
                  {/* Endpoint header */}
                  <div className="flex items-center gap-3 px-5 py-4 bg-muted/30 border-b border-border">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${methodColors[api.method]}`}>
                      {api.method}
                    </span>
                    <code className="text-sm font-mono text-muted-foreground">{api.path}</code>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-sm">{api.description}</p>

                    {/* Example */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Example</p>
                      <CodeBlock code={api.example} />
                    </div>

                    {/* Response */}
                    {api.response && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Response</p>
                        <CodeBlock code={api.response} language="json" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ApiReferencePage;
