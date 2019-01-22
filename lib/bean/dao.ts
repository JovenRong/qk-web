import Application from '../application';
import Bean from './bean';

export default class Dao {

  private static container = new Map();

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
    const configNS = Bean.application.options.configNS;
    const applicationConfig = Bean.application.applicationConfigurations;
    if ( !applicationConfig || !applicationConfig[configNS] || !applicationConfig[configNS].data ) {
      return;
    }
    const dataConfigs = applicationConfig[configNS].data;
    let dbKeys = Object.keys(dataConfigs);
    for (let i0 = 0; i0 < dbKeys.length; i0++) {
      let db = dbKeys[i0];
      let dataConfig = dataConfigs[db];
      if ( !Array.isArray(dataConfig) ) {
        dataConfig = [dataConfig];
      }
      let daoPath = dataConfig[0].dao || '../dao/storage/'+db;
      let dao = require(daoPath).default;
      let i = 0;
      for (let j=0; j < dataConfig.length; j++) {
        let config = dataConfig[j];
        let beanName = db + '.' + ( config.bean ? config.bean : 'db' + i );
        if ( !config.bean ) {
          i++;
        }
        let daoIns = new dao(config);
        if ( typeof config.autoconnect === 'undefined' || config.autoconnect) {
          await daoIns.connect();
        }
        Dao.addBean(beanName, daoIns);
      }
    }
  }

  public static addBean(name: string, target: any): void {
    if ( Dao.container.get(name) ) {
      return;
    }
    Dao.container.set(name, target);
  }

  public static getBean(name) {
    return Dao.container.get(name);
  }

  public static async destroy (): Promise<void> {
    let daoIns = Array.from(Dao.container.values());
    for(let i=0; i < daoIns.length; i++) {
      let ins = daoIns[i];
      await ins.disconnect();
    }
  }

  public static remove (name): void {
  }
}
