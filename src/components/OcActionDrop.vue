<template>
  <div ref="menu" class="oc-dropdown-wrapper" @keyup.esc="closeHandler(true)">
    <oc-button
      ref="button"
      :aria-expanded="isOpen.toString()"
      :variation="buttonVariation"
      aria-haspopup="true"
      @click="toggleDropdown"
      @keydown.native.enter.prevent="openMenuAndFocus(0)"
      @keydown.native.space.prevent="openMenuAndFocus(0)"
      @keydown.native.down.prevent="openMenuAndFocus(0)"
      @keydown.native.up.prevent="openMenuAndFocus(-1)"
    >
      <slot name="button"></slot>
    </oc-button>
    <div
      ref="dropdown"
      class="uk-card-default oc-dropdown-menu"
      role="menu"
      :hidden="!isOpen"
      @click="closeHandler"
      @keydown.down.prevent="focusNext"
      @keydown.up.prevent="focusPrev"
    >
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
/**
 * Action dropdowns are meant to be used for dropdown menus that are emulating desktop app menus. That means: only consist of items that change state in the app, or open modal dialogs, for example. For using links, inputs, etc. in dropdowns use the disclosure widget pattern (OcDisclosureDrop).
 *
 * ## Accessibility
 *
 * ### DOM structure
 * For keyboard and screen reader focus reasons the dropdown's container must follow the menu button directly in the DOM.
 *
 * ### Aria roles
 * OcActionDrop uses the [ARIA Authoring Practices' action menu pattern](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html). The dropdown itself has `role="menu"`, its children need to have `role="menuitem"`. The triggering button has the attribute `aria-haspopup="true", which indicates to assitive technology that it opens an action menu. When a screen reader discovers an action menu (and supports the concept of different input modes, like NVDA and JAWS) it switches to application mode.
 *
 * ### Allowed content for the dropdown
 * Quote from [https://accessibility.dev/challenges-mega-menus-standard-menus-make-accessible/](https://accessibility.dev/challenges-mega-menus-standard-menus-make-accessible/):
 *
 * > The use of ARIA Menu roles prohibits the inclusion of any non-menu active element roles within the same structure.
 *
 * > Since the only focusable elements allowed within an ARIA Menu are those that include role=”menu”, role=”menubar”, role=”menuitem”, role=”menuitemcheckbox”, or role=”menuitemradio”, the embedding of any other active element types such as links, buttons, or other form fields will lead to significant accessibility issues for non-sighted screen reader users when attempting to interact with the menu.
 The use of ARIA Menu roles causes specific menu related events to be fired in the accessibility tree.
 *
 * ### Expected keyboard behaviour when using action menu pattern
 * The action menu has a certain keyboard behaviour that is expected of being implemented ([see keyboard support table](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html#kbd_label)).
 *
 * ### Use this pattern sparingly
 * `role="application"`, either directly or in form of an action menu widget like OcActionDrop should be used sparingly and should be limited to single components, since it changes the screen reader's usual keyboard shortcut pattern ([Learn more about screen reader interaction modes](https://tink.uk/understanding-screen-reader-interaction-modes/)).
 *
 * ### Allowed dropdown contents
 * Only menuitems are allowed in an action menu (everything else will be ignored by screen readers, be it focusable or not). Make sure to make the menuitems focusable themselves by adding `tabindex="0"` to them (see code example below).
 *
 * ### The lack of `aria-controls`
 * While the authoring practices linked above advises to use `aria-controls` to create a programmatic relation between button and dropdown in reality screen reader support is close to non-existent. As of Fall 2019, only JAWS supports it, but has it disabled by default. The relation between trigger and dropdown should be communicated with the proximity of both in the DOM (see above).
 *
 * */
import OcButton from "./OcButton.vue"

export default {
  name: "OcActionDrop",
  status: "review",
  release: "1.0.0",
  components: {
    OcButton,
  },
  props: {
    /**
     * Supplies button variation to give additional meaning.
     * `primary, danger`
     */
    buttonVariation: {
      type: String,
      default: "passive",
      validator: value => {
        return value.match(/(passive|primary|success|danger|warning|inverse)/)
      },
    },
  },
  data: () => {
    return {
      isOpen: false,
      focusableElements: "button, [tabindex='0']",
      focusables: null,
      focusedMenuItem: null,
    }
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
    window.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        this.closeHandler()
      }
    })
  },
  updated: function () {
    this.focusables = this.$refs.dropdown.querySelectorAll(this.focusableElements)
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
    closeHandler(sendFocusBackToButton) {
      this.isOpen = false

      if (sendFocusBackToButton) {
        this.$refs.button.focus()
      }
    },
    openMenuAndFocus(index) {
      this.isOpen = true
      this.focusedMenuItem = index === -1 ? this.focusables.length - 1 : index
      this.setMenuItemFocus(this.focusedMenuItem)
    },
    focusNext() {
      if (this.focusedMenuItem + 1 >= this.focusables.length) {
        this.focusedMenuItem = 0
      } else {
        this.focusedMenuItem = this.focusedMenuItem + 1
      }
      this.setMenuItemFocus(this.focusedMenuItem)
    },
    focusPrev() {
      if (this.focusedMenuItem === 0) {
        this.focusedMenuItem = this.focusables.length - 1
      } else {
        this.focusedMenuItem = this.focusedMenuItem - 1
      }
      this.setMenuItemFocus(this.focusedMenuItem)
    },
    setMenuItemFocus(index) {
      setTimeout(() => {
        this.focusables[index].focus()
      }, 0)
    },
  },
}
</script>

<docs>
```js
  <oc-action-drop button-variation="primary" class="oc-ml-s">
    <template v-slot:button>Action</template>
    <template v-slot:actions>
      <div tabindex="0" role="menuitem" class="uk-text-nowrap">Action 1</div>
      <div tabindex="0" role="menuitem" class="uk-text-nowrap">Action 2</div>
    </template>
  </oc-action-drop>
  <oc-action-drop button-variation="default" class="oc-ml-s">
    <template v-slot:button>Action</template>
    <template v-slot:actions>
      <div tabindex="0" role="menuitem" class="uk-text-nowrap">Action 3</div>
      <div tabindex="0" role="menuitem" class="uk-text-nowrap">Action 4</div>
    </template>
  </oc-action-drop>
```
</docs>
