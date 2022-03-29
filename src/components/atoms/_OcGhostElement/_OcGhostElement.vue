<template>
  <div id="ghost-element" class="ghost-element">
    <div class="icon-wrapper">
      <div v-for="index in iconStackCount" :key="index" :style="{ 'z-index': key }">
        <oc-icon
          v-if="!previewItems[index - 1].isFolder"
          :style="getStyle(index - 1)"
          class="ghost-element-icon-background"
          name="resource-type-file"
          size="large"
          variation="inverse"
        />
        <oc-resource-icon
          :class="getIconClass(index - 1)"
          :style="getStyle(index - 1)"
          :resource="previewItems[index - 1]"
        />
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
  data() {
    return {
      maxPreviewStackItemCount: 3,
    }
  },
  computed: {
    iconStackCount() {
      return Math.min(this.maxPreviewStackItemCount, this.itemCount)
    },
    itemCount() {
      return this.previewItems.length
    },
  },
  methods: {
    getStyle(index) {
      const item = this.previewItems[index]
      if (item.isFolder) return
      return {
        left: `${index * 2 + 2}px`,
        top: `${index * 2}px`,
        "z-index": 2,
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
  &-background {
    display: inline-flex;
    align-items: center;
    position: absolute;
    z-index: 1;
    svg {
      height: 70%;
    }
  }
}
.ghost-element {
  background-color: transparent;
  padding-top: var(--oc-space-xsmall);
  padding-left: 5px;
  z-index: var(--oc-z-index-modal);
  position: absolute;
  .icon-wrapper {
    position: relative;
  }
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
