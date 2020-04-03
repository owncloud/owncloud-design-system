<template>
  <div>
    <oc-text-input
      v-bind="$_ocFormInput_inputBindings"
      v-on="$listeners"
      :has-error="!!errorMessage"
      :has-warning="!!warningMessage"
    />
    <div class="oc-form-input-message" v-if="$_ocFormInput_showMessageLine">
      <span v-if="!!warningMessage" class="oc-form-input-warning">{{ warningMessage }}</span>
      <span v-if="!!errorMessage" class="oc-form-input-danger">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import OcTextInput from "../elements/OcTextInput"
/**
 * Form Inputs are used to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the form `Textarea` element.
 *
 * All properties will be handed through to the inner OcTextInput component. The purpose
 * of this component is, to be able to show validation messages below the input, while
 * utilizing all functionality from OcTextInput.
 *
 * ## Accessibility
 * The attributes `placeholder` and `aria-label` have different functions. The first specifies a short hint describing the expected value of an input field/text area, or gives an example (e.g. email@example.com). `aria-label` provides the accessible name of the text input (e.g. "Your address", "Comment",...).
 */
export default {
  name: "oc-form-input",
  components: { OcTextInput },
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
    },
  },
  computed: {
    $_ocFormInput_inputBindings() {
      const result = {
        ...this.$attrs,
        ...this.$props
      }
      delete result.warningMessage
      delete result.errorMessage
      delete result.fixMessageLine
      return result
    },
    $_ocFormInput_showMessageLine() {
      return this.fixMessageLine || !!this.warningMessage || !!this.errorMessage
    },
  }
}
</script>

<docs>
    ```jsx
    <template>
        <section>
            <h3 class="uk-heading-divider">
                Input Types
            </h3>
            <oc-form-input class="uk-margin-small-bottom" label="Text" placeholder="Write your text"/>
            <oc-form-input class="uk-margin-small-bottom" disabled label="Disabled" value="I am disabled"/>
            <oc-form-input class="uk-margin-small-bottom" type="number" label="Number" placeholder="Enter a number"/>
            <oc-form-input class="uk-margin-small-bottom" type="email" label="Email" placeholder="Enter an email"/>
            <oc-form-input class="uk-margin-small-bottom" type="password" label="Password" placeholder="Enter your password ;-)"/>
            <h3 class="uk-heading-divider">
                Binding
            </h3>
            <oc-form-input label="Text" placeholder="Write your text" v-model="inputValue"/>
            <oc-form-input disabled label="Text" placeholder="Write your text" v-model="inputValue"/>
            <h3 class="uk-heading-divider">
                Interactions
            </h3>
            <oc-button @click="_focus">Focus input below</oc-button>
            <oc-form-input label="Focus field" placeholder="Will you focus on me?" ref="inputForFocus"/>
            <oc-button @click="_focusAndSelect">Focus and select input below</oc-button>
            <oc-form-input label="Select field" value="Will you select this existing text?" ref="inputForFocusSelect"/>
            <h3 class="uk-heading-divider">
                Messages
            </h3>
            <oc-form-input
                    label="Input with error and warning messages with reserved space below"
                    class="uk-margin-small-bottom"
                    placeholder="Text produces error on empty value and warning on trailing whitespace"
                    v-model="valueForMessages"
                    :error-message="errorMessage"
                    :warning-message="warningMessage"
                    :fix-message-line="true"
            />
            <oc-form-input
                    label="Input with error and warning messages without reserved space below"
                    class="uk-margin-small-bottom"
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
            this.$refs.inputForFocus.$children[0].focus()
          },
          _focusAndSelect() {
            this.$refs.inputForFocusSelect.$children[0].focus()
          }
        }
      }
    </script>
    ```
</docs>
