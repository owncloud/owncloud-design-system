<template>
  <avatar
    class="oc-avatar"
    :username="userName"
    :size="width"
    :src="src"
    :alt="accessibilityLabel"
    :aria-hidden="accessibilityLabel === ''"
  />
</template>
<script>
import Avatar from "vue-avatar"

/**
 * Avatar is a thumbnail representing user or group
 */
export default {
  name: "oc-avatar",
  status: "review",
  release: "1.0.0",
  components: {
    Avatar,
  },
  props: {
    /**
     * Source of the avatar
     */
    src: {
      type: String,
      default: "",
    },
    /**
     * User name to display initials if src is not set
     */
    userName: {
      type: String,
      default: "",
    },
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

    width: {
      type: Number,
      required: false,
      default: 50,
    },
  },
}
</script>
<docs>
```
  <oc-avatar src="https://picsum.photos/50/50?image=1074" accessibilityLabel="Lion" />
  <oc-avatar userName="Bruce Lee" accessibilityLabel="Lion" />
```
</docs>
