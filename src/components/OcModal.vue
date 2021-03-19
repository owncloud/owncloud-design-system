<template>
  <div class="oc-modal-background">
    <div ref="$_ocModal" :class="classes" tabindex="0">
      <div class="oc-modal-title">
        <oc-icon v-if="icon" :name="icon" :variation="variation" />
        <span v-text="title" />
      </div>
      <div class="oc-modal-body">
        <div v-if="$slots.content" key="modal-slot-content" class="oc-modal-body-message">
          <slot name="content" />
        </div>
        <oc-text-input
          v-else-if="hasInput"
          key="modal-input"
          ref="ocModalInput"
          v-model="input_value"
          class="oc-modal-body-input"
          :error-message="inputError"
          :label="inputLabel"
          :placeholder="inputPlaceholder"
          :disabled="inputDisabled"
          :fix-message-line="true"
          @input="inputOnInput"
          @keydown.enter="confirm"
        />
        <p v-else key="modal-message" class="oc-modal-body-message" v-text="message" />
        <div class="oc-modal-body-actions uk-flex uk-flex-right">
          <oc-button
            class="oc-modal-body-actions-cancel"
            :variation="buttonCancelVariation"
            :appearance="buttonCancelAppearance"
            @click="buttonCancelOnClick"
            v-text="buttonCancelText"
          />
          <oc-button
            class="oc-modal-body-actions-confirm oc-ml-s"
            :variation="buttonConfirmVariation"
            :appearance="buttonConfirmAppearance"
            :disabled="buttonConfirmDisabled || !!inputError"
            @click="confirm"
            v-text="buttonConfirmText"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OcButton from "./OcButton.vue"
import OcIcon from "./OcIcon.vue"
import OcTextInput from "./OcTextInput.vue"

/**
 * Modals are generally used to force the user to focus on confirming or completing a single action.
 *
 * ## Background and position
 * Every modal gets automatically added a background which spans the whole width and height.
 * The modal itself is aligned to center both vertically and horizontally.
 *
 * ## Variations
 * Only use the `danger` variation if the action cannot be undone.
 *
 * The overall variation defines the modal's top border and heading (plus optional item) text color,
 * while both buttons default to the `passive` variation and can be targeted individually (see examples and API docs below).
 *
 */
export default {
  name: "OcModal",
  status: "ready",
  release: "1.3.0",

  components: {
    OcButton,
    OcIcon,
    OcTextInput,
  },

  props: {
    /**
     * Modal variation
     * Defaults to `passive`.
     * Can be `passive, primary, danger, success, warning`.
     */
    variation: {
      type: String,
      required: false,
      default: "passive",
      validator: value => {
        return value.match(/(passive|primary|danger|success|warning)/)
      },
    },
    /**
     * Optional icon to be displayed next to the title
     */
    icon: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Modal title
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Modal message. Can be replaced by content slot
     */
    message: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Text of the cancel button
     */
    buttonCancelText: {
      type: String,
      required: false,
      default: "Cancel",
    },
    /**
     * Variation type of the cancel button
     */
    buttonCancelVariation: {
      type: String,
      required: false,
      default: "passive",
    },
    /**
     * Appearance of the cancel button
     */
    buttonCancelAppearance: {
      type: String,
      required: false,
      default: "outline",
    },
    /**
     * Text of the confirm button
     */
    buttonConfirmText: {
      type: String,
      required: false,
      default: "Confirm",
    },
    /**
     * Variation type of the confirm button
     */
    buttonConfirmVariation: {
      type: String,
      required: false,
      default: "passive",
    },
    /**
     * Appearance of the confirm button
     */
    buttonConfirmAppearance: {
      type: String,
      required: false,
      default: "filled",
    },
    /**
     * Asserts whether the confirm action is disabled
     */
    buttonConfirmDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Asserts whether the modal contains input
     */
    hasInput: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Value of the input
     */
    inputValue: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Label of the input
     */
    inputLabel: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Placeholder of the input
     */
    inputPlaceholder: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Error of the input
     */
    inputError: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Asserts whether the input is disabled or not
     */
    inputDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      input_value: null,
      appearance: "outline",
    }
  },
  computed: {
    classes() {
      return ["oc-modal", `oc-modal-${this.variation}`]
    },
  },
  watch: {
    inputValue: {
      handler: "inputAssignPropAsValue",
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.$_ocModal.focus()
    })
  },
  methods: {
    buttonCancelOnClick() {
      /**
       * The user clicked on the cancel button
       */
      this.$emit("cancel")
    },
    confirm() {
      if (this.buttonConfirmDisabled || this.inputError) {
        return
      }
      /**
       * The user clicked on the confirm button. If input exists, emits it's value
       *
       * @property {String} value Value of the input
       */
      this.$emit("confirm", this.input_value)
    },
    inputOnInput(value) {
      /**
       * The user typed into the input
       *
       * @property {String} value Value of the input
       */
      this.$emit("input", value)
    },
    inputAssignPropAsValue(value) {
      this.input_value = value
    },
  },
}
</script>

<docs>
```vue
  <oc-modal
    icon="info"
    title="Accept terms of use"
    message="Do you accept our terms of use?"
    buttonCancelText="Decline"
    buttonConfirmText="Accept"
    class="oc-mb-l uk-position-relative"
  />
  <oc-modal
    variation="danger"
    icon="warning"
    title="Delete file lorem.txt"
    message="Are you sure you want to delete this file? All it’s content will be permanently removed. This action cannot be undone."
    buttonCancelText="Cancel"
    buttonConfirmText="Delete"
    buttonConfirmAppearance="filled"
    buttonConfirmVariation="danger"
    class="oc-mb-l uk-position-relative"
  />
  <oc-modal
    title="Create new folder"
    buttonCancelText="Cancel"
    buttonConfirmText="Create"
    :hasInput="true"
    inputValue="New folder"
    inputLabel="Folder name"
    inputPlaceholder="Enter a folder name"
    inputError="This name is already taken"
    class="oc-mb-l uk-position-relative"
  />
  <oc-modal
    title="Rename file lorem.txt"
    buttonCancelText="Cancel"
    buttonCancelVariation="warning"
    buttonConfirmText="Rename"
    class="uk-position-relative"
  >
    <template v-slot:content>
      <oc-text-input
        value="lorem.txt"
        label="File name"
      />
    </template>
  </oc-modal>
```
</docs>
