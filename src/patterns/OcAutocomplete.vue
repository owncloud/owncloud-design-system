<template>
  <div :class="['oc-autocomplete', { 'oc-autocomplete-loading': loading }]">
    <oc-spinner v-if="loading" size="small" class="oc-autocomplete-spinner" />
    <input
      class="oc-autocomplete-input"
      v-model="input"
      @keydown="key($event)"
      @change="userInput"
      :disabled="loading"
      :placeholder="_placeholder"
    />
    <div hidden :id="_boundryId" />
    <div
      class="oc-autocomplete-dropdown"
      :uk-drop="'mode:click;delay-hide:0;toggle:#' + _boundryId"
      :id="_dropdownId"
    >
      <ul class="oc-autocomplete-suggestion-list">
        <template v-for="(item, i) in matchesShown">
          <li
            :class="[
              'oc-autocomplete-suggestion',
              { 'oc-autocomplete-suggestion-selected': i === highlighted },
            ]"
            :key="i"
            v-text="item"
            @mouseenter="highlighted = i"
            @click="selectSuggestion"
          ></li>
        </template>
        <li v-if="matchesOverflowing > 0" class="oc-autocomplete-suggestion-overflow">
          {{ matchesOverflowing }}
          <span v-if="matchesOverflowing === 1">more result</span>
          <span v-else>more results</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import OcSpinner from "../elements/OcSpinner"
import OcTextInput from "../elements/OcTextInput"

import UiKit from "uikit"
import { uniqueId as _uniqueId } from "lodash"

/**
 * The autocomplete component is used for searching in bigger list of data (usually involves remote calls over the network)
 * and presenting the user a list of possible matches to the entered search term.
 *
 * The component supports single select only at the moment.
 *
 * ##TODO:
 *
 * - [x] Implement loading indicator
 * - [ ] Allow complex content (HTML)
 */
export default {
  name: "oc-autocomplete",
  components: { OcTextInput, OcSpinner },
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Informative placeholder about the data to be entered
     */
    placeholder: {
      type: String,
      required: false,
    },
    /**
     * If set to true data is loaded and the user cannot enter further data
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * The elements from which the user can select
     */
    items: {
      type: Array,
      default: function() {
        return []
      },
    },
    /**
     * Maxlength of the dropdown
     */
    maxListLength: {
      type: Number,
      default: 5,
    },
    /**
     * The selected element
     */
    value: {
      type: String,
    },
  },
  data() {
    return {
      input: "",
      highlighted: 0,
    }
  },
  computed: {
    matchesShown() {
      return this._matches.slice(0, this.maxListLength)
    },
    matchesOverflowing() {
      return this._matches.length - this.matchesShown.length
    },
    _matches() {
      if (this.input.length === 0) {
        return []
      }
      return this.items.filter(item => {
        return item.toLowerCase().indexOf(this.input.toLowerCase()) >= 0
      })
    },
    _dropdownId() {
      return _uniqueId("oc-autocomplete-dropdown-")
    },
    _boundryId() {
      return _uniqueId("oc-autocomplete-boundry-")
    },
    _dropdown() {
      return UiKit.drop(`#${this._dropdownId}`)
    },
    _placeholder() {
      return this.loading ? "Loading ..." : this.placeholder
    },
  },
  watch: {
    _matches(items, last) {
      if (items === last) return

      // Hide if the list only contains the current full match
      if (items.length === 1 && items[0].toLowerCase() === this.input.toLowerCase()) {
        this._dropdown.hide()
      }
      // Hide, if there are no matches
      else if (items.length === 0) {
        this._dropdown.hide()
      } else {
        this._dropdown.show()
      }
    },
    highlighted(next, current) {
      if (next === current) return

      // come around
      if (next < 0) {
        this.highlighted = this.matchesShown.length - 1
      } else if (next > this.matchesShown.length - 1) {
        this.highlighted = 0
      }
    },
  },
  methods: {
    userInput(value) {
      /**
       * This event is emitted as soon as the user changes the search term
       * @type {string}
       */
      this.$emit("update:search-input", value)
    },
    key(event) {
      switch (event.key) {
        case "ArrowUp":
          this.highlighted--
          break
        case "ArrowDown":
          this.highlighted++
          break
        case "Enter":
          this.selectSuggestion()
      }
    },
    selectSuggestion() {
      if (this.matchesShown[this.highlighted]) this.input = this.matchesShown[this.highlighted]
    },
  },
}
</script>
<docs>
```jsx
<template>
  <section>
    <h3 class="uk-heading-divider">
      Autocomplete
    </h3>
    <div class="uk-margin">
      <oc-autocomplete :items="[]" loading placeholder="I'm just loading around" />
    </div>
    <div class="uk-margin">
      <oc-autocomplete :items="items" placeholder="Add user" />
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete in action
    </h3>
    <div class="uk-margin">
      <oc-autocomplete :items="searchResult" :loading="searchInProgress" placeholder="Add user" @update:search-input="onInput"/>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      items : [
        'Scott Mortensen',
        'Lecia Scheerer',
        'Merrie Rubin',
        'Kenton Eich',
        'Telma Bonavita',
        'Annis Newberry',
        'Tama Lindamood',
        'Charmain Earls',
        'Verona Mounts',
        'Arlena Bolster'
      ],
      searchResult: [],
      searchInProgress: false
    }
  },
  methods: {
    onInput() {
      this.searchResult = []
      this.searchInProgress = true
      setTimeout(function () {
        alert('time is up')
        this.searchInProgress = false
        this.searchResult = this.items
      }, 2000)
    }
  }
}
</script>
```
</docs>
