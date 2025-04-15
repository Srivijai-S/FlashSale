import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose the VITE_AIRTABLE_API_KEY in the app at build time
    "import.meta.env.VITE_AIRTABLE_API_KEY": JSON.stringify(
      process.env.VITE_AIRTABLE_API_KEY
    ),
  },
  build: {
    outDir: "dist",
  },
  base: "./",
});
