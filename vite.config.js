// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures env vars are available
    "process.env": {
      VITE_AIRTABLE_API_KEY: JSON.stringify(process.env.VITE_AIRTABLE_API_KEY),
    },
  },
  build: {
    outDir: "dist",
  },
  base: "./", // use '/' or './' depending on your use-case
});
