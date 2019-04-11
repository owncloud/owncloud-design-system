<template>
  <li :class="$_ocSidebarNavItem_class">
    <component
      :is="$_ocSidebarNavItem_componentType"
      :to="target"
      v-on="!target ? { click: $_ocSidebarNavItem_onClick } : {}"
    >
      <oc-icon :name="icon" class="oc-sidebar-nav-item-icon" v-if="icon" />
      <slot name="text">
        <span>
          {{ text }}
        </span>
      </slot>
    </component>
    <ul class="uk-nav-sub" v-if="$_ocSidebarNavItem_hasDefaultSlot">
      <slot name="default" />
    </ul>
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
    isolate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    $_ocSidebarNavItem_componentType() {
      return this.target ? "router-link" : "a"
    },
    $_ocSidebarNavItem_hasDefaultSlot() {
      return !!this.$slots.default
    },
    $_ocSidebarNavItem_class() {
      let classes = ["oc-sidebar-nav-item"]
      if (this.$_ocSidebarNavItem_hasDefaultSlot) {
        classes.push("uk-parent")
      }
      if (this.active) {
        classes.push("uk-active")
      }
      if (this.isolate) {
        classes.push("uk-margin-medium-top")
      }
      return classes
    },
  },
  methods: {
    $_ocSidebarNavItem_onClick() {
      this.$emit("click")
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
