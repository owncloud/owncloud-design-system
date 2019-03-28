<template>
  <li :class="[active, 'uk-parent']">
    <router-link :to="target">
      <span class="uk-margin-small-right">
        <oc-icon variation="inverted" name="folder" />
        {{ text }}
      </span>
    </router-link>
    <ul class="uk-nav-sub">
      <slot name="default" />
    </ul>
  </li>
</template>
<script>
export default {
  name: "oc-sidebar-nav-sub-item",
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
      default: "ParentNavItem",
    },
    slots: {
      type: Array,
      required: false,
      default: function() {
        return []
      },
    },
  },
}
</script>
<docs>
  ```jsx
  <oc-sidebar-nav-sub-item text="Demo Item" target="home" icon="close" active>
    <oc-sidebar-nav-item text="Demo Item" target="home" icon="edit" />
    <oc-sidebar-nav-item text="Demo Item" target="home" icon="edit" />
  </oc-sidebar-nav-sub-item>
  <oc-sidebar-nav-sub-item text="Demo Item" target="home" icon="edit" />
  ```
</docs>
