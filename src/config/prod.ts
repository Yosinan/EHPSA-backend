export const config = {
    secrets: {
      jwt: 'EHPSAprodSecret'
    },
    dbUrl:
      process.env.MONGODB_URL_PROD ||
      process.env.MONGODB_URL ||
      'mongodb://localhost:27017/EHPSA-prod'
  }