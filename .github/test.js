const fs = require('fs')
const { join, resolve } = require('path')
const { execSync } = require('child_process')

const DIR = resolve(__dirname, '../vue-demi-test')

const [install, version, source='file:..'] = process.argv.slice(2)

isVue2 = version === '2'

if (fs.existsSync(DIR))
  fs.rmSync(DIR, {recursive: true})

fs.mkdirSync(DIR)
fs.writeFileSync(join(DIR, 'package.json'), '{}', 'utf-8')

execSync(`${install} ${isVue2 ? 'vue@2 @vue/composition-api' : 'vue@3' }`, { cwd: DIR, stdio: 'inherit' })
execSync(`${install} vue-demi@${source}`, { cwd: DIR, stdio: 'inherit' })

const cjs = fs.readFileSync(resolve(DIR, '../lib/index.cjs.js'), 'utf-8')

let failed = false

if (!cjs.includes(`exports.isVue2 = ${isVue2}`)) {
  console.log('CJS:', cjs)
  failed = true
} 

const is2 = execSync('node -e "console.log(require(\'vue-demi\').isVue2)"', { cwd: DIR }).toString().trim()

if (is2 !== `${isVue2}`) {
  console.log('isVue2', is2)
  failed = true
}

const has2 = execSync('node -e "console.log(require(\'vue-demi\').Vue2 !== undefined)"', { cwd: DIR }).toString().trim()

if (has2 !== `${isVue2}`) {
  console.log('has2', has2)
  console.log('is2', is2)
  console.log('cjs', cjs)
  failed = true
}

if (failed) {
  setTimeout(()=>{
    process.exit(1)
  }, 0)
}
