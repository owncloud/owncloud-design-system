<template>
  <div class="oc-loader" :aria-label="ariaLabel"></div>
</template>
<script>
/**
 * Remote actions can take an undefined portion of time. The spinner gives feedback to the users about an actions being processed.
 */
export default {
  name: "oc-loader",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Descriptive text to be read to screen-readers.
     */
    ariaLabel: {
      type: String,
      default: "Loading",
    },
  },
}
</script>
<docs>
```jsx
<div>
  <oc-loader />
</div>
```
</docs>
