<template>
  <component :is="_is" :class="[_shrink]">
    <slot />
  </component>
</template>
<script>
export default {
  name: "oc-table-cell",
  status: "review",
  release: "1.0.0",
  props: {
    type: {
      type: String,
      default: null,
      required: false,
    },
    shrink: {
      type: Boolean,
      defalt: null,
    },
  },
  computed: {
    _shrink() {
      return this.shrink ? "uk-table-shrink" : null
    },
    _is() {
      return this.type === "head" ? "th" : "td"
    },
  },
}
</script>
