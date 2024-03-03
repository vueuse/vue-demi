import { defineConfig, type Options } from 'tsup'
import { resolveModuleExportNames } from "mlly"
import { defu } from 'defu'
import modify from 'unplugin-modify'

const defaults = {
  entry: ['src/index.ts', 'src/v2/index.ts', 'src/v2.7/index.ts', 'src/v3/index.ts'],
  dts: true,
  splitting: false,
  minify: false
}

const resolveVueAlias = [
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
]

const resolveVCAExports = async () => {
  const modules = await resolveModuleExportNames('@vue/composition-api')
  const excludes = ['version', 'warn']
  const exports = modules.filter((item) => !excludes.includes(item))
  return `/**VCA-EXPORTS**/
export { ${exports.join(', ')} } from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/`
}

const CJS = (): Options => defu({
  format: ['cjs'],
  esbuildPlugins: [modify.esbuild(resolveVueAlias)]
}, defaults)

const ESM = (VCA_EXPORTS: string): Options => defu({
  format: ['esm'],
  dts: true,
  splitting: false,
  esbuildPlugins: [
    modify.esbuild([
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
}, defaults)

const IIFE = (): Options => ({
  entry: ['src/iife.ts'],
  format: ['iife'],
  dts: false,
  splitting: false,
  minify: false,
  clean: true,
  external: ['vue']
})

export default defineConfig(async () => {
  const VCA_EXPORTS = await resolveVCAExports()

  return [
    CJS(),
    ESM(VCA_EXPORTS),
    IIFE()
  ]
})