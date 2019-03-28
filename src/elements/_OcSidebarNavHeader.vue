<template>
  <li class="uk-nav-header">{{ text }}</li>
</template>
<script>
export default {
  name: "oc-sidebar-nav-header",
  status: "prototype",
  release: "1.0.0",
  props: {
    text: {
      type: String,
      required: false,
      default: "NavItem",
    },
  },
}
</script>
<docs>
  ```jsx
  <oc-sidebar-nav-header text="Demo Item" />
  ```
</docs>
