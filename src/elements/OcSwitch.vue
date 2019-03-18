<template>
  <div class="oc-switch" :data-state="state" @click="toggle">
    <input type="checkbox" @change="onChange" :aria-label="label" :checked="checked" />
  </div>
</template>
<script>
/**
 * The switch has two states between users can choose.
 */
export default {
  name: "oc-switch",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Default value can be `Boolean` or `String`
     *
     * @model
     **/

    model: {
      required: false,
      default: false,
      type: [Boolean, String],
    },
    /**
     * Label of the switch. Will set aria-label as well.
     **/
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  computed: {
    state() {
      return this.checked ? "on" : "off"
    },
  },
  methods: {
    toggle() {
      this.checked = !this.checked
    },
    onChange(val) {
      /**
       * Change event
       * @event change
       * @type {boolean}
       */
      this.$emit("change", this.val)
    },
  },
}
</script>
<style lang="scss" scoped></style>
<docs>
  ```jsx
  <div>
    <oc-switch label="Demo Label" />
  </div>
  ```
</docs>
