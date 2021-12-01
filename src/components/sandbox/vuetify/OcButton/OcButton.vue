<template>
  <v-btn>{{ VAL }}</v-btn>
</template>

<script>
import VBtn from 'vuetify/lib/components/VBtn'

export default {
  name: "SbVOcButton",
  status: "ready",
  release: "1.0.0",
  components: {
    VBtn
  },
  data(){
    return {
      VAL: 'AVAL'
    }
  }
}
</script>


<docs>
```js
<template>
<div>
  <sb-v-oc-button size="large" class="oc-mr-s">Large</sb-v-oc-button>
</div>
</template>
<script>
export default {}
</script>
```
</docs>
