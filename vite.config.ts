import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// jsPDF ships several optional dependencies (canvg, html2canvas, dompurify,
// core-js) that it only loads via dynamic import() for SVG/HTML rendering.
// We never use those code paths — we only draw text and lines — but Vite
// still tries to bundle the dynamic import targets. core-js alone is large
// enough to exhaust esbuild's minify heap ("The service was stopped"),
// which is the deployment failure we're fixing. Pointing these aliases at
// an empty module makes the dynamic imports resolve to a no-op so they
// never enter the bundle.
const stub = fileURLToPath(new URL('./src/lib/empty-stub.js', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      canvg: stub,
      html2canvas: stub,
      dompurify: stub,
      'core-js': stub,
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
