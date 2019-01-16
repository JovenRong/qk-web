import * as fs from 'fs'
import * as Path from 'path'
import * as Hapi from "hapi"

import { readDirSync } from './utils'
import QKApplication from './application'

const URL_PATH_TRIM = /^\/*|\/*$/g

enum MetaType {
  Controller = 1,
  Service,
  Component,
  Repository
}

export default class ComponentManager {
  private static controllers = {}
  private static services = {}
  private static components = {}
  private static repositories = {}

  private static targetPropertyMetas = []
  private static targetMetaType: MetaType
  private static targetMeta

  private qkApplication: QKApplication

  constructor (qkApplication: QKApplication) {
    this.qkApplication = qkApplication
  }

  public scan (dirs: String[]): void {
    dirs.forEach( dir => {
      readDirSync(dir, (fpath, isFile) => {
        if (fpath.endsWith('.js')) {
          ComponentManager.targetPropertyMetas = []
          ComponentManager.targetMeta = null
          require(fpath)
          this.processTargetMeta(fpath)
        }
      })
    })
  }

  public static addMeta (meta): void {
    ComponentManager.targetPropertyMetas.push(meta)
  }

  public static addControllerMeta (meta): void {
    ComponentManager.targetMetaType = MetaType.Controller
    ComponentManager.targetMeta = meta
  }

  private processTargetMeta (fpath): void {
    if (ComponentManager.targetPropertyMetas.length < 1 || !ComponentManager.targetMeta) {
      return
    }
    switch (ComponentManager.targetMetaType) {
      case MetaType.Controller:
        this.processControllerMetas()
        break
    }
    
  }

  private processControllerMetas() {
    let targetPath = ComponentManager.targetMeta.path || ''
    targetPath = targetPath.replace(URL_PATH_TRIM, '')
    if (targetPath) {
      targetPath = '/' + targetPath + '/'
    }
    ComponentManager.targetPropertyMetas.forEach ( meta => {
      let path = meta.path || null
      if (!path) {
        return
      }
      path = targetPath + path.replace(URL_PATH_TRIM, '')
      console.log(meta)
      let key = path + "\0" + meta.method
      ComponentManager.controllers[key] = {
        path: path,
        method: meta.method,
        target: ComponentManager.targetMeta.target,
        handler: meta.handler,
        ins: null
      }
      this.addRouter(key)
    })
  }

  private addRouter (key) {
    let meta = ComponentManager.controllers[key]
    this.qkApplication.server.route({
      method: meta.method,
      path: meta.path,
      handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        if (!meta.ins) {
          meta.ins = new meta.target()
        }
        if (request.method === 'options') {
          return ''
        } 
        let ret = meta.ins[meta.handler](request.params)
        if (!ret) {
          return ''
        } else {
          return ret
        }
      }
    })

  }

} 
