<template>
  <div :id="dropId" ref="drop" class="oc-drop" @click="$_ocDrop_close">
    <div v-if="$slots.default" class="uk-card uk-card-default uk-card-small uk-card-body">
      <slot />
    </div>
    <slot v-else name="special" />
  </div>
</template>
<script>
import tippy, { hideAll } from "tippy.js"

import { destroy, hideOnEsc } from "../directives/OcTooltip"
import uniqueId from "../utils/uniqueId"

/**
 * Position any element in relation to another element.
 */
export default {
  name: "OcDrop",
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * Id of the drop.
     */
    dropId: {
      type: String,
      required: false,
      default: () => uniqueId("oc-drop-"),
    },
    /**
     * CSS selector for the element to be used as toggle. By default, the preceding element is used.
     **/
    toggle: {
      type: String,
      default: "",
    },
    /**
     * The position of the drop: `(top|right|bottom|left|auto)|(top|right|bottom|left|auto)-(start|end)`.
     **/
    position: {
      type: String,
      default: "bottom-start",
      validator: value => {
        return value.match(
          /((top|right|bottom|left|auto)|(top|right|bottom|left|auto)-(start|end))/
        )
      },
    },
    /**
     * Events that cause the drop to show. Multiple event names are separated by spaces
     *
     * @values click, hover, manual
     **/
    mode: {
      type: String,
      default: "click",
      validator: value => {
        return value.match(/(click|hover|manual)/)
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
     * Element selector used as a target of the drop
     */
    target: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return { tippy: null }
  },
  computed: {
    triggerMapping() {
      return (
        {
          hover: "mouseenter focus",
        }[this.mode] || this.mode
      )
    },
  },
  watch: {
    position() {
      this.tippy.setProps({ placement: this.position })
    },

    mode() {
      this.tippy.setProps({ trigger: this.triggerMapping })
    },
  },
  beforeDestroy() {
    destroy(this.tippy)
  },
  mounted() {
    destroy(this.tippy)
    const to = this.target
      ? document.querySelector(this.target)
      : this.toggle
      ? document.querySelector(this.toggle)
      : this.$el.previousElementSibling
    const content = this.$refs.drop

    if (!to || !content) {
      return
    }

    const config = {
      trigger: this.triggerMapping,
      placement: this.position,
      arrow: false,
      hideOnClick: true,
      interactive: true,
      plugins: [hideOnEsc],
      theme: "none",
      aria: {
        content: "describedby",
      },
      onShow(instance) {
        hideAll({ exclude: instance })
      },
      content,
    }

    if (this.target) {
      config.triggerTarget = this.toggle
        ? document.querySelector(this.toggle)
        : this.$el.previousElementSibling
    }

    this.tippy = tippy(to, config)
  },
  methods: {
    $_ocDrop_close() {
      if (this.closeOnClick) {
        this.tippy.hide()
      }
    },

    /**
     * Programatically show the drop
     *
     * @public
     */
    show(duration) {
      this.tippy.show(duration)
    },

    /**
     * Programatically hide the drop
     *
     * @public
     */
    hide(duration) {
      this.tippy.hide(duration)
    },
  },
}
</script>
<style lang="scss">
.tippy-box[data-theme~="none"] {
  background-color: transparent;
  font-size: inherit;
  line-height: inherit;

  .tippy-content {
    padding: 0;
  }
}

.oc-drop {
  width: 300px;

  li a:focus {
    outline: auto 1px !important;
  }
}
</style>
<docs>
```js
<template>
  <div class="uk-button-group oc-mt-s">
    <oc-button id="my_menu" class="oc-mr-s">Menu</oc-button>
    <oc-drop toggle="#my_menu" mode="click">
      <ul>
        <li icon="create_new_folder" autofocus>Item with icon</li>
        <li>Item without icon</li>
        <li>Active item</li>
      </ul>
    </oc-drop>

    <oc-button id="my_filter" class="oc-mr-s">Filter</oc-button>
    <oc-drop toggle="#my_filter" mode="hover">
      <p>
        Lets filter:
      </p>
      <ul class="uk-list">
        <li>
          <oc-checkbox label="" />
          <span class="oc-text-muted">Show Files</span>
        </li>
        <li>
          <oc-checkbox label="" />
          <span class="oc-text-muted">Show Folders</span>
        </li>
        <li>
          <oc-search-bar small placeholder="Filter by name" :button="false" label="" />
        </li>
      </ul>
    </oc-drop>

    <oc-button id="my_advanced">Advanced</oc-button>
    <oc-drop dropId="oc-drop" toggle="#my_advanced" mode="click" closeOnClick>
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
</template>
```

### Custom target
```
<div>
  <div>
    <p id="target">This is the target of the drop</p>
  </div>
  <oc-button id="custom-target-toggle">Trigger drop</oc-button>
  <oc-drop dropId="oc-drop-custom-target" toggle="#custom-target-toggle" target="#target" mode="click" closeOnClick>
    I am attached to a custom element
  </oc-drop>
</div>
```

### Open drop programatically
```
<template>
<div>
  <oc-button id="manual-target" @click="open">Open</oc-button>
  <oc-drop ref="drop" mode="manual" target="#manual-target">
    I am triggered manually
  </oc-drop>
</div>
</template>
<script>
export default {
  methods: {
    open() {
      this.$refs.drop.show()
    }
  }
}
</script>
```
</docs>
