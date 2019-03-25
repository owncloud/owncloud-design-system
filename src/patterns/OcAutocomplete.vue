<template>
  <div class="oc-autocomplete">
    <!-- <oc-text-input :disabled="loading" :placeholder="label" @change="userInput"></oc-text-input> -->
    <input class="uk-input" v-model="input" @keydown="key($event)" :placeholder="label" />
    <div hidden :id="_boundry" />
    <div
      class="uk-card uk-card-default uk-card-body uk-padding-remove"
      :uk-drop="'delay-hide:0;toggle:#' + _boundry"
      :id="_dropDown"
    >
      <ul class="uk-list">
        <template v-for="(item, i) in matches">
          <li
            :class="[
              { 'oc-autocomplete-suggestion-selected': i === highlighted },
              'oc-autocomplete-suggestion',
            ]"
            :key="i"
            v-text="item"
            @mouseenter="highlighted = i"
            @click="selectSuggestion"
          ></li>
        </template>
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
 * - [ ] Implement loading indicator
 * - [ ] Allow complex content (HTML)
 */
export default {
  name: "oc-autocomplete",
  components: { OcTextInput, OcSpinner },
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Informative label about the data to be entered
     */
    label: {
      type: String,
      required: true,
      default: null,
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
    _dropDown() {
      return _uniqueId("oc-autocomplete-dropdown-")
    },
    _boundry() {
      return _uniqueId("oc-autocomplete-boundry-")
    },
    _dropdown() {
      return UiKit.drop(`#${this._dropDown}`)
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
        this.highlighted = this.matches.length - 1
      } else if (next > this.matches.length - 1) {
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
      if (this.matches[this.highlighted]) this.input = this.matches[this.highlighted]
    },
  },
}
</script>
<docs>
```jsx
<div>
  <oc-autocomplete :items="['Alice', 'Bob', 'Chuck', 'Doris', 'Emil', 'Felix']" label="Add user or group ..." />
</div>
```
</docs>
