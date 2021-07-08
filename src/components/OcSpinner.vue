<template>
  <span :class="$_ocSpinner_class" :aria-label="ariaLabel" tabindex="-1" role="img" />
</template>

<script>
import { getSizeClass } from "../utils/sizeClasses"

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
  name: "OcSpinner",
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * Descriptive text to be read to screen-readers, strongly recommended unless the component is used inside a DOM node that is already `aria-hidden="true"`.
     */
    ariaLabel: {
      type: String,
      required: false,
      default: "",
    },
    /**
     * The size of the spinner. Defaults to medium.
     * `xsmall, small, medium, large, xlarge, xxlarge` and `xxxlarge`
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(xsmall|small|medium|large|xlarge|xxlarge|xxxlarge)/)
      },
    },
  },
  computed: {
    $_ocSpinner_class() {
      return ["oc-spinner", `oc-spinner-${getSizeClass(this.size)}`]
    },
  },
}
</script>
<docs>
```js
<div class="uk-flex uk-flex-middle">
  <oc-spinner aria-label="Loading with extra small spinner" size="xsmall" class="oc-mr-s" />
  <oc-spinner aria-label="Loading with small spinner" size="small" class="oc-mr-s" />
  <oc-spinner aria-label="Loading with default sized spinner" class="oc-mr-s" />
  <oc-spinner aria-label="Loading with medium spinner" size="medium" class="oc-mr-s" />
  <oc-spinner aria-label="Loading with large spinner" size="large" class="oc-mr-s" />
  <oc-spinner aria-label="Loading with extra large spinner" size="xlarge" class="oc-mr-s" />
  <oc-spinner aria-label="Loading with extra extra large spinner" size="xxlarge" class="oc-mr-s" />
  <oc-spinner aria-label="Loading with extra extra extra large spinner" size="xxxlarge" />
</div>
```
</docs>
