const fs = require('fs')
const { join, resolve } = require('path')
const { execSync } = require('child_process')
const { version: packageVersion } = require('../package.json')

const ROOT = resolve(__dirname, '..')
const DIR = resolve(ROOT, '../vue-demi-test')

const [agent, version] = process.argv.slice(2)

const isVue2 = version === '2'

function pack() {
  execSync('npm pack', { cwd: ROOT, stdio: 'inherit' })
  return join(ROOT, `vue-demi-${packageVersion}.tgz`)
}

function installDeps() {
  const tarball = pack()

  let installCmd = agent === 'yarn' ? `${agent} add` : `${agent} i`

  execSync(`${installCmd} ${isVue2 ? 'vue@2 @vue/composition-api' : 'vue@3'}`, { cwd: DIR, stdio: 'inherit' })
  execSync(`${installCmd} ${agent === 'yarn' ? `file:${tarball}` : tarball} --force`, { cwd: DIR, stdio: 'inherit' })
}

function prepareTestPackage() {
  if (fs.existsSync(DIR)) 
    fs.rmSync(DIR, { recursive: true })

  fs.mkdirSync(DIR)
  fs.writeFileSync(join(DIR, 'package.json'), JSON.stringify({ name: 'vue-demi-test', version: packageVersion }), 'utf-8')

  installDeps()
}

prepareTestPackage()


const cjs = fs.readFileSync(resolve(DIR, 'node_modules/vue-demi/lib/index.cjs.js'), 'utf-8')

let failed = false

if (!cjs.includes(`exports.isVue2 = ${isVue2}`)) {
  console.log('CJS:', cjs)
  failed = true
}

// isVue2
const is2 = execSync(`node -e "console.log(require('vue-demi').isVue2)"`, { cwd: DIR }).toString().trim()

if (is2 !== `${isVue2}`) {
  console.log(`isVue2: ${is2} === ${isVue2}`)
  failed = true
}

const hasVue2 = execSync(`node -e "console.log(require('vue-demi').Vue2 !== undefined)"`, { cwd: DIR }).toString().trim()

if (hasVue2 !== `${isVue2}`) {
  console.log(`hasVue2: ${hasVue2} === ${isVue2}`)
  failed = true
}

if (failed) {
  setTimeout(() => {
    process.exit(1)
  }, 0)
}
