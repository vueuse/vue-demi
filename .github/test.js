const fs = require('fs')
const { join, resolve } = require('path')
const { execSync } = require('child_process')
const { version } = require('../package.json')

const root = '../vue-demi-test'
const [agent, vue, type] = process.argv.slice(2)

isVue2 = vue === '2'

function clean() {
  if (fs.existsSync(root)) {
    fs.rmSync(root, { recursive: true })
  }
}

function prepareSimple() {
  fs.mkdirSync(root)
  fs.writeFileSync(join(root, 'package.json'), '{}', 'utf-8')

  install(root)

  return root
}

function prepareWorkspace() {
  fs.mkdirSync(root)

  if (agent === 'yarn') {
    fs.writeFileSync(
      join(root, 'package.json'),
      JSON.stringify({
        private: true,
        workspaces: {
          packages: ['packages/**'],
        },
      }),
      'utf-8'
    )
  } else {
    fs.writeFileSync(join(root, 'package.json'), '{}', 'utf-8')
    fs.writeFileSync(join(root, 'pnpm-workspace.yaml'), `packages:\n  - 'packages/**'`, 'utf-8')
  }

  const appDir = join(root, 'packages/app')
  fs.mkdirSync(join(root, 'packages'))
  fs.mkdirSync(appDir)
  fs.writeFileSync(join(appDir, 'package.json'), '{}', 'utf-8')

  install(appDir)

  return appDir
}

function install(dir) {
  const command = {
    yarn: 'yarn add',
    npm: 'npm i',
    pnpm: 'pnpm i',
  }[agent]

  execSync(`${command} ${isVue2 ? 'vue@2 @vue/composition-api' : 'vue@3'}`, { cwd: dir, stdio: 'inherit' })

  execSync(`${command} ${resolve(__dirname, '../vue-demi.tgz')}`, { cwd: dir, stdio: 'inherit' })
}

function check(dir) {
  const value = execSync('node -e "console.log(require(\'vue-demi\').isVue2)"', { cwd: dir }).toString().trim()

  if (value !== `${isVue2}`) {
    console.log('eval', value)
    process.exit(1)
  }
}

function pack() {
  execSync('npm pack', { stdio: 'inherit' })
  fs.renameSync(`vue-demi-${version}.tgz`, 'vue-demi.tgz')
}

clean()
pack()
let dir = type === 'workspace' ? prepareWorkspace() : prepareSimple()
check(dir)
