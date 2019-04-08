<template>
  <li @click="onClick">
    <a href="#">
      <!-- @slot This default slot is set as content & will override icon -->
      <slot name="default">
        <div v-if="icon" class="uk-flex uk-flex-middle">
          <oc-icon :name="icon" class="uk-margin-small-right" />
          <template>{{ content }}</template>
        </div>
        <template v-else>
          <template v-translate>{{ content }}</template>
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
     * The content to display.
     */
    content: {
      type: String,
      required: false,
      default: "",
    },
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
        <oc-menu-item icon="create_new_folder" content="New folder …" />
        <oc-menu-item>Another action</oc-menu-item>
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
