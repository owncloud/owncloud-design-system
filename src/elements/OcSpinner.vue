<template>
  <div :uk-spinner="'ratio:' + ratio" :aria-label="ariaLabel" tabindex="-1" role="img"></div>
</template>

<script>
/**
 * Remote actions can take an undefined portion of time. The spinner gives feedback to the users about an actions being processed.
 *
 * ## Accessibility
 * ### Making spinners accessible for screen readers
 *
 * 1. Making them (only!) programmatically focusable with `tabindex="-1"`. **This is already included in the component.**
 * 2. Giving them the [ARIA role](https://developers.google.com/web/fundamentals/accessibility/semantics-aria) of "img" (image) to change the semantics of the spinner element from something meaningless (div) to something meaningful (image). **This is already included in the component.**
 * 3. Giving them an accessible name ([explainer for the term](https://developer.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)) via aria-label/the ariaLabel prop. An element that has an accessible name, but no role is ignored by assistive technology
 * 4. During an action of the application that shows the spinner to visual users, the spinner should programmatically receive focus (see 1.), so that the accessible name of it (default: Loading, see 2.) is read out by screen reader software. After completion of the loading process the focus should be sent to a reasonable place of the newly loaded content.
 *
 *
 */
export default {
  name: "oc-spinner",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Descriptive text to be read to screen-readers, required.
     */
    ariaLabel: {
      type: String,
      required: true,
      default: "Loading",
    },
    /**
     * The size of the spinner. Defaults to medium.
     * `small, medium, large, xlarge`
     */
    size: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(small|medium|large|xlarge)/)
      },
    },
  },
  computed: {
    ratio() {
      let sizes = {
        small: 0.5,
        medium: 2,
        large: 3,
        xlarge: 4,
      }
      return sizes[this.size]
    },
  },
}
</script>
<style lang="scss"></style>
<docs>
```jsx
<div>
  <oc-spinner size="small" />
  <oc-spinner aria-label="Date is loading" /> <!-- Default with label -->
  <oc-spinner size="medium" />
  <oc-spinner size="large" />
  <oc-spinner size="xlarge" />
</div>
```
</docs>
