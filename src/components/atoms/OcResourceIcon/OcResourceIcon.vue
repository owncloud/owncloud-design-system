<template>
	<oc-icon 
		key="resource-icon" 
		:name="resource.icon"
		:color="resource.iconColor"
		size="large" />
</template>

<script>
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"

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
			return this.resource.icon;
		},
		iconColor() {
			return this.resource.iconColor;
		}
	}
}
</script>