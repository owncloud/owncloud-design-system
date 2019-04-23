<template>
  <ul class="uk-nav uk-nav-default">
    <slot />
  </ul>
</template>
<script>
/**
 * list navigation.
 */
export default {
  name: "oc-nav",
  status: "review",
  release: "1.0.0",
}
</script>
<docs>
```jsx
<template>
  <oc-nav>
    <oc-nav-item icon="create_new_folder">Item with icon</oc-nav-item>
    <oc-nav-item @click="onClick('Hi there')">Item without icon</oc-nav-item>
    <oc-nav-item active>An active item</oc-nav-item>
  </oc-nav>
</template>
<script>
  export default {
    methods: {
      onClick(val) {
        alert(val)
      }
    }
  }
</script>
```
</docs>
