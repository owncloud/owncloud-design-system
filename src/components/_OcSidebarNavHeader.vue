<template>
  <li class="uk-nav-header">
    <slot />
  </li>
</template>
<script>
export default {
  name: "oc-sidebar-nav-header",
  status: "prototype",
  release: "1.0.0",
}
</script>
<docs>
  ```jsx
  <div>
    <oc-sidebar-nav-header>Just another header</oc-sidebar-nav-header>
  </div>
  ```
</docs>
