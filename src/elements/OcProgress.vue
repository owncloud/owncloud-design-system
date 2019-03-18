<template>
  <progress class="uk-progress" :value="value" :max="max"></progress>
</template>
<script>
/**
 * Show progress to the users.
 */
export default {
  name: "oc-progress",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The current progress.
     */
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * The maximum value. This represents 100% completion.
     */
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
