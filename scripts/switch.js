const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '..')

module.exports = function switchVersion(version) {
  fs.writeFileSync(path.join(dir, 'lib', 'index.cjs.js'), `module.exports = require('./v${version}/index.cjs')\n`, 'utf-8')
  fs.writeFileSync(path.join(dir, 'lib', 'index.esm.js'), `export * from './v${version}/index.esm'\n`, 'utf-8')
  fs.writeFileSync(path.join(dir, 'lib', 'index.d.ts'), `export * from './v${version}/index'\n`, 'utf-8')
}
