<template>
  <progress
    :value="value"
    :max="max"
    :aria-valuemax="max"
    :aria-valuenow="value"
    aria-busy="true"
    aria-valuemin="0"
    :class="$_ocProgress_classes"
    tabindex="-1"
  />
</template>

<script>
export default {
  name: "OcProgress",
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * The current progress.
     */
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * The maximum value. This represents 100% completion.
     */
    max: {
      type: Number,
      required: true,
    },
    /**
     * The size of the progress bar.
     * Can be `default` or `small`
     */
    size: {
      type: String,
      required: false,
      default: "default",
      validator: value => {
        return value.match(/(default|small)/)
      },
    },
    /**
     * The variation of the progress bar.
     * Defaults to `primary`.
     * Can be `passive, primary, danger, success, warning`.
     */
    variation: {
      type: String,
      required: false,
      default: "primary",
      validator: value => {
        return value.match(/(primary|passive|success|warning|danger)/)
      },
    },
  },

  computed: {
    $_ocProgress_classes() {
      return `oc-progress oc-progress-${this.size} oc-progress-${this.variation}`
    },
  },
}
</script>

<style lang="scss">
$progress-height: 15px !default;
$progress-height-small: 5px !default;

.oc-progress {
  // Remove default style
  -webkit-appearance: none;
  -moz-appearance: none;
  // Set background color for progress container in Firefox, IE11 and Edge
  background-color: var(--oc-color-input-border);
  // Remove default style
  border: 0;
  display: block;
  height: $progress-height;
  // Add the correct vertical alignment in Chrome, Firefox, and Opera.
  width: 100%;

  &:focus {
    outline: none;
  }

  // Remove animated circles for indeterminate state in IE11 and Edge
  &:indeterminate {
    color: transparent;
  }

  &::-webkit-progress-bar {
    background-color: var(--oc-color-input-border);
  }

  &::-moz-progress-bar {
    background-color: var(--oc-color-input-border);
  }

  // Remove progress bar for indeterminate state in Firefox
  &:indeterminate::-moz-progress-bar {
    width: 0;
  }

  &::-webkit-progress-value {
    background-color: var(--oc-color-swatch-passive-default);
    transition: width $transition-duration-short ease;
  }

  &::-ms-fill {
    background-color: var(--oc-color-swatch-passive-default);
    // Remove right border in IE11 and Edge
    border: 0;
    transition: width $transition-duration-short ease;
  }

  &-small {
    height: $progress-height-small;
  }

  &-primary {
    &::-webkit-progress-value {
      background-color: var(--oc-color-swatch-primary-default);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-color-swatch-primary-default);
    }

    &::-ms-fill {
      background-color: var(--oc-color-swatch-primary-default);
    }
  }

  &-success {
    &::-webkit-progress-value {
      background-color: var(--oc-color-swatch-success-default);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-color-swatch-success-default);
    }

    &::-ms-fill {
      background-color: var(--oc-color-swatch-success-default);
    }
  }

  &-warning {
    &::-webkit-progress-value {
      background-color: var(--oc-color-swatch-warning-default);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-color-swatch-warning-default);
    }

    &::-ms-fill {
      background-color: var(--oc-color-swatch-warning-default);
    }
  }

  &-danger {
    &::-webkit-progress-value {
      background-color: var(--oc-color-swatch-danger-default);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-color-swatch-danger-default);
    }

    &::-ms-fill {
      background-color: var(--oc-color-swatch-danger-default);
    }
  }
}
</style>

<docs>
Show progress to the users.

```js
<div>
  <oc-progress :value="4" :max="10" class="oc-mb-s" />
  <oc-progress :value="8" :max="10" size="small" variation="warning" />
</div>
```
</docs>
