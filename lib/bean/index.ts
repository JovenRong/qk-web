import * as fs from 'fs';
import * as Path from 'path';

import { readDirSync } from '../utils';
import Application from '../application';

import Dao from './dao';
import Bean from './bean';
import Service from './service';
import Controller from './controller';

export default class BeanFactory {

  public static async scan (application: Application, dirs: String[]): Promise<void> {
    Bean.init(application);
    Dao.init();
    Service.init();
    Controller.init();

    dirs.forEach( dir => {
      readDirSync(dir, (fpath, isFile) => {
        if (fpath.endsWith('.js')) {
          require(fpath);
        }
      })
    })
    await Dao.initBeans();
    await Bean.initBeans();
    await Service.initBeans();
    await Controller.initBeans();
  }

  public static async destroy (): Promise<void> {
    await Dao.destroy();
    await Bean.destroy();                                                
    await Service.destroy();                                             
    await Controller.destroy();
  }
}
