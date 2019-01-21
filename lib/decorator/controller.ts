import ComponentManager from '../componentManager';

export default function (path?: string, middleware?: any) {
  return (target): void => {
    ComponentManager.addControllerMeta({
      target,
      path,
      middleware
    })
  };
};
