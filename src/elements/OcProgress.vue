<template>
  <progress class="uk-progress" :value="value" :max="max"></progress>
</template>
<script>
export default {
  name: "oc-progress",
  status: "review",
  release: "1.0.0",
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: true,
    },
  },
}
</script>
<docs>
```jsx
<oc-progress :value="4" :max="10" />
```
</docs>
