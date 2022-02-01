<template>
	<oc-icon 
		key="resource-icon" 
		:name="resource.icon"
		:color="resource.iconColor"
		size="large" />
</template>

<script>
import path from 'path'
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import iconExtensionMapping from "../../../helpers/resourceIconExtensionMapping"
import iconColorExtensionMapping from "../../../helpers/resourceIconColorExtensionMapping"

export default {
	name: "OcResourceIcon",
  status: "ready",
  release: "12.0.0",
	components: { OcIcon },
	props: { 
		resource: {
			type: Object,
			required: true,
		}
	},
	computed: {
		extensionName() {
			return this.getFileExtension(this.resource.name)
		},
		iconName() {
			const icon = iconExtensionMapping[this.extensionName.toLowerCase()]
			if (icon) {
				return `resource-type-${icon}`
			}
			return 'resource-type-file'
		},
		iconColor() {
			const color = iconColorExtensionMapping[this.extensionName.toLowerCase()]
			if (color) {
				return color
			}
			return 'var(--oc-color-text-default)'
		}
	},
	methods: {
		getFileExtension(name) {
			const extension = path.extname(name)
			if (!extension) {
				return ''
			}
			return extension.replace(/^(.)/, '')
		}
	}
}
</script>