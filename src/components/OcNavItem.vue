<template>
  <li class="oc-nav-item" :class="{ 'uk-active': active }">
    <a href="#" @click.prevent="$_ocCheckbox_click">
      <div v-if="icon" class="uk-flex uk-flex-middle">
        <oc-icon :name="icon" class="oc-mr-s" />
        <slot name="default" />
      </div>
      <template v-else>
        <slot name="default" />
      </template>
    </a>
    <slot name="outer-content" />
  </li>
</template>

<script>
import OcIcon from "./OcIcon.vue"
/**
 * Create a list menu item.
 *
 * TODO:
 * - [ ] Add router-link capabilities
 */
export default {
  name: "OcNavItem",
  status: "deprecated",
  release: "0.0.1",
  components: {
    OcIcon,
  },
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

<style lang="scss">
// TODO: Ugly hack to overwrite uikit, refactor when we remove uikit
.oc-nav-item > a {
  color: var(--oc-color-text-muted) !important;
  &:hover {
    color: var(--oc-color-text-default) !important;
  }
}
</style>

<docs>
```js
<template>
  <oc-nav>
    <oc-nav-item icon="create_new_folder">Item with icon</oc-nav-item>
    <oc-nav-item @click="onClick('Hi there')">Item without icon</oc-nav-item>
    <oc-nav-item active>An active item</oc-nav-item>
    <oc-nav-item>
      Item with content outside of link tag
      <template slot="outer-content">
        <span>
          I'm outside of link tag
        </span>
      </template>
    </oc-nav-item>
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
