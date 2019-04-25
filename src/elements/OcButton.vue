<template>
  <component
    :is="type"
    :href="href"
    :to="to"
    :type="submit"
    :aria-label="ariaLabel"
    :class="$_ocButton_buttonClass"
    @click="onClick"
  >
    <oc-icon v-if="icon" :class="$_ocButton_iconClass" :name="icon" />
    <span v-if="$slots.default">
      <slot name="default" />
    </span>
  </component>
</template>

<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 *
 * Defaults to appearance that has white background with grey border.
 * Primary style should be used only once per view for main call-to-action.
 */
export default {
  name: "oc-button",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The html element used for the button.
     * `button, a, router`
     */
    type: {
      type: String,
      default: "button",
      validator: value => {
        return value.match(/(button|a|router)/)
      },
    },
    /**
     * The size of the button. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(small|large)/)
      },
    },
    /**
     * When setting the button’s type to a link, use this option to give a href.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * When setting the button’s type to a router-link, use this option to give a to.
     */
    to: {
      type: Object,
      default: null,
    },
    /**
     * The aria-label of the button.
     */
    ariaLabel: {
      type: String,
      default: null,
    },
    /**
     * Set the button’s type to “submit”.
     */
    submit: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(null|submit)/)
      },
    },
    /**
     * Set the button’s icon to display.
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * Style variation to give additional meaning.
     * `primary, secondary`
     */
    variation: {
      type: String,
      default: "default",
      validator: value => {
        return value.match(/(default|primary|secondary)/)
      },
    },
  },
  computed: {
    $_ocButton_iconClass() {
      return this.$slots.default
        ? "uk-position-small uk-position-center-left"
        : "uk-position-center"
    },
    $_ocButton_buttonClass() {
      let classes = ["oc-button"]

      if (this.variation) classes.push(`uk-button-${this.variation}`)

      if (this.size) classes.push(`uk-button-${this.size}`)

      return classes
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
```
  <template>
    <section>
      <h3 class="uk-heading-divider">
        Button Types
      </h3>
      <oc-button @click="onClick">Default Button</oc-button>
      <oc-button variation="primary">Primary Button</oc-button>
      <oc-button variation="secondary">Secondary Button</oc-button>
      <oc-button disabled>Disabled Button</oc-button>

      <h3 class="uk-heading-divider">
        Button sizes
      </h3>
      <oc-button size="large">Large</oc-button>
      <oc-button size="small">Small</oc-button>

      <h3 class="uk-heading-divider">
        Button with icons
      </h3>
      <oc-button icon="home">Home</oc-button>
      <oc-button variation="primary" icon="save">Save</oc-button>
      <oc-button icon="save" disabled>Save disabled</oc-button>
      <oc-button variation="primary" icon="cloud_upload" />

      <h3 class="uk-heading-divider">
        Using buttons in a group
      </h3>
      <div class="uk-button-group">
        <oc-button variation="primary">Hello</oc-button>
        <oc-button variation="secondary">What's up?</oc-button>
        <oc-button icon="folder">Demo Button</oc-button>
      </div>
    </section>
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
