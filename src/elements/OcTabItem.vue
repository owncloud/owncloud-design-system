<template>
  <li :class="$_ocTabItem_itemClass" @click="$_ocTabItem_onClick">
    <a href="">
      <slot>
        {{ title }}
      </slot>
    </a>
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
      required: false,
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
    $_ocTabItem_itemClass() {
      return this.disabled ? "uk-disabled" : this.active ? "uk-active" : ""
    },
  },
  methods: {
    $_ocTabItem_onClick(val) {
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
      <oc-tab-item>Item with text in slot</oc-tab-item>
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
