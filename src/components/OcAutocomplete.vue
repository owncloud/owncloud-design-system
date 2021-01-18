<template>
  <div class="oc-autocomplete">
    <input
      class="oc-autocomplete-input"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="ariaExpanded.toString()"
      :aria-owns="$_ocAutocomplete_listboxId"
      :aria-activedescendant="$_ocAutocomplete_optionId(highlighted)"
      :aria-label="ariaLabel"
      :aria-describedby="$_ocAutocomplete_descriptionId"
      v-model="input"
      :placeholder="placeholder"
      :disabled="disabled"
      ref="$_ocAutocompleteInput"
      @keydown.up.prevent="highlighted--"
      @keydown.down.prevent="highlighted++"
      @keydown.enter="$_ocAutocomplete_selectSuggestion"
      @keydown.esc="$_ocAutocomplete_dropdown.hide"
      @focus="$_ocAutocomplete_focus"
    />
    <div hidden :id="$_ocAutocomplete_boundryId" />
    <div
      :ref="$_ocAutocomplete_dropdownId"
      class="oc-autocomplete-dropdown uk-overflow-auto"
      :class="dropdownClass"
      :uk-drop="'mode:click;delay-hide:0;toggle:#' + $_ocAutocomplete_boundryId"
      :id="$_ocAutocomplete_dropdownId"
    >
      <ul
        class="oc-autocomplete-suggestion-list"
        role="listbox"
        :id="$_ocAutocomplete_listboxId"
        ref="listbox"
      >
        <template v-for="(item, i) in $_ocAutocomplete_matchesShown">
          <li
            role="option"
            :id="$_ocAutocomplete_optionId(i)"
            :aria-posinset="i + 1"
            :aria-setsize="$_ocAutocomplete_matchesShown.length"
            :aria-selected="i === highlighted"
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
          <oc-spinner :aria-label="$_ocAutocomplete_text.spinner" class="oc-autocomplete-spinner" />
          <span :aria-hidden="true">{{ $_ocAutocomplete_text.spinner }}</span>
        </li>
      </ul>
    </div>
    <div hidden :id="$_ocAutocomplete_descriptionId" v-text="ariaDescription" />
  </div>
</template>
<script>
import OcSpinner from "../components/OcSpinner"

import UiKit from "uikit"
import uniqueId from "../utils/uniqueId"

/**
 * The autocomplete component is used for searching in bigger list of data (usually involves remote calls over the network)
 * and presenting the user a list of possible matches to the entered search term.
 *
 * The component supports single select only at the moment.
 *
 *  ## Accessibility
 *  This component is built based on the [WAI-ARIA 1.1 Authoring Practice](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/grid-combo.html) and [GOV.UK's implementation](https://alphagov.github.io/accessible-autocomplete/examples/) (their frontend team is considered an authority in accessibility community).
 *
 *  Please provide at least an accessible name via the `ariaLabel` prop. By default this component comes with a description to screen reader users on how to use this component (it is a thin line of when it is good to supply help text for screen reader users and [when it's just too verbose](https://adrianroselli.com/2019/10/stop-giving-control-hints-to-screen-readers.html)). This description text is `When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.` but can be overridden with the `ariaDescription` prop.
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
     * Label (accessible name) of the input
     */
    ariaLabel: {
      type: String,
      required: true,
    },
    /**
     * Add a description of how to use this (complex) widget for screen reader users
     */
    ariaDescription: {
      type: String,
      required: false,
      default:
        "When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.",
    },
    /**
     * Informative text displayed right next to the spinner while loading data
     */
    text: {
      type: Object,
      default: function () {
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
      default: function () {
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
    /**
     * After selection of a suggestion, should the input be filled?
     */
    fillOnSelection: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      input: "",
      highlighted: 0,
      expanded: false,
      ariaExpanded: false,
      activeDescendant: "",
      selectionText: "",
      overflowingMatches: this.$_ocAutocomplete_matchesOverflowing,
    }
  },
  mounted() {
    UiKit.util.on(`#${this.$_ocAutocomplete_dropdownId}`, "show", () => {
      let dd = this.$refs[this.$_ocAutocomplete_dropdownId],
        ddOffsetTop = Math.floor(dd.getBoundingClientRect().top) - 20,
        maxHeight = `calc(100vh - ${ddOffsetTop}px )`

      dd.style.maxHeight = maxHeight
      this.ariaExpanded = true
    })

    UiKit.util.on(`#${this.$_ocAutocomplete_dropdownId}`, "hide", () => {
      this.ariaExpanded = false
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
      if (this.input.length === 0 || this.selectionText !== "") {
        this.$_ocAutocomplete_resetSelectionText()
        return []
      }

      return this.items.filter(item => {
        let searchString = this.input // What's to be found
        return this.filter(item, searchString)
      })
    },
    $_ocAutocomplete_dropdownId() {
      return uniqueId("oc-autocomplete-dropdown-")
    },
    $_ocAutocomplete_listboxId() {
      return uniqueId("oc-autocomplete-listbox-")
    },
    $_ocAutocomplete_descriptionId() {
      return uniqueId("oc-autocomplete-description-")
    },
    $_ocAutocomplete_boundryId() {
      return uniqueId("oc-autocomplete-boundry-")
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
    $_ocAutocomplete_selectSuggestion: function () {
      if (this.$_ocAutocomplete_matchesShown[this.highlighted]) {
        this.$emit("input", this.$_ocAutocomplete_matchesShown[this.highlighted])
        this.expanded = false

        if (this.fillOnSelection) {
          this.input = this.$_ocAutocomplete_getSelectionText(this.highlighted)
        } else {
          this.$_ocAutocomplete_dropdown.hide()
          this.input = ""
        }
      }
    },
    $_ocAutocomplete_getSelectionText(index) {
      const selectionText = this.$refs.listbox
        .querySelectorAll("[role='option']")[index].textContent.trim()
      this.selectionText = selectionText
      return selectionText
    },
    $_ocAutocomplete_optionId(i) {
      const activeDescendantId = `oc-autocomplete-option-${i}`
      this.activeDescendant = activeDescendantId
      return this.ariaExpanded ? activeDescendantId : ""
    },
    focus() {
      this.$refs.$_ocAutocompleteInput.focus()
    },
    $_ocAutocomplete_resetSelectionText() {
      this.selectionText = ""
    },
    $_ocAutocomplete_focus() {
      if (this.input.length === 0) {
        this.$_ocAutocomplete_dropdown.hide()
      } else {
        this.$_ocAutocomplete_dropdown.show()
      }

      // The real update not depending on onblur
      this.$_ocAutocomplete_userInput(this.input)
      this.expanded = false
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
      <oc-autocomplete ariaLabel="Simple selection autocomplete" ref="autocomplete1" v-model="simpleSelection" :items="simpleItems" placeholder="type 'le' for example results" dropdownClass="uk-width-1-1" />
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="uk-text-meta">Selected simple item:</p>
        <code>{{ simpleSelection }}</code>
      </div>
      <div class="oc-mt">
        <button @click="focusTest1()">Focus the field by calling .focus()</button>
      </div>
    </div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete ariaLabel="Complex selection autocomplete" v-model="complexSelection" :items="complexItems" :filter="filterComplexItems" placeholder="type 'er' for example results">
        <template v-slot:item="{item}">
          <span class="oc-text-bold">{{ item.forename }} {{ item.surname }}</span>
          <div class="uk-text-meta">(Age: {{ item.age }})</div>
        </template>
      </oc-autocomplete>
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="uk-text-meta">Selected complex item:</p>
        <code>{{ complexSelection }}</code>
      </div>
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete with delayed fetch
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete ariaLabel="Delayed selection autocomplete" v-model="delayedItem" :items="delayedResult" :itemsLoading="delayedSearchInProgress" placeholder="type 'le' and wait a little" @update:input="onInput"/>
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="uk-text-meta">Selected complex item:</p>
        <code>{{ delayedItem }}</code>
      </div>
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete overflow with "more results" button
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete ariaLabel="Autocomplete overflow with more results button" v-model="simpleSelection" :items="simpleItems" placeholder="type 'da' for overflowing results" dropdownClass="uk-width-1-1" />
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete with :fillOnSelection=false
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete ariaLabel="Autocomplete with :fillOnSelection=false" v-model="simpleSelection" :items="simpleItems" placeholder="type 'da' for overflowing results" dropdownClass="uk-width-1-1" :fillOnSelection="false" />
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
