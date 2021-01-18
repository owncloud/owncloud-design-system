<template>
  <img :src="src" :alt="alt" :title="title" />
</template>
<script>
/**
 * Images can be displayed using this component.
 *
 */
export default {
  name: "OcImg",
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
      type: String,
      required: false,
      default: null,
    },
    /**
     * The title of the image. Displayed when hover.
     */
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
<style lang="scss"></style>
<docs>
```jsx
<div>
  <p class="oc-m">
    <oc-img width="100" src="icons/folder.svg" title="i am a folder" alt="folder icon" />
  </p>
  <p class="oc-m">
    <oc-img width="300" height="200" src="https://picsum.photos/200/300/?random" title="I am random" />
  </p>
  <p class="oc-m">
    <oc-img src="https://picsum.photos/g/200/300" title="Grayscale" />
  </p>
</div>
```
</docs>
