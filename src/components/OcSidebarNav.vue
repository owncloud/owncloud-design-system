<template functional>
  <div
    :ref="data.ref"
    class="oc-sidebar"
    :class="[data.staticClass, data.class]"
    v-bind="data.attrs"
  >
    <header v-if="slots().header" class="oc-sidebar-header">
      <!-- @slot Header of the sidebar -->
      <slot name="header" />
    </header>
    <nav v-if="slots().nav" class="oc-sidebar-nav" :aria-label="props.accessibleLabel">
      <!-- @slot Main content of the sidebar -->
      <slot name="nav" />
    </nav>
    <footer v-if="slots().footer" class="oc-sidebar-footer">
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
     * Accessible label for the navigation inside the sidebar
     */
    accessibleLabel: {
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
  padding: var(--oc-space-large) 0 var(--oc-space-medium);
  width: var(--oc-size-width-medium);

  &-header {
    margin-bottom: var(--oc-space-xxlarge);
    padding: 0 var(--oc-space-medium);
  }

  &-nav {
    flex: auto;
    margin-bottom: var(--oc-space-large);
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
```vue
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
