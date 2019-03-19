<template>
  <oc-icon class="oc-star" :name="_name" />
</template>
<script>
export default {
  name: "oc-star",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Image source, path to avatar
     **/
    shining: {
      type: Boolean,
      required: false,
      defailt: true,
    },
  },
  computed: {
    _name() {
      return this.shining ? "star" : "star_border"
    },
  },
}
</script>
<docs>
```jsx
<div>
  <oc-star/>
  <oc-star shining/>
</div>
```
</docs>
