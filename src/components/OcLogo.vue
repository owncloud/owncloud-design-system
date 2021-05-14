<template functional>
  <span :ref="data.ref" class="oc-logo" :class="data.class || ''">
    <oc-img :src="props.src" :alt="props.alt" class="oc-logo-img" />
  </span>
</template>

<script>
import OcImg from "./OcImage"

export default {
  name: "OcLogo",
  status: "review",
  release: "unreleased",
  components: { OcImg },

  props: {
    /**
     * Location of the logo image
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * Alternative text of the logo image
     */
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.oc-logo {
  padding: var(--oc-space-small);

  &-img {
    height: var(--oc-size-height-small);
  }
}
</style>

<docs>
```vue
<oc-logo src="examples/placeholder_brand_logo.svg" alt="ownCloud" />
```
</docs>
