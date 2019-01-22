import * as fs from 'fs';
import * as Path from 'path';

import { readDirSync } from '../utils';
import Application from '../application';

import Controller from './controller';
import Service from './service';
import Bean from './bean';

export default class BeanFactory {

  public static async scan (application: Application, dirs: String[]): Promise<void> {
    Bean.init(application);
    Service.init();
    Controller.init();

    dirs.forEach( dir => {
      readDirSync(dir, (fpath, isFile) => {
        if (fpath.endsWith('.js')) {
          require(fpath);
        }
      })
    })
    await Bean.initBeans();
    await Service.initBeans();
    await Controller.initBeans();
  }

  public static async destroy (): Promise<void> {
    await Bean.destroy();                                                
    await Service.destroy();                                             
    await Controller.destroy();
  }
}
