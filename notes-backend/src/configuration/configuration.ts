export const configuration = () => ({
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database: {
    uri: process.env.MONGO_URI_STRING,
  },
});
