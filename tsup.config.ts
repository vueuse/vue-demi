import { defineConfig, type Options } from 'tsup'
import { resolveModuleExportNames } from "mlly"
import { defu } from 'defu'
import replace from 'unplugin-replace'

const defaults = {
  entry: ['src/index.ts', 'src/v2/index.ts', 'src/v2.7/index.ts', 'src/v3/index.ts'],
  dts: true,
  splitting: false
}

const resolveVCAExports = async () => {
  const modules = await resolveModuleExportNames('@vue/composition-api')
  const excludes = ['version', 'warn']
  const exports = modules.filter((item) => !excludes.includes(item))
  return `/**VCA-EXPORTS**/
export { ${exports.join(', ')} } from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/`
}

const CJS_IIFE = (options: Options): Options => defu({
  format: ['cjs', 'iife'],
  minify: !options.watch,
  esbuildPlugins: [
    replace.esbuild([
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
}, defaults)

const ESM = (options: Options, VCA_EXPORTS: string): Options => defu({
  entry: ['src/index.ts', 'src/v2/index.ts', 'src/v2.7/index.ts', 'src/v3/index.ts'],
  format: ['esm'],
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
}, defaults )

export default defineConfig(async (options) => {
  const VCA_EXPORTS = await resolveVCAExports()

  return [
    CJS_IIFE(options),
    ESM(options, VCA_EXPORTS)
  ]
})