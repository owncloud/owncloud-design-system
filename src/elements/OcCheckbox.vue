<template>
  <input class="uk-checkbox ff" type="checkbox" :checked="checked" v-model="model" />
</template>
<script>
/**
 * A checkbox input element. The checkbox is either checked or unchecked.
 */
export default {
  name: "oc-checkbox",
  status: "review",
  release: "1.0.0",
  props: ["model", "checked"],
}
</script>
<docs>
```jsx
<div>
  <oc-checkbox />
</div>
```
</docs>
