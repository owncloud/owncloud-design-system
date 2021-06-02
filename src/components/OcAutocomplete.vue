<template>
  <div class="oc-autocomplete">
    <label class="oc-label" :for="inputId" v-text="label" />
    <oc-select
      :id="inputId"
      :ref="inputId"
      :options="items"
      :filter="filter"
      :disabled="disabled"
      v-model="selected"
      v-bind="additionalAttributes"
      :class="{
          'oc-autocomplete-input': true,
          'oc-autocomplete-warning': !!warningMessage,
          'oc-autocomplete-danger': !!errorMessage,
      }"
      role="combobox"
      aria-autocomplete="list"
      @update:input="userInput">
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </oc-select>
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
import Fuse from "fuse.js"
import OcSpinner from "../components/OcSpinner"

import uniqueId from "../utils/uniqueId"
import OcSelect from './OcSelect.vue'

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
  components: { OcSpinner, OcSelect },
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
     * Select what values an object is to be found by (uses fuse.js)
     */
    filter: {
      type: Function,
      default: (items, search) => {
        const fuse = new Fuse(items, {
          shouldSort: true,
          threshold: 0.2,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1
        })
        return search.length
          ? fuse.search(search).map(({ item }) => item)
          : fuse.list
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
      selected: "",
      input: "",
      overflowingMatches: this.matchesOverflowing,
    }
  },
  computed: {
    messageId() {
      return `${this.inputId}-description`
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
    selected(selected, before) {
      if(selected == before) return
      this.$emit('input', selected)
    }
  },
  methods: {
    userInput(value) {
      /**
       * This event is emitted as soon as the user changes the search term
       * @type {string}
       */
      this.$emit("update:input", value)
    },
    focus() {
      this.$refs[this.inputId].$el.querySelector('input').focus()
    }
  },
}
</script>

<style lang="scss">
.oc-autocomplete {
  @extend .uk-position-relative;

  &-dropdown {
    @extend .uk-box-shadow-medium;

    background: var(--oc-color-background-default);
  }

  &-input .vs__dropdown-toggle {
    background-color: var(--oc-color-input-bg);
    border: 1px solid var(--oc-color-input-border);
    border-radius: 3px;
    color: var(--oc-color-input-text-muted);

    &:focus {
      background: var(--oc-color-input-bg);
      border-color: var(--oc-color-input-text-default);
      color: var(--oc-color-input-text-default);
    }
  }

  &-spinner {
    @extend .uk-position-absolute;

    left: var(--oc-space-medium);
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &-suggestion {
    @extend .oc-m-rm;

    color: var(--oc-color-text-muted);
    padding: var(--oc-space-small);

    &-list {
      @extend .uk-list;
      @extend .oc-m-rm;

      &-loader {
        @extend .uk-position-relative;
        @extend .oc-text-muted;
        @extend .oc-m-rm;

        background-color: var(--oc-color-background-default);
        padding: var(--oc-space-small);
        padding-left: $spinner-size + $oc-space-medium;
      }
    }

    &-selected,
    &:hover,
    &:focus {
      background-color: var(--oc-color-swatch-brand-default);
      color: var(--oc-color-text-inverse);
    }

    &-overflow {
      @extend .oc-text-muted;
      @extend .oc-m-rm;

      background-color: var(--oc-color-background-default);
      cursor: pointer;
      padding: var(--oc-space-small);
    }

    &-selected .oc-text-muted,
    &:hover .oc-text-muted,
    &:focus .oc-text-muted {
      color: var(--oc-color-text-inverse);
    }

    &-selected .oc-icon > svg,
    &:hover .oc-icon > svg,
    &:focus .oc-icon > svg {
      fill: var(--oc-color-text-inverse);
    }
  }

  &-warning .vs__dropdown-toggle {
    border-color: var(--oc-color-swatch-warning-default);
    color: var(--oc-color-swatch-warning-default);
  }

  &-danger .vs__dropdown-toggle {
    border-color: var(--oc-color-swatch-danger-default);
    color: var(--oc-color-swatch-danger-default);
  }

  &-description .vs__dropdown-toggle {
    border-color: var(--oc-color-text-muted);
    color: var(--oc-color-text-muted);
  }

  &-message {
    @extend .uk-flex;
    @extend .uk-flex-middle;
    @extend .oc-mt-xs;

    min-height: $oc-font-size-default * 1.5;
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
        <p class="oc-text-muted">Selected simple item:</p>
        <code>{{ simpleSelection }}</code>
      </div>
      <div class="oc-mt">
        <button @click="focusTest1()">Focus the field by calling .focus()</button>
      </div>
    </div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <oc-autocomplete label="Simple selection autocomplete input change event" ref="autocomplete1" v-model="simpleSelection" :items="simpleItems" description-message="type 'le' for example results" dropdownClass="uk-width-1-1" @update:input="onInput"/>
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="oc-text-muted">Selected simple item:</p>
        <code>{{ simpleSelection }}</code>
      </div>
      <div class="oc-mt">
        <button @click="focusTest1()">Focus the field by calling .focus()</button>
      </div>
    </div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete label="Complex selection autocomplete" v-model="complexSelection" :items="complexItems" :filter="filterComplexItems" description-message="type 'er' for example results">
        <template v-slot:option="{ forename, age }">
          <span class="option">
            <strong v-text="forename" />
          </span>
          <div class="option">Age {{ age }}</div>
        </template>
      </oc-autocomplete>
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="oc-text-muted">Selected complex item:</p>
        <code>{{ complexSelection }}</code>
      </div>
    </div>
    <h3 class="uk-heading-divider">
      Autocomplete with delayed fetch
    </h3>
    <div class="uk-card uk-card-default uk-card-small uk-card-body oc-mt">
      <oc-autocomplete label="Delayed selection autocomplete" v-model="delayedItem" :items="delayedResult" :itemsLoading="delayedSearchInProgress" description-message="type 'le' and wait a little" @update:input="onInput"/>
      <div class="uk-background-muted uk-padding-small oc-mt-s">
        <p class="oc-text-muted">Selected complex item:</p>
        <code>{{ delayedItem }}</code>
      </div>
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
import Fuse from 'fuse.js'

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
        label: 'Scott Mortensen',
        forename : 'Scott',
        surname : 'Mortensen',
        age : 31
      }, {
        id : 7388,
        label: 'Lecia Scheerer',
        forename : 'Lecia',
        surname : 'Scheerer',
        age : 21,
      }, {
        id : 992,
        label: 'Verona Mounts',
        forename : 'Verona',
        surname : 'Mounts',
        age : 33,
      }, {
        id : 1211,
        label: 'Arlena Bolster',
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
    filterComplexItems(options, search) {
      const fuse = new Fuse(options, {
        keys: ["forename", "surname", "age"],
        shouldSort: true
      })
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list
    },
    focusTest1() {
      this.$refs.autocomplete1.focus()
    }
  }
}
</script>
```
</docs>
