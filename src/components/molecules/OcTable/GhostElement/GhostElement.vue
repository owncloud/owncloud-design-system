<template>
  <div id="ghost-element" class="ghost-element">
    <oc-icon :name="firstPreviewIcon" size="large" />
    <span class="badge">{{ itemCount }}</span>
  </div>
</template>

<script>
/**
 * Please head to the OcTableFiles component (https://owncloud.design/#/oC%20Components/OcTableFiles) for a demo of the Ghost Element.
 */
export default {
  name: "GhostElement",
  props: {
    previewItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    firstPreviewIcon() {
      const icon = this.previewItems[0].icon
      return icon ? icon : "file"
    },
    itemCount() {
      return this.previewItems.length
    },
  },
}
</script>

<style lang="scss">
.ghost-element {
  background-color: transparent;
  padding-top: 4px;
  padding-left: 5px;
  z-index: var(--oc-z-index-modal);
  position: absolute;
  .badge {
    position: absolute;
    top: -2px;
    right: -8px;
    padding: 4px;
    line-height: 10px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    min-width: 10px;
    height: 10px;
    text-align: center;

    font-size: 12px;
    background: red;
    color: white;
  }
}
</style>
