<template>
  <div class="oc-modal-background">
    <div :class="$_ocModal_classes">
      <div class="oc-modal-title">
        <oc-icon
          v-if="icon"
          :name="icon"
          :variation="$_ocModal_titleIcon_variation"
        />
        <span v-text="title" />
      </div>
      <div class="oc-modal-body">
        <div
          v-if="$slots.content"
          key="modal-slot-content"
          class="oc-modal-body-message"
        >
          <slot name="content" />
        </div>
        <oc-text-input
          v-else-if="hasInput"
          key="modal-input"
          ref="ocModalInput"
          class="oc-modal-body-input"
          v-model="inputValue"
          :error-message="inputError"
          :label="inputLabel"
          :placeholder="inputPlaceholder"
          :disabled="inputDisabled"
          :fix-message-line="true"
          @keydown="$_ocModal_input_type"
          @change="$_ocModal_confirm"
        />
        <p
          v-else
          key="modal-message"
          class="oc-modal-body-message"
          v-text="message"
        />
        <div class="oc-modal-body-actions">
          <oc-button
            class="oc-modal-body-actions-cancel"
            @click="$_ocModal_buttonCancel_click"
            v-text="buttonCancelText"
          />
          <oc-button
            class="oc-modal-body-actions-confirm"
            :variation="$_ocModal_buttonConfirm_variation"
            :disabled="buttonConfirmDisabled"
            v-text="buttonConfirmText"
            @click="$_ocModal_confirm"
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
  name: "oc-modal",
  status: "ready",
  release: "1.3.0",

  components: {
    OcButton,
    OcIcon,
    OcTextInput
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
      validator: (variation) => {
        return variation.indexOf("info") > -1 || variation.indexOf("danger") > -1
      }
    },
    /**
     * Optional icon to be displayed next to the title
     */
    icon: {
      type: String,
      required: false
    },
    /**
     * Modal title
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Modal message. Can be replaced by content slot
     */
    message: {
      type: String,
      required: false
    },
    /**
     * Text of cancel button
     */
    buttonCancelText: {
      type: String,
      required: false,
      default: "Cancel"
    },
    /**
     * Text of confirm button
     */
    buttonConfirmText: {
      type: String,
      required: false,
      default: "Confirm"
    },
    /**
     * Asserts whether the confirm action is disabled
     */
    buttonConfirmDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Asserts whether the modal contains input
     */
    hasInput: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Value of the input
     */
    inputValue: {
      type: String,
      required: false
    },
    /**
     * Label of the input
     */
    inputLabel: {
      type: String,
      required: false
    },
    /**
     * Placeholder of the input
     */
    inputPlaceholder: {
      type: String,
      required: false
    },
    /**
     * Error of the input
     */
    inputError: {
      type: String,
      required: false
    },
    /**
     * Asserts whether the input is disabled or not
     */
    inputDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    $_ocModal_classes() {
      return ["oc-modal", `oc-modal-${this.variation}`]
    },

    $_ocModal_titleIcon_variation() {
      return this.variation === "info"
        ? "system"
        : this.variation
    },

    $_ocModal_buttonConfirm_variation() {
      return this.variation === "danger"
        ? "danger"
        : "primary"
    }
  },

  methods: {
    $_ocModal_buttonCancel_click() {
      /**
       * The user clicked on the cancel button
       */
      this.$emit("cancel")
    },

    $_ocModal_confirm() {
      /**
       * The user clicked on the confirm button. If input exists, emits it's value
       * 
       * @property {String} inputValue Value of the input
       */
      this.$emit("confirm", this.$refs.ocModalInput.value)
    },

    $_ocModal_input_type() {
      /**
       * The user typed into the input
       * 
       * @property {String} inputValue Value of the input
       */
      this.$emit("type", this.$refs.ocModalInput.value)
    }
  }
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
      class="uk-margin-large-bottom"
    />
    <oc-modal
      variation="danger"
      icon="warning"
      title="Delete file lorem.txt"
      message="Are you sure you want to delete this file? All it’s content will be permanently removed. This action cannot be undone."
      buttonCancelText="Cancel"
      buttonConfirmText="Delete"
      class="uk-margin-large-bottom"
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
      :buttonConfirmDisabled="true"
      class="uk-margin-large-bottom"
    />
    <oc-modal
      title="Rename file lorem.txt"
      buttonCancelText="Cancel"
      buttonConfirmText="Rename"
    >
      <template v-slot:content>
        <oc-text-input
          value="lorem.txt"
        />
      </template>
    </oc-modal>
  ```
</docs>
