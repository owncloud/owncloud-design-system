<template>
  <li :class="active">
    <router-link :to="target">
      <span class="uk-margin-small-right">
        <oc-icon variation="inverted" :name="icon" />
        {{ text }}
      </span>
    </router-link>
  </li>
</template>
<script>
export default {
  name: "oc-sidebar-nav-item",
  status: "prototype",
  release: "1.0.0",
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    target: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
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
  <oc-sidebar-nav-item text="Demo Item" target="home" icon="close" active />
  <oc-sidebar-nav-item text="Demo Item" target="home" icon="edit" />
  ```
</docs>
