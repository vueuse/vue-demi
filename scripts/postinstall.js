const { switchVersion, loadModule } = require('./utils')
const { resolve } = require('path')
const mainPath = resolve(process.cwd(), '../')

let resourseArr = [];
mainPath.replace(/(.*?node_modules)/g, (match, p1, offset,) => {
  resourseArr.push(`${mainPath.substring(0, offset)}${p1}`)
});

let resourseArrLen = 0;

for (let item of resourseArr) {
  const Vue = loadModule(`${item}\\vue`)
  if (Vue && typeof Vue.version === 'string') {
    if (Vue.version.startsWith('2.')) {
      switchVersion(2)
    }
    else if (Vue.version.startsWith('3.')) {
      switchVersion(3)
    }
    else {
      console.warn(`[vue-demi] Vue version v${Vue.version} is not suppported.`)
    }
    resourseArrLen++
    break;
  }
}

if (resourseArrLen === resourseArr.length) {
  console.warn('[vue-demi] Vue is not found. Please run "npm install vue" to install.')
}
