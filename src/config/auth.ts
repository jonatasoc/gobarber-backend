export default {
  jwt: {
    secret: process.env.APP_SECRET || 'f1e0ac820b70d6b1984d031d5a3f3958',
    expiresIn: '1d',
  },
};
