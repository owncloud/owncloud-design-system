<template>
  <input
    class="oc-text-input"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :aria-label="placeholder"
    ref="input"
    @input="$_ocTextInput_onInput($event.target.value)"
    @focus="$_ocTextInput_onFocus($event.target.value)"
    @keydown="$_ocTextInput_onKeyDown($event)"
  />
</template>

<script>
/**
 * Form Inputs are used to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the form `Textarea` element.
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
      type: String,
      default: null,
    },
    /**
     * The placeholder value for the form input field.
     */
    placeholder: {
      type: String,
      default: null,
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
            <oc-text-input class="uk-margin-small-bottom" placeholder="Write your text"/>
            <oc-text-input class="uk-margin-small-bottom" disabled value="I am disabled"/>
            <oc-text-input class="uk-margin-small-bottom" type="number" placeholder="Enter a number"/>
            <oc-text-input class="uk-margin-small-bottom" type="email" placeholder="Enter an email"/>
            <oc-text-input class="uk-margin-small-bottom" type="password" placeholder="Enter your password ;-)"/>
            <h3 class="uk-heading-divider">
                Binding
            </h3>
            <oc-text-input placeholder="Write your text" v-model="inputValue"/>
            <oc-text-input disabled placeholder="Write your text" v-model="inputValue"/>
            <h3 class="uk-heading-divider">
                Interactions
            </h3>
            <oc-button text="Focus input below" @click="_focus" />
            <oc-text-input placeholder="Will you focus on me?" ref="inputForFocus"/>
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
                }
            }
        }
    </script>
    ```
</docs>
