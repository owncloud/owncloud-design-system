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
    role="progressbar"
  />
</template>

<script>
export default {
  name: "OcProgress",
  status: "review",
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
  background-color: var(--oc-input-border);
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
    background-color: var(--oc-input-border);
  }

  &::-moz-progress-bar {
    background-color: var(--oc-input-border);
  }

  // Remove progress bar for indeterminate state in Firefox
  &:indeterminate::-moz-progress-bar {
    width: 0;
  }

  &::-webkit-progress-value {
    background-color: var(--oc-variation-passive);
    transition: width $transition-duration-short ease;
  }

  &::-ms-fill {
    background-color: var(--oc-variation-passive);
    // Remove right border in IE11 and Edge
    border: 0;
    transition: width $transition-duration-short ease;
  }

  &-small {
    height: $progress-height-small;
  }

  &-primary {
    &::-webkit-progress-value {
      background-color: var(--oc-variation-primary);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-variation-primary);
    }

    &::-ms-fill {
      background-color: var(--oc-variation-primary);
    }
  }

  &-success {
    &::-webkit-progress-value {
      background-color: var(--oc-variation-success);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-variation-success);
    }

    &::-ms-fill {
      background-color: var(--oc-variation-success);
    }
  }

  &-warning {
    &::-webkit-progress-value {
      background-color: var(--oc-variation-warning);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-variation-warning);
    }

    &::-ms-fill {
      background-color: var(--oc-variation-warning);
    }
  }

  &-danger {
    &::-webkit-progress-value {
      background-color: var(--oc-variation-danger);
    }

    &::-moz-progress-bar {
      background-color: var(--oc-variation-danger);
    }

    &::-ms-fill {
      background-color: var(--oc-variation-danger);
    }
  }
}
</style>

<docs>
Show progress to the users.

```vue
<div>
  <oc-progress :value="4" :max="10" class="oc-mb-s" />
  <oc-progress :value="8" :max="10" size="small" variation="warning" />
</div>
```
</docs>
