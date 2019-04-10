<template>
  <li class="uk-nav-header">
    <slot>
      <span>
        {{ text }}
      </span>
    </slot>
  </li>
</template>
<script>
export default {
  name: "oc-sidebar-nav-header",
  status: "prototype",
  release: "1.0.0",
  props: {
    text: {
      type: String,
      required: false,
      default: "NavItem",
    },
  },
}
</script>
<docs>
  ```jsx
  <div>
    <oc-sidebar-nav-header text="Demo Item" />
    <oc-sidebar-nav-header>Just another header</oc-sidebar-nav-header>
  </div>
  ```
</docs>
