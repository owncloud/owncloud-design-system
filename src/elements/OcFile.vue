<template>
  <a class="oc-file">
    <oc-icon :name="icon" variation="primary" class="uk-position-center-left" />
    <span class="oc-file-name">{{ name }}</span
    ><span v-if="extension" class="oc-file-extension">{{ extension }}</span>
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
     * The icon to be used.
     */
    icon: {
      type: String,
      required: false,
      default: "folder",
    },
    /**
     * The extension of the file/folder to be displayed.
     */
    extension: {
      type: String,
      required: false,
    },
    /**
     * The name of the file/folder to be displayed.
     */
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
<docs>
    ```jsx
    <div>
        <oc-file name="This is a picture"/>
        <oc-file icon="image" extension="png" name="picture"/>
    </div>
    ```
</docs>
