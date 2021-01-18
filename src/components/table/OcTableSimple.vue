<template>
  <table :class="tableClasses">
    <slot/>
  </table>
</template>
<script>
/**
 * A table component with manually built layout.
 */
export default {
  name: "oc-table-simple",
  status: "review",
  release: "2.1.0",
  props: {
    /**
     * Whether or not table rows should be highlighted when hovered.
     */
    hover: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tableClasses() {
      const result = ["oc-table"]
      if (this.hover) {
        result.push("oc-table-hover")
      }
      return result
    },
  },
}
</script>
<style lang="scss" scoped>
.oc-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  // stylelint-disable selector-pseudo-element-no-unknown
  &-hover ::v-deep tr {
    transition: background-color $transition-duration-short ease-in-out;
  }

  ::v-deep tr + tr {
    border-top: 1px solid $border-primary;
  }

  &-hover ::v-deep tr:hover {
    background-color: lighten($selected-background, 0.2);
  }
  // stylelint-enable selector-pseudo-element-no-unknown
}
</style>
<docs>
```
<template>
  <section>
    <h3 class="uk-heading-divider">
      A simple table
    </h3>
    <oc-table-simple :hover="true">
      <oc-thead>
        <oc-tr>
          <oc-th>Resource</oc-th>
          <oc-th>Last modified</oc-th>
        </oc-tr>
      </oc-thead>
      <oc-tbody>
        <oc-tr v-for="item in items" :key="'item-' + item.id">
          <oc-td>{{ item.resource }}</oc-td>
          <oc-td>{{ item.last_modified }}</oc-td>
        </oc-tr>
      </oc-tbody>
    </oc-table-simple>
  </section>
</template>
<script>
  export default {
    computed: {
      items() {
        return [{
          id: "4b136c0a-5057-11eb-ac70-eba264112003",
          resource: "hello-world.txt",
          last_modified: 1609962211,
        }, {
          id: "8468c9f0-5057-11eb-924b-934c6fd827a2",
          resource: "I am a folder",
          last_modified: 1608887766,
        }, {
          id: "9c4cf97e-5057-11eb-8044-b3d5df9caa21",
          resource: "this is fine.png",
          last_modified: 1599999999,
        }]
      },
    },
  }
</script>
```
</docs>
