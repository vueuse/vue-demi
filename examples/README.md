# Examples of Vue Demi

A demo Vue library is published as [`@vue-demi/use-mouse`](https://github.com/antfu/vue-demi/blob/master/examples/%40vue-demi/use-mouse/src/index.ts) [![npm](https://img.shields.io/npm/v/@vue-demi/use-mouse)](https://www.npmjs.com/package/@vue-demi/use-mouse)

You can see it being imported by 

- Vue 2 ([Vue CLI Project](./demo-vue-2-cli))
- Vue 3 ([Vite Project](./demo-vue-3-vite))

And things just work!

**Node 17.x Note:**

For Node 17.x Edit the starting scripts to allow them to work: [(Reference)](https://stackoverflow.com/questions/69665222/node-17-0-1-gatsby-error-digital-envelope-routinesunsupported-err-ossl-evp)

```
  "scripts": {
    "serve": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve --open",
    "build": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build"
  },
  ```
