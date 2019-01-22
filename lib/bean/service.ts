import Application from '../application';
import Bean from './bean';

export default class Service {

  private static container = new Map();

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
  }

  public static addBean(key: any, target: any): void {
    Bean.addBean0(Service.container, target, {
      key: key
    });
  }

  public static getBean(name) {
    return Bean.getBean0(Service.container, name);
  }

}
