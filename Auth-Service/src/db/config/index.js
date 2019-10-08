import env from '../../env';

const { db_dev_uri, db_test_uri } = env;

export default {
  development: {
    config: {
      dialect: 'postgres',
      define: {
        underscored: true
      }
    },
    url: db_dev_uri
  },
  test: {
    config: {
      dialect: 'postgres',
      define: {
        underscored: true
      }
    },
    url: db_test_uri
  }
};
