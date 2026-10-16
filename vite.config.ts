import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin to duplicate index.html to 404.html for static SPA hosts like GitHub Pages
const copy404Plugin = (): Plugin => ({
  name: 'copy-404-html',
  closeBundle() {
    try {
      const distIndex = path.resolve(__dirname, 'dist', 'index.html');
      const dist404 = path.resolve(__dirname, 'dist', '404.html');
      if (fs.existsSync(distIndex)) {
        fs.copyFileSync(distIndex, dist404);
      }
    } catch {
      // Non-critical, ignore
    }
  },
});

export default defineConfig(() => {
  return {
    // Explicit relative base ensures asset paths (./assets/...) resolve properly on GitHub Pages or subpaths
    base: './',
    plugins: [react(), tailwindcss(), copy404Plugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor';
            }
            if (id.includes('node_modules/lucide-react/')) {
              return 'icons';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

