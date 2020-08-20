const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '..')

function loadModule(name) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}

function switchVersion(version) {
  fs.writeFileSync(path.join(dir, 'lib', 'index.cjs.js'), `module.exports = require('./v${version}/index.cjs')\n`, 'utf-8')
  fs.writeFileSync(path.join(dir, 'lib', 'index.esm.js'), `export * from './v${version}/index.esm'\n`, 'utf-8')
  fs.writeFileSync(path.join(dir, 'lib', 'index.d.ts'), `export * from './v${version}/index'\n`, 'utf-8')
}

const Vue = loadModule('vue')

if (!Vue || typeof Vue.version !== 'string') {
  console.warn('[vue-demi] Vue is not detected in the dependencies. Please install Vue first.')
}
else if (Vue.version.startsWith('2.')) {
  switchVersion(2)
}
else if (Vue.version.startsWith('3.')) {
  switchVersion(3)
}
else {
  console.warn(`[vue-demi] Vue version v${Vue.version} is not suppported.`)
}
