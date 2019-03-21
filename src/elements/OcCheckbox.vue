<template>
  <input class="uk-checkbox" type="checkbox" v-model="checkboxState" />
</template>
<script>
/**
 * A checkbox input element. The checkbox is either checked or unchecked.
 */
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
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    checkboxState: {
      get: function() {
        return this.model
      },
      set: function(value) {
        /**
         * State change event
         * @event stateChanged
         * @type {event}
         */
        this.$emit("stateChanged", value)
      },
    },
  },
}
</script>
<docs>
  ```jsx
  <div>
    <section>
      <h3 class="uk-heading-divider">
        Checkboxes Types
      </h3>
      <oc-checkbox />
      <oc-checkbox :model="true"/>
    </section>

  </div>
  ```
</docs>
