const fs = require('fs')
const { join, resolve } = require('path')
const { execSync } = require('child_process')
const { version: packageVersion } = require('../package.json')

const [agent, version, type = 'commonjs'] = process.argv.slice(2)

const ROOT = resolve(__dirname, '..')
const DIR = resolve(ROOT, `../vue-demi-test-${type}`)

const isVue2 = version.startsWith('2')
const isVue27 = version.startsWith('2.7')
const isCjs = type === 'commonjs'

function pack() {
  execSync('npm pack', { cwd: ROOT, stdio: 'inherit' })
  return join(ROOT, `vue-demi-${packageVersion}.tgz`)
}

function installDeps() {
  const tarball = pack()

  let installCmd = agent === 'yarn' ? `${agent} add` : `${agent} i`

  const packages = isVue27 ? 'vue@v2-alpha' : isVue2 ? `vue@2.6 @vue/composition-api` : 'vue@3'
  execSync(`${installCmd} ${packages}`, { cwd: DIR, stdio: 'inherit' })
  execSync(`${installCmd} ${agent === 'yarn' ? `file:${tarball}` : tarball} --force`, { cwd: DIR, stdio: 'inherit' })
}

function prepareTestPackage(type = 'commonjs') {
  if (fs.existsSync(DIR)) fs.rmSync(DIR, { recursive: true })

  fs.mkdirSync(DIR)
  fs.writeFileSync(
    join(DIR, 'package.json'),
    JSON.stringify({
      name: `vue-demi-test-${type}`,
      version: packageVersion,
      type,
    }),
    'utf-8'
  )

  installDeps()
}

prepareTestPackage(type)

const indexFile = isCjs ? 'index.cjs' : 'index.mjs'
const mod = fs.readFileSync(resolve(DIR, `node_modules/vue-demi/lib/${indexFile}`), 'utf-8')

let failed = false

if (isCjs && !mod.includes(`exports.isVue2 = ${isVue2}`)) {
  console.log('CJS:', mod)
  failed = true
}

if (!isCjs && !/export\s\{\n\s\sVue,\n\s\sVue2,\n\s\sisVue2/gm.test(mod)) {
  console.log('ESM:', mod)
  failed = true
}

const outputVersion = execSync(`node -e "console.log(require('vue-demi').version)"`, { cwd: DIR }).toString().trim()
console.log('version: ' + outputVersion)

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

// ref
const refWorks = execSync(`node -e "let a = require('vue-demi').ref(12);let b = require('vue-demi').computed(()=>a.value*2);console.log(b.value)"`, { cwd: DIR }).toString().trim()
if (refWorks !== `24`) {
  console.log(`refWorks: ${refWorks} === 24`)
  failed = true
}

if (failed) {
  setTimeout(() => {
    process.exit(1)
  }, 0)
}
