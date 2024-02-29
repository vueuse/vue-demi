import { defineConfig, type Options } from 'tsup'
import { resolveModuleExportNames } from "mlly"
import { defu } from 'defu'
import replace from 'unplugin-replace'

const defaults = {
  entry: ['src/index.ts', 'src/v2/index.ts', 'src/v2.7/index.ts', 'src/v3/index.ts'],
  dts: true,
  splitting: false,
  minify: false
}

const resolveVueAlias = [
  {
    from: /vue-v3/g,
    to: 'vue'
  },
  {
    from: /vue-v2.7/g,
    to: 'vue'
  },
  {
    from: /vue-v2.0/g,
    to: 'vue'
  }
]

const resolveVCAExports = async () => {
  const modules = await resolveModuleExportNames('@vue/composition-api')
  const excludes = ['version', 'warn']
  const exports = modules.filter((item) => !excludes.includes(item))
  return `/**VCA-EXPORTS**/
export { ${exports.join(', ')} } from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/`
}

const CJS_IIFE = (): Options => defu({
  format: ['cjs', 'iife'],
  esbuildPlugins: [replace.esbuild(resolveVueAlias)]
}, defaults)

const ESM = (VCA_EXPORTS: string): Options => defu({
  format: ['esm'],
  dts: true,
  splitting: false,
  esbuildPlugins: [
    replace.esbuild([
      {
        from: /@vue\/composition-api/g,
        to: '@vue/composition-api/dist/vue-composition-api.mjs'
      },
      {
        from: /\/\*\*VCA-EXPORTS\*\*\/[\s\S]+\/\*\*VCA-EXPORTS\*\*\//m,
        to: VCA_EXPORTS
      },
      ...resolveVueAlias
    ])
  ]
}, defaults )

export default defineConfig(async () => {
  const VCA_EXPORTS = await resolveVCAExports()

  return [
    CJS_IIFE(),
    ESM(VCA_EXPORTS)
  ]
})