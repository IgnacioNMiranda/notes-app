export const configuration = () => ({
  env: process.env.NODE_ENV || 'test',
  port: process.env.PORT || 3000,
  database: {
    uri: 'mongo:uri',
  },
  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'),
    privateKey: process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    expiresIn: +process.env.JWT_EXPIRES_SECONDS || 60 * 5,
  },
});
