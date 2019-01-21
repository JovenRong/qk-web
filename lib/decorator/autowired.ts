import ComponentManager from '../componentManager';

export default function (component: any) {
  return (target: any, key: string) => {
    Object.defineProperty(target, key, {
      get: function () {
        let ins = ComponentManager.getService(component)
        return ins;
      },
      enumerable: true,
      configurable: true
    })
  };
};
