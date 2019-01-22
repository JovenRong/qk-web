import { redefineProperty } from './util'

import Service from '../bean/service';
import Bean from '../bean/bean';

let compileTrick: any;

let getBean = function (key) {
  let ins = Service.getBean(key);
  if ( !ins ) {
    ins = Bean.getBean(key);
  }
  return ins;
}

export default function (component: any, propertyName?: string) {
  if (typeof component === 'string') {
    return (target: any, key: string) => {
      redefineProperty(target, key, {
        get: function () {
          return getBean(component || key);
        }
      })
    };
  } else {
    redefineProperty(component, propertyName, {
      get: function () {
        return getBean(propertyName);
      }
    });
    return compileTrick;
  }
};
