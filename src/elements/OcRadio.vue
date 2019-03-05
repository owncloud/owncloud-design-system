<template>
  <label class="radio-container">
    <span class="label">{{ label }}</span>
    <input type="radio" v-model="model" name="radio" :aria-label="label" @change="onChange" />
    <span class="checkmark"></span>
  </label>
</template>
<script>
export default {
  name: "oc-radio",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Data-model
     *
     * @model
     **/
    model: {
      type: Object,
      required: false,
    },
    /**
     * Label of the Radio. Will set aria-label aswell.
     **/
    label: {
      type: String,
      default: null,
    },
  },
  methods: {
    onChange(val) {
      /**
       * The onChange event
       * @event change
       * @type {event}
       */
      this.$emit("change", val)
    },
  },
}
</script>
<style lang="scss" scoped></style>
<docs>
  ```jsx
  <div>
    <oc-radio label="Demo Label" />
  </div>
  ```
</docs>
