import {defineConfig, UserConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["/src/tests/setup.js", "vitest-localstorage-mock"],
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
} as UserConfig);
