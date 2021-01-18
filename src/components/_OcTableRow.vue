<template>
  <tr @click="onClick">
    <slot />
  </tr>
</template>
<script>
export default {
  name: "OcTableRow",
  status: "review",
  release: "1.0.0",
  methods: {
    onClick(val) {
      /**
       * Click event
       * @event click
       * @type {event}
       */
      this.$emit("click", val)
    },
  },
}
</script>
