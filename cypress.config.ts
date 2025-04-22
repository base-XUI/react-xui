import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "lib/src/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
  e2e: {
    supportFile: false,
  },
});
