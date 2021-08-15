export const configuration = () => ({
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database: {
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URI_STRING
        : process.env.MONGO_URI_STRING,
  },
  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'),
    privateKey: process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    expiresIn: process.env.JWT_EXPIRES_IN || 60 * 60 * 24,
  },
});
