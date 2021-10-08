<template>
  <span
    v-oc-tooltip="tooltip"
    class="oc-resource-name oc-text-truncate"
    :data-test-resource-path="fullPath"
    :data-test-resource-name="fullName"
    :data-test-resource-type="type"
  >
    <span v-if="displayPath" class="oc-resource-path" v-text="displayPath" /><span
      class="oc-resource-basename"
      v-text="displayName"
    /><span v-if="extension" class="oc-resource-extension" v-text="displayExtension" />
  </span>
</template>

<script>
export default {
  name: "OcResourceName",
  status: "ready",
  released: "2.1.0",

  props: {
    /**
     * The name of the resource
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * The extension of the resource, if there is one
     */
    extension: {
      type: String,
      required: false,
      default: "",
    },
    /**
     * The type of the resource
     */
    type: {
      type: String,
      required: true,
    },
    /**
     * A full path of the resource
     */
    fullPath: {
      type: String,
      required: true,
    },
    /**
     * Asserts whether the resource path should be displayed
     */
    isPathDisplayed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    tooltip() {
      return this.pathTooltip
    },

    fullName() {
      return (this.displayPath || "") + this.name
    },

    displayName() {
      if (this.extension) {
        return this.name.substr(0, this.name.length - this.extension.length - 1)
      }
      return this.name
    },

    displayExtension() {
      return this.extension ? "." + this.extension : ""
    },

    displayPath() {
      if (!this.isPathDisplayed) {
        return null
      }
      const pathSplit = this.fullPath.replace(/^\//, "").split("/")
      if (pathSplit.length < 2) {
        return null
      }
      if (pathSplit.length === 2) {
        return pathSplit[0] + "/"
      }
      return `…/${pathSplit[pathSplit.length - 2]}/`
    },

    pathTooltip() {
      if (!this.isPathDisplayed) {
        return null
      }
      if (this.displayPath === this.fullPath) {
        return null
      }
      return this.fullPath
    },
  },
}
</script>

<style lang="scss">
.oc-resource {
  &-name {
    display: block;
  }

  &-basename {
    color: var(--oc-color-text-default);
    font-weight: bold;
    white-space: pre;
  }

  &-extension,
  &-path {
    color: var(--oc-color-text-muted);
    white-space: pre;
  }
}
</style>

<docs>
```js
<oc-resource-name full-path="documents/notes.txt" name="notes.txt" extension="txt" type="file" />
<oc-resource-name full-path="images/nature/forest.jpg" :is-path-displayed="true" name="forest.jpg" extension="jpg" type="file" />
<oc-resource-name full-path="super-long-path-to-a-subfolder-which-is-a-lot-of-levels-away-from–the-root-super-long-path-to-a-subfolder-which-is-a-lot-of-levels-away-from–the-root/asdf.txt" :is-path-displayed="true" name="asdf.txt" extension="txt" type="file" />
<oc-resource-name full-path="some-folder" name="regular-folder" extension="" type="folder" />
<oc-resource-name full-path="folder-name-with.dot" name="folder-name-with.dot" extension="" type="folder" />
```
</docs>
