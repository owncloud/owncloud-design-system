<template>
  <div :class="_class" uk-alert>
    <oc-button
      v-if="!noClose"
      class="uk-alert-close"
      appearance="raw"
      :aria-label="$gettext('Close alert')"
      @click="onClose"
    >
      <oc-icon variation="inverse" name="close" size="small" />
    </oc-button>
    <slot />
  </div>
</template>

<script>
import OcButton from "./OcButton.vue"
import OcIcon from "./OcIcon.vue"

/**
 * Display success, warning and error messages.
 */
export default {
  name: "OcAlert",
  status: "ready",
  release: "1.0.0",
  components: {
    OcButton,
    OcIcon,
  },
  props: {
    /**
     * Defines if a close button is present
     */
    noClose: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * Style variation to give additional meaning.
     * Defaults to `passive`.
     * Can be `passive, primary, danger, success, warning`.
     */
    variation: {
      type: String,
      required: false,
      default: "passive",
      validator: value => {
        return value.match(/(passive|primary|success|warning|danger)/)
      },
    },
  },
  computed: {
    _class() {
      let classes = ["oc-alert"]

      if (this.variation) classes.push(`oc-alert-${this.variation}`)

      return classes
    },
  },
  methods: {
    onClose(val) {
      /**
       * The user closed / hid the alert
       * @event close
       * @type {boolean}
       */
      this.$emit("close", val)
    },
  },
}
</script>

<style lang="scss">
@mixin oc-alert-variation($color) {
  background-color: $color;

  &,
  * {
    color: var(--oc-color-text-inverse);
  }

  svg {
    fill: var(--oc-color-text-inverse);
  }
}

.uk-alert.oc-alert {
  &-passive {
    @include oc-alert-variation(var(--oc-color-swatch-passive-default));
  }

  &-primary {
    @include oc-alert-variation(var(--oc-color-swatch-primary-default));
  }

  &-success {
    @include oc-alert-variation(var(--oc-color-swatch-success-default));
  }

  &-warning {
    @include oc-alert-variation(var(--oc-color-swatch-warning-default));
  }

  &-danger {
    @include oc-alert-variation(var(--oc-color-swatch-danger-default));
  }
}
</style>

<docs>
```js
<div>
  <oc-alert>
    This is a plain alert-box.
  </oc-alert>
  <oc-alert variation="primary">
    <oc-icon name="info" variation="inverse" class="uk-float-left oc-mr-s" />
    I am nice and blue and have an icon
  </oc-alert>
  <oc-alert variation="success">
    Yes! It worked
  </oc-alert>
  <oc-alert variation="warning">
    Be carefull!
  </oc-alert>
  <oc-alert variation="danger">
    I'm in danger!
  </oc-alert>
</div>
```
</docs>
