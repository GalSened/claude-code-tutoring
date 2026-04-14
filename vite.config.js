import { defineConfig } from 'vite';

// Set BASE_PATH=/claude-code-tutoring/ in CI for GitHub Pages subpath hosting.
// Local dev and root-domain hosts use '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: {
    open: true,
  },
});
