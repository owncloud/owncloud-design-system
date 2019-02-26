<template>
  <component :is="type" :aria-label="ariaLabel" :class="['oc-loader-spinner', size]" />
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
      default: "spinner",
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
      default: "medium",
      validator: value => {
        return value.match(/(small|medium|large|x-large|xx-large)/)
      },
    },
  },
}
</script>

<style lang="scss">
// This is here just to provide defaults if the original tokens are removed.
// Can be removed once you’re ready to start defining your own sizes.
@import "../../docs/docs.tokens.scss";

// We don’t want to use scoped since these styles need to cascade down to SVGs.
// We also want to be able to style .icon inside buttons etc.
.oc-loader-spinner {
  display: inline-flex;

  @include reset;
  &.xx-large {
    width: $space-xxl;
    height: $space-xxl;
  }
  &.x-large {
    width: $space-xl;
    height: $space-xl;
  }
  &.large {
    width: $space-l;
    height: $space-l;
  }
  &.medium {
    width: $space-m;
    height: $space-m;
  }
  &.small {
    width: $space-s;
    height: $space-s;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <oc-spinner size="small"/>
    <oc-spinner size="medium"/>
    <oc-spinner size="large"/>
    <oc-spinner size="x-large"/>
    <oc-spinner size="xx-large"/>
  </div>
  ```
</docs>
