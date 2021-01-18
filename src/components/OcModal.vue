<template>
  <div class="oc-modal-background">
    <div ref="$_ocModal" :class="$_ocModal_classes" tabindex="0">
      <div class="oc-modal-title">
        <oc-icon v-if="icon" :name="icon" :variation="$_ocModal_titleIcon_variation" />
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
          v-model="$_ocModal_input_value"
          class="oc-modal-body-input"
          :error-message="inputError"
          :label="inputLabel"
          :placeholder="inputPlaceholder"
          :disabled="inputDisabled"
          :fix-message-line="true"
          @input="$_ocModal_input_onInput"
          @keydown.enter="$_ocModal_confirm"
        />
        <p v-else key="modal-message" class="oc-modal-body-message" v-text="message" />
        <div class="oc-modal-body-actions uk-flex uk-flex-right">
          <oc-button
            class="oc-modal-body-actions-cancel"
            @click="$_ocModal_buttonCancel_click"
            v-text="buttonCancelText"
          />
          <oc-button
            class="oc-modal-body-actions-confirm oc-ml-s"
            :variation="$_ocModal_buttonConfirm_variation"
            :disabled="buttonConfirmDisabled || !!inputError"
            @click="$_ocModal_confirm"
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
 * ## Danger variation
 * Use only if the action cannot be undone.
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
     * Can be: `info`, `danger`
     */
    variation: {
      type: String,
      required: false,
      default: "info",
      validator: variation => {
        return variation === "info" || variation === "danger"
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
     * Text of cancel button
     */
    buttonCancelText: {
      type: String,
      required: false,
      default: "Cancel",
    },
    /**
     * Text of confirm button
     */
    buttonConfirmText: {
      type: String,
      required: false,
      default: "Confirm",
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
      $_ocModal_input_value: null,
    }
  },

  computed: {
    $_ocModal_classes() {
      return ["oc-modal", `oc-modal-${this.variation}`]
    },

    $_ocModal_titleIcon_variation() {
      return this.variation === "info" ? "system" : this.variation
    },

    $_ocModal_buttonConfirm_variation() {
      return this.variation === "danger" ? "danger" : "primary"
    },
  },

  watch: {
    inputValue: {
      handler: "$_ocModal_input_assignPropAsValue",
      immediate: true,
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.$_ocModal.focus()
    })
  },

  methods: {
    $_ocModal_buttonCancel_click() {
      /**
       * The user clicked on the cancel button
       */
      this.$emit("cancel")
    },

    $_ocModal_confirm() {
      if (this.buttonConfirmDisabled || this.inputError) {
        return
      }

      /**
       * The user clicked on the confirm button. If input exists, emits it's value
       *
       * @property {String} value Value of the input
       */
      this.$emit("confirm", this.$_ocModal_input_value)
    },

    $_ocModal_input_onInput(value) {
      /**
       * The user typed into the input
       *
       * @property {String} value Value of the input
       */
      this.$emit("input", value)
    },

    $_ocModal_input_assignPropAsValue(value) {
      this.$_ocModal_input_value = value
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
