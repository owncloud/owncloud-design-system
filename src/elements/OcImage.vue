<template>
  <img :src="src" :width="size" :alt="alt" :title="title" />
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
    /**
     * The alt-attribute of the image.
     */
    alt: {
      required: false,
      type: String,
    },
    /**
     * The title of the image. Displayed when hover.
     */
    title: {
      required: false,
      type: String,
    },
  },
}
</script>
<style lang="scss"></style>
<docs>
  ```jsx
  <div>
    <oc-img size="300" src="icons/folder.svg" title="i am a folder" alt="folder icon" />
    <oc-img size="250" src="icons/folder.svg" />
    <oc-img size="200" src="icons/folder.svg" />
    <oc-img size="150" src="icons/folder.svg" />
  </div>
  ```
</docs>
