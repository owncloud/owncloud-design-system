<template functional>
  <li
    v-bind="data.attrs"
    :ref="data.ref"
    :class="[
      'oc-sidebar-nav-item',
      { 'oc-sidebar-nav-item-isolated': props.isolate },
      { 'oc-sidebar-nav-item-parent': slots().subnav },
      data.staticClass,
      data.class,
    ]"
    :aria-current="props.active ? 'page' : null"
  >
    <router-link :class="['oc-sidebar-nav-item-link', { active: props.active }]" :to="props.target">
      <oc-icon
        class="oc-sidebar-nav-item-icon"
        :name="props.icon"
        variation="inverse"
        aria-hidden="true"
      />
      <slot name="default" />
    </router-link>
    <oc-list v-if="slots().subnav" class="oc-sidebar-nav-item-list">
      <slot name="subnav" />
    </oc-list>
  </li>
</template>
<script>
import OcIcon from "./OcIcon.vue"

export default {
  name: "OcSidebarNavItem",
  status: "review",
  release: "1.0.0",
  components: {
    OcIcon,
  },
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    target: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: true,
      default: "",
    },
    isolate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.oc-sidebar-nav-item {
  &-link {
    align-items: center;
    color: var(--oc-color-text-inverse);
    display: flex;
    font-weight: 600;
    padding: var(--oc-space-small) var(--oc-space-medium);
    transition: background-color $transition-duration-short ease-in-out;

    &:hover {
      background-color: var(--oc-color-swatch-brand-hover);
      color: var(--oc-color-text-inverse);
      text-decoration: none;
    }

    &.active {
      background-color: var(--oc-color-swatch-brand-hover);
      cursor: default;
    }
  }

  &-icon {
    margin-right: var(--oc-space-small);
  }

  &-isolated {
    margin-top: var(--oc-space-medium);
  }

  &-list &-link {
    font-size: 0.875rem;
    padding-left: var(--oc-space-large);
  }
}
</style>

<docs>
## Examples
```vue
<nav class="oc-background-brand">
  <oc-list>
    <oc-sidebar-nav-item target="#" icon="folder" active>Files</oc-sidebar-nav-item>
    <oc-sidebar-nav-item target="#" icon="delete">Deleted files</oc-sidebar-nav-item>
  </oc-list>
</nav>
```

### Isolate nav items
```vue
<nav class="oc-background-brand">
  <oc-list>
    <oc-sidebar-nav-item target="#" icon="folder" active>Files</oc-sidebar-nav-item>
    <oc-sidebar-nav-item target="#" icon="delete">Deleted files</oc-sidebar-nav-item>
    <oc-sidebar-nav-item target="#" icon="group" isolate>Users</oc-sidebar-nav-item>
  </oc-list>
</nav>
```

### Nested nav items
```vue
<nav class="oc-background-brand">
  <oc-list>
    <oc-sidebar-nav-item target="#" icon="folder" active>
      Files
      <template #subnav>
        <oc-sidebar-nav-item target="#" icon="folder">Personal files</oc-sidebar-nav-item>
        <oc-sidebar-nav-item target="#" icon="delete">Deleted files</oc-sidebar-nav-item>
      </template>
    </oc-sidebar-nav-item>
    <oc-sidebar-nav-item target="#" icon="group" isolate>Users</oc-sidebar-nav-item>
  </oc-list>
</nav>
```
</docs>
