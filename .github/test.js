const fs = require('fs')
const { join } = require('path')
const { execSync } = require('child_process')

const DIR = '../vue-demi-test'

const [install, version, source="file:../vue-demi"] = process.argv.slice(2)

isVue2 = version === '2'

if (fs.existsSync(DIR))
  fs.rmSync(DIR, {recursive: true})

fs.mkdirSync(DIR)
fs.writeFileSync(join(DIR, 'package.json'), '{}', 'utf-8')

execSync(`${install} ${isVue2 ? 'vue@2 @vue/composition-api' : 'vue@3' }`, { cwd: DIR, stdio: 'inherit' })
execSync(`${install} vue-demi@${source}`, { cwd: DIR, stdio: 'inherit' })

const cjs = fs.readFileSync(join(DIR, 'node_modules/vue-demi/lib/index.cjs.js'), 'utf-8')

if (!cjs.includes(`exports.isVue2 = ${isVue2}`)) {
  console.log(cjs)
  process.exit(1)
} 

const is2 = execSync('node -e "console.log(require(\'vue-demi\').isVue2)"', { cwd: DIR }).toString().trim()

if (is2 !== `${is2}`) {
  console.log("isVue2", is2)
  process.exit(1)
}

const has2 = execSync('node -e "console.log(require(\'vue-demi\').Vue2 !== undefined)"', { cwd: DIR }).toString().trim()

if (has2 !== `${isVue2}`) {
  console.log("has2", has2)
  process.exit(1)
}
