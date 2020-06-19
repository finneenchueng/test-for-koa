import { configure } from 'log4js';
import 'reflect-metadata';
import './config/ioc/inversify.config';
import { Container, buildProviderModule, InversifyKoaServer } from './config/ioc';
import config from './config/basic';
import { preConfig, preErrConfig } from './config/prepared';

configure({
  appenders: {
    cheese: { type: 'file', filename: `${__dirname}/logs/runtimes.log` }
  },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const container = new Container();
container.load(buildProviderModule());
const server = new InversifyKoaServer(container);
server.setConfig(preConfig);
server.setErrorConfig(preErrConfig);
const app = server.build();
app.listen(config.port, () => {
  console.log(`app started at ${config.port}`);
});
