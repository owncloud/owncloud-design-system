<template>
  <div class="oc-switch" :data-state="state" @click="toggle">
    <input type="checkbox" @change="onChange" :aria-label="label" :checked="checked" />
  </div>
</template>
<script>
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
      type: [Boolean],
    },
    /**
     * Label of the Switch. Will set aria-label aswell.
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
