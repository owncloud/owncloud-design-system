<template>
  <li :class="_itemClass" @click="onClick">
    <a href="" v-text="title"></a>
  </li>
</template>
<script>
/**
 * Create a tab item.
 */
export default {
  name: "oc-tab-item",
  status: "prototype",
  release: "1.0.0",
  props: {
    /**
     * The title to display.
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Display as active.
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Disable the tab.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _itemClass() {
      return this.disabled ? "uk-disabled" : this.active ? "uk-active" : ""
    },
  },
  methods: {
    onClick(val) {
      /**
       * Click event
       * @event click
       * @type {event}
       */
      this.$emit("click", val)
    },
  },
}
</script>

<docs>
```jsx
  <template>
    <oc-tabs>
      <oc-tab-item active title="Left" @click="onClick" />
      <oc-tab-item title="Item 1"/>
      <oc-tab-item title="Item 2"/>
      <oc-tab-item disabled title="Disabled"/>
    </oc-tabs>
  </template>
  <script>
    export default {
      methods: {
        onClick(val) {
          alert(val)
        }
      }
    }
  </script>
```
</docs>
