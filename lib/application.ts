import * as Path from 'path';
import * as Hapi from "hapi";
import * as Inert from "inert";
import * as Hoek from "hoek";

import BeanFactory from './bean';
import PreStart from './prestart';

const defaultOptions = {
  root: process.cwd(),
  port: 3000,
  host: 'localhost',
  view: process.cwd(),
  configNS: 'node-web',
};

export default class Application {

  public root: String;
  public applicationConfigurations = {};

  public options: any;
  public server: Hapi.Server;

  constructor (options) {
    options = Hoek.applyToDefaults(defaultOptions, options, true);
    this.root = options.root;

    this.server = new Hapi.Server({
      port: options.port,
      host: options.host
    });
    this.options = options;
  }

  public async start (): Promise<void> {
    PreStart(this);

    let dirs = this.options.componentDirs || [this.root];
    await BeanFactory.scan(this, dirs);

    await this.server.register(Inert);
    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);
    this.registerExit();
  }

  public addConfiguration (configuration): void {
    Hoek.merge(this.applicationConfigurations, configuration, false, true);
  }

  private registerExit (): void {
    let exitHandler = function (options, code) {
      if (options && options.exit) {
        console.log('application exit at', code);
        BeanFactory.destroy();
        process.exit();
      } else {
        console.log('exception', code);
      }
    };

    process.on('exit', exitHandler.bind(this, {exit: true}));

    // catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(this, {exit: true}));

    // catches "kill pid"
    process.on('SIGUSR1', exitHandler.bind(this, {exit: true}));
    process.on('SIGUSR2', exitHandler.bind(this, {exit: true}));

    // catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(this, {exit: false}));
  }
};

//process.on('unhandledRejection', (err) => {
//  console.log(err);
//  process.exit(1);
//});
