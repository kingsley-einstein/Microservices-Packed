import dotenv from 'dotenv';

dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_dev_uri: process.env.DATABASE_DEV,
  db_test_uri: process.env.DATABASE_TEST,
  cloud_config_uri: process.env.CLOUD_CONFIG_URI
};
