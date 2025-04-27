import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
<<<<<<< HEAD
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
=======
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
>>>>>>> tempRepo/main
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
