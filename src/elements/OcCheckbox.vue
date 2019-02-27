<template>
  <input type="checkbox" v-model="model" @change="onChange" class="uk-checkbox" />
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
  },
  methods: {
    onChange(val) {
      /**
       * Change event
       * @event change
       * @type {boolean}
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
    <oc-checkbox />
  </div>
  ```
</docs>
