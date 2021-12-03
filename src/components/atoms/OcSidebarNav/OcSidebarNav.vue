<template functional>
  <div
    :ref="data.ref"
    class="oc-sidebar"
    :class="[data.staticClass, data.class]"
    v-bind="data.attrs"
  >
    <header
      v-if="slots().header"
      class="oc-sidebar-header uk-flex uk-flex-middle"
      :aria-label="props.accessibleLabelHeader"
    >
      <!-- @slot Header of the sidebar -->
      <slot name="header" />
    </header>
    <nav v-if="slots().nav" class="oc-sidebar-nav" :aria-label="props.accessibleLabelNav">
      <!-- @slot Main content of the sidebar -->
      <slot name="nav" />
    </nav>
    <footer
      v-if="slots().footer"
      class="oc-sidebar-footer"
      :aria-label="props.accessibleLabelFooter"
    >
      <!-- @slot Footer of the sidebar -->
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: "OcSidebarNav",
  status: "ready",
  released: "1.5.0",

  props: {
    /**
     * Accessible label for the header inside the sidebar
     */
    accessibleLabelHeader: {
      type: String,
      required: true,
    },
    /**
     * Accessible label for the navigation inside the sidebar
     */
    accessibleLabelNav: {
      type: String,
      required: true,
    },
    /**
     * Accessible label for the footer inside the sidebar
     */
    accessibleLabelFooter: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.oc-sidebar {
  background-color: var(--oc-color-swatch-brand-default);
  box-sizing: border-box;
  color: var(--oc-color-text-inverse);
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
  width: var(--oc-size-width-medium);
  background-color: #202020;
  overflow: visible;
  z-index: var(--oc-z-index-modal);

  &-header {
    padding: 0 var(--oc-space-medium);
    height: 64px;
  }

  &-nav {
    flex: auto;
    margin-bottom: var(--oc-space-large);
    background-color: #2d2d2d;
    border-radius: 15px;
    padding-top: var(--oc-space-large);
    margin-left: var(--oc-space-small);
    box-shadow: 5px 0px 25px rgba(0, 0, 0, 0.3);
  }

  &-footer {
    padding: 0 var(--oc-space-medium);

    p {
      color: inherit;
      margin-bottom: 0;
    }
  }
}
</style>

<docs>
Sidebar navigation component containing branding

## Examples
```js
<oc-sidebar-nav class="uk-height-large">
  <template #header>
    <div class="uk-text-center">
      <a href="#">
        <oc-logo src="examples/placeholder_brand_logo.svg" alt="ownCloud" />
      </a>
    </div>
  </template>
  <template #nav>
    <oc-list>
      <oc-sidebar-nav-item icon="folder">Files</oc-sidebar-nav-item>
      <oc-sidebar-nav-item :active="true" icon="shared-with-me">Shared with me</oc-sidebar-nav-item>
      <oc-sidebar-nav-item icon="delete">Deleted files</oc-sidebar-nav-item>
    </oc-list>
  </template>
  <template #footer>
    <p class="oc-px-s">Made by ownClouders</p>
  </template>
</oc-sidebar-nav>
```
</docs>
