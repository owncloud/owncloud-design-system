<template>
  <a class="oc-file">
    <oc-icon :name="icon" variation="primary" class="uk-position-center-left" />
    <span class="oc-file-name" v-text="_name" /><span
      v-if="file.extension"
      class="oc-file-extension"
      v-text="file.extension"
    />
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
     * A file object with necessary property `name` and an optional property `extension`
     */
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    _name() {
      let name = this.file.name,
        extension = this.file.extension

      if (!extension) {
        return name
      }

      return name.substring(0, name.length - extension.length - 1)
    },
  },
}
</script>
<docs>
```jsx
<ul class="uk-list">
  <li>
    <oc-file icon="image" :file="{ name : 'I love flowers.jpg', extension : 'jpg' }" />
  </li>
  <li>
    <oc-file icon="folder" :file="{ name : 'Large folder' }" />
  </li>
  <li>
    <oc-file icon="image" :file="{ name : 'Just kidding, I hate flowers.png', extension : 'png' }" />
  </li>
</ul>
```
</docs>
