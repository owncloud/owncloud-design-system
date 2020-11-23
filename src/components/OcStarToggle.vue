<template>
  <oc-button
    variation="raw"
    role="switch"
    :aria-checked="checked.toString()"
    :aria-label="label"
    @click="$_ocStarToggle_togglePressed"
  >
    <oc-star :shining="checked" />
  </oc-button>
</template>

<script>
import OcButton from "./OcButton"

/**
 *
 * ## Accessibility
 *
 * ### Communicating the buttons toggle role to screen readers
 * With `role="switch"` screen readers are informed that the button is a toggle, which will have two states: on and off. Toggle buttons like this should be used instead of checkboxes (which make only really sense in form contexts – [reasoning and more background](https://inclusive-components.design/toggle-button/#thisdoesntquitefeelright)).
 *
 * ### Communicating the toggle's state to screen readers
 *
 * Buttons with `switch` role can convey their state with the `aria-checked` attribute. When using this component, authors can set the initial state of OcStarToggle with the `checked` prop.
 *
 * */

export default {
  name: "oc-star-toggle",
  components: { OcButton },
  status: "review",
  release: "1.0.0",
  methods: {
    $_ocStarToggle_togglePressed: function() {
      this.checked = !this.checked
    },
  },
  props: {
    /**
     * Initial state of toggle button
     **/
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Accessible name of toggle button
     **/
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
<docs>
  ```jsx
  <h3>OcStarToggle initially not checked</h3>
  <oc-star-toggle label="Favorite this item"></oc-star-toggle>
  <h3>OcStarToggle initially checked</h3>
  <oc-star-toggle checked="true" label="Favorite this item"></oc-star-toggle>
  ```
</docs>
