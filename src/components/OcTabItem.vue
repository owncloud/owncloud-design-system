<template>
  <li :class="$_ocTabItem_itemClass" @click="$_ocTabItem_onClick">
    <a href="">
      <slot />
    </a>
  </li>
</template>
<script>
/**
 * Create a tab item.
 */
export default {
  name: "OcTabItem",
  status: "deprecated",
  release: "1.0.0",
  props: {
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
```js
<template>
  <oc-tabs>
    <oc-tab-item active @click="onClick">Left</oc-tab-item>
    <oc-tab-item>Item 1</oc-tab-item>
    <oc-tab-item>Item 2</oc-tab-item>
    <oc-tab-item disabled>Disabled</oc-tab-item>
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
