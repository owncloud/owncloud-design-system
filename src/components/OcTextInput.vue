<template>
  <div>
    <label :id="labelId" class="oc-label" :for="inputId" v-text="label" />
    <input
      :id="inputId"
      v-bind="additionalAttributes"
      ref="input"
      :aria-labelledby="labelId"
      :aria-invalid="ariaInvalid"
      :class="{
        'oc-text-input': !stopClassPropagation,
        'oc-text-input-warning': !!warningMessage,
        'oc-text-input-danger': !!errorMessage,
      }"
      :type="type"
      :value="value"
      v-on="listeners"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target)"
    />
    <div v-if="showMessageLine" class="oc-text-input-message">
      <span
        :id="messageId"
        :class="{
          'oc-text-input-description': !!descriptionMessage,
          'oc-text-input-warning': !!warningMessage,
          'oc-text-input-danger': !!errorMessage,
        }"
        v-text="messageText"
      ></span>
    </div>
  </div>
</template>

<script>
import uniqueId from "../utils/uniqueId"

/**
 * Form Inputs are used to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the form `Textarea` element.*
 *
 * ## Accessibility
 * The label is required and represents the name of the input. The label element will automatically be referenced via
 * the `aria-labelledby` property.
 *
 * The description-message can be used additionally to give further information about the input field. When a
 * description is given, it will be automatically referenced via the `aria-describedby` property.
 * An error or warning will replace the description as well as the `aria-describedby` property until the error
 * or warning is fixed.
 */
export default {
  name: "OcTextInput",
  status: "review",
  release: "1.0.0",
  inheritAttrs: false,
  props: {
    /**
     * The ID of the element.
     */
    id: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The type of the form input field.
     * `text, number, email, password`
     */
    type: {
      type: String,
      default: "text",
      validator: value => {
        return value.match(/(text|number|email|password)/)
      },
    },
    /**
     * Text value of the form input field.
     * @model
     */
    value: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Accessible of the form input field, via aria-label.
     **/
    label: {
      type: String,
      required: true,
      default: null,
    },
    /**
     * Don't add the element class to this element.
     */
    stopClassPropagation: {
      type: Boolean,
      default: false,
    },
    /**
     * A warning message which is shown below the input.
     */
    warningMessage: {
      type: String,
      default: null,
    },
    /**
     * An error message which is shown below the input.
     */
    errorMessage: {
      type: String,
      default: null,
    },
    /**
     * Whether or not vertical space below the input should be reserved for a one line message,
     * so that content actually appearing there doesn't shift the layout.
     */
    fixMessageLine: {
      type: Boolean,
      default: false,
    },
    /**
     * A description text which is shown below the input field.
     */
    descriptionMessage: {
      type: String,
      default: null,
    },
  },
  computed: {
    showMessageLine() {
      return (
        this.fixMessageLine ||
        !!this.warningMessage ||
        !!this.errorMessage ||
        !!this.descriptionMessage
      )
    },
    listeners() {
      const listeners = this.$listeners

      // Delete listeners for events which are emitted via methods
      delete listeners["input"]
      delete listeners["focus"]

      return listeners
    },
    inputId() {
      if (this.id) {
        return this.id
      }
      return uniqueId("oc-textinput-")
    },
    labelId() {
      return `${this.inputId}-label`
    },
    messageId() {
      return `${this.inputId}-message`
    },
    additionalAttributes() {
      const additionalAttrs = {}
      if (!!this.warningMessage || !!this.errorMessage || !!this.descriptionMessage) {
        additionalAttrs["aria-describedby"] = this.messageId
      }
      return { ...this.$attrs, ...additionalAttrs }
    },
    ariaInvalid() {
      return (!!this.errorMessage).toString()
    },
    messageText() {
      if (this.errorMessage) {
        return this.errorMessage
      }

      if (this.warningMessage) {
        return this.warningMessage
      }

      return this.descriptionMessage
    },
  },
  methods: {
    /**
     * Puts focus on this input element
     * @public
     */
    focus() {
      this.$refs.input.focus()
    },
    onInput(value) {
      /**
       * Input event
       * @type {event}
       **/
      this.$emit("input", value)
    },
    onFocus(target) {
      target.select()
      /**
       * Focus event - emitted as soon as the input field is focused
       * @type {event}
       **/
      this.$emit("focus", target.value)
    },
  },
}
</script>

<docs>
    ```jsx
    <template>
        <section>
            <h3 class="uk-heading-divider">
                Input Types
            </h3>
            <oc-text-input class="oc-mb-s" label="Text"/>
            <oc-text-input class="oc-mb-s" disabled label="Disabled" value="I am disabled"/>
            <oc-text-input class="oc-mb-s" type="number" label="Number"/>
            <oc-text-input class="oc-mb-s" type="email" label="Email"/>
            <oc-text-input class="oc-mb-s" type="password" label="Password"/>
            <h3 class="uk-heading-divider">
                Binding
            </h3>
            <oc-text-input label="Text" v-model="inputValue"/>
            <oc-text-input disabled label="Text" v-model="inputValue"/>
            <h3 class="uk-heading-divider">
                Interactions
            </h3>
            <oc-button @click="_focus">Focus input below</oc-button>
            <oc-text-input label="Focus field" ref="inputForFocus"/>
            <oc-button @click="_focusAndSelect">Focus and select input below</oc-button>
            <oc-text-input label="Select field" value="Will you select this existing text?" ref="inputForFocusSelect"/>
            <h3 class="uk-heading-divider">
                Messages
            </h3>
            <oc-text-input
                    label="Input with description message below"
                    class="oc-mb-s"
                    description-message="This is a description message."
                    :fix-message-line="true"
            />
            <oc-text-input
                    label="Input with error and warning messages with reserved space below"
                    class="oc-mb-s"
                    v-model="valueForMessages"
                    :error-message="errorMessage"
                    :warning-message="warningMessage"
                    :fix-message-line="true"
            />
            <oc-text-input
                    label="Input with error and warning messages without reserved space below"
                    class="oc-mb-s"
                    v-model="valueForMessages"
                    :error-message="errorMessage"
                    :warning-message="warningMessage"
            />
        </section>
    </template>
    <script>
        export default {
            data: () => {
                return {
                    inputValue: 'initial',
                    valueForMessages: '',
                }
            },
            computed: {
              errorMessage() {
                return this.valueForMessages.length === 0 ? 'Value is required.' : ''
              },
              warningMessage() {
                return this.valueForMessages.endsWith(' ') ? 'Trailing whitespace should be avoided.' : ''
              }
            },
            methods: {
                _focus() {
                    this.$refs.inputForFocus.focus()
                },
                _focusAndSelect() {
                    this.$refs.inputForFocusSelect.focus()
                }
            }
        }
    </script>
    ```
</docs>
