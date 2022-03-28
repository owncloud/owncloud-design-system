<template>
  <div id="ghost-element" class="ghost-element">
    <div style="position: relative">
      <div v-for="index in iconStackCount" :key="index">
        <oc-resource-icon
          :class="getIconClass(index - 1)"
          :style="getStyleClass(index - 1)"
          :resource="previewItems[index - 1]"
        >
        </oc-resource-icon>
      </div>
    </div>
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
    iconStackCount() {
      const count = this.previewItems.length
      return count > 3 ? 3 : count
    },
    firstPreviewIcon() {
      const icon = this.previewItems[0].icon
      return icon ? icon : "file"
    },
    itemCount() {
      return this.previewItems.length
    },
  },
  methods: {
    getStyleClass(index) {
      const item = this.previewItems[index]
      if (item.isFolder) return
      return {
        left: `${index * (this.iconStackCount - 1) + 2}px`,
        top: `${index * (this.iconStackCount - 1)}px`,
      }
    },
    getIconClass(index) {
      const item = this.previewItems[index]
      return [
        {
          "ghost-element-icon-folder": item.isFolder,
        },
        "ghost-element-icon",
      ]
    },
  },
}
</script>

<style lang="scss">
.ghost-element-icon {
  position: absolute;
  z-index: 1;
  &-folder {
    svg {
      height: 80%;
    }
    left: 2px;
    z-index: 0;
  }
}

.ghost-element {
  background-color: transparent;
  padding-top: var(--oc-space-xsmall);
  padding-left: 5px;
  z-index: var(--oc-z-index-modal);
  position: absolute;
  .badge {
    position: absolute;
    top: -2px;
    right: -48px;
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
