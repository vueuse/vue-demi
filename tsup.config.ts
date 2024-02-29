import { defineConfig } from 'tsup'
import { resolveModuleExportNames } from "mlly"
import replace from 'unplugin-replace'

const resolveVCAExports = async () => {
  const modules = await resolveModuleExportNames('@vue/composition-api')
  const excludes = ['version', 'warn']
  const exports = modules.filter((item) => !excludes.includes(item))
  return `/**VCA-EXPORTS**/
export { ${exports.join(', ')} } from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/`
}

export default defineConfig(async (options) => {
  const VCA_EXPORTS = await resolveVCAExports()

  return {
    entry: ['src/index.ts', 'src/v2/index.ts', 'src/v2.7/index.ts', 'src/v3/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    dts: true,
    splitting: false,
    minify: !options.watch,
    esbuildPlugins: [
      replace.esbuild([
        {
          from: '@vue/composition-api',
          to: '@vue/composition-api/dist/vue-composition-api.mjs'
        },
        {
          from: /\/\*\*VCA-EXPORTS\*\*\/[\s\S]+\/\*\*VCA-EXPORTS\*\*\//m,
          to: VCA_EXPORTS
        },
        {
          from: 'vue-v3',
          to: 'vue'
        },
        {
          from: 'vue-v2.7',
          to: 'vue'
        },
        {
          from: 'vue-v2.0',
          to: 'vue'
        }
      ])
    ]
  }
})