<template>
  <component :uk-spinner="'ratio:' + ratio" :is="'div'" :aria-label="ariaLabel" />
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. They can act as wayfinding tools to help users more
 * easily understand where they are in the product.
 */
export default {
  name: "oc-spinner",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Descriptive text to be read to screenreaders.
     */
    ariaLabel: {
      type: String,
      default: "Loading",
    },
    /**
     * The html element name used for the icon.
     */
    type: {
      type: String,
      default: "span",
    },
    /**
     * The size of the icon. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: null,
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
