export const configuration = {
  env: import.meta.env.VITE_NODE_ENV || 'development',
  port: import.meta.env.VITE_PORT || 3001,
  api: {
    uri: import.meta.env.VITE_NOTES_API_URI,
  },
  webUri: import.meta.env.VITE_WEB_URI || 'http://localhost:3001',
};
