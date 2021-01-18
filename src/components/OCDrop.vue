<template>
  <div :id="dropId" :uk-drop="$_ocDrop_props" @click="$_ocDrop_close">
    <div v-if="$slots.default" class="uk-card uk-card-default uk-card-small uk-card-body">
      <slot />
    </div>
    <slot v-else name="special" />
  </div>
</template>
<script>
import UiKit from "uikit"
import uniqueId from "../utils/uniqueId"

/**
 * Position any element in relation to another element.
 */
export default {
  name: "OcDrop",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Id of the drop.
     */
    dropId: {
      type: String,
      required: false,
      default: uniqueId("oc-drop-"),
    },
    /**
     * CSS selector of the element to maintain the drop's visibility. see https://getuikit.com/docs/drop#boundary
     **/
    boundary: {
      type: [String, Boolean],
      default: false,
    },
    /**
     * CSS selector for the element to be used as toggle. By default, the preceding element is used.
     **/
    toggle: {
      type: String,
      default: "- *",
    },
    /**
     * The position of the drop.
     **/
    position: {
      type: String,
      default: "bottom-left",
      validator: value => {
        return value.match(
          /((top|bottom)-(left|center|right|justify)|(left|right)-(top|center|bottom))/
        )
      },
    },
    /**
     * Comma separated list of drop trigger behaviour modes: `click or hover`
     **/
    mode: {
      type: String,
      default: "click",
      validator: value => {
        return value.match(/(click|hover)/)
      },
    },
    /**
     * Defines if the drop should be closed after clicking on it. Needs to have defined dropId to work.
     */
    closeOnClick: {
      type: Boolean,
      required: false,
    },
    /**
     * More options are available - see https://getuikit.com/docs/drop
     **/
    options: {
      type: Object,
      default() {
        return {
          "boundary-align": true,
        }
      },
    },
  },
  computed: {
    $_ocDrop_props() {
      // from properties
      let boundary = this.boundary || this.toggle
      let toggle = this.toggle
      let mode = this.mode
      let pos = this.position

      // Collected properties
      let props = Object.assign({ boundary, toggle, mode, pos }, this.options)

      return JSON.stringify(props)
    },
  },
  methods: {
    $_ocDrop_close() {
      if (this.closeOnClick) {
        UiKit.drop(`#${this.dropId}`).hide()
      }
    },
  },
}
</script>
<docs>
```jsx
<div>
  <div class="uk-button-group oc-mt-s">
    <oc-button id="my_menu" class="oc-mr-s">Menu</oc-button>
    <oc-button id="my_filter" class="oc-mr-s">Filter</oc-button>
    <oc-button id="my_advanced">Advanced</oc-button>
  </div>

  <oc-drop toggle="#my_menu" mode="click">
    <oc-nav>
      <oc-nav-item icon="create_new_folder">Item with icon</oc-nav-item>
      <oc-nav-item>Item without icon</oc-nav-item>
      <oc-nav-item>Active item</oc-nav-item>
    </oc-nav>
  </oc-drop>

  <oc-drop toggle="#my_filter" mode="hover">
    <p>
      Lets filter:
    </p>
    <ul class="uk-list">
      <li>
        <label><oc-checkbox /> <span class="uk-text-meta">Show Files</span></label>
      </li>
      <li>
        <label><oc-checkbox /> <span class="uk-text-meta">Show Folders</span></label>
      </li>
      <li>
        <oc-search-bar small placeholder="Filter by name" :button="false" />
      </li>
    </ul>
  </oc-drop>

  <oc-drop dropId="oc-drop" toggle="#my_advanced" mode="click" closeOnClick :options="{ 'delay-hide': '0' }">
    <div slot="special" class="uk-card uk-card-default">
      <div class="uk-card-header">
        <h3 class="uk-card-title">
          Advanced
        </h3>
      </div>
      <div class="uk-card-body">
        <p>
          I'm a slightly more advanced drop down and I'll be closed as soon as you click on me.
        </p>
      </div>
    </div>
  </oc-drop>
</div>
```
</docs>
