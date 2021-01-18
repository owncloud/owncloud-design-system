<template>
  <button :id="id" role="tab" tabindex="-1" aria-controls @click="$_ocTabItem_onClick">
    <slot />
  </button>
</template>
<script>
/**
 * Create a tab item (for a tab component).
 */
export default {
  name: "OcTabbedTab",
  status: "prototype",
  release: "1.0.0",
  props: {
    /**
     * Name of the tab.
     */
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id: null,
    }
  },
  mounted() {
    this.id = `tab-${this.name}`
  },
  methods: {
    $_ocTabItem_onClick(val) {
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

<docs>
  Single tab as part of a tablist for a tab component, not meant to be used in isolation. Please have a look at the component [oc-tabbed](#/oC%20Components/oc-tabbed) for complete tab component code.
</docs>
