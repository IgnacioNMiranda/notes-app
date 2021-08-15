import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3001,
  },
});

export default config;
