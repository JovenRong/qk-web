import * as FS from 'fs';
import * as Path from 'path';
import * as YAML from 'yaml';

import Application from '../application';
import { readDirSync } from '../utils';

export default function (application: Application, option?) {
  let configDir = option && option.config;
  configDir = application.root + Path.sep + (configDir || 'config');
  readDirSync(configDir, (fpath, isFile) => {
    if (fpath.endsWith('.yml') || fpath.endsWith('.json')) {
      let content = FS.readFileSync(fpath, 'utf8');
      if (!content) {
        return;
      }
      content = content.trim();
      if (fpath.endsWith('.yml')) {
        content = YAML.parse(content);
      } else {
        content = JSON.parse(content);
      }
      if (content) {
        application.addConfiguration(content);
      }
    }
  })
};
