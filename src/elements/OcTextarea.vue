<template>
  <textarea
    class="uk-textarea"
    :value="value"
    :placeholder="placeholder"
    @input="$_ocTextArea_onInput($event.target.value)"
    @focus="$_ocTextArea_onFocus($event.target.value)"
    @keydown="$_ocTextArea_onKeyDown($event)"
    :aria-label="label"
  />
</template>

<script>
/**
 * Textareas are used to allow users to provide text input when the expected
 * input is long. Textarea has a range of options. For shorter input,
 * use the `Input` element.
 *
 * ## Accessibility
 * The attributes `placeholder` and `aria-label` have different functions. The first specifies a short hint describing the expected value of an input field/text area, or gives an example (e.g. email@example.com). `aria-label` provides the accessible name of the textarea (e.g. "Your address", "Comment",...).
 */
export default {
  name: "oc-textarea",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Text value of the form textarea.
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * The placeholder value for the form textarea.
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * Accessible of the Textarea, via aria-label.
     **/
    label: {
      type: String,
      required: true,
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
    $_ocTextArea_onInput(value) {
      /**
       * Input event
       * @type {event}
       **/
      this.$emit("input", value)
    },
    $_ocTextArea_onFocus(value) {
      /**
       * Focus event - emitted as soon as the input field is focused
       * @type {event}
       **/
      this.$emit("focus", value)
    },
    $_ocTextArea_onKeyDown(e) {
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

<style lang="scss" scoped></style>

<docs>
```jsx
<div>
	<oc-textarea class="uk-margin-small-bottom" placeholder="Write your text" label="Comment" />
	<oc-textarea disabled value="I am disabled" label="Example" />
</div>
```
</docs>
