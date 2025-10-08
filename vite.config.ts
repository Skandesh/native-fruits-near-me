import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemapPlugin from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    sitemapPlugin({
      hostname: 'https://nativfruits.com',
      dynamicRoutes: [
        '/north-america-seasonal-fruits',
        '/mediterranean-europe-fruits',
        '/southeast-asia-tropical-fruits',
        '/south-america-exotic-fruits',
        '/africa-native-fruits',
        '/australia-oceania-fruits'
      ],
    }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'north-america-seasonal-fruits': path.resolve(__dirname, 'north-america-seasonal-fruits.html'),
        'mediterranean-europe-fruits': path.resolve(__dirname, 'mediterranean-europe-fruits.html'),
        'southeast-asia-tropical-fruits': path.resolve(__dirname, 'southeast-asia-tropical-fruits.html'),
        'south-america-exotic-fruits': path.resolve(__dirname, 'south-america-exotic-fruits.html'),
        'africa-native-fruits': path.resolve(__dirname, 'africa-native-fruits.html'),
        'australia-oceania-fruits': path.resolve(__dirname, 'australia-oceania-fruits.html'),
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
