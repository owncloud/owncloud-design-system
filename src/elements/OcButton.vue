<template>
  <component :is="type" :href="href" :to="to" :type="submit" :class="classes">
    <slot />
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
     * Style variation to give additional meaning.
     * `primary, secondary`
     */
    variation: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(primary|secondary)/)
      },
    },
  },
  computed: {
    classes() {
      if (this.variation === "primary") {
        return ["uk-button", "uk-button-primary", this.size]
      }
      if (this.variation === "secondary") {
        return ["uk-button", "uk-button-secondary", this.size]
      }
      return ["uk-button", this.size]
    },
  },
}
</script>

<style lang="scss" scoped>
.uk-button {
  text-transform: none;
  &.large {
    @include inset-squish-space($space-s);
    font-size: $size-l;
  }
  &.medium {
    @include inset-squish-space($space-s);
    font-size: $size-m;
  }
  &.small {
    @include inset-squish-space($space-xs);
    font-size: $size-s;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <oc-button size="large">Default Button</oc-button>
    <oc-button size="medium">Medium</oc-button>
    <oc-button size="small">Small</oc-button>
    <br />
    <oc-button variation="primary" size="large">Primary Button</oc-button>
    <oc-button variation="primary" size="medium">Medium</oc-button>
    <oc-button variation="primary" size="small">Small</oc-button>
    <br />
    <oc-button variation="secondary" size="large">Secondary Button</oc-button>
    <oc-button variation="secondary" size="medium">Medium</oc-button>
    <oc-button variation="secondary" size="small">Small</oc-button>
    <br />
    <oc-button size="large"><oc-icon name="home"></oc-icon></oc-button>
    <oc-button size="medium"><oc-icon name="home"></oc-icon></oc-button>
    <oc-button size="small"><oc-icon name="home"></oc-icon></oc-button>
  </div>
  ```
</docs>
