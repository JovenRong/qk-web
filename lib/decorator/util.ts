import * as Hoek from "hoek";

export function redefineProperty (target, key, config) {
  if (!config) {
    return;
  }
  let config0 = {
    enumerable: true,
    configurable: true
  }
  Hoek.merge(config0, config);

  if (delete target[key]) {
    Object.defineProperty(target, key, config0);
  }
}
