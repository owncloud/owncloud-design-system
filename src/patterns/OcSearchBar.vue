<template>
  <div uk-grid class="oc-search">
    <div>
      <div class="uk-inline">
        <span v-if="icon" class="uk-form-icon">
          <oc-icon v-show="!loading" :name="icon" />
          <div v-show="loading" uk-spinner="ratio:0.75" aria-hidden></div>
        </span>
        <oc-text-input
          class="oc-search-input"
          @input="onType"
          @keydown.enter="onSearch"
          :placeholder="placeholder"
          :value="searchQuery"
          :disabled="loading"
        />
        <div
          uk-close
          v-if="query.length > 0"
          @click="clearInput"
          class="oc-search-clear uk-position-small uk-position-center-right"
        />
      </div>
    </div>
    <div v-if="button">
      <oc-button
        class="oc-search-button"
        variation="primary"
        :disabled="loading || searchQuery.length < 1"
        :text="button"
        @click="onSearch"
      />
    </div>
  </div>
</template>
<script>
import OcTextInput from "../elements/OcTextInput"

/**
 * The search bar is an input element used for searching server side resources or to filter local results.
 */
export default {
  name: "oc-search-bar",
  components: { OcTextInput },
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
     * Informative placeholder about the data to be entered
     */
    icon: {
      type: String,
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
     * Determine the button text
     */
    button: {
      type: [String, Boolean],
      required: false,
      default: "Search",
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
  },
  data: () => ({
    query: "",
  }),
  methods: {
    clearInput() {
      this.query = ""
      this.onType("")
      this.onSearch()
    },
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
  },
  computed: {
    searchQuery() {
      // please don't treat empty string the same as null...
      return this.value === null ? this.query : this.value
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
      <oc-search-bar placeholder="Search files" @search="onSearch"></oc-search-bar>
      <div v-if="searchQuery" class="uk-margin">Search query: {{ searchQuery }}</div>
      <hr>
      <div class="uk-margin">
        <oc-search-bar placeholder="Loading ..." :loading="true"></oc-search-bar>
      </div>
    </section>
    <section>
      <h3 class="uk-heading-divider">
          Filter examples
      </h3>
      <oc-search-bar placeholder="Filter Files ..." :type-ahead="true" @search="onFilter" button="Filter" icon=""></oc-search-bar>
      <div v-if="filterQuery" class="uk-margin">Filter query: {{ filterQuery }}</div>
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
            }
        }
    }
</script>
```
</docs>
