<template>
  <input
    class="oc-text-input"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :aria-label="placeholder"
    @input="onInput($event.target.value)"
    @focus="onFocus($event.target.value)"
    @keydown="onKeyDown($event)"
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
    onInput(value) {
      /**
       * Input event
       * @event input
       * @type {event}
       **/
      this.$emit("input", value)
    },
    onFocus(value) {
      /**
       * Focus event
       * @event focus
       * @type {event}
       **/
      this.$emit("focus", value)
    },
    onKeyDown(e) {
      if (e.keyCode === 13) {
        this.$emit("change", e.target.value)
      }

      this.$emit("keydown", e)
    },
  },
}
</script>
<docs>
```jsx
<div>
	<oc-text-input class="uk-margin-small-bottom" placeholder="Write your text"/>
	<oc-text-input disabled value="I am disabled"/>
</div>
```
</docs>
