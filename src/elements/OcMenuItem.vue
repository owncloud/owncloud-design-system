<template>
  <li class="oc-menu-item" @click="$_ocMenuItem_onClick">
    <div v-if="icon" class="uk-flex uk-flex-middle">
      <oc-icon :name="icon" class="uk-margin-small-right" />
      <slot name="default" />
    </div>
    <template v-else>
      <slot name="default" />
    </template>
  </li>
</template>
<script>
/**
 * Create a menu item.
 */
export default {
  name: "oc-menu-item",
  status: "prototype",
  release: "0.0.1",
  props: {
    /**
     * The icon to display.
     */
    icon: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    $_ocMenuItem_onClick(val) {
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
    <oc-menu buttonText="open oc-menu">
      <template slot="subnav">
        <oc-menu-item icon="create_new_folder" @click="onClick">Item with icon</oc-menu-item>
        <oc-menu-item>Item without icon</oc-menu-item>
      </template>
    </oc-menu>
  </template>
  <script>
    export default {
      methods: {
        onClick() {
          alert("Hello world!")
        }
      }
    }
  </script>
```
</docs>
