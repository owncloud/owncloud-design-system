<template>
  <button role="tab" :id="id" @click="$_ocTabItem_onClick" tabindex="-1" aria-controls>
    <slot />
  </button>
</template>
<script>
/**
 * Create a tab item (for a tab component).
 */
export default {
  name: "oc-tabbed-tab",
  status: "prototype",
  release: "1.0.0",
  data() {
    return {
      id: null,
    }
  },
  props: {
    /**
     * Name of the tab.
     */
    name: {
      type: String,
    },
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
  mounted() {
    this.id = `tab-${this.name}`
  },
}
</script>

<docs>
  Single tab as part of a tablist for a tab component, not meant to be used in isolation. Please have a look at the component [oc-tabbed](#/oC%20Components/oc-tabbed) for complete tab component code.
</docs>
