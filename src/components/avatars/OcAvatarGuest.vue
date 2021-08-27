<template>
  <oc-avatar-item
    icon="user_remote"
    icon-color="#D78841"
    :name="name"
    :accessible-label="accessibleLabel"
  ></oc-avatar-item>
</template>

<script>
export default {
  name: "OcAvatarGuest",
  status: "ready",
  release: "2.1.0",

  props: {
    /**
     * Name of the public link used as an accessible label
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
<oc-avatar-guest name="Guest" accessible-label="Guest" />
```
</docs>
