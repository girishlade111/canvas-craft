import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

// ── Lazy-loaded route pages ──────────────────────────────
const LandingPage = lazy(() => import("./pages/LandingPage"));
const TemplateSelection = lazy(() => import("./pages/TemplateSelection"));
const BuilderPage = lazy(() => import("./pages/BuilderPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ProjectSettingsPage = lazy(() => import("./pages/ProjectSettingsPage"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const TemplateManagerPage = lazy(() => import("./pages/TemplateManagerPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DocumentationPage = lazy(() => import("./pages/DocumentationPage"));
const ChangelogPage = lazy(() => import("./pages/ChangelogPage"));
const ApiReferencePage = lazy(() => import("./pages/ApiReferencePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));

// ── Optimized QueryClient ────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 min — avoid refetching fresh data
      gcTime: 10 * 60 * 1000,         // 10 min garbage collection
      refetchOnWindowFocus: false,     // don't refetch on tab switch
      retry: 1,                        // single retry on failure
    },
  },
});

// ── Loading fallback ─────────────────────────────────────
const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

const AuthLoader = () => (
  <div className="h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

// ── Route guards ─────────────────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <AuthLoader />;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <AuthLoader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// ── App ──────────────────────────────────────────────────
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider delayDuration={300} skipDelayDuration={100}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/templates" element={<TemplateSelection />} />
              <Route path="/builder/:projectId" element={<BuilderPage />} />
              <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/api-reference" element={<ApiReferencePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/templates/:projectId" element={<ProtectedRoute><TemplateSelection /></ProtectedRoute>} />
              <Route path="/template-manager" element={<ProtectedRoute><TemplateManagerPage /></ProtectedRoute>} />
              <Route path="/builder" element={<Navigate to="/templates" replace />} />
              <Route path="/preview/:projectId" element={<ProtectedRoute><PreviewPage /></ProtectedRoute>} />
              <Route path="/project/:projectId/settings" element={<ProtectedRoute><ProjectSettingsPage /></ProtectedRoute>} />
              <Route path="/analytics/:projectId" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
