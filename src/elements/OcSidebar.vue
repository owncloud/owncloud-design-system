<template>
  <div :class="$_ocSidebar_classes">
    <div class="oc-sidebar-content-wrapper">
      <oc-button
        v-if="fixed"
        class="oc-sidebar-button-close"
        variation="raw"
        @click.native="$_ocSidebar_buttonClose_click" 
        :aria-label="closeButtonLabel"
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
      <nav :class="[{ 'uk-margin-bottom' : $slots.footer },  'oc-sidebar-nav']">
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
      <div v-if="$slots.footer" class="oc-sidebar-footer">
        <!-- @slot Footer of the sidebar -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import OcSidebarNavItem from "./OcSidebarNavItem.vue"
import OcImg from "./OcImage.vue"
import OcButton from "./OcButton.vue"
import OcIcon from "./OcIcon.vue"

export default {
  name: "oc-sidebar",
  status: "review",
  released: "unreleased",

  components: {
    OcSidebarNavItem,
    OcImg,
    OcButton,
    OcIcon
  },

  props: {
    /**
     * Source of the logo image
     */
    logoImg: {
      type: String,
      required: false
    },
    /**
     * Name of the product where the sidebar is used
     */
    productName: {
      type: String,
      required: true
    },
    /**
     * Navigation items of the product
     */
    navItems: {
      type: Array,
      required: true
    },
    /**
     * Asserts whether the sidebar's position is fixed
     */
    fixed: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Accessibility label of the close button
     */
    closeButtonLabel: {
      type: String,
      required: false,
      default: "Close navigation menu"
    }
  },

  computed: {
    $_ocSidebar_classes() {
      const classes = ["oc-sidebar"]

      if (this.fixed) {
        classes.push("oc-sidebar-fixed")
      }

      return classes
    }
  },

  methods: {
    $_ocSidebar_buttonClose_click() {
      /**
       * The user clicked on the close button
       */
      this.$emit("close")
    }
  }
}
</script>

<docs>
Sidebar component containing branding and navigation

## Examples
```jsx
  <template>
    <div>
      <oc-sidebar
        logoImg="https://owncloud.org/wp-content/themes/owncloud/img/owncloud-org-logo.svg"
        productName="ownCloud"
        :navItems="navItems"
        class="uk-height-1-1"
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
        class="uk-height-1-1"
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

To provide additional content above the navigation or in the footer, you can use the `upperContent` and `footer` slots.
The navigation block will automatically receive bottom margin in case the `footer` slot exists.

```jsx
  <template>
    <div>
      <oc-sidebar
        logoImg="https://owncloud.org/wp-content/themes/owncloud/img/owncloud-org-logo.svg"
        productName="ownCloud"
        :navItems="navItems"
        class="uk-height-1-1"
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
</docs>
