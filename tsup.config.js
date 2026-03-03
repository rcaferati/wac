import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,

  // Use Terser (instead of tsup/esbuild default minifier)
  minify: "terser",
  terserOptions: {
    compress: true,
    mangle: true,
    format: {
      comments: false,
    },

    // Preserves names (matches your old webpack terser behavior).
    // Remove these two lines if you want smaller output.
    keep_fnames: true,
    keep_classnames: true,
  },

  target: "es2018",
  treeshake: true,
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
});
