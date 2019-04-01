<template>
  <component
    :is="type"
    :href="href"
    :to="to"
    :type="submit"
    :text="text"
    :class="$_ocButton_buttonClass"
    @click="onClick"
  >
    <oc-icon v-if="icon" :class="$_ocButton_iconClass" :name="icon"></oc-icon>
    <slot>
      <span v-if="text" v-text="text" />
    </slot>
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
    arialabel: {
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
    /**
     * Text do be displayed in the button
     */
    text: {
      type: String,
      default: null,
    },
  },
  computed: {
    $_ocButton_iconClass() {
      return this.text ? "uk-position-small uk-position-center-left" : "uk-position-center"
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
      <oc-button text="Default Button" @click="onClick"/>
      <oc-button text="Primary Button" variation="primary" />
      <oc-button text="Secondary Button" variation="secondary" />
      <oc-button text="Disabled Button" disabled />
      <oc-button>Button with text in slot</oc-button>

      <h3 class="uk-heading-divider">
        Button sizes
      </h3>
      <oc-button text="Large" size="large" />
      <oc-button text="Small" size="small" />

      <h3 class="uk-heading-divider">
        Using buttons in a group
      </h3>
      <div class="uk-button-group">
        <oc-button variation="primary" icon="home" />
        <oc-button variation="secondary" icon="close" />
        <oc-button text="Demo Button" icon="folder" />
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
