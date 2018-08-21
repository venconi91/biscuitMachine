const path = require('path');

const appRootDirectory = process.cwd();

const resolveDir = relativePath => path.resolve(appRootDirectory, relativePath);

module.exports = {
  rootPath: resolveDir(''),
  srcPath: resolveDir('src'),
  buildPath: resolveDir('build'),
  template: resolveDir('src/template.html'),
  entryPoint: resolveDir('src/ui/index.js'),
  devEnvFile: resolveDir('config/.devEnv'),
  prodEnvFile: resolveDir('config/.prodEnv')
};
