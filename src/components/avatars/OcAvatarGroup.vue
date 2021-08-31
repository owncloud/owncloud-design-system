<template>
  <oc-avatar-item icon="group" :name="name" :accessible-label="accessibleLabel" />
</template>

<script>
export default {
  name: "OcAvatarGroup",
  status: "review",
  release: "",

  props: {
    /**
     * Name of the group used as an accessible label
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Accessibility label used as alt. Use only in case the avatar is used alone.
     * In case the avatar is used next to username or display name leave empty.
     * If not specified, avatar will get `aria-hidden="true"`.
     **/
    accessibleLabel: {
      type: String,
      required: false,
      default: "",
    },
  },
}
</script>

<docs>
```js
<oc-avatar-group name="Group" accessible-label="Group" />
```
</docs>
