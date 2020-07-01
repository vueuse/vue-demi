<p align="center">
<br>
<img src="./assets/banner.png" width="500"/>
<br>
<br>
<a href='https://www.npmjs.com/package/vue-demi'><img src='https://img.shields.io/npm/v/vue-demi?color=42b883' alt='npm'></a>
</p>

<p align="center">
<b>Vue Demi</b> (<i>half</i> in French) is a developing utility<br> allows you to write <b>Universal Vue Plugins</b> for Vue 2 and 3<br>
<i>See more details in <a href='https://antfu.me/posts/make-libraries-working-with-vue-2-and-3'>this blog post</a></i>
</p>

<br>

<pre align="center">
🚧 It's experimental, yet.
</pre>

## Usage

Install this as your plugin's dependency:

```bash
npm i vue-demi
# or
yarn add vue-demi
```

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

See [examples](./examples).

## Underhood

See [the blog post](https://antfu.me/posts/make-libraries-working-with-vue-2-and-3/#-introducing-vue-demi).

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
