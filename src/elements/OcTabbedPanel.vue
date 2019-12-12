<template>
  <div role="tabpanel" :id="id" aria-labelledby>
    <slot />
  </div>
</template>
<script>
/**
 * Create a panel item (for a tab component).
 */
export default {
  name: "oc-tabbed-panel",
  status: "prototype",
  release: "1.0.0",
  data() {
    return {
      id: null,
    }
  },
  props: {
    /**
     * Name of the panel.
     */
    name: {
      type: String,
    },
  },
  mounted() {
    this.id = `panel-${this.name}`
  },
}
</script>

<docs>
  Single panel as part of a tab component, not meant to be used in isolation. Please have a look at the component [oc-tabbed](#/Elements/oc-tabbed) for complete tab component code.
</docs>
