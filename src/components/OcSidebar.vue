<template>
  <div :class="$_ocSidebar_classes">
    <div class="oc-sidebar-content-wrapper">
      <oc-button
        v-if="fixed"
        class="oc-sidebar-button-close"
        variation="raw"
        :aria-label="closeButtonLabel"
        @click="$_ocSidebar_buttonClose_click"
      >
        <oc-icon name="close" aria-hidden="true" />
      </oc-button>
      <router-link to="/" class="oc-sidebar-logo">
        <oc-img
          v-if="logoImg"
          key="logo-image"
          :src="logoImg"
          :alt="productName"
          class="oc-sidebar-logo-img"
        />
        <span v-else key="product-name" class="oc-sidebar-logo-text" v-text="productName" />
      </router-link>
      <div v-if="$slots.upperContent" class="oc-sidebar-upper-content">
        <!-- @slot Content above the navigation block -->
        <slot name="upperContent" />
      </div>
      <nav v-if="$_ocSidebar_isNavigationVisible" key="sidebar-navigation" class="oc-sidebar-nav">
        <ul>
          <oc-sidebar-nav-item
            v-for="item in navItems"
            :key="item.route.path"
            :icon="item.icon || item.iconMaterial"
            :active="item.active"
            :target="item.route.path"
            class="oc-sidebar-nav-item"
          >
            {{ item.name }}
          </oc-sidebar-nav-item>
        </ul>
      </nav>
      <div
        v-if="$slots.mainContent"
        key="sidebar-main-content"
        class="oc-sidebar-main-content"
        :class="{ 'oc-mt': $slots.upperContent || $_ocSidebar_isNavigationVisible }"
      >
        <!-- @slot Content below the navigation block and above the footer -->
        <slot name="mainContent" />
      </div>
      <div v-if="$slots.footer" class="oc-sidebar-footer oc-mt">
        <!-- @slot Footer of the sidebar -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import OcSidebarNavItem from "./OcSidebarNavItem.vue"
import OcImg from "./OcImage.vue"
import OcButton from "./OcButton/OcButton.vue"
import OcIcon from "./OcIcon.vue"

export default {
  name: "OcSidebar",
  status: "ready",
  released: "1.5.0",

  components: {
    OcSidebarNavItem,
    OcImg,
    OcButton,
    OcIcon,
  },

  props: {
    /**
     * Source of the logo image
     */
    logoImg: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Name of the product where the sidebar is used
     */
    productName: {
      type: String,
      required: true,
    },
    /**
     * Navigation items of the product
     */
    navItems: {
      type: Array,
      required: false,
      default: () => [],
    },
    /**
     * Hide navigation entirely
     */
    hideNav: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Asserts whether the sidebar's position is fixed
     */
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Accessibility label of the close button
     */
    closeButtonLabel: {
      type: String,
      required: false,
      default: "Close navigation menu",
    },
  },

  computed: {
    $_ocSidebar_classes() {
      const classes = ["oc-sidebar"]

      if (this.fixed) {
        classes.push("oc-sidebar-fixed")
      }

      return classes
    },
    $_ocSidebar_isNavigationVisible() {
      return !this.hideNav && this.navItems.length > 0
    },
  },

  methods: {
    $_ocSidebar_buttonClose_click() {
      /**
       * The user clicked on the close button
       */
      this.$emit("close")
    },
  },
}
</script>

<docs>
Sidebar component containing branding and navigation

## Examples
```jsx
  <template>
    <div>
      <oc-sidebar
        logoImg="examples/placeholder_brand_logo.svg"
        productName="ownCloud"
        :navItems="navItems"
      />
    </div>
  </template>
  <script>
    export default {
      computed: {
        navItems() {
          return [
            { name: 'Home', route: { path: '/' }, icon: 'home', active: true },
            { name: 'All files', route: { path: '/files' }, icon: 'folder' },
            { name: 'Shared files', route: { path: '/shared' }, icon: 'share' }
          ]
        }
      }
    }
  </script>
```

If a source of the logo image is not provided, the product name is used instead.

```jsx
  <template>
    <div>
      <oc-sidebar
        productName="ownCloud"
        :navItems="navItems"
      />
    </div>
  </template>
  <script>
    export default {
      computed: {
        navItems() {
          return [
            { name: 'Home', route: { path: '/' }, icon: 'home' },
            { name: 'All files', route: { path: '/files' }, icon: 'folder', active: true },
            { name: 'Shared files', route: { path: '/shared' }, icon: 'share' }
          ]
        }
      }
    }
  </script>
```

Custom content can be placed below the navigation inside of the sidebar via a slot called `mainContent`.
In this content block, you can include e.g. a short description of the product, guide the user through the current action, etc.

```js
  <oc-sidebar
    logoImg="examples/placeholder_brand_logo.svg"
    productName="ownCloud"
    class="uk-height-1-1"
  >
    <template v-slot:mainContent>
      <div>
        Securely access and share data from everywhere and any device
      </div>
    </template>
  </oc-sidebar>
```

To provide additional content above the navigation or in the footer, you can use the `upperContent` and `footer` slots.
The navigation block will automatically receive bottom margin in case the `footer` slot exists.

```jsx
  <template>
    <div>
      <oc-sidebar
        logoImg="examples/placeholder_brand_logo.svg"
        productName="ownCloud"
        :navItems="navItems"
      >
        <template v-slot:upperContent>
          <strong class="oc-light">Files app</strong>
        </template>
        <template v-slot:footer>
          <small class="oc-light">
            Made by ownClouders
          </small>
        </template>
      </oc-sidebar>
    </div>
  </template>
  <script>
    export default {
      computed: {
        navItems() {
          return [
            { name: 'Home', route: { path: '/' }, icon: 'home' },
            { name: 'All files', route: { path: '/files' }, icon: 'folder' },
            { name: 'Shared files', route: { path: '/shared' }, icon: 'share', active: true }
          ]
        }
      }
    }
  </script>
```

The navigation block can be hidden entirely - for example in favor of the `mainContent` slot.

```jsx
  <template>
    <div>
      <oc-sidebar
        logoImg="examples/placeholder_brand_logo.svg"
        productName="ownCloud"
        :navItems="navItems"
        :hide-nav="true"
      >
        <template v-slot:mainContent>
          <div>
            There are navItems in the code but the navigation is hidden anyway.
          </div>
        </template>
      </oc-sidebar>
    </div>
  </template>
  <script>
    export default {
      computed: {
        navItems() {
          return [
            { name: 'Home', route: { path: '/' }, icon: 'home' },
          ]
        }
      }
    }
  </script>
```
</docs>
