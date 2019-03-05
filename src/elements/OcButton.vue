<template>
  <component
    :is="type"
    :href="href"
    :to="to"
    :type="submit"
    :class="['uk-button', 'uk-position-relative', `uk-button-${variation}`, `uk-button-${size}`]"
  >
    <oc-icon v-if="icon" class="uk-position-small uk-position-center-left" :name="icon"></oc-icon>
    <span><slot /></span>
  </component>
</template>

<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
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
      default: "medium",
      validator: value => {
        return value.match(/(small|medium|large)/)
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

<style lang="scss" scoped></style>

<docs>
  ```jsx
<section>
	<h3 class="uk-heading-divider">
		Button Types
	</h3>
	<oc-button>Default Button</oc-button>
	<oc-button variation="primary">Primary Button</oc-button>
	<oc-button variation="secondary">Secondary Button</oc-button>
	<oc-button disabled>Disabled Button</oc-button>

	<h3 class="uk-heading-divider">
		Button sizes
	</h3>
	<oc-button size="large">Large</oc-button>
	<oc-button size="medium">Medium</oc-button>
	<oc-button size="small">Small</oc-button>

	<h3 class="uk-heading-divider">
		Using Icons
	</h3>
	<oc-button icon="home">Demo Button</oc-button>
	<oc-button icon="close">Demo Button</oc-button>
	<oc-button icon="folder">Demo Button</oc-button>
</section>
  ```
</docs>
