<template>
  <textarea
    class="uk-textarea"
    :placeholder="placeholder"
    @input="onInput($event.target.value)"
    @focus="onFocus($event.target.value)"
    :aria-label="placeholder"
    v-model="value"
  />
</template>

<script>
/**
 * Textareas are used to allow users to provide text input when the expected
 * input is long. Textarea has a range of options. For shorter input,
 * use the `Input` element.
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
  },
  methods: {
    onInput(value) {
      /**
       * Input event
       * @event input
       * @type {event}
       **/
      this.$emit("change", value)
    },
    onFocus(value) {
      /**
       * Focus event
       * @event focus
       * @type {event}
       **/
      this.$emit("focus", value)
    },
  },
}
</script>

<style lang="scss" scoped></style>

<docs>
```jsx
<div>
	<oc-textarea class="uk-margin-small-bottom" placeholder="Write your text" />
	<oc-textarea disabled value="I am disabled" />
</div>
```
</docs>
