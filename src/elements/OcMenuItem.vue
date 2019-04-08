<template>
  <li @click="onClick">
    <a href="#">
      <!-- @slot This slot is set as content & will override any inner elements-->
      <slot name="inner">
        <div v-if="icon" class="uk-flex uk-flex-middle">
          <oc-icon :name="icon" class="uk-margin-small-right" />
          <!-- @slot This default slot is set as text of the menu items -->
          <slot name="default" />
        </div>
        <template v-else>
          <slot name="default" />
        </template>
      </slot>
    </a>
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
    <oc-menu buttonText="open oc-menu">
      <template slot="subnav">
        <oc-menu-item icon="create_new_folder">New folder …</oc-menu-item>
        <oc-menu-item>Another action</oc-menu-item>
        <oc-menu-item><pre slot="inner">Custom item elements</pre></oc-menu-item>
      </template>
    </oc-menu>
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
