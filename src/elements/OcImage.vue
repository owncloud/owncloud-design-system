<template>
  <img :src="src" :width="size" />
</template>
<script>
export default {
  name: "oc-img",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Image source, path to image
     *
     **/
    src: {
      required: true,
      type: String,
    },
    /**
     * Size of the Image in px
     *
     **/
    size: {
      required: false,
      type: Number,
    },
  },
}
</script>
<style lang="scss"></style>
<docs>
  ```jsx
  <div>
    <oc-img size="300" src="icons/folder.svg" />
    <oc-img size="250" src="icons/folder.svg" />
    <oc-img size="200" src="icons/folder.svg" />
    <oc-img size="150" src="icons/folder.svg" />
  </div>
  ```
</docs>
