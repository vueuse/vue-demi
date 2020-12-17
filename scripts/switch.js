const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '..', 'lib')

function copy(name, version, vue) {
  vue = vue || 'vue'
  const src = path.join(dir, `v${version}`, name)
  const dest = path.join(dir, name)
  let content = fs.readFileSync(src, 'utf-8')
  content = content.replace(/'vue'/g, `'${vue}'`)
  fs.writeFileSync(dest, content, 'utf-8')
}

module.exports = function switchVersion(version, vue) {
  copy('index.cjs.js', version, vue)
  copy('index.esm.js', version, vue)
  copy('index.d.ts', version, vue)
}
