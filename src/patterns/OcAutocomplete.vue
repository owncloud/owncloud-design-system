<template>
  <div class="oc-autocomplete">
    <input
      class="oc-autocomplete-input"
      v-model="input"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown.up.prevent="highlighted--"
      @keydown.down.prevent="highlighted++"
      @keydown.enter="selectSuggestion"
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
        <li
          v-if="matchesOverflowing > 0 && !itemsLoading"
          class="oc-autocomplete-suggestion-overflow"
        >
          {{ matchesOverflowing }}
          <span v-if="matchesOverflowing === 1">more result</span>
          <span v-else>more results</span>
        </li>
        <li v-if="itemsLoading" class="oc-autocomplete-suggestion-list-loader">
          <oc-spinner class="oc-autocomplete-spinner" />
          <span>{{ spinnerText }}</span>
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
 * - [ ] Allow complex content (HTML)
 * - [ ] Selecting model is not yet clean - will need to be changed together with ^
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
     * Informative text displayed right next to the spinner while loading data
     */
    spinnerText: {
      type: String,
      required: false,
      default: "Loading…",
    },
    /**
     * Input can be entered or not
     */
    disabled: {
      type: Boolean,
      required: false,
    },
    /**
     * If set to true data is loaded and the user cannot enter further data
     */
    itemsLoading: {
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
  },
  watch: {
    input(input, before) {
      if (input === before) return

      if (
        input.length === 0 ||
        (input === this.matchesShown[0] && this.matchesShown.length === 1)
      ) {
        this._dropdown.hide()
      } else {
        this._dropdown.show()
      }

      // The real update not depending on onblur
      this.userInput(input)
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
      this.$emit("update:input", value)
    },
    selectSuggestion() {
      if (this.matchesShown[this.highlighted]) {
        this.input = this.matchesShown[this.highlighted]
        this.$emit("input", this.input)
      }
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
      <oc-autocomplete :items="[]" disabled placeholder="I am disabled" />
    </div>
    <div class="uk-margin">
      <oc-autocomplete :items="items" placeholder="Add user" />
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete in action
    </h3>
    <div class="uk-margin">
      <oc-autocomplete v-model="selectedItem" :items="searchResult" :itemsLoading="searchInProgress" placeholder="Add user" @update:input="onInput"/>
      <span>Selected item: {{ selectedItem }}</span>
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
      searchInProgress: false,
      selectedItem: null
    }
  },
  methods: {
    onInput() {
      this.searchInProgress = true
      setTimeout(() => {
        this.searchInProgress = false
        this.searchResult = this.items
      }, 2000)
    }
  }
}
</script>
```
</docs>
