<template>
  <a class="oc-file">
    <oc-icon :name="file[0]" variation="primary" class="uk-position-center-left" />
    <span class="oc-file-name">{{ name }}</span
    ><span v-if="file[1]" class="oc-file-extension">{{ file[1] }}</span>
  </a>
</template>
<script>
/**
 * Displays a file/folder together with the file type icon and the file extension.
 */
export default {
  name: "oc-file",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The mime type of the file. This defines the file type icon.
     */
    mimeType: {
      type: String,
      required: true,
    },
    /**
     * The name of the file/folder to be displayed.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * If set to true the element is no clickable.
     */
    nolink: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    file() {
      return this.mimeType.split("/")
    },
  },
}
</script>
<docs>
  ```jsx
<div>
  <oc-file mimeType="image/png" name="This is a picture"/>
</div>
  ```
</docs>
