<template>
  <div class="oc-autocomplete">
    <input
      class="oc-autocomplete-input"
      v-model="input"
      :placeholder="placeholder"
      :disabled="disabled"
      ref="$_ocAutocompleteInput"
      @keydown.up.prevent="highlighted--"
      @keydown.down.prevent="highlighted++"
      @keydown.enter="$_ocAutocomplete_selectSuggestion"
    />
    <div hidden :id="$_ocAutocomplete_boundryId" />
    <div
      :ref="$_ocAutocomplete_dropdownId"
      class="oc-autocomplete-dropdown uk-overflow-auto"
      :class="dropdownClass"
      :uk-drop="'mode:click;delay-hide:0;toggle:#' + $_ocAutocomplete_boundryId"
      :id="$_ocAutocomplete_dropdownId"
    >
      <ul class="oc-autocomplete-suggestion-list">
        <template v-for="(item, i) in $_ocAutocomplete_matchesShown">
          <li
            :class="[
              'oc-autocomplete-suggestion',
              { 'oc-autocomplete-suggestion-selected': i === highlighted },
            ]"
            :key="i"
            @mouseenter="highlighted = i"
            @click="$_ocAutocomplete_selectSuggestion"
          >
            <slot name="item" v-bind:item="item">
              <!-- Fallback content -->
              {{ item }}
            </slot>
          </li>
        </template>
        <li
          v-if="$_ocAutocomplete_matchesOverflowing > 0 && !itemsLoading && !expanded"
          class="oc-autocomplete-suggestion-overflow"
          @click.stop="expanded = true"
        >
          <span
            >{{ $_ocAutocomplete_matchesOverflowing }} {{ $_ocAutocomplete_text.moreResults }}</span
          >
        </li>
        <li v-if="itemsLoading" class="oc-autocomplete-suggestion-list-loader">
          <oc-spinner class="oc-autocomplete-spinner" />
          <span>{{ $_ocAutocomplete_text.spinner }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import OcSpinner from "../elements/OcSpinner"

import UiKit from "uikit"
import { uniqueId as _uniqueId } from "lodash"

/**
 * The autocomplete component is used for searching in bigger list of data (usually involves remote calls over the network)
 * and presenting the user a list of possible matches to the entered search term.
 *
 * The component supports single select only at the moment.
 */
export default {
  name: "oc-autocomplete",
  components: { OcSpinner },
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
    text: {
      type: Object,
      default: function() {
        return {}
      },
    },
    loadingText: {
      type: String,
      default: "Loading...",
    },
    moreResultsText: {
      type: String,
      default: "more results",
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
     * Select what values an object is to be found by
     */
    filter: {
      type: Function,
      default: (item, queryText) => {
        return item.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
      },
    },
    /**
     * Assigns class to the dropdown
     */
    dropdownClass: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      input: "",
      highlighted: 0,
      expanded: false,
      overflowingMatches: this.$_ocAutocomplete_matchesOverflowing,
    }
  },
  mounted() {
    UiKit.util.on(`#${this.$_ocAutocomplete_dropdownId}`, "show", () => {
      let dd = this.$refs[this.$_ocAutocomplete_dropdownId],
        ddOffsetTop = Math.floor(dd.getBoundingClientRect().top) - 20,
        maxHeight = `calc(100vh - ${ddOffsetTop}px )`

      dd.style.maxHeight = maxHeight
    })
  },
  computed: {
    $_ocAutocomplete_matchesShown() {
      if (this.expanded) return this.$_ocAutocomplete_matches

      return this.$_ocAutocomplete_matches.slice(0, this.maxListLength)
    },
    $_ocAutocomplete_matchesOverflowing() {
      return this.$_ocAutocomplete_matches.length - this.$_ocAutocomplete_matchesShown.length
    },
    $_ocAutocomplete_matches() {
      if (this.input.length === 0) {
        return []
      }

      return this.items.filter(item => {
        let searchString = this.input // What's to be found
        return this.filter(item, searchString)
      })
    },
    $_ocAutocomplete_dropdownId() {
      return _uniqueId("oc-autocomplete-dropdown-")
    },
    $_ocAutocomplete_boundryId() {
      return _uniqueId("oc-autocomplete-boundry-")
    },
    $_ocAutocomplete_dropdown() {
      return UiKit.drop(`#${this.$_ocAutocomplete_dropdownId}`)
    },
    $_ocAutocomplete_text() {
      let text = {
        spinner: this.loadingText,
        moreResults: this.moreResultsText,
      }

      return Object.assign(text, this.text)
    },
  },
  watch: {
    input(input, before) {
      if (input === before) return

      if (input.length === 0) {
        this.$_ocAutocomplete_dropdown.hide()
      } else {
        this.$_ocAutocomplete_dropdown.show()
      }

      // The real update not depending on onblur
      this.$_ocAutocomplete_userInput(input)
      this.expanded = false
    },
    highlighted(next, current) {
      if (next === current) return

      // come around
      if (next < 0) {
        this.highlighted = this.$_ocAutocomplete_matchesShown.length - 1
      } else if (next > this.$_ocAutocomplete_matchesShown.length - 1) {
        this.highlighted = 0
      }
    },
  },
  methods: {
    $_ocAutocomplete_userInput(value) {
      /**
       * This event is emitted as soon as the user changes the search term
       * @type {string}
       */
      this.$emit("update:input", value)
    },
    $_ocAutocomplete_selectSuggestion() {
      if (this.$_ocAutocomplete_matchesShown[this.highlighted]) {
        this.$emit("input", this.$_ocAutocomplete_matchesShown[this.highlighted])
        this.input = ""
        this.expanded = false
      }
    },
    focus() {
      this.$refs.$_ocAutocompleteInput.focus()
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
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <oc-autocomplete ref="autocomplete1" v-model="simpleSelection" :items="simpleItems" placeholder="type 'le' for example results" dropdownClass="uk-width-1-1" />
      <div class="uk-background-muted uk-padding-small uk-margin-small-top">
        <p class="uk-text-meta">Selected simple item:</p>
        <code>{{ simpleSelection }}</code>
      </div>
      <div class="uk-margin-top">
        <button @click="focusTest1()">Focus the field by calling .focus()</button>
      </div>
    </div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body uk-margin-top">
      <oc-autocomplete v-model="complexSelection" :items="complexItems" :filter="filterComplexItems" placeholder="type 'er' for example results">
        <template v-slot:item="{item}">
          <span class="uk-text-bold">{{ item.forename }} {{ item.surname }}</span>
          <div class="uk-text-meta">(Age: {{ item.age }})</div>
        </template>
      </oc-autocomplete>
      <div class="uk-background-muted uk-padding-small uk-margin-small-top">
        <p class="uk-text-meta">Selected complex item:</p>
        <code>{{ complexSelection }}</code>
      </div>
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete with delayed fetch
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body uk-margin-top">
      <oc-autocomplete v-model="delayedItem" :items="delayedResult" :itemsLoading="delayedSearchInProgress" placeholder="type 'le' and wait a little" @update:input="onInput"/>
      <div class="uk-background-muted uk-padding-small uk-margin-small-top">
        <p class="uk-text-meta">Selected complex item:</p>
        <code>{{ delayedItem }}</code>
      </div>
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete overflow with "more results" button
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body uk-margin-top">
      <oc-autocomplete v-model="simpleSelection" :items="simpleItems" placeholder="type 'da' for overflowing results" dropdownClass="uk-width-1-1" />
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      // Simple example

      simpleItems : [
        'Scott Mortensen',
        'Lecia Scheerer',
        'Merrie Rubin',
        'Kenton Eich',
        'Telma Bonavita',
        'Annis Newberry',
        'Tama Lindamood',
        'Charmain Earls',
        'Verona Mounts',
        'Arlena Bolster',
        'Dalia',
        'Dalila',
        'Dallas',
        'Daloris',
        'Damara',
        'Damaris',
        'Damita',
        'Dana',
        'Danell',
        'Danella',
        'Danette',
        'Dani',
        'Dania',
        'Danica',
        'Danice',
        'Daniela',
        'Daniele',
        'Daniella',
        'Danielle',
        'Danika',
        'Danila',
        'Danit',
        'Danita',
        'Danna',
        'Danni',
        'Dannie',
        'Danny',
        'Dannye',
        'Danya',
        'Danyelle',
        'Danyette',
        'Daphene'
      ],
      simpleSelection : null,

      // Complex example

      complexItems : [{
        id : 8312,
        forename : 'Scott',
        surname : 'Mortensen',
        age : 31,
      }, {
        id : 7388,
        forename : 'Lecia',
        surname : 'Scheerer',
        age : 21,
      }, {
        id : 992,
        forename : 'Verona',
        surname : 'Mounts',
        age : 33,
      }, {
        id : 1211,
        forename : 'Arlena',
        surname : 'Bolster',
        age : 66,
      }],
      complexSelection : {},

      // delayed example

      delayedResult: [],
      delayedItem: null,
      delayedSearchInProgress: false
    }
  },
  methods: {
    onInput() {
      this.delayedSearchInProgress = true
      setTimeout(() => {
        this.delayedSearchInProgress = false
        this.delayedResult = this.simpleItems
      }, 2000)
    },
    filterComplexItems(item, queryText) {
      return item.forename.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 ||
              item.surname.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1;
    },
    focusTest1() {
      this.$refs.autocomplete1.focus()
    }
  }
}
</script>
```
</docs>
