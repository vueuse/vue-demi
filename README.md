# vue-demi

> WIP

`Vue Demi` (french "half") is a plugin dev utility that allows you to write Vue plugins for Vue 2 and 3 without worry about users' installed version. See more details in [this blog](https://antfu.me/posts/making-plugins-work-for-vue-2-and-3/).

## Usage

Install this as your plugin's dependency:

```json
{
  "dependencies": {
    "vue-demi": "*"
  }
}
```

import every thing from it, it will redirect to `vue@2` `@vue/composition-api` or `vue@next` based on users' environments.

```ts
import { ref, reactive, defineComponent } from 'vue-demi'
```

Publish your plugin and all is done!