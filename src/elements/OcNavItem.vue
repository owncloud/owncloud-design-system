<template>
  <li :class="{ 'uk-active': active }">
    <a href="#" @click.prevent="$_ocCheckbox_click">
      <div v-if="icon" class="uk-flex uk-flex-middle">
        <oc-icon :name="icon" class="uk-margin-small-right" />
        <slot name="default" />
      </div>
      <template v-else>
        <slot name="default" />
      </template>
    </a>
  </li>
</template>
<script>
/**
 * Create a list menu item.
 *
 * TODO:
 * - [ ] Add router-link capabilities
 */
export default {
  name: "oc-nav-item",
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
    /**
     * Mark as active item
     */
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    $_ocCheckbox_click(val) {
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
  <oc-nav>
    <oc-nav-item icon="create_new_folder">Item with icon</oc-nav-item>
    <oc-nav-item @click="onClick('Hi there')">Item without icon</oc-nav-item>
    <oc-nav-item active>An active item</oc-nav-item>
  </oc-nav>
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
