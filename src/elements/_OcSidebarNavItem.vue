<template>
  <li :class="_class" class="oc-sidebar-nav-item">
    <component :is="_componentType" :to="target" v-on="!target ? { click: onClick } : {}">
      <span class="oc-sidebar-nav-item-wrapper">
        <oc-icon variation="inverted" :name="icon" class="oc-sidebar-nav-item-icon" />
        {{ text }}
      </span>
    </component>
    <ul class="uk-nav-sub" v-if="hasDefaultSlot">
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
  },
  computed: {
    _componentType() {
      return this.target ? "router-link" : "a"
    },
    hasDefaultSlot() {
      return !!this.$slots.default
    },
    _class() {
      let classes = []
      if (this.hasDefaultSlot) {
        classes.push("uk-parent")
      }
      if (this.active) {
        classes.push("uk-active")
      }
      return classes
    },
  },
  methods: {
    onClick() {
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
