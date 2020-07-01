<template>
  <p>Mouse: {{x}}x{{y}}</p>
</template>

<script>
import { useMouse } from '@vue-demi/use-mouse'

export default {
  name: 'App',
  setup() {
    return useMouse()
  }
}
</script>
