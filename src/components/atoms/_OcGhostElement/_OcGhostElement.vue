<template>
  <div id="ghost-element" class="ghost-element">
    <div class="icon-wrapper">
      <oc-resource-icon
        v-if="iconFolder"
        class="ghost-element-icon ghost-element-icon-folder"
        :resource="iconFolder"
      />
      <div v-for="(item, index) in iconStack" :key="index" :style="{ 'z-index': key }">
        <oc-icon
          :style="getStyle(index)"
          class="ghost-element-icon-background"
          name="resource-type-file"
          size="large"
          variation="inverse"
        />
        <oc-resource-icon :class="getIconClass(index)" :style="getStyle(index)" :resource="item" />
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
    iconStack() {
      return this.previewItems.filter(i => !i.isFolder).slice(0, this.iconStackCount)
    },
    iconFolder() {
      return this.previewItems.find(i => i.isFolder)
    },
    iconStackCount() {
      return Math.min(
        this.maxPreviewStackItemCount,
        this.hasFolder ? this.itemCount - 1 : this.itemCount
      )
    },
    itemCount() {
      return this.previewItems.length
    },
  },
  methods: {
    getStyle(index) {
      return {
        left: `${(index + 1) * 2}px`,
        top: `${(index + 1) * 2}px`,
        "z-index": 2,
      }
    },
    getIconClass(index) {
      const layerIndex = index - this.iconStack.length + 4
      return ["ghost-element-icon", `ghost-element-icon-${layerIndex}`]
    },
  },
}
</script>

<style lang="scss">
.ghost-element-icon {
  position: absolute;
  z-index: 1;
  &-1 {
    filter: brightness(0.5);
  }
  &-2 {
    filter: brightness(0.7);
  }
  &-3 {
    filter: brightness(1);
  }
  &-folder {
    svg {
      height: 80%;
    }
    filter: brightness(0.5) !important;
    left: 4px;
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
