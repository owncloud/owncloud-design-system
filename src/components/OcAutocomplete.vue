<template>
  <div class="oc-autocomplete">
    <label class="oc-label" :for="inputId" v-text="label" />
    <input
      :id="inputId"
      :ref="inputId"
      v-model="input"
      v-bind="additionalAttributes"
      :class="{
        'oc-autocomplete-input': true,
        'oc-autocomplete-warning': !!warningMessage,
        'oc-autocomplete-danger': !!errorMessage,
      }"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="ariaExpanded.toString()"
      :aria-owns="listboxId"
      :aria-activedescendant="optionId(highlighted)"
      :disabled="disabled"
      @keydown.up.prevent="highlighted--"
      @keydown.down.prevent="highlighted++"
      @keydown.enter="selectSuggestion"
      @keydown.esc="dropdown.hide"
      @focus="onFocus"
    />
    <div :id="boundryId" hidden />
    <div
      :id="dropdownId"
      :ref="dropdownId"
      class="oc-autocomplete-dropdown uk-overflow-auto"
      :class="dropdownClass"
      :uk-drop="'mode:click;delay-hide:0;toggle:#' + boundryId"
    >
      <ul :id="listboxId" ref="listbox" class="oc-autocomplete-suggestion-list" role="listbox">
        <template v-for="(item, i) in matchesShown">
          <li
            :id="optionId(i)"
            :key="i"
            role="option"
            :aria-posinset="i + 1"
            :aria-setsize="matchesShown.length"
            :aria-selected="i === highlighted"
            :class="[
              'oc-autocomplete-suggestion',
              { 'oc-autocomplete-suggestion-selected': i === highlighted },
            ]"
            @mouseenter="highlighted = i"
            @click="selectSuggestion"
          >
            <slot name="item" :item="item">
              <!-- Fallback content -->
              {{ item }}
            </slot>
          </li>
        </template>
        <li
          v-if="matchesOverflowing > 0 && !itemsLoading && !expanded"
          class="oc-autocomplete-suggestion-overflow"
          @click.stop="expanded = true"
        >
          <span>{{ matchesOverflowing }} {{ textInformation.moreResults }}</span>
        </li>
        <li v-if="itemsLoading" class="oc-autocomplete-suggestion-list-loader">
          <oc-spinner :aria-label="textInformation.spinner" class="oc-autocomplete-spinner" />
          <span :aria-hidden="true">{{ textInformation.spinner }}</span>
        </li>
      </ul>
    </div>
    <div v-if="showMessageLine" class="oc-autocomplete-message">
      <span
        :id="messageId"
        :class="{
          'oc-autocomplete-description': !!descriptionMessage,
          'oc-autocomplete-warning': !!warningMessage,
          'oc-autocomplete-danger': !!errorMessage,
        }"
        v-text="messageText"
      ></span>
    </div>
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
 *  Please provide at least a name via the `label` prop. By default this component comes with a description to screen reader users on how to use this component (it is a thin line of when it is good to supply help text for screen reader users and [when it's just too verbose](https://adrianroselli.com/2019/10/stop-giving-control-hints-to-screen-readers.html)). This description text is `When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.` but can be overridden with the `ariaDescription` prop.
 */
export default {
  name: "OcAutocomplete",
  components: { OcSpinner },
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The ID of the input element.
     */
    inputId: {
      type: String,
      required: false,
      default: () => uniqueId("oc-autocomplete-"),
    },
    /**
     * Label (accessible name) of the input
     */
    label: {
      type: String,
      required: true,
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
      default: null,
    },
    /**
     * After selection of a suggestion, should the input be filled?
     */
    fillOnSelection: {
      type: Boolean,
      default: true,
    },
    /**
     * Whether or not vertical space below the input should be reserved for a one line message,
     * so that content actually appearing there doesn't shift the layout.
     */
    fixMessageLine: {
      type: Boolean,
      default: false,
    },
    /**
     * A description text which is shown below the input field.
     */
    descriptionMessage: {
      type: String,
      default: null,
    },
    /**
     * A warning message which is shown below the input field.
     */
    warningMessage: {
      type: String,
      default: null,
    },
    /**
     * An error message which is shown below the input field.
     */
    errorMessage: {
      type: String,
      default: null,
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
      overflowingMatches: this.matchesOverflowing,
    }
  },
  computed: {
    matchesShown() {
      if (this.expanded) return this.matches

      return this.matches.slice(0, this.maxListLength)
    },
    matchesOverflowing() {
      return this.matches.length - this.matchesShown.length
    },
    matches() {
      if (this.input.length === 0 || this.selectionText !== "") {
        this.resetSelectionText()
        return []
      }

      return this.items.filter(item => {
        let searchString = this.input // What's to be found
        return this.filter(item, searchString)
      })
    },
    dropdownId() {
      return uniqueId("oc-autocomplete-dropdown-")
    },
    listboxId() {
      return uniqueId("oc-autocomplete-listbox-")
    },
    messageId() {
      return `${this.inputId}-description`
    },
    boundryId() {
      return uniqueId("oc-autocomplete-boundry-")
    },
    dropdown() {
      return UiKit.drop(`#${this.dropdownId}`)
    },
    textInformation() {
      let text = {
        spinner: this.loadingText,
        moreResults: this.moreResultsText,
      }

      return Object.assign(text, this.text)
    },
    showMessageLine() {
      return (
        this.fixMessageLine ||
        !!this.warningMessage ||
        !!this.errorMessage ||
        !!this.descriptionMessage
      )
    },
    additionalAttributes() {
      const additionalAttrs = {}
      if (!!this.warningMessage || !!this.errorMessage || !!this.descriptionMessage) {
        additionalAttrs["aria-describedby"] = this.messageId
      }
      return { ...this.$attrs, ...additionalAttrs }
    },
    messageText() {
      if (this.errorMessage) {
        return this.errorMessage
      }

      if (this.warningMessage) {
        return this.warningMessage
      }

      return this.descriptionMessage
    },
  },
  watch: {
    input(input, before) {
      if (input === before) return

      if (input.length === 0) {
        this.dropdown.hide()
      } else {
        this.dropdown.show()
      }

      // The real update not depending on onblur
      this.userInput(input)
      this.expanded = false
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
  mounted() {
    UiKit.util.on(`#${this.dropdownId}`, "show", () => {
      let dd = this.$refs[this.dropdownId],
        ddOffsetTop = Math.floor(dd.getBoundingClientRect().top) - 20,
        maxHeight = `calc(100vh - ${ddOffsetTop}px )`

      dd.style.maxHeight = maxHeight
      this.ariaExpanded = true
    })

    UiKit.util.on(`#${this.dropdownId}`, "hide", () => {
      this.ariaExpanded = false
    })
  },
  methods: {
    userInput(value) {
      /**
       * This event is emitted as soon as the user changes the search term
       * @type {string}
       */
      this.$emit("update:input", value)
    },
    selectSuggestion: function () {
      if (this.matchesShown[this.highlighted]) {
        this.$emit("input", this.matchesShown[this.highlighted])
        this.expanded = false

        if (this.fillOnSelection) {
          this.input = this.getSelectionText(this.highlighted)
        } else {
          this.dropdown.hide()
          this.input = ""
        }
      }
    },
    getSelectionText(index) {
      const selectionText = this.$refs.listbox
        .querySelectorAll("[role='option']")
        [index].textContent.trim()
      this.selectionText = selectionText
      return selectionText
    },
    optionId(i) {
      const activeDescendantId = `oc-autocomplete-option-${i}`
      this.activeDescendant = activeDescendantId
      return this.ariaExpanded ? activeDescendantId : ""
    },
    focus() {
      this.$refs[this.inputId].focus()
    },
    resetSelectionText() {
      this.selectionText = ""
    },
    onFocus() {
      if (this.input.length === 0) {
        this.dropdown.hide()
      } else {
        this.dropdown.show()
      }

      // The real update not depending on onblur
      this.userInput(this.input)
      this.expanded = false
    },
  },
}
</script>

<style lang="scss">
.oc-autocomplete {
  @extend .uk-position-relative;

  &-dropdown {
    @extend .uk-box-shadow-medium;

    background: var(--oc-background);
  }

  &-input {
    @extend .uk-input;

    background-color: var(--oc-input-background);
    border: 1px solid var(--oc-input-border);
    border-radius: 3px;
    color: var(--oc-input-color-muted);

    &:focus {
      background: var(--oc-input-background);
      border-color: var(--oc-input-color);
      color: var(--oc-input-color);
    }
  }

  &-spinner {
    @extend .uk-position-absolute;

    left: $space-medium;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &-suggestion {
    @extend .oc-m-rm;

    color: var(--oc-color-muted);
    padding: $space-small;

    &-list {
      @extend .uk-list;
      @extend .oc-m-rm;

      &-loader {
        @extend .uk-position-relative;
        @extend .uk-text-meta;
        @extend .oc-m-rm;

        background-color: var(--oc-background);
        padding: $space-small;
        padding-left: $spinner-size + $space-medium;
      }
    }

    &-selected,
    &:hover,
    &:focus {
      background-color: var(--oc-brand-primary);
      color: var(--oc-color-inverse);
    }

    &-overflow {
      @extend .uk-text-meta;
      @extend .oc-m-rm;

      background-color: var(--oc-background);
      cursor: pointer;
      padding: $space-small;
    }

    &-selected .uk-text-meta,
    &:hover .uk-text-meta,
    &:focus .uk-text-meta {
      color: var(--oc-color-inverse);
    }

    &-selected .oc-icon > svg,
    &:hover .oc-icon > svg,
    &:focus .oc-icon > svg {
      fill: var(--oc-color-inverse);
    }
  }

  &-warning,
  &-warning:focus {
    border-color: var(--oc-variation-warning);
    color: var(--oc-variation-warning);
  }

  &-danger,
  &-danger:focus {
    border-color: var(--oc-variation-danger);
    color: var(--oc-variation-danger);
  }

  &-description,
  &-description:focus {
    border-color: var(--oc-color-muted);
    color: var(--oc-color-muted);
  }

  &-message {
    @extend .uk-flex;
    @extend .uk-flex-middle;
    @extend .oc-mt-xs;

    min-height: $global-font-size * 1.5;
  }
}
</style>

<docs>
```jsx
<template>
  <section>
    <h3 class="uk-heading-divider">
      Autocomplete
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <oc-autocomplete label="Simple selection autocomplete" ref="autocomplete1" v-model="simpleSelection" :items="simpleItems" description-message="type 'le' for example results" dropdownClass="uk-width-1-1" />
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="uk-text-meta">Selected simple item:</p>
        <code>{{ simpleSelection }}</code>
      </div>
      <div class="oc-mt">
        <button @click="focusTest1()">Focus the field by calling .focus()</button>
      </div>
    </div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete label="Complex selection autocomplete" v-model="complexSelection" :items="complexItems" :filter="filterComplexItems" description-message="type 'er' for example results">
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
      <oc-autocomplete label="Delayed selection autocomplete" v-model="delayedItem" :items="delayedResult" :itemsLoading="delayedSearchInProgress" description-message="type 'le' and wait a little" @update:input="onInput"/>
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="uk-text-meta">Selected complex item:</p>
        <code>{{ delayedItem }}</code>
      </div>
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete overflow with "more results" button
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete label="Autocomplete overflow with more results button" v-model="simpleSelection" :items="simpleItems" description-message="type 'da' for overflowing results" dropdownClass="uk-width-1-1" />
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete with :fillOnSelection=false
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete label="Autocomplete with :fillOnSelection=false" v-model="simpleSelection" :items="simpleItems" description-message="type 'da' for overflowing results" dropdownClass="uk-width-1-1" :fillOnSelection="false" />
    </div>
    <h3 class="uk-heading-divider">
      Errors and warnings
    </h3>
    <p>Please note that both fields below have set the `fixMessageLine` set to `true` so the spacing below the input stays the same even after the warning/error disappears.</p>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete
          label="Autocomplete with an error message"
          v-model="selectionErrorMsg"
          :items="simpleItems"
          :error-message="errorMessage"
          dropdownClass="uk-width-1-1"
          placeholder="type 'le' for example results"
          fix-message-line="true"
          class="oc-mb-s"/>
      <oc-autocomplete
          label="Autocomplete with a warning message"
          v-model="selectionWarningMsg"
          :items="simpleItems"
          :warning-message="warningMessage"
          placeholder="type 'le' for example results"
          fix-message-line="true"
          dropdownClass="uk-width-1-1" />
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
      selectionErrorMsg : null,
      selectionWarningMsg : null,

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
  computed: {
    errorMessage() {
      return !this.selectionErrorMsg ? 'Value is required.' : ''
    },
    warningMessage() {
      return !this.selectionWarningMsg ? 'Please keep in mind that we do not recommend to leave this field empty.' : ''
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
