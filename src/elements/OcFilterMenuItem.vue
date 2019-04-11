<template>
  <li>
    <slot name="searchBar">
      <div class="uk-flex uk-flex-middle">
        <oc-checkbox
          :id="name"
          :value="value"
          class="uk-margin-small-right"
          @change="$_ocCheckbox_onChange($event)"
        />
        <label :for="name">
          <slot name="default" />
        </label>
      </div>
    </slot>
  </li>
</template>
<script>
/**
 * Create a filter menu item.
 */
export default {
  name: "oc-filter-menu-item",
  status: "review",
  release: "0.0.1",
  props: {
    /**
     * Name of filter
     */
    name: {
      type: String,
      default: "",
    },
    /**
     * Data-model
     **/
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    filterQuery: "",
  }),
  methods: {
    $_ocCheckbox_onChange(event) {
      /**
       * Change event to support model directive
       * @event Change
       * @type {event}
       */
      this.$emit("change", event)
    },
  },
}
</script>

<docs>
```jsx
  <template>
    <oc-menu buttonText="open oc-menu">
      <template slot="subnav">
        <template v-for="(filter, fid) in filters">
          <oc-filter-menu-item :key="fid" :name="filter.tag" :value="filter.value" @change="$_ocCheckbox_onFilterFileType">
            {{ filter.name }}
          </oc-filter-menu-item>
        </template>
        <oc-filter-menu-item>
          <template v-slot:searchBar>
            <div class="uk-margin-small-top">
              <label>
                Item with search bar
              </label>
            </div>
            <oc-search-bar :type-ahead="true" @search="$_ocSearchBar_onFilter" :button="false" />
            <div v-if="filterQuery" class="uk-margin-top">Filter query: {{ filterQuery }}</div>
          </template>
        </oc-filter-menu-item>
      </template>
    </oc-menu>
  </template>
  <script>
      export default {
          data: () => {
              return {
                filterQuery: '',
                filters: [{
                  name: 'Files',
                  tag: 'files',
                  value: true
                },
                {
                  name: 'Folders',
                  tag: 'folders',
                  value: true
                },
                {
                  name: 'Hidden',
                  tag: 'hidden',
                  value: false
                }]
              }
          },
          methods: {
              $_ocSearchBar_onFilter(val) {
                this.filterQuery = val
              }
          }
      }
  </script>
```
</docs>
