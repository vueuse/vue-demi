const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '..')
const agent = (process.env.npm_config_user_agent || 'npm').split('/')[0]
const userRoot = path.resolve(dir, '../..')

const AgentCommands = {
  npm: 'npm i',
  yarn: 'yarn add',
  pnpm: 'pnpm add',
  cnpm: 'cnpm i',
}

function loadModule (name) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}

function installModules (names) {
  const command = AgentCommands[agent] || AgentCommands.npm
  names = Array.isArray(names) ? names : [names]
  execSync(`${command} ${names.join(' ')}`, { stdio: 'inherit', cwd: userRoot })
}

function switchVersion(version) {
  fs.writeFileSync(path.join(dir,'lib', 'index.cjs.js'), `module.exports = require('./v${version}/index.cjs')\n`, 'utf-8')
  fs.writeFileSync(path.join(dir,'lib', 'index.esm.js'), `export * from './v${version}/index.esm'\n`, 'utf-8')
  fs.writeFileSync(path.join(dir,'lib', 'index.d.ts'), `export * from './v${version}/index'\n`, 'utf-8')
}

const Vue = loadModule('vue')

if (!Vue || typeof Vue.version !== 'string') {
  console.warn('[vue-demi] Vue is not detected in the dependencies. Please install Vue first.')
}
else if (Vue.version.startsWith('2.')) {
  const VCA = loadModule('@vue/composition-api')
  if (!VCA) {
    installModules(['@vue/composition-api'])
  }
  switchVersion(2)
}
else if (Vue.version.startsWith('3.')) {
  switchVersion(3)
}
else {
  console.warn(`[vue-demi] Vue version v${Vue.version} is not suppported.`)
}