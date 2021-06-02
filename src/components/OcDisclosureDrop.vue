<template>
  <div ref="menu" class="oc-dropdown-wrapper" @keyup.esc="closeHandler(true)">
    <oc-button
      ref="button"
      :aria-expanded="isOpen.toString()"
      :variation="buttonVariation"
      aria-haspopup="true"
      @click="toggleDropdown"
    >
      <slot name="button"></slot>
    </oc-button>
    <div ref="dropdown" class="uk-card-default oc-dropdown-menu" :hidden="!isOpen">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
/**
 * [The concept of a disclosure widget](https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure) is a very basic one in terms of accessibility – you have a control that regulates if another container can be perceived or not. Furthermore, the controls communicates the state of the container to screen readers.
 *
 * An example for the usage of OcDisclosureDrop would be phoenix's filter button in the header. By interaction with the button you can control the visibility of the filters (namely checkboxes and the file filter search input). Generally speaking: The use cases for OcActionDrop are scarce, since its allowed contents are very limited (actionable items with `role="menuitem"`). If you are in doubt while building a dropdown menu component, choose OcDisclosureDrop.
 *
 * ## Accessibility
 *
 * ### When to use
 * OcDisclosureDrop is useful for situations where you plan to hide/show content, links, form elements, media – in short: everything but a **pure** set of menu actions (for this, use OcActionDrop).
 *
 * ### DOM structure
 * For keyboard and screen reader focus reasons the dropdown's container must follow the button directly in the DOM. Since other concepts of communicating the relation between button and its controlled containers are flawed or not supported by screen readers (`aria-controls`) the only way to show this relation is proximity in the DOM.
 *
 * ### Keyboard usage
 * In comparison to OcActionDrop there is no need for special keyboard usage patterns or even programmatic focus management in disclosure widgets. When the dropdown's state is open, its focusable contents become part of the `tabindex`. If the state is closed, they are removed from it. The fact that button and controlled container are adjacent in the DOM makes sure that the next tab stop after the button after expanding is the first focusable element inside the container.
 *
 * */
export default {
  name: "OcDisclosureDrop",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Supplies button variation to give additional meaning.
     * `primary, secondary, danger`
     */
    buttonVariation: {
      type: String,
      default: "default",
      validator: value => {
        return value.match(/(default|primary|danger)/)
      },
    },
  },
  data: () => {
    return {
      isOpen: false,
    }
  },
  computed: {
    $_ocButton_buttonClass() {
      let classes = ["oc-button"]
      if (this.buttonVariation) classes.push(`uk-button-${this.buttonVariation}`)

      return classes
    },
  },
  created() {
    // Add a general event listener to catch outside clicks
    document.addEventListener("click", this.documentClick)
  },
  destroyed: function () {
    // Remove the general event listener to catch outside clicks
    document.removeEventListener("click", this.documentClick)
  },
  mounted() {
    // Add ESC key event listener
    window.addEventListener("keyup", this.escKeyHandler)
  },
  beforeDestroy() {
    // Remove ESC key event listener
    window.removeEventListener("keyup", this.escKeyHandler)
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    // Clicks everywhere outside the menu closes it
    documentClick(e) {
      let el = this.$refs.menu
      let target = e.target
      if (el !== target && !el.contains(target)) {
        this.closeHandler()
      }
    },
    escKeyHandler(e) {
      if (e.key === "Escape") {
        this.closeHandler()
      }
    },
    closeHandler() {
      this.isOpen = false
    },
  },
}
</script>

<docs>
```js
  <oc-disclosure-drop button-variation="primary" class="oc-ml-s">
    <template v-slot:button>Show / Hide</template>
    <template v-slot:content>
      <ul class="uk-list">
        <li><a href="#0">Link 1</a></li>
        <li><a href="#0">Link 2</a></li>
      </ul>
    </template>
  </oc-disclosure-drop>
  <oc-disclosure-drop button-variation="default" class="oc-ml-s">
    <template v-slot:button>Show / Hide</template>
    <template v-slot:content>
      You could also place text, input elements, images, or other form of media here.
    </template>
</oc-disclosure-drop>
```
</docs>
