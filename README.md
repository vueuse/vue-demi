<p align="center">
<br>
<img src="./assets/banner.png" width="500"/>
<br>
<br>
<a href='https://www.npmjs.com/package/vue-demi'><img src='https://img.shields.io/npm/v/vue-demi?color=42b883' alt='npm'></a>
</p>

<p align="center">
<b>Vue Demi</b> (<i>half</i> in French) is a developing utility<br> allows you to write <b>Universal Vue Libraries</b> for Vue 2 & 3<br>
<i>See more details in <a href='https://antfu.me/posts/make-libraries-working-with-vue-2-and-3'>this blog post</a></i>
</p>

<br>

<br>

## Usage

Install this as your plugin's dependency:

```bash
npm i vue-demi
# or
yarn add vue-demi
```

Add `vue` and `@vue/composition-api` to your plugin's peer dependencies to specify what versions you support.

```json
{
  "dependencies": {
    "vue-demi": "latest"
  },
  "peerDependencies": {
    "@vue/composition-api": "^1.0.0-beta.1",
    "vue": "^2.0.0 || >=3.0.0-rc.0"
  }
}
```

Import everything related to Vue from it, it will redirect to `vue@2` + `@vue/composition-api` or `vue@3` based on users' environments.

```ts
import { ref, reactive, defineComponent } from 'vue-demi'
```

Publish your plugin and all is done!

### Extra APIs

`Vue Demi` provides extra APIs `isVue2` and `isVue3` to help distinguishing users' environments and to do some version specific logics.

```ts
import { isVue2 } from 'vue-demi'

if (isVue2) {
  // Vue 2 only
} else {
  // Vue 3 only
}
```

## Examples

See [examples](./examples).

## Who are using this?

- [VueUse](https://github.com/antfu/vueuse) - Collection of Composition API utils
- [@vue/apollo-composable](https://github.com/vuejs/vue-apollo/tree/v4/packages/vue-apollo-composable) - Apollo GraphQL functions for Vue Composition API
- [vuelidate](https://github.com/vuelidate/vuelidate) - Simple, lightweight model-based validation
- [vue-composition-test-utils](https://github.com/ariesjia/vue-composition-test-utils) - Simple vue composition api unit test utilities

> open a PR to add your library ;)

## Underhood

See [the blog post](https://antfu.me/posts/make-libraries-working-with-vue-2-and-3/#-introducing-vue-demi).

<details>
<summary>Redirecting Reslove</summary>
<br>
If the script doesn't get triggered or you have updated the Vue version, try to run the following command to resolve the redirecting.

```bash
npx vue-demi-fix
```

</details>

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
