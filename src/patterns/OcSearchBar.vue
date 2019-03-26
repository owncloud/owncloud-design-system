<template>
  <div class="uk-inline">
    <oc-text-input
      :placeholder="placeholder"
      @input="onType"
      :value="searchQuery"
      @keydown.enter="onSearch"
      :disabled="loading"
    />
    <span v-if="icon" class="uk-form-icon uk-form-icon-flip">
      <oc-icon :name="icon" />
    </span>
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
        <section>
            <section>
                <h3 class="uk-heading-divider">
                    Search examples
                </h3>
                <oc-search-bar placeholder="Search Files" @search="onSearch"></oc-search-bar>
                <span>Search query: {{ searchQuery }}</span>
                <br>
                <br>
                <oc-search-bar placeholder="Loading ...." :loading="true"></oc-search-bar>
            </section>
            <section>
                <h3 class="uk-heading-divider">
                    Filter examples
                </h3>
                <oc-search-bar placeholder="Filter Files ..." :type-ahead="true" @search="onFilter" icon=""></oc-search-bar>
                <span>Filter query: {{ filterQuery }}</span>
            </section>
        </section>
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
