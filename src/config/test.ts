export const config = {
    secrets: {
      jwt: 'EHPSAtestSecret'
    },
    dbUrl:
      process.env.MONGODB_URL_TEST ||
      process.env.MONGODB_URL ||
      'mongodb://localhost:27017/EHPSA-test'
  }