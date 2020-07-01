<h1 align="center">Vue Demi</h1>

<h4 align="center">

[![npm](https://img.shields.io/npm/v/vue-demi)](https://www.npmjs.com/package/vue-demi)

</h4>

`Vue Demi` ("half" in French) is a plugin development utility that allows you to write Vue plugins for Vue 2 and 3 without worry about users' installed version. See more details in [this blog](https://antfu.me/posts/make-libraries-working-with-vue-2-and-3).

> 🚧 Expiremental

## Usage

Install this as your plugin's dependency:

```json
{
  "dependencies": {
    "vue-demi": "latest"
  }
}
```

Import everything related to Vue from it, it will redirect to `vue@2` `@vue/composition-api` or `vue@next` based on users' environments.

```ts
import { ref, reactive, defineComponent } from 'vue-demi'
```

Then publish your plugin and all is done!

## Examples

See [examples](./examples)

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)