<template>
  <div class="oc-alert" :class="_class" uk-alert>
    <oc-button
      v-if="!noClose"
      class="uk-alert-close"
      variation="raw"
      color="text"
      :aria-label="$gettext('Close alert')"
      @click="onClose"
    >
      <oc-icon name="close" size="small"></oc-icon>
    </oc-button>
    <slot />
  </div>
</template>

<script>
/**
 * Display success, warning and error messages.
 */
export default {
  name: "OcAlert",
  status: "review",
  release: "1.0.0",
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

<docs>
```vue
<div>
  <oc-alert>
    <p>
      This is a plain alert-box.
    </p>
  </oc-alert>
  <oc-alert variation="primary">
    <p>
      <oc-icon name="info" variation="inverse" class="uk-float-left oc-mr-s" />
      I am nice and blue and have an icon
    </p>
  </oc-alert>
  <oc-alert variation="success">
    <p>
      Yes! It worked
    </p>
  </oc-alert>
  <oc-alert variation="warning">
    <p>
      Be carefull!
    </p>
  </oc-alert>
  <oc-alert variation="danger">
    <p>
      I'm in danger!!
    </p>
  </oc-alert>
</div>
```
</docs>
