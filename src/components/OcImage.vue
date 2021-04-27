<template>
  <img :src="src" :alt="alt" :aria-hidden="ariaHidden" :title="title" />
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
      default: "",
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
  computed: {
    ariaHidden() {
      return this.alt.length === 0
    },
  },
}
</script>

<docs>
```jsx
<h3>Example image, with width set explicitly:</h3>
<oc-img width="200" height="300" src="https://picsum.photos/200/300/?random" title="I am random" alt="example image" />

<h3>Example grayschale image:</h3>
<oc-img src="https://picsum.photos/g/200/300" title="Grayscale" alt="example grayschale image" />

<h3>Example using a SVG file:</h3>
<oc-img width="100" src="icons/folder.svg" title="i am a folder" alt="folder icon" />
```
</docs>
