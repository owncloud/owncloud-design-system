<template>
  <label class="radio-container">
    <span class="label" v-text="label" />
    <input type="radio" v-model="model" :value="value" name="radio" @change="$_ocRadio_change" />
    <span class="checkmark"></span>
  </label>
</template>
<script>
/**
 * The radio element. Can be grouped to give the user to choose between different options.
 */
export default {
  name: "oc-radio",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Data-model
     *
     * No type: can be an object, a number or a string but must be same as value
     *
     * @model
     **/
    model: {
      required: false,
    },
    /**
     * Value
     *
     * No type: can be an object, a number or a string but must be same as model
     **/
    value: {
      required: false,
    },
    /**
     * Label of the Radio.
     **/
    label: {
      type: String,
      required: true,
      default: null,
    },
  },
  methods: {
    $_ocRadio_change(val) {
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
    <oc-radio label="Water" />
    <oc-radio label="Wine" />
    <oc-radio label="Beer" />
  </div>
  ```
</docs>
