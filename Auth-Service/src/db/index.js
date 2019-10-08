import { Sequelize, DataTypes } from 'sequelize';
import models from './models';
import configuration from './config';
import env from '../env';

const { node_env } = env;
const conf = configuration[node_env];


const sequelize = new Sequelize(conf.url, conf.config);

const { AuthDefinition, BlacklistDefinition } = models;

const db = {
  models: {
    User: AuthDefinition(sequelize, DataTypes),
    Blacklist: BlacklistDefinition(sequelize, DataTypes)
  },
  sequelize
};

export default db;
