// Empty stub for jsPDF's unused optional dependencies (canvg, html2canvas,
// dompurify, core-js). jsPDF only loads these via dynamic import() for
// SVG/HTML canvas rendering — code paths we never use. Resolving the
// dynamic imports to this no-op keeps them out of the bundle entirely,
// which prevents the esbuild minify OOM ("The service was stopped").
export default undefined;
