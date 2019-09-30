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
  name: "oc-navbar",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The offset position from the top (Phoenix Topbar height)
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
     * The offset position from the top (if sticky is enabled)
     */
    tag: {
      type: String,
      default: "nav",
    },
  },
}
</script>
<docs>
```jsx
  <oc-navbar tag="header" class="oc-topbar">
    <oc-navbar-item position="left">
      <button class="oc-topbar-menu-burger">
        <oc-icon name="menu" class="oc-topbar-menu-burger-icon" aria-hidden="true" /><span
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
        uk-tooltip="title: Personal setting; pos: bottom-right;"
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
