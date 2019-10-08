import express from 'express';
import configure from './config';
import env from './env';
import cloud from './cloud';
import eureka from './eureka';
import db from './db';

const app = express();

const { port, node_env, cloud_config_uri } = env;
const PORT = port || 4777;
const { CloudConfig } = cloud;
const { Eureka } = eureka;
const sequelize_config = {
  development: {
    force: false
  },
  test: {
    force: true
  }
};
const cloud_config = {
  endpoint: cloud_config_uri,
  name: 'auth-service'
};
const { sequelize } = db;

configure(app, express);

CloudConfig(cloud_config).then((config) => {
  sequelize.sync(sequelize_config[node_env]).then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
      if (node_env !== 'test') {
        const eureka_config = {
          instance: {
            app: config.get('instance.app'),
            hostName: config.get('instance.hostName'),
            ipAddr: config.get('instance.ipAddr'),
            vipAddress: config.get('instance.vipAddress'),
            port: {
              $: PORT,
              '@enabled': true
            },
            dataCenterInfo: {
              '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
              name: 'MyOwn'
            },
            fetchRegistry: true,
            registerWithEureka: true
          },
          eureka: {
            host: config.get('eureka.host'),
            port: config.get('eureka.port'),
            servicePath: '/eureka/apps'
          }
        };
        Eureka(eureka_config).start((error) => {
          if (error) {
            console.log(JSON.stringify(error.message));
          }
        });
      }
    });
  });
});

// Export server for tests
export default app;
