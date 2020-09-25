<template>
  <label :for="$_ocCheckbox_id" :class="{'oc-cursor-pointer': !disabled}">
    <input
      type="checkbox"
      name="checkbox"
      :id="$_ocCheckbox_id"
      :aria-label="label"
      :class="$_ocCheckbox_classes"
      v-model="$_ocCheckbox_model"
      :value="option"
      :disabled="disabled"
    />
    <span v-if="!hideLabel" v-text="label" :aria-hidden="true" />
  </label>
</template>
<script>
import { getSizeClass } from "../utils/sizeClasses"
import * as _uniqueId from "../utils/uniqueId"
/**
 * A checkbox input element. The checkbox is either checked or unchecked.
 */
export default {
  name: "oc-checkbox",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Id for the checkbox. If it's empty, a generated one will be used.
     */
    id: {
      type: String,
      required: false
    },
    /**
     * Disables the checkbox
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The model of the checkbox. Bind it with v-model.
     **/
    value: {
      required: false
    },
    /**
     * The value of this checkbox
     *
     * Can be of any type. If the model is an array, the type of the value needs to match the model item types.
     **/
    option: {
      required: false,
      default: null,
    },
    /**
     * Label of the Checkbox
     *
     * Always required for aria-label property. If you want to hide the label, use `hideLabel` property.
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
    /**
     * Size of the Checkbox. Valid values are `small`, `medium` and `large`.
     * If not specified, defaults to `medium`
     */
    size: {
      type: String,
      required: false,
      default: "medium",
      validator: size => /(small|medium|large)/.test(size),
    },
  },
  computed: {
    $_ocCheckbox_model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    },
    $_ocCheckbox_id() {
      return this.id || _uniqueId("oc-checkbox-")
    },
    $_ocCheckbox_classes() {
      return ["oc-checkbox", "oc-checkbox-" + getSizeClass(this.size)]
    },
  }
}
</script>
<docs>
  ```
    <template>
        <div>
            <section>
                <h3 class="uk-heading-divider oc-mt-s">
                    Checkboxes Types
                </h3>
                <div class="oc-mb-s">
                  <oc-checkbox size="small" label="Small checkbox" aria-label="Small checkbox"/>
                </div>
                <div class="oc-mb-s">
                  <oc-checkbox :value="true" label="Medium checkbox (default)"/>
                </div>
                <div>
                    <oc-checkbox size="large" label="Large checkbox" />
                </div>
            </section>
        </div>
    </template>
  ```
  ```
  <template>
    <div>
      <section>
        <h3 class="uk-heading-divider oc-mt-s">
          Checkbox group with array model
        </h3>
        <div class="oc-mb-s">
          <oc-checkbox
              v-for="o in availableOptions"
              :key="'option-' + o"
              v-model="selectedOptions"
              :option="o"
              :label="o"
              class="oc-mr-s"
          />
        </div>
        Selected option: {{ selectedOptions || "None" }}
      </section>
    </div>
  </template>
  <script>
    export default {
      data: () => ({
        availableOptions: ["Water", "Wine", "Beer"],
        selectedOptions: []
      })
    }
  </script>
  ```
</docs>
