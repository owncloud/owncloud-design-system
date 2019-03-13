<template>
  <oc-img :src="src" class="oc-avatar" width="64" :uk-tooltip="_tooltip" />
</template>
<script>
export default {
  name: "oc-avatar",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Image source, path to avatar
     **/
    src: {
      type: String,
      required: true,
    },
    /**
     * Image title, usualy the user name
     **/
    title: {
      type: String,
      required: false,
    },
  },
  computed: {
    _tooltip() {
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
