<template>
  <div class="oc-resource-name" v-bind="tooltip" :resource-path="fullPath">
    <span v-if="hasPath" class="oc-resource-path" v-text="path" />
    <span class="oc-resource-basename" v-text="name" />
    <span v-if="extension" class="oc-resource-extension" v-text="extension" />
  </div>
</template>

<script>
export default {
  name: "OcResourceName",
  status: "review",
  released: "2.1.0",

  props: {
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

  data: () => ({
    name: "",
    extension: "",
    path: "",
    pathTooltip: "",
  }),

  computed: {
    hasPath() {
      return this.path !== ""
    },

    tooltip() {
      if (this.pathTooltip) {
        return { "uk-tooltip": this.pathTooltip }
      }
      return null
    },
  },

  watch: {
    name: {
      handler: "splitName",
      immediate: true,
    },
  },

  methods: {
    splitName() {
      const hasLeadingSlash = this.fullPath.startsWith("/")
      const pathSplit = this.fullPath.substr(hasLeadingSlash ? 1 : 0).split("/")

      if (this.isPathDisplayed) {
        if (pathSplit.length === 2) {
          this.path = pathSplit[0] + "/"
        } else if (pathSplit.length > 2) {
          this.path = `…/${pathSplit[pathSplit.length - 2]}/`
          this.pathTooltip = this.fullPath
        }
      }

      const name = pathSplit[pathSplit.length - 1]
      const dotIndex = name.lastIndexOf(".")

      // If last index of "dot" is 0 or less, it is folder and we do not display extension
      if (dotIndex <= 0) {
        return (this.name = name)
      }

      this.name = name.substring(0, dotIndex)
      this.extension = name.substring(dotIndex)
    },
  },
}
</script>

<style lang="scss">
.oc-resource {
  &-name {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    width: fit-content;
  }

  &-basename {
    color: $global-color;
    font-weight: bold;
    white-space: pre;
  }

  &-extension,
  &-path {
    color: $muted-color;
    white-space: pre;
  }
}
</style>

<docs>
```vue
<oc-resource-name full-path="documents/notes.txt" />
<oc-resource-name full-path="images/nature/forest.jpg" :is-path-displayed="true" />
```
</docs>
