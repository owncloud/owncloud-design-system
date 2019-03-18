<template>
  <div>
    <ul>
      <li v-for="item in items">{{ divider }} {{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
/**
 * Displays a breadcrumb. Each item in the items property has the following elements:
 *
 *  - text: mandatory element, holds the text which is to be displayed in the breadcrumb
 *  - to: optional element, the vue router link
 *  - disabled: optional element, if set to true the breadcrumb is not clickable
 */
export default {
  name: "oc-breadcrumbs",
  status: "review",
  release: "1.0.0",
  props: {
    items: {
      type: Array,
      default: [],
      required: true,
    },
    divider: {
      type: String,
      default: ">",
      required: false,
    },
  },
}
</script>

<style scoped></style>

<docs>
    ```jsx
    <div>
        <oc-breadcrumbs :items="[{text: 'foo'}, {text: 'bar'}]" divider="/"></oc-breadcrumbs>
    </div>
    ```
</docs>
