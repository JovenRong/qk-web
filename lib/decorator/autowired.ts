import { redefineProperty } from './util'

import Service from '../bean/service';
import Bean from '../bean/bean';
import Dao from '../bean/dao';

let compileTrick: any;

let getBean = function (key) {
  let ins = null;
  let target = [];
  if ( key.indexOf('ervice') >= 0 ) {
    target.push(Service);
    target.push(Dao);
  } else {
    target.push(Dao);
    target.push(Service);
  }
  target.push(Bean);
  for ( let i=0; i < target.length; i++) {
    ins = target[i].getBean(key);
    if (ins) {
      return ins;
    }
  }
  return null;
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
