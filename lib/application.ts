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
};

export default class Application {

  public root: String;
  public applicationConfigurations = {};

  private options: any;
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
  }

  public addConfiguration (configuration): void {
    Hoek.merge(this.applicationConfigurations, configuration, false, true);
    console.log(JSON.stringify(this.applicationConfigurations));
  }
};

//process.on('unhandledRejection', (err) => {
//  console.log(err);
//  process.exit(1);
//});
