<template>
  <div class="oc-modal-background" aria-labelledby="oc-modal-title">
    <focus-trap :active="true" :initial-focus="getInitialFocusRef">
      <div
        ref="ocModal"
        :class="classes"
        tabindex="0"
        role="dialog"
        aria-modal="true"
        @keydown.esc="cancelModalAction"
      >
        <div class="oc-modal-title">
          <oc-icon v-if="icon" :name="icon" :variation="variation" />
          <h2 id="oc-modal-title" v-text="title" />
        </div>
        <div class="oc-modal-body">
          <div v-if="$slots.content" key="modal-slot-content" class="oc-modal-body-message">
            <slot name="content" />
          </div>
          <oc-text-input
            v-else-if="hasInput"
            key="modal-input"
            ref="ocModalInput"
            v-model="userInputValue"
            class="oc-modal-body-input"
            :error-message="inputError"
            :label="inputLabel"
            :description-message="inputDescription"
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
              @click="cancelModalAction"
              v-text="buttonCancelText"
            />
            <oc-button
              class="oc-modal-body-actions-confirm oc-ml-s"
              :variation="buttonConfirmVariation || variation"
              :appearance="buttonConfirmAppearance"
              :disabled="buttonConfirmDisabled || !!inputError"
              @click="confirm"
              v-text="buttonConfirmText"
            />
          </div>
        </div>
      </div>
    </focus-trap>
  </div>
</template>

<script>
import OcButton from "../../atoms/OcButton/OcButton.vue"
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import OcTextInput from "../../molecules/OcTextInput/OcTextInput.vue"
import { FocusTrap } from "focus-trap-vue"

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
 * The overall variation defines the modal's top border, heading (including an optional item) text color and the
 * variation of the confirm button, while the cancel buttons defaults to the `passive` variation. Both button's
 * variations and appearances can be targeted individually (see examples and API docs below).
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
    FocusTrap,
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
      validator: value => {
        return value.match(/(passive|primary|danger|success|warning)/)
      },
    },
    /**
     * Appearance of the cancel button
     */
    buttonCancelAppearance: {
      type: String,
      required: false,
      default: "outline",
      validator: value => {
        return value.match(/(outline|filled|raw)/)
      },
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
      default: null,
      validator: value => {
        return value === null || value.match(/(passive|primary|danger|success|warning)/)
      },
    },
    /**
     * Appearance of the confirm button
     */
    buttonConfirmAppearance: {
      type: String,
      required: false,
      default: "filled",
      validator: value => {
        return value.match(/(outline|filled|raw)/)
      },
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
     * Additional description message for the input field
     */
    inputDescription: {
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
      userInputValue: null,
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
  methods: {
    cancelModalAction() {
      /**
       * The user clicked on the cancel button or hit the escape key
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
      this.$emit("confirm", this.userInputValue)
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
      this.userInputValue = value
    },
    getInitialFocusRef() {
      if (this.hasInput) {
        return this.$refs.ocModalInput
      }
      return this.$refs.ocModal
    },
  },
}
</script>

<style lang="scss">
@mixin oc-modal-variation($color) {
  border-top-color: $color;

  span {
    color: $color;
  }
}

.oc-modal {
  border-radius: 8px;
  border-top: 10px solid var(--oc-color-swatch-passive-default);
  box-shadow: 0 2px 4px rgba(14, 30, 37, 0.25);
  max-width: 500px;
  overflow: hidden;
  width: 100%;

  &:focus {
    outline: none;
  }

  &-background {
    align-items: center;
    background-color: rgba(100, 100, 100, 0.3);
    display: flex;
    flex-flow: row wrap;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 4;
  }

  &-primary {
    @include oc-modal-variation(var(--oc-color-swatch-primary-default));
  }

  &-success {
    @include oc-modal-variation(var(--oc-color-swatch-success-default));
  }

  &-warning {
    @include oc-modal-variation(var(--oc-color-swatch-warning-default));
  }

  &-danger {
    @include oc-modal-variation(var(--oc-color-swatch-danger-default));
  }

  &-title {
    align-items: center;
    background-color: var(--oc-color-text-inverse);
    display: flex;
    flex-flow: row wrap;
    padding: var(--oc-space-small) var(--oc-space-medium);

    > .oc-icon {
      margin-right: var(--oc-space-small);
    }

    > h2 {
      font-size: 1rem;
      font-weight: bold;
      margin: 0;
    }
  }

  &-body {
    background-color: var(--oc-color-background-muted);
    color: var(--oc-color-text-default);
    padding: var(--oc-space-medium);

    &-message {
      margin-bottom: var(--oc-space-medium);
    }

    &-input {
      /* FIXME: this is ugly, but required so that the bottom padding doesn't look off when reserving vertical space for error messages below the input. */
      margin-bottom: -20px;
      padding-bottom: var(--oc-space-medium);
    }

    &-actions {
      text-align: right;

      .oc-button {
        border-radius: 4px;

        &.uk-button-default {
          background-color: var(--oc-color-text-inverse);
          color: var(--oc-color-text-default);
        }
      }
    }
  }
}
</style>

<!-- <docs>
```js
  <oc-modal
    icon="info"
    title="Accept terms of use"
    message="Do you accept our terms of use?"
    button-cancel-text="Decline"
    button-confirm-text="Accept"
    class="oc-mb-l uk-position-relative"
  />
  <oc-modal
    variation="danger"
    icon="warning"
    title="Delete file lorem.txt"
    message="Are you sure you want to delete this file? All it’s content will be permanently removed. This action cannot be undone."
    button-cancel-text="Cancel"
    button-confirm-text="Delete"
    button-confirm-appearance="filled"
    button-confirm-variation="danger"
    class="oc-mb-l uk-position-relative"
  />
  <oc-modal
    title="Create new folder"
    button-cancel-text="Cancel"
    button-confirm-text="Create"
    :has-input="true"
    input-value="New folder"
    input-label="Folder name"
    input-description="Enter a folder name"
    input-error="This name is already taken"
    class="oc-mb-l uk-position-relative"
  />
  <oc-modal
    title="Rename file lorem.txt"
    button-cancel-text="Cancel"
    button-cancel-variation="warning"
    button-confirm-text="Rename"
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

## Focus trap
When the modal is displayed, it should not be possible to reach any element outside of the modal. To protect this also for keyboard navigation, focus trap should be activate via prop `focusTrapActive`.
If activated, only focusable elements within the modal are reachable via keyboard navigation.

```js
<template>
  <div>
    <oc-button @click="active = !active">Toggle focus trap</oc-button>
    <p>Focus trap active: {{ active }}</p>
    <oc-modal
      icon="info"
      title="Accept terms of use"
      message="Do you accept our terms of use?"
      button-cancel-text="Decline"
      button-confirm-text="Accept"
      class="oc-mb-l uk-position-relative"
      :focus-trap-active="active"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    active: false
  })
}
</script>
```
</docs> -->
