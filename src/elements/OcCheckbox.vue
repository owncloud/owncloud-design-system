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
     **/
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    checkboxState: {
      get: function() {
        return this.value
      },
      set: function(value) {
        /**
         * State change event
         * @event input
         * @type {event}
         */
        this.$emit("input", value)
      },
    },
  },
}
</script>
<docs>
  ```
    <template>
        <div>
            <section>
                <h3 class="uk-heading-divider">
                    Checkboxes Types
                </h3>
                <oc-checkbox />
                <oc-checkbox v-model="checkState1"/>
            </section>

        </div>
    </template>
    <script>
        export default {
            data: () => ({
                checkState1: true
            })
        }
    </script>
  ```
</docs>
