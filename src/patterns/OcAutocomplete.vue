<template>
  <div>
    <oc-text-input :disabled="loading" :placeholder="label" @change="userInput"></oc-text-input>
    <oc-spinner v-if="loading"></oc-spinner>
  </div>
</template>

<script>
import OcSpinner from "../elements/OcSpinner"
import OcTextInput from "../elements/OcTextInput"

/**
 * The autocomplete component is used for searching in bigger list of data (usually involves remote calls over the network)
 * and presenting the user a list of possible matches to the entered search term.
 *
 * The component supports single select only at the moment.
 */
export default {
  name: "oc-autocomplete",
  components: { OcTextInput, OcSpinner },
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Informative label about the data to be entered
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * Is set to true data is loaded and the user cannot enter further data
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * The elements from which the user can select
     */
    items: {
      type: Array,
      default: function() {
        return []
      },
    },
    /**
     * The selected element
     */
    value: {
      type: String,
    },
  },
  methods: {
    userInput(value) {
      /**
       * This event is emitted as soon as the user changes the search term
       */
      this.$emit("update:search-input", value)
    },
  },
}
</script>

<style scoped></style>

<docs>
    ```jsx
    <div>
        <oc-autocomplete :loading="true" label="Add user or group ..."></oc-autocomplete>
        <oc-autocomplete :items="['Alice', 'Bob', 'Chuck']"
                         label="Add user or group ..."
        />
    </div>
    ```
</docs>
