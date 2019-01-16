import QKComponentManager from '../componentManager'

function decoratorFactory(method: string, path: string, middleware?: any) {
  return (target: any, key: string, descriptor: any) => {
    QKComponentManager.addMeta({
      method,
      path,
      handler: key
    })
    return descriptor
  }
}

export function All(path: string, middleware?: any) {
  return decoratorFactory('*', path, middleware)
}

export function Get(path: string, middleware?: any) {
  decoratorFactory('OPTIONS', path, middleware)
  return decoratorFactory('GET', path, middleware)
}

export function Post(path: string, middleware?: any) {
  decoratorFactory('OPTIONS', path, middleware)
  return decoratorFactory('POST', path, middleware)
}

export function Put(path: string, middleware?: any) {
  return decoratorFactory('PUT', path, middleware)
}

export function Patch(path: string, middleware?: any) {
  return decoratorFactory('PATCH', path, middleware)
}

export function Options(path: string, middleware?: any) {
  return decoratorFactory('OPTIONS', path, middleware)
}

/*
 * TODO: HAPI not support HEAD
 * refer: https://hapijs.com/api#route.options.handler
export function Head(path: string, middleware?: any) {
  return decoratorFactory('HEAD', path, middleware)
}
*/
