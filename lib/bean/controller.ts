import * as Hapi from 'hapi';

import Application from '../application';
import Bean from './bean';

const URL_PATH_TRIM = /^\/*|\/*$/g;

export default class Controller {

  private static container = new Map();
  //private static currentTarget;
  private static currentMethods;

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
    Controller.container.forEach( target => {
      let target0 = target.target,
        targetOptions = target.options,
        targetMethods = target.methods;

      if ( !targetMethods || targetMethods.length < 1) {
        return;
      }
      let controllerPath = targetOptions.path.replace(URL_PATH_TRIM, '');
      if ( controllerPath ) {
        controllerPath = '/' + controllerPath + '/';
      }
      let controllerMiddlewares = targetOptions.middlewares;
      targetMethods.forEach ( targetMethod => {
        let { method, path, handler, middlewares } = targetMethod;
        path = controllerPath + path.replace(URL_PATH_TRIM, '');
        Bean.application.server.route({
          method: method,
          path: path,
          handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            if ( !target.ins ) {
              target.ins = new target0();
            }
            if (request.method === 'options') {
              return '';
            }
            let ret = target.ins[handler](request.params);
            if ( !ret ) {
              return '';
            } else {
              return ret;
            }
          }
        });
      });
    });
    Controller.currentMethods = null;
  }

  public static addBean(target, options): void {
    // TODO 需要确定 先执行class decorator 还是 先执行method decorator
    Controller.container.set(target, {
      target: target,
      options: options,
      methods: Controller.currentMethods
    });
    Controller.currentMethods = null;
  }

  public static addMethod (target, method: string, path: string, handler: string, middleware?: any): void {
    if ( !path || !method ) {
      return;
    }
    if ( !Controller.currentMethods ) {
      Controller.currentMethods = [];
    }
    Controller.currentMethods.push({
      method: method,
      path: path,
      handler: handler,
      middlewares: middleware
    });
  }

  public static async destroy (): Promise<void> {
  }

}
