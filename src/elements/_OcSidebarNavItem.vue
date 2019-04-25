<template>
  <li :class="$_ocSidebarNavItem_class">
    <component
      :is="$_ocSidebarNavItem_componentType"
      :to="target"
      v-on="!target ? { click: $_ocSidebarNavItem_onClick } : {}"
    >
      <oc-icon :name="icon" v-if="icon" />
      <slot name="default" />
    </component>
    <ul class="uk-nav-sub" v-if="$slots.subnav">
      <slot name="subnav" />
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
    $_ocSidebarNavItem_class() {
      let classes = []
      if (this.$slots.subnav) {
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
  <oc-sidebar-nav-item target="home" icon="close" active>Demo Item</oc-sidebar-nav-item>
  <oc-sidebar-nav-item target="home" icon="edit">Demo Item</oc-sidebar-nav-item>
  ```
</docs>
