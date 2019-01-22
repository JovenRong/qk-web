import Application from '../application';

export default class Bean {

  private static container = new Map();

  public static application: Application;

  public static init (application: Application): void {
    Bean.application = application;
  }

  public static async initBeans (): Promise<void> {
  }

  public static addBean0 (container, target, options): void {
    let key = options.key;
    if ( container.get(key) ) {
      return;
    }
    if ( typeof key !== 'string' ) {
      if ( !key.name ) {
        return;
      }
      key = `${key.name[0].toLowerCase()}${key.name.slice(1)}`;
    }
    container.set(key, {
      target: target,
      ins: null
    });
  }

  public static addBean(target, options): void {
    Bean.addBean0(Bean.container, target, options);
  }

  public static getBean0 (container, name) {
    if ( !container.get(name) ) {
      return;
    }
    const beanInfo = container.get(name);
    if ( !beanInfo.ins ) {
      const target = beanInfo.target;
      beanInfo.ins = new (beanInfo.target)();
    }
    return beanInfo.ins;
  }

  public static getBean(name) {
    return Bean.getBean0(Bean.container, name);
  }

  public static destory (): void {
  }

  public static remove (name): void {
  }
}
