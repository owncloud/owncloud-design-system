<template>
  <oc-icon key="resource-icon" :name="iconName" :color="iconColor" size="large" />
</template>

<script>
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import iconNameMap from "../../../helpers/resourceIconExtensionMapping"
import iconColorMap from "../../../helpers/resourceIconColorExtensionMapping"

export default {
  name: "OcResourceIcon",
  status: "ready",
  release: "12.0.0",
  components: { OcIcon },
  props: {
    resource: {
      type: Object,
      required: true,
    },
    defaultFallbackIcon: {
      type: String,
      required: false,
      default: "file",
    },
    defaultFallbackIconColor: {
      type: String,
      required: false,
      default: "var(--oc-color-text-default)",
    },
    defaultFolderIcon: {
      type: String,
      required: false,
      default: "folder",
    },
		defaultFolderColor: {
			type: String,
      required: false,
      default: "rgb(44, 101, 255)",
		}
  },
  computed: {
    iconName() {
      if(this.isFolder) return this.defaultFolderIcon
      const icon = iconNameMap[this.extension]
      return `resource-type-${icon ? icon : this.defaultFallbackIcon}`
    },
    iconColor() {
			if(this.isFolder) return this.defaultFolderColor
      const color = iconColorMap[this.extension]
      return color ? color : this.defaultFallbackIconColor
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
