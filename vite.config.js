import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL
      }
    }
  },
  plugins: [react()]
});
