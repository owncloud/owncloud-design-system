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

<style lang="scss" scoped>
.button {
  @include reset;
  @include stack-space($space-m);
  @include inline-space($space-xs);
  will-change: transform;
  transition: all 0.2s ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: $weight-semi-bold;
  font-size: $size-m;
  font-family: $font-text;
  line-height: $line-height-m;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  box-shadow: inset 0 0 0 2px $color-oc-blue;
  border-radius: $radius-default;
  background: transparent;
  color: $color-oc-blue;
  cursor: pointer;
  &:hover,
  &.hover {
    color: $color-white;
    background: $color-oc-blue;
    transform: translateZ(0) scale(1.03);
  }
  &:active,
  &.active {
    transition: none;
    background: $color-oc-blue-dark;
    box-shadow: none;
    color: $color-white;
    transform: translateZ(0) scale(1);
  }

  &:focus,
  &.focus {
    background: $color-oc-blue-darker;
    box-shadow: none;
    color: $color-white;
    transform: translateZ(0) scale(1);
    outline: 0;
  }

  // For icons inside buttons
  .icon {
    float: right;
    margin: -#{$space-xs} -#{$space-xs} -#{$space-s} $space-xs/2;
    color: $color-bleu-de-france;
  }

  // Various button sizes
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
  // Primary button
  &.primary {
    background: $color-oc-blue;
    color: $color-white;
    box-shadow: none;
    &:hover,
    &.hover {
      background-color: shade($color-oc-blue, 12%);
    }
    &:active,
    &.active {
      background-color: shade($color-oc-blue, 20%);
      transition: none;
    }
    &:focus {
      outline: 0;
    }
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
