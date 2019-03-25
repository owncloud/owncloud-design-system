<template>
  <div class="uk-inline">
    <oc-text-input
      :placeholder="label"
      @input="onType"
      :value="searchQuery"
      @keydown.enter="onSearch"
      @click:append="onSearch"
      autofocus="autofocus"
      :disabled="loading"
    />
    <span class="uk-form-icon uk-form-icon-flip">
      <oc-icon name="search" />
    </span>
  </div>
</template>

<script>
import OcTextInput from "../elements/OcTextInput"

/**
 * The search bar is an input element used for searching server side resources.
 */
export default {
  name: "oc-search-bar",
  components: { OcTextInput },
  status: "prototype",
  release: "0.0.1",
  props: {
    value: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    // native autofocus
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
    // search while typing
    autosearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    // do not automatically trim whitespaces around search term
    noTrim: {
      type: Boolean,
      required: false,
      default: false,
    },
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
    onSearch(query) {
      this.$emit("search", this.query)
    },
    onType(query) {
      this.query = !this.noTrim ? query.trim() : query
      // use input event to support model directive
      this.$emit("input", query)
      if (this.autosearch) this.onSearch(query)
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
```jsx
  <oc-search-bar label="Search Files"></oc-search-bar>
  <br>
  <br>
  <oc-search-bar label="Searching ...." :loading="true"></oc-search-bar>
```
</docs>
