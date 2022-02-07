<template>
  <div id="ghost-element" class="ghost-element">
    <oc-icon :name="firstPreviewIcon" size="large" />
    <span class="badge">{{ itemCount }}</span>
  </div>
</template>

<script>
/**
 * Please head to the ownCloud web ResourceTable component (https://github.com/owncloud/web/blob/master/packages/web-app-files/src/components/FilesList/ResourceTable.vue) for a demo of the Ghost Element.
 */
export default {
  name: "OcGhostElement",
  status: "ready",
  release: "11.2.0",
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
  padding-top: var(--oc-space-xsmall);
  padding-left: 5px;
  z-index: var(--oc-z-index-modal);
  position: absolute;
  .badge {
    position: absolute;
    top: -2px;
    right: -8px;
    padding: var(--oc-space-xsmall);
    line-height: var(--oc-space-small);
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    min-width: var(--oc-space-small);
    height: var(--oc-space-small);
    text-align: center;

    font-size: 12px;
    background: red;
    color: white;
  }
}
</style>
