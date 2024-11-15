import { configDotenv } from 'dotenv';

configDotenv();

export const ENV = {
  REPL: process.env.REPL == 'true',
  APP_NAME: process.env.APP_NAME || 'EXAMPLE_NAME',
  APP_PORT: process.env.APP_PORT,
  RMQ_URL: process.env.RMQ_URL,
  S3: {
    ENDPOINT: process.env.S3_ENDPOINT,
    REGION: process.env.S3_REGION,
    ACCESS_KEY: process.env.S3_ACCESS_KEY,
    SECRET_KEY: process.env.S3_SECRET_KEY,
    BUCKET_NAME: process.env.S3_BUCKET,
  },
};
