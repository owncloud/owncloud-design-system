<template>
  <ul uk-tab>
    <slot />
  </ul>
</template>

<script>
import OcTabItem from "../elements/OcTabItem"
/**
 * Create a tabbed navigation.
 *
 * ##TODO:
 *
 * - [ ] Implement https://getuikit.com/docs/tab#bottom-modifier
 * - [ ] Implement https://getuikit.com/docs/tab#left-right-modifiers
 * - [ ] Implement https://getuikit.com/docs/tab#alignment
 * - [ ] Implement https://getuikit.com/docs/tab#tabs-and-dropdown
 * - [ ] Implement https://getuikit.com/docs/tab#component-options
 */
export default {
  name: "oc-tabs",
  components: { OcTabItem },
  status: "prototype",
  release: "1.0.0",
}
</script>

<docs>
```jsx
  <template>
    <oc-tabs>
      <oc-tab-item active title="Left" @click="onClick" />
      <oc-tab-item title="Item 1"/>
      <oc-tab-item title="Item 2"/>
      <oc-tab-item disabled title="Disabled"/>
    </oc-tabs>
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
