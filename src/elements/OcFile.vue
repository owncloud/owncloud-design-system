<template>
  <a class="oc-file">
    <oc-icon :name="icon" variation="primary" class="uk-position-center-left" />
    <span class="oc-file-name" v-text="file.name" @click="onClick" /><span
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
     * A file object with necessary property `name` and an optional property `extension`.
     * Please note that the name shall not hold the extension
     */
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClick() {
      /**
       * This event is emitted when the user clicks a file
       * TODO https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components
       * @type {string}
       */
      this.$emit("oc-file:click", this.file)
    },
  },
}
</script>
<docs>
  ```jsx
  <section>
    <h3 class="uk-heading-divider">
      File examples
    </h3>
    <ul class="uk-list">
      <li>
        <oc-file icon="image" :file="{ name : 'I love flowers', extension : 'jpg' }" />
      </li>
      <li>
        <oc-file icon="folder" :file="{ name : 'Large folder' }" />
      </li>
      <li>
        <oc-file icon="image" :file="{ name : 'Just kidding, I hate flowers.png', extension : 'png' }" />
      </li>
      <li>
        <oc-file icon="text" :file="{ name : 'README', extension : 'md' }" />
      </li>
      <li>
        <oc-file icon="archive" :file="{ name : 'package', extension : 'tar.gz' }" />
      </li>
    </ul>
  </section>
  ```
</docs>
