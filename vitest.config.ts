/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  test: {
    globals: true,

    threads: false,
    environment: "happy-dom",
    setupFiles: ["./__tests__/setup-test-env.ts"],
    exclude: ["./cypress", "./test/e2e", "./node_modules"],
  },
});
