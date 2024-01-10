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

  const packages = isVue27 ? 'vue@2.7' : isVue2 ? `vue@2.6 @vue/composition-api` : 'vue@3'
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

;(function codeCheck() {
  if (isCjs && !mod.includes(`exports.isVue2 = ${isVue2}`)) {
    console.log('CJS:', mod)
    failed = true
  }

  if (!isCjs && !/export\s*\{\s*Vue,\s*Vue2,\s*isVue2/gm.test(mod)) {
    console.log('ESM:', mod)
    failed = true
  }
})()

;(function versionCheck() {
  const outputVersion = execSync(`node -e "console.log(require('vue-demi').version)"`, { cwd: DIR }).toString().trim()
  console.log('version: ' + outputVersion)

  // isVue2
  const is2 = execSync(`node -e "console.log(require('vue-demi').isVue2)"`, { cwd: DIR }).toString().trim()

  if (is2 !== `${isVue2}`) {
    console.log(`isVue2: ${is2} !== ${isVue2}`)
    failed = true
  }

  const hasVue2 = execSync(`node -e "console.log(require('vue-demi').Vue2 !== undefined)"`, { cwd: DIR }).toString().trim()

  if (hasVue2 !== `${isVue2}`) {
    console.log(`hasVue2: ${hasVue2} !== ${isVue2}`)
    failed = true
  }
})()

;(function reactivity() {
  const importCJS = `const { ref, computed } = require('vue-demi');`
  const importESM = `const { ref, computed } = await import('vue-demi');`

  const snippet = `
let a = ref(12)
let b = computed(() => a.value * 2)
console.log(b.value)
a.value += 1
console.log(b.value)
`
    .replace(/\n/g, ';')
    .trim()

  // ref
  const refCJS = execSync(`node -e "${importCJS}${snippet}"`, { cwd: DIR }).toString().trim()
  if (refCJS !== `24\n26`) {
    console.log(`ref(cjs): ${refCJS} !== 24\n26`)
    failed = true
  }

  // TODO: 2.7's ESM can't runs in Node currently
  if (!isVue27) {
    const refESM = execSync(`node -e "(async ()=>{${importESM}${snippet}})()"`, { cwd: DIR }).toString().trim()
    if (refESM !== `24\n26`) {
      console.log(`ref(esm): ${refESM} !== 24\n26`)
      failed = true
    }
  }
})()

;(function createApp() {
  const snippet = `
const { createApp, h } = require('vue-demi');
let app = createApp({
  component: {
    setup(props) {
      return () => h('div', props.msg);
    }
  }
}, {
  msg: 'Hello'
});

console.log(!!app)
`
    .replace(/\n/g, '')
    .trim()

  const result = execSync(`node -e "${snippet}"`, { cwd: DIR }).toString().trim()
  if (result !== `true`) {
    console.log(`createApp(cjs): ${result} !== true`)
    failed = true
  }
})()

if (failed) {
  setTimeout(() => {
    process.exit(1)
  }, 0)
}
