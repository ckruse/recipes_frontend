import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        typescript: true,
        eslint: mode === "development" && { lintCommand: "eslint .", useFlatConfig: true },
      }),
    ],
    build: {
      outDir: "build",
      sourcemap: mode === "production",
      manifest: true,
    },
    server: {
      port: 3000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"],
        },
      },
      postcss: {
        plugins: [autoprefixer({})],
      },
    },
  };
});
