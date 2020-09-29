<template>
  <div :id="$_ocDrop_id" ref="ocDrop" class="oc-drop">
    <!-- @slot Content of the drop -->
    <slot />
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core"
import uniqueId from "../utils/uniqueId"

export default {
  name: "oc-drop",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * ID of the drop element. If not defined, the element will automatically receive a unique ID.
     */
    id: {
      type: String,
      required: false
    },
    /**
     * CSS selector of the element to maintain the drop's visibility
     **/
    boundary: {
      type: String,
      required: true
    },
    /**
     * The position of the drop.
     **/
    position: {
      type: String,
      required: false,
      default: "bottom-end",
      validator: value => {
        return value.match(
          /((top|bottom)|(top|bottom)-(start|end)|(left|right)|(left|right)-(start|end))/
        )
      },
    },
    /**
     * The offset of the drop
     */
    offset: {
      type: Array,
      required: false,
      default: () => [0, 0]
    },
    /**
     * Defines whether the drop element should match the width of its parent
     */
    matchParentWidth: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * More modifiers are available - see https://popper.js.org/docs/v2/modifiers/
     **/
    modifiers: {
      type: Array,
      required: false,
      default: () => []
    },
  },

  computed: {
    $_ocDrop_id() {
      return this.id || uniqueId("oc-drop-")
    },

    $_ocDrop_modifiers() {
      const defaultModifiers = [
        {
          name: "offset",
          options: {
            offset: this.offset
          }
        }
      ]

      return defaultModifiers.concat(this.modifiers)
    },

    $_ocDrop_boundary() {
      return document.querySelector(this.boundary)
    },

    $_ocDrop_element() {
      return document.querySelector("#" + this.$refs.ocDrop.id)
    }
  },

  mounted() {
    createPopper(this.$_ocDrop_boundary, this.$_ocDrop_element, {
      placement: this.position,
      modifiers: this.$_ocDrop_modifiers
    })

    this.$_ocDrop_checkParentWidth()

    window.addEventListener("resize", this.$_ocDrop_checkParentWidth)

    // Use timeout to avoid triggering a click event when clicking on trigger
    setTimeout(() => {
      // Add a general event listener to catch outside clicks
      document.addEventListener("click", this.$_ocDrop_documentClick)
    })
  },

  beforeDestroy() {
    document.removeEventListener("click", this.$_ocDrop_documentClick)
    window.removeEventListener("resize", this.$_ocDrop_checkParentWidth)
  },

  methods: {
    $_ocDrop_documentClick(e) {
      const el = this.$refs.ocDrop
      const target = e.target

      if (el !== target && !el.contains(target)) {
        this.$emit("outsideClick")
      }
    },

    $_ocDrop_checkParentWidth() {
      if (this.matchParentWidth && this.$refs.ocDrop.offsetWidth !== this.$_ocDrop_boundary.offsetWidth ) {
        this.$refs.ocDrop.style.width = this.$_ocDrop_boundary.offsetWidth + "px"
      }
    }
  }
}
</script>
<docs>
Contextual overlays for displaying lists of links and more.

## Caveats
### A unique key needs to be always defined
It can happen that in some cases the drop component is quickly exchanged with a new one.
Vue.js in that case tries to improve the performance by not creating a new element but only replacing the content of the existing one.
This breaks the selectors which are used by popper.js and result in a lost dropdown.
To prevent this issue, it is required to always define a unique key.

```jsx
<template>
  <div class="oc-height-medium">
    <div class="uk-flex uk-flex-row uk-flex-center">
      <oc-button id="my_menu" class="uk-margin-small-right" @click.native="toggleMenu">Menu</oc-button>
      <transition name="fade">
        <oc-drop v-if="menuVisible" key="menu-drop" boundary="#my_menu">
          <oc-nav class="uk-padding-small">
            <oc-nav-item icon="create_new_folder">Item with icon</oc-nav-item>
            <oc-nav-item>Item without icon</oc-nav-item>
            <oc-nav-item>Active item</oc-nav-item>
          </oc-nav>
        </oc-drop>
      </transition>
      <oc-button id="my_filter" @click.native="toggleFilters">Filter</oc-button>
      <transition name="fade">
        <oc-drop v-if="filtersVisible" key="filter-drop" boundary="#my_filter" :offset="[0, 20]" class="uk-padding-small">
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
              <oc-search-bar small placeholder="Filter by name" :buttonHidden="true" />
            </li>
          </ul>
        </oc-drop>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuVisible: false,
      filtersVisible: false
    }
  },
  methods: {
    toggleMenu() {
      this.filtersVisible = false
      this.menuVisible = !this.menuVisible
    },
    toggleFilters() {
      this.menuVisible = false
      this.filtersVisible = !this.filtersVisible
    }
  }
}
</script>
```
</docs>
