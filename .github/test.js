const fs = require('fs')
const { join } = require('path')
const { execSync } = require('child_process')

const root = '../vue-demi-test'
const [agent, version, type] = process.argv.slice(2)

isVue2 = version === '2'

function clean() {
  if (fs.existsSync(root)) 
    fs.rmSync(root, { recursive: true })
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

  install(dir)

  return dir
}

function install(dir) {
  const command = {
    yarn: 'yarn add',
    npm: 'npm i',
    pnpm: 'pnpm i',
  }[agent]
  
  execSync(`${command} ${isVue2 ? 'vue@2 @vue/composition-api' : 'vue@3'}`, { cwd: dir, stdio: 'inherit' })

  execSync({
    yarn: 'yarn link vue-demi',
    npm: 'npm link vue-demi',
    pnpm: 'pnpm link vue-demi',
  }[agent], { cwd: dir, stdio: 'inherit' })

  execSync(`${command} vue-demi`, { cwd: dir, stdio: 'inherit' })
}

function check(dir) {
  const value = execSync('node -e "console.log(require(\'vue-demi\').isVue2)"', { cwd: dir }).toString().trim()

  if (value !== `${isVue2}`) {
    console.log('eval', value)
    process.exit(1)
  }
}

function link(){
  execSync({
    yarn: 'yarn link',
    npm: 'npm link',
    pnpm: 'pnpm link',
  }[agent], { stdio: 'inherit' })
}

clean()
link()
let dir = type === 'workspace'
  ? prepareWorkspace()
  : prepareSimple()
check(dir)
