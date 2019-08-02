<template>
  <oc-img
    class="oc-avatar"
    width="50"
    :alt="accessibilityLabel"
    :aria-hidden="accessibilityLabel === ''"
  />
</template>
<script>
/**
 * Avatar is a thumbnail representing user or group
 */
export default {
  name: "oc-avatar",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Accessibility label used as alt. Use only in case the avatar is used alone.
     * In case the avatar is used next to username or display name leave empty.
     * If not specified, avatar will get `aria-hidden="true"`.
     **/
    accessibilityLabel: {
      type: String,
      required: false,
      default: "",
    },
  },
}
</script>
<docs>
```
  <oc-avatar src="https://picsum.photos/50/50?image=1074" accessibilityLabel="Lion" />
```
</docs>
