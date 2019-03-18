<template>
  <div :uk-spinner="'ratio:' + ratio" :aria-label="ariaLabel"></div>
</template>

<script>
/**
 * Remote actions can take an undefined portion of time. The spinner gives feedback to the users about an actions being processed.
 */
export default {
  name: "oc-spinner",
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
    /**
     * The size of the spinner. Defaults to medium.
     * `small, medium, large, xlarge`
     */
    size: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(small|medium|large|xlarge)/)
      },
    },
  },
  computed: {
    ratio() {
      let sizes = {
        small: 0.5,
        medium: 2,
        large: 3,
        xlarge: 4,
      }
      return sizes[this.size]
    },
  },
}
</script>
<style lang="scss"></style>
<docs>
```jsx
<div>
  <oc-spinner size="small" />
  <oc-spinner aria-label="Date is loading" /> <!-- Default with label -->
  <oc-spinner size="medium" />
  <oc-spinner size="large" />
  <oc-spinner size="xlarge" />
</div>
```
</docs>
