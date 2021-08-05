import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [reactRefresh()],
});

export default config;
