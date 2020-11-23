<template>
  <span class="oc-file" @click="onClick" role="button">
    <oc-icon :name="icon" :url="iconUrl" variation="file-type" class="uk-position-center-left" />
    <span class="oc-file-name" v-text="name" />
    <span v-if="extension" class="oc-file-extension">.{{ extension }}</span>
  </span>
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
     * The icon name to be used.
     */
    icon: {
      type: String,
      required: false,
      default: "folder",
    },
    /**
     * Icon URL.
     *
     * Has higher priority than icon name.
     * In case of failure it will fall back to the icon name if set.
     */
    iconUrl: {
      type: String,
      required: false
    },

    /**
     * The name of a file.
     * Please note that the name shall not hold the extension
     */
    name: {
      type: String,
      required: true,
      default: "",
    },
    /**
     * The extension of a file`.
     */
    extension: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    onClick() {
      /**
       * This event is emitted when the user clicks a file
       * @type {string}
       */
      this.$emit("click", this.file)
    },
  },
}
</script>
<docs>
  ```vue
  <template>
    <section>
      <h3 class="uk-heading-divider">
        File examples
      </h3>
      <ul class="uk-list">
        <li>
          <oc-file icon="image" name="I love flowers" extension="jpg" />
        </li>
        <li>
          <oc-file icon="folder" name='Large folder' />
        </li>
        <li>
          <oc-file icon="image" name='Just kidding, I hate flowers.png' extension="png" />
        </li>
        <li>
          <oc-file icon="text" name='README' extension="md" />
        </li>
        <li>
          <oc-file icon="archive" name='package' extension="tar.gz" />
        </li>
        <li>
        </li>
      </ul>
      <h3 class="uk-heading-divider">
        Icon URL examples
      </h3>
      <ul class="uk-list">
        <li>
          <oc-file icon="image" iconUrl="examples/lorem.png" name="file with preview" extension="jpg" />
        </li>
        <li>
          <oc-file icon="image" iconUrl="examples/notfound.png" name="file with preview that failed to load" extension="jpg" />
        </li>
      </ul>
      <h3 class="uk-heading-divider">
        Interactions
      </h3>
      <oc-file type="div" icon="text" :name="name" :extension="extension" @click="onChange"/>
    </section>
  </template>
  <script>
    export default {
      data: () => {
        return {
          name: 'Click me to change me',
          extension: '!!!',
          toggle: true
        }
      },
      methods: {
        onChange(val) {
          this.toggle = !this.toggle
          if (this.toggle) {
            this.name = 'New Image'
            this.extension = 'png'
          } else {
            this.name = 'New Textfile'
            this.extension = 'txt'
          }
        }
      }
    }
  </script>
  ```
</docs>
