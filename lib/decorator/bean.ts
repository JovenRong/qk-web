import Bean from '../bean/bean';

export default function (name: any) {
  if (typeof name === 'string') {
    return (target): void => {
      Bean.addBean(name || target, target);
    };
  } else {
    Bean.addBean(name, name);
    return name;
  }
};
