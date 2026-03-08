import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-popover", "@radix-ui/react-tooltip", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tabs", "@radix-ui/react-select"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-dnd": ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
          "vendor-supabase": ["@supabase/supabase-js"],
          "vendor-utils": ["zustand", "clsx", "tailwind-merge", "class-variance-authority", "date-fns", "zod", "sonner"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
