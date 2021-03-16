<template>
  <oc-grid
    flex
    :role="isFilter ? undefined : 'search'"
    class="oc-search"
    :class="{ 'oc-search-small': small }"
  >
    <div class="uk-width-expand uk-position-relative">
      <span v-if="icon" class="uk-form-icon">
        <oc-icon v-show="!loading" :name="icon" />
        <oc-spinner v-show="loading" :size="spinnerSize" :aria-label="loadingAccessibleLabel" />
      </span>
      <input
        :class="inputClass"
        :aria-label="label"
        :value="searchQuery"
        :disabled="loading"
        :placeholder="placeholder"
        @input="onType($event.target.value)"
        @keydown.enter="onSearch"
      />
      <div
        v-if="query.length > 0"
        uk-close
        class="oc-search-clear uk-position-small uk-position-center-right"
        @click="onClear"
      />
    </div>
    <div :class="{ 'oc-invisible-sr': buttonHidden }">
      <oc-button
        class="oc-search-button"
        :class="{ 'uk-button-small': small }"
        variation="primary"
        :disabled="loading || searchQuery.length < 1"
        @click="onSearch"
        >{{ buttonLabel }}</oc-button
      >
    </div>
  </oc-grid>
</template>
<script>
/**
 * The search bar is an input element used for searching server side resources or to filter local results.
 *
 * ## Accessibility
 *
 * ### Landmark role=search
 * Given there is only one instance of `<oc-search-bar>` per page/route, this component should communicate its purpose, being the main site search, to screen readers ([explainer of landmark roles](https://www.washington.edu/accessibility/web/landmarks/)). If the component serves as a filter form, it is advised to disable the landmark role via `isFilter="true"`.
 *
 * ### Making sure a submit button exits
 *
 * Both a search and filter form does need a submit button, regardless if the button is visually perceivable or not. If a "buttonless" look is desired, use `button-hidden="true"`, which renders the button visually hidden.
 */
export default {
  name: "OcSearchBar",
  status: "prototype",
  release: "1.0.0",
  props: {
    /**
     * Set the search query
     */
    value: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The icon to be displayed
     */
    icon: {
      type: [String, Boolean],
      required: false,
      default: "search",
    },
    /**
     * Informative placeholder about the data to be entered
     */
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    /**
     * Informative label about the data to be entered
     */
    label: {
      type: String,
      required: true,
      default: "",
    },
    /**
     * Indicator if the search bar should be of smaller size
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * Determine the button text
     */
    buttonLabel: {
      type: [String],
      required: false,
      default: "Search",
    },
    /**
     * Determine the button visibility
     */
    buttonHidden: {
      type: [Boolean],
      required: false,
      default: false,
    },
    /**
     * If set to true the search event is triggered on each entered character
     */
    typeAhead: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * automatically trim whitespaces around search term
     */
    trimQuery: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * If set to true data is loaded and the user cannot enter further data
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * If set to true the search landmark role is removed since it's not the page's main search function anymore
     */
    isFilter: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The aria label for the loading spinner
     */
    loadingAccessibleLabel: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    query: "",
  }),
  computed: {
    searchQuery() {
      // please don't treat empty string the same as null...
      return this.value === null ? this.query : this.value
    },
    spinnerSize() {
      if (this.small) {
        return "xsmall"
      }
      return "medium"
    },
    inputClass() {
      const classes = ["oc-search-input"]

      this.icon && classes.push("oc-search-input-icon")
      !this.buttonHidden && classes.push("oc-search-input-button")

      return classes
    },
  },
  methods: {
    onSearch() {
      /**
       * Search event on filter or search user input
       * @event search
       * @type {event}
       */
      this.$emit("search", this.query)
    },
    onType(query) {
      this.query = !this.noTrim ? query.trim() : query
      /**
       * Input event to support model directive
       * @event Input
       * @type {event}
       */
      this.$emit("input", query)
      if (this.typeAhead) this.onSearch(query)
    },
    onClear() {
      this.query = ""
      this.onType("")
      this.onSearch()

      /**
       * Clear event triggered after the clear of the search query
       * @event clear
       * @type {event}
       */
      this.$emit("clear")
    },
  },
}
</script>

<docs>
```
<template>
  <div>
    <section>
      <h3 class="uk-heading-divider">
          Search examples
      </h3>
      <oc-search-bar label="Search files" placeholder="Search files" loadingAccessibleLabel="Loading..." @search="onSearch" @clear="onClear" />
      <div v-if="searchQuery" class="oc-m">Search query: {{ searchQuery }}</div>
      <hr>
      <div class="oc-mb">
        <oc-search-bar label="Loading..." placeholder="Loading ..." loadingAccessibleLabel="Loading..." :loading="true"></oc-search-bar>
      </div>
      <div class="oc-mb">
        <oc-search-bar small label="Small searchbar" placeholder="Small searchbar" loadingAccessibleLabel="Loading..." :loading="true"></oc-search-bar>
      </div>
    </section>
    <section>
      <h3 class="uk-heading-divider">
        Search example with visually hidden button
      </h3>
      <div class="oc-mb">
        <oc-search-bar label="Search files" placeholder="Search files" loadingAccessibleLabel="Loading..." @search="onSearch" @clear="onClear" :button-hidden="true" />
      </div>
    </section>
    <section>
      <h3 class="uk-heading-divider">
          Filter examples
      </h3>
      <oc-search-bar :isFilter="true" label="Search files" placeholder="Filter Files ..." loadingAccessibleLabel="Loading..." :type-ahead="true" @search="onFilter" button="Filter" icon=""></oc-search-bar>
      <div v-if="filterQuery" class="oc-m">Filter query: {{ filterQuery }}</div>
    </section>
  </div>
</template>
<script>
    export default {
        data: () => {
            return {
                filterQuery: '',
                searchQuery: ''
            }
        },
        methods: {
            onFilter(val) {
                this.filterQuery = val
            },
            onSearch(val) {
                this.searchQuery = val
            },
            onClear () {
              alert('Query has been cleared')
            }
        }
    }
</script>
```
</docs>
