import { defineConfig, UserConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig((): UserConfig => {
  const libFilesPath = "lib/src";

  return {
    build: {
      lib: {
        entry: resolve(__dirname, `${libFilesPath}/index.ts`),
        name: "ReactXUI",
        formats: ["es", "umd"],
        fileName: (format) => `react-xui.${format}.js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          /^@tailwindcss/,
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        output: [
          {
            format: "es",
            dir: "dist/es",
            preserveModules: true,
            preserveModulesRoot: "lib",
            exports: "named",
            entryFileNames: "[name].js",
          },
          {
            format: "umd",
            dir: "dist/umd",
            name: "ReactXUI",
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "jsxRuntime",
              "class-variance-authority": "cva",
              clsx: "clsx",
              "tailwind-merge": "twMerge",
            },
          },
        ],
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    resolve: {
      alias: [
        { find: "@", replacement: resolve(__dirname, `./${libFilesPath}`) },
        {
          find: "@tests",
          replacement: resolve(__dirname, "./cypress"),
        },
      ],
    },
    plugins: [
      react(),
      tailwindcss(),
      libInjectCss(),
      dts({
        include: [libFilesPath],
        exclude: ["**/*.stories.tsx", "**/*.cy.tsx", "**/*.cy.ts"],
        rollupTypes: true,
        outDir: "dist/types",
        compilerOptions: {
          baseUrl: ".",
          paths: {
            "@/*": [`./${libFilesPath}/*`],
          },
        },
      }),
    ],
  };
});
