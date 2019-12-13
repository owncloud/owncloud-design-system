<template>
  <input
    :class="{ 'oc-text-input': !stopClassPropagation }"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :aria-label="label"
    ref="input"
    @input="$_ocTextInput_onInput($event.target.value)"
    @focus="
      $event.target.select()
      $_ocTextInput_onFocus($event.target.value)
    "
    @keydown="$_ocTextInput_onKeyDown($event)"
  />
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
    $_ocTextInput_onFocus(value) {
      /**
       * Focus event - emitted as soon as the input field is focused
       * @type {event}
       **/
      this.$emit("focus", value)
    },
    $_ocTextInput_onKeyDown(e) {
      if (e.keyCode === 13) {
        /**
         * Change event - emitted as soon as the user hits enter
         * @type {string}
         */
        this.$emit("change", e.target.value)
      }

      /**
       * KeyDown event - emitted as soon as the user hits a key
       * @type {event}
       */
      this.$emit("keydown", e)
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
            <oc-text-input class="uk-margin-small-bottom" label="Text" placeholder="Write your text"/>
            <oc-text-input class="uk-margin-small-bottom" disabled label="Disabled" value="I am disabled"/>
            <oc-text-input class="uk-margin-small-bottom" type="number" label="Number" placeholder="Enter a number"/>
            <oc-text-input class="uk-margin-small-bottom" type="email" label="Email" placeholder="Enter an email"/>
            <oc-text-input class="uk-margin-small-bottom" type="password" label="Password" placeholder="Enter your password ;-)"/>
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
        </section>
    </template>
    <script>
        export default {
            data: () => {
                return {
                    inputValue: 'initial'
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
