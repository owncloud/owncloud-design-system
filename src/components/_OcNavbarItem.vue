<template>
  <div :class="$_ocNavbarItem_class"><slot /></div>
</template>
<script>
export default {
  name: "oc-navbar-item",
  status: "review",
  release: "1.0.0",
  props: {
    position: {
      type: String,
      default: "left",
    },
  },
  computed: {
    $_ocNavbarItem_class() {
      return `uk-navbar-${this.position}`
    },
  },
}
</script>
