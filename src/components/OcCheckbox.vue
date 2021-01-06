<template>
  <label :for="$_ocCheckbox_id" :class="{ 'oc-cursor-pointer': !disabled }">
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
import uniqueId from "../utils/uniqueId"
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
      required: false,
    },
    /**
     * Disables the checkbox
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The model of the checkbox. It determines, based on the option this checkbox represents, whether or not this
     * checkbox is checked. Provide it as value or bind it with v-model.
     *
     * Can be any type, but most common is boolean for singular checkbox use, or array when used in a group of checkboxes.
     **/
    value: {
      required: false,
    },
    /**
     * The value/object this checkbox represents.
     *
     * Can be of any type. If `value` is an array, the type of the option needs to match the value item types. If the
     * checkbox is used standalone (not in a group on a shared model) the option can be omitted.
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
      },
    },
    $_ocCheckbox_id() {
      return this.id || uniqueId("oc-checkbox-")
    },
    $_ocCheckbox_classes() {
      return ["oc-checkbox", "oc-checkbox-" + getSizeClass(this.size)]
    },
  },
}
</script>
<style lang="scss" scoped>
@mixin oc-form-check-size($factor) {
  height: $form-check-size-default * $factor;
  width: $form-check-size-default * $factor;
}

.oc-checkbox {
  @include oc-form-check-size(1);

  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: $input-background;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 80%;
  border: 1px solid $input-border;
  border-radius: 3px;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;

  &-s {
    @include oc-form-check-size(0.7);
  }

  &-m {
    @include oc-form-check-size(1);
  }

  &-l {
    @include oc-form-check-size(1.5);
  }

  &:hover {
    cursor: pointer;
  }

  &:checked,
  &:indeterminate {
    background-color: $input-background-checked;
  }

  &:checked {
    @include svg-fill($internal-form-checkbox-image, "#000", $form-radio-checked-icon-color);
  }

  &:indeterminate {
    @include svg-fill(
      $internal-form-checkbox-indeterminate-image,
      "#000",
      $form-radio-checked-icon-color
    );
  }

  &:disabled {
    background-color: $form-radio-disabled-background;
  }

  &:disabled:checked {
    @include svg-fill($internal-form-checkbox-image, "#000", $form-radio-disabled-icon-color);
  }
  &:disabled:indeterminate {
    @include svg-fill(
      $internal-form-checkbox-indeterminate-image,
      "#000",
      $form-radio-disabled-icon-color
    );
  }
}

label > .oc-checkbox + span {
  margin-left: $space-xsmall;
}
</style>
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
