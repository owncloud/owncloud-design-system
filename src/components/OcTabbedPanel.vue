<template>
  <div :id="id" role="tabpanel" aria-labelledby>
    <slot />
  </div>
</template>
<script>
/**
 * Create a panel item (for a tab component).
 */
export default {
  name: "OcTabbedPanel",
  status: "deprecated",
  release: "1.0.0",
  props: {
    /**
     * Name of the panel.
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
    this.id = `panel-${this.name}`
  },
}
</script>

<docs>
  Single panel as part of a tab component, not meant to be used in isolation. Please have a look at the component [oc-tabbed](#/oC%20Components/oc-tabbed) for complete tab component code.
</docs>
