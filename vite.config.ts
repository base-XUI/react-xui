import { defineConfig, UserConfig } from "vite";
import { InlineConfig } from "vitest/node";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

type ViteConfig = UserConfig & {
  test: InlineConfig;
};

export default defineConfig((): ViteConfig => {
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
          replacement: resolve(__dirname, "./lib/tests"),
        },
      ],
    },
    plugins: [
      react(),
      tailwindcss(),
      dts({
        include: [libFilesPath],
        exclude: [
          "**/*.stories.tsx",
          "**/*.test.tsx",
          "**/*.test.ts",
          "**/*.spec.tsx",
          "**/*.spec.ts",
        ],
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
    test: {
      environment: "jsdom",
      setupFiles: "./lib/tests/setup.ts",
      globals: true,
      watch: false,
      include: ["lib/**/*.test.ts", "lib/**/*.test.tsx"],
    },
  };
});
