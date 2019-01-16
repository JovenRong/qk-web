import QKComponentManager from '../componentManager'

export default function (path?: string, middleware?: any) {
  return (target): void => {
    QKComponentManager.addControllerMeta({
      target,
      path,
      middleware
    })
  
  }
}
