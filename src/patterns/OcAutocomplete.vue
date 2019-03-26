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
    <div hidden :id="_boundry" />
    <div
      class="oc-autocomplete-dropdown"
      :uk-drop="'mode:click;delay-hide:0;toggle:#' + _boundry"
      :id="_dropDown"
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
     * Is set to true data is loaded and the user cannot enter further data
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
    matches() {
      if (this.input.length === 0) {
        return []
      }
      return this.items.filter(item => {
        return item.toLowerCase().indexOf(this.input.toLowerCase()) >= 0
      })
    },
    matchesShown() {
      return this.matches.slice(0, this.maxListLength)
    },
    matchesOverflowing() {
      return this.matches.length - this.matchesShown.length
    },
    _dropDown() {
      return _uniqueId("oc-autocomplete-dropdown-")
    },
    _boundry() {
      return _uniqueId("oc-autocomplete-boundry-")
    },
    _dropdown() {
      return UiKit.drop(`#${this._dropDown}`)
    },
    _placeholder() {
      return this.loading ? "Loading ..." : this.placeholder
    },
  },
  watch: {
    matches(items, last) {
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
  <div>
    <div class="uk-margin">
      <oc-autocomplete :items="[]" loading placeholder="I'm just loading around" />
    </div>
    <div class="uk-margin">
      <oc-autocomplete :items="items" placeholder="Add user" />
    </div>
  </div>
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
      ]
    }
  }
}
</script>
```
</docs>
