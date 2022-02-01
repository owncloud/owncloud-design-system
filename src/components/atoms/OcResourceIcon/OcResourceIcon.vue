<template>
	<oc-icon 
		key="resource-icon" 
		:name="resource.icon"
		:color="resource.iconColor"
		size="large" />
</template>

<script>
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import iconExtensionMapping from "../../../helpers/resourceIconExtensionMapping"
import iconColorExtensionMapping from "../../../helpers/resourceIconColorExtensionMapping"

export default {
	name: "OcResourceIcon",
  status: "ready",
  release: "2.1.0",
	components: { OcIcon },
	props: { 
		resource: {
			type: Object,
			required: true,
		}
	},
	computed: {
		iconName() {
			return this.getResourceIcon(this.resource.icon);
		},
		iconColor() {
			return this.getResourceIconColor(this.resource.iconColor);
		}
	},
	methods: {
		getResourceIcon(extension) {
			const icon = iconExtensionMapping[extension.toLowerCase()]

			if (icon) {
				return `resource-type-${icon}`
			}

			return 'resource-type-file'
		},
		getResourceIconColor(extension) {
			const color = iconColorExtensionMapping[extension.toLowerCase()]

			if (color) {
				return color
			}

			return 'var(--oc-color-text-default)'
		}
	}
}
</script>