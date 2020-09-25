<template>
  <div>
    <input
      v-bind="$attrs"
      :aria-label="label"
      :class="{
        'oc-text-input': !stopClassPropagation,
        'oc-text-input-warning': !!warningMessage,
        'oc-text-input-danger': !!errorMessage,
      }"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      v-on="$_ocTextInput_listeners"
      @input="$_ocTextInput_onInput($event.target.value)"
      @focus="$_ocTextInput_onFocus($event.target)"
      ref="input"
    />
    <div class="oc-text-input-message" v-if="$_ocTextInput_showMessageLine">
      <span v-if="!!warningMessage" class="oc-text-input-warning" v-text="warningMessage" />
      <span v-if="!!errorMessage" class="oc-text-input-danger" v-text="errorMessage" />
    </div>
  </div>
</template>

<script>
/**
 * Form Inputs are used to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the form `Textarea` element.*
 *
 * ## Accessibility
 * The attributes `placeholder` and `aria-label` have different functions. The first specifies a short hint describing the expected value of an input field/text area, or gives an example (e.g. email@example.com). `aria-label` provides the accessible name of the text input (e.g. "Your address", "Comment",...).
 */
export default {
  name: "oc-text-input",
  status: "review",
  release: "1.0.0",
  inheritAttrs: false,
  props: {
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
     * The placeholder value for the form input field.
     */
    placeholder: {
      type: String,
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
    }
  },
  computed: {
    $_ocTextInput_showMessageLine() {
      return this.fixMessageLine || !!this.warningMessage || !!this.errorMessage
    },
    $_ocTextInput_listeners() {
      const listeners = this.$listeners

      // Delete listeners for events which are emitted via methods
      delete(listeners["input"])
      delete(listeners["focus"])

      return listeners
    }
  },
  methods: {
    /**
     * Puts focus on this input element
     * @public
     */
    focus() {
      this.$refs.input.focus()
    },
    $_ocTextInput_onInput(value) {
      /**
       * Input event
       * @type {event}
       **/
      this.$emit("input", value)
    },
    $_ocTextInput_onFocus(target) {
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
            <oc-text-input class="oc-mb-s" label="Text" placeholder="Write your text"/>
            <oc-text-input class="oc-mb-s" disabled label="Disabled" value="I am disabled"/>
            <oc-text-input class="oc-mb-s" type="number" label="Number" placeholder="Enter a number"/>
            <oc-text-input class="oc-mb-s" type="email" label="Email" placeholder="Enter an email"/>
            <oc-text-input class="oc-mb-s" type="password" label="Password" placeholder="Enter your password ;-)"/>
            <h3 class="uk-heading-divider">
                Binding
            </h3>
            <oc-text-input label="Text" placeholder="Write your text" v-model="inputValue"/>
            <oc-text-input disabled label="Text" placeholder="Write your text" v-model="inputValue"/>
            <h3 class="uk-heading-divider">
                Interactions
            </h3>
            <oc-button @click="_focus">Focus input below</oc-button>
            <oc-text-input label="Focus field" placeholder="Will you focus on me?" ref="inputForFocus"/>
            <oc-button @click="_focusAndSelect">Focus and select input below</oc-button>
            <oc-text-input label="Select field" value="Will you select this existing text?" ref="inputForFocusSelect"/>
            <h3 class="uk-heading-divider">
                Messages
            </h3>
            <oc-text-input
                    label="Input with error and warning messages with reserved space below"
                    class="oc-mb-s"
                    placeholder="Text produces error on empty value and warning on trailing whitespace"
                    v-model="valueForMessages"
                    :error-message="errorMessage"
                    :warning-message="warningMessage"
                    :fix-message-line="true"
            />
            <oc-text-input
                    label="Input with error and warning messages without reserved space below"
                    class="oc-mb-s"
                    placeholder="Text produces error on empty value and warning on trailing whitespace"
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
