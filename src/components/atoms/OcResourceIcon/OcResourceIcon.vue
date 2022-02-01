<template>
  <oc-icon :key="`resource-icon-${iconName}`" :name="iconName" :color="iconColor" :size="size" />
</template>

<script>
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import iconNameMap from "../../../helpers/resourceIconExtensionMapping"
import iconColorMap from "../../../helpers/resourceIconColorExtensionMapping"

const defaultFolderColor = "var(--oc-color-icon-folder)"
const defaultFolderIcon = "folder"
const defaultFallbackIconColor = "var(--oc-color-text-default)"
const defaultFallbackIcon = "file"

export default {
  name: "OcResourceIcon",
  status: "unreleased",
  release: "12.0.0",
  components: { OcIcon },
  props: {
    /**
     * The resource to be displayed
     */
    resource: {
      type: Object,
      required: true,
    },
    /**
     * The size of the icon. Defaults to small.
     * `xsmall, small, medium, large, xlarge, xxlarge`
     */
    size: {
      type: String,
      default: "large",
      validator: value => {
        return value.match(/(xsmall|small|medium|large|xlarge|xxlarge|xxxlarge)/)
      },
    },
  },
  computed: {
    iconName() {
      if (this.isFolder) return defaultFolderIcon
      const icon = iconNameMap[this.extension]
      return `resource-type-${icon ? icon : defaultFallbackIcon}`
    },
    iconColor() {
      if (this.isFolder) return defaultFolderColor
      const color = iconColorMap[this.extension]
      return color ? color : defaultFallbackIconColor
    },
    isFolder() {
      return this.resource.type === "folder"
    },
    extension() {
      return this.resource.extension.toLowerCase()
    },
  },
}
</script>
