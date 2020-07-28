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
  name: "oc-progress",
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
      default: "default"
    },
    /**
     * The variation of the progress bar.
     * Can be `primary` or `warning`
     */
    variation: {
      type: String,
      required: false,
      default: "primary"
    }
  },

  computed: {
    $_ocProgress_classes() {
      return `oc-progress oc-progress-${this.size} oc-progress-${this.variation}`
    }
  }
}
</script>
<docs>
Show progress to the users.

```jsx
<div>
  <oc-progress :value="4" :max="10" class="uk-margin-small-bottom" />
  <oc-progress :value="8" :max="10" size="small" variation="warning" />
</div>
```
</docs>
