import Controller from '../bean/controller';

export default function (path?: string, middlewares?: any) {
  return (target): void => {
    Controller.addBean(target, {
      path: path,
      middlewares: middlewares
    });
  };
};
