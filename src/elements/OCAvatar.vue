<template>
  <oc-img :src="src" class="uk-border-circle" width="64" :uk-tooltip="tooltip" />
</template>
<script>
export default {
  name: "oc-avatar",
  props: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  computed: {
    tooltip() {
      if (!this.title) return null

      return `title: ${this.title}; pos: right`
    },
  },
}
</script>
<docs>
```jsx
<div>
	<oc-avatar src="https://picsum.photos/64/64?image=1074" title="I'm a Lion"/>
	<oc-avatar src="https://picsum.photos/64/64?image=718"/>
</div>
```
</docs>
