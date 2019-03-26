<template>
  <table :class="['uk-table', tableAlign, tableDivider]">
    <slot />
  </table>
</template>
<script>
/**
 * The file list is main component of the ownCloud files app.
 *
 * ## TODO
 *
 * - [ ] handle large lists with https://github.com/Akryum/vue-virtual-scroller
 *
 */
export default {
  name: "oc-table",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Define if elements are vertically aligned in the middle of a line?
     */
    middle: {
      type: Boolean,
      required: false,
    },
    /**
     * Define if the table has a divider
     */
    divider: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    tableAlign() {
      return this.middle ? "uk-table-middle" : null
    },
    tableDivider() {
      return this.divider ? "uk-table-divider" : null
    },
  },
}
</script>
<docs>
```jsx
<oc-table middle divider>
  <oc-table-group>
    <oc-table-row>
      <oc-table-cell shrink type="head">
        <oc-checkbox />
      </oc-table-cell>
      <oc-table-cell type="head" class="uk-text-truncate" v-text="'Name'"/>
      <oc-table-cell shrink type="head" v-text="'Size'"/>
      <oc-table-cell shrink type="head" class="uk-text-nowrap uk-visible@s" v-text="'Modification Time'"/>
      <oc-table-cell shrink type="head" v-text="'Actions'"/>
    </oc-table-row>
  </oc-table-group>
  <oc-table-group>
    <oc-table-row v-for="(i,o) in new Array(3)" :key="o">
      <oc-table-cell>
        <oc-checkbox />
      </oc-table-cell>
      <oc-table-cell>
        <oc-file icon="image" :file="{ name : 'I love flowers', extension : 'jpg' }" :name="'Picture ' + ++o"/>
      </oc-table-cell>
      <oc-table-cell class="uk-text-muted uk-text-nowrap" v-text=" (++o * 128) + ' Kb'" />
      <oc-table-cell class="uk-text-muted uk-text-nowrap uk-visible@s" v-text=" ++o + ' days ago'" />
      <oc-table-cell>
        <div class="uk-button-group">
          <oc-button icon="edit" aria-label="Edit Picture" />
          <oc-button icon="file_download" aria-label="Download Picture" />
          <oc-button icon="delete" aria-label="Delete Picture" />
        </div>
      </oc-table-cell>
    </oc-table-row>
  </oc-table-group>
</oc-table>
```
</docs>
