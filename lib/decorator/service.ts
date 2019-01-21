import ComponentManager from '../componentManager';

export default function (name?: string) {
  return (target): void => {
    ComponentManager.addService(target, target);
    if (name) {
      ComponentManager.addService(name, target);
    }
  };
};
