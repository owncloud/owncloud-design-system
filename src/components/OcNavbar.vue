<template>
  <component
    :is="tag"
    v-if="sticky"
    :uk-sticky="'offset: ' + offset"
    class="uk-navbar-container"
    uk-navbar
    ><slot
  /></component>
  <component :is="tag" v-else class="uk-navbar-container" uk-navbar><slot /></component>
</template>

<script>
export default {
  name: "OcNavbar",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Configures whether the navbar remains attached to the view when scrolling
     */
    sticky: {
      type: Boolean,
      default: false,
    },
    /**
     * The offset position from the top (if sticky is enabled)
     */
    offset: {
      type: Number,
      default: 60,
    },
    /**
     * Specifies as which HTML tag this component gets rendered.
     * Default is "nav" for a `<nav>` element.
     */
    tag: {
      type: String,
      default: "nav",
    },
  },
}
</script>

<docs>
```vue
  <oc-navbar tag="header" class="oc-topbar">
    <oc-navbar-item position="left">
      <button class="oc-topbar-menu-burger" aria-label="Files">
        <oc-icon name="menu" class="oc-topbar-menu-burger-icon" /><span
          class="oc-topbar-menu-burger-label"
          >Files</span
        >
      </button>
    </oc-navbar-item>
    <oc-navbar-item position="center">
      <router-link to="/" class="oc-topbar-icon">ownCloud X</router-link>
    </oc-navbar-item>
    <oc-navbar-item position="right">
      <router-link
        tag="div"
        to="/personal"
        class="oc-topbar-personal"
        v-oc-tooltip="'Personal setting'"
      >
        <oc-avatar
          class="oc-topbar-personal-avatar"
          src="https://picsum.photos/64/64?image=1027"
        /><span class="oc-topbar-personal-label">Alice Habanero</span>
      </router-link>
    </oc-navbar-item>
  </oc-navbar>
```
</docs>
