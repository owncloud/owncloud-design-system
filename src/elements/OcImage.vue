<template>
  <img :src="src" :alt="alt" :title="title" uk-image />
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
      default: null,
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
    <oc-img width="100" src="icons/folder.svg" title="i am a folder" alt="folder icon" />
  </div>
  ```
</docs>
