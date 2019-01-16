import QKComponentManager from '../componentManager'

export default function (name?: string) {
  return (target): void => {
    QKComponentManager.addService(target, target)
    if (name) {
      QKComponentManager.addService(name, target)
    }
  }
}
