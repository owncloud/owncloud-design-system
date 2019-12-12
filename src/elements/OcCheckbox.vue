<template>
  <label>
    <input
      class="oc-checkbox"
      type="checkbox"
      v-model="$_ocCheckbox_checkboxState"
      @change="$_ocCheckbox_change($event)"
      @click.stop
    />
    <span v-text="label" :class="{ 'oc-visually-hidden': hideLabel }" />
  </label>
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
    /**
     * Label of the Checkbox
     **/
    label: {
      type: String,
      required: true,
      default: null,
    },
    /**
     * Is the label of the Checkbox visually hidden?
     **/
    hideLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    $_ocCheckbox_change(event) {
      /**
       * State change event
       * @event change
       * @type {event}
       */
      this.$emit("change", event)
    },
  },
  computed: {
    $_ocCheckbox_checkboxState: {
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
                <oc-checkbox label="Label" />
                <oc-checkbox v-model="checkState1" label="Label"/>
                <div @click="parentClick">
                    <oc-checkbox label="Label" />
                </div>
            </section>

        </div>
    </template>
    <script>
        export default {
            data: () => ({
                checkState1: true
            }),
            methods: {
                parentClick: function () {
                    // we should never see this ;-)
                    alert('Click on parent received')
                }
            }
        }
    </script>
  ```
</docs>
