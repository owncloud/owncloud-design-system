<template>
  <span
    class="oc-avatar-count"
    :style="{ width: size + 'px', height: size + 'px', fontSize: fontSize }"
    v-text="`+${count}`"
  />
</template>

<script>
/**
 * Count of avatars which weren't displayed.
 */
export default {
  name: "OcAvatarCount",
  status: "ready",
  release: "2.1.0",
  props: {
    /**
     * Count of avatars
     */
    count: {
      type: Number,
      required: true,
    },
    /**
     * Width and height of the element in pixels
     */
    size: {
      type: Number,
      required: false,
      default: 30,
    },
  },

  computed: {
    fontSize() {
      return Math.floor(this.size / 2.5) + "px"
    },
  },
}
</script>

<style lang="scss">
.oc-avatar-count {
  align-items: center;
  background-color: var(--oc-color-swatch-passive-default);
  border-radius: 50%;
  color: var(--oc-color-text-inverse);
  display: flex;
  justify-content: center;
}
</style>

<docs>
```js
<oc-avatar-count :count="21" />
```
</docs>
