import morgan from 'morgan';
import env from '../env';
import router from '../routes';

const { node_env } = env;

export default (app, { json, urlencoded }) => {
  if (node_env === 'development') {
    app.use(morgan('dev'));
  }
  app.use(json());
  app.use(urlencoded({
    extended: false
  }));
  app.use('/api/v1', router);
};
