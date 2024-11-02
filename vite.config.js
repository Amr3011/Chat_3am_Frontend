import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://chatio-e0b5bvfwhwhye6fv.uaenorth-01.azurewebsites.net"
      }
    }
  },
  plugins: [react()]
});
