<template>
  <section>
    <label v-if="label"
      ><input
        class="uk-checkbox uk-margin-small-right"
        type="checkbox"
        v-model="model"
        @change="onChange"
      />{{ label }}</label
    >
    <input v-else class="uk-checkbox" type="checkbox" v-model="model" @change="onChange" />
  </section>
</template>
<script>
export default {
  name: "oc-checkbox",
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
     * Label of the Checkbox. Will set aria-label aswell
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
<docs>
  ```jsx
<div>
	<oc-checkbox />
	<oc-checkbox label="Test Label" />
</div>
  ```
</docs>
