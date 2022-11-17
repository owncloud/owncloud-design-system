<template>
  <div class="oc-tiles">
    <div>
      <span v-for="field in fields" :key="`oc-thead-${field.name}`">
        <span
          v-if="field.headerType === 'slot'"
          :key="field.name + 'Header'"
          class="oc-table-thead-content"
        >
          <slot :name="field.name + 'Header'" />
        </span>
      </span>
      <oc-button
        id="files-view-sort-options-btn"
        key="files-view-sort-options-btn"
        variation="passive"
        appearance="raw"
        class="oc-my-s oc-p-xs"
      >
        <span v-text="getSortLabel(currentSortBy)" />
        <oc-icon :name="getSortIcon" fill-type="line" size="small" variation="passive" />
      </oc-button>
      <oc-drop
        drop-id="files-view-sort-options-drop"
        toggle="#files-view-sort-options-btn"
        mode="click"
        class="oc-width-auto"
        padding-size="medium"
      >
        <oc-list>
          <li v-for="(sortField, index) in sortableFields" :key="sortField.name + index">
            <oc-button
              @click.native="$emit(constants.EVENT_THEAD_CLICKED, sortField)"
              appearance="raw"
              v-text="sortField.title"
            />
            <oc-icon
              :name="sortField.sortDir === 'asc' ? 'arrow-down' : 'arrow-up'"
              fill-type="line"
              size="small"
              variation="passive"
            />
          </li>
        </oc-list>
      </oc-drop>
    </div>
    <ul class="tiles-list">
      <oc-single-tile
        v-for="(item, trIndex) in data"
        :key="`oc-tbody-tr-${itemDomSelector(item) || trIndex}`"
        :ref="`row-${trIndex}`"
      >
        <div
          v-for="(field, tdIndex) in fields"
          :key="'oc-tbody-td-' + cellKey(field, tdIndex, item)"
        >
          <slot v-if="isFieldTypeSlot(field)" :name="field.name" class="field-name" :item="item" />
          <template v-else-if="isFieldTypeCallback(field)">
            {{ field.callback(item[field.name]) }}
          </template>
          <template v-else :class="field.name">
            {{ item[field.name] }}
          </template>
        </div>
      </oc-single-tile>
    </ul>
    <div v-if="$slots.footer" class="oc-text-center">
      <!-- @slot Footer of the Tiles -->
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import OcGhostElement from "../../atoms/_OcGhostElement/_OcGhostElement.vue"
import OcButton from "../../atoms/OcButton/OcButton.vue"
import OcSingleTile from "../../atoms/OcSingleTile/OcSingleTile.vue"
import SortMixin from "../../../mixins/sort"

import {
  EVENT_THEAD_CLICKED,
  EVENT_TROW_CLICKED,
  EVENT_TROW_MOUNTED,
  EVENT_TROW_CONTEXTMENU,
  EVENT_ITEM_DROPPED,
  EVENT_ITEM_DRAGGED,
} from "../../../helpers/constants"

/**
 * A table component with dynamic layout and data.
 */
export default {
  name: "OcTiles",
  status: "ready",
  release: "14.0.0",
  components: {
    OcButton,
    OcSingleTile,
  },
  mixins: [SortMixin],
  props: {
    /**
     * The data for the table. Each array item will be rendered as one table row. Each array item needs to have a
     * unique identifier. By default we expect this to be an `id` field. If your field has a different name, please
     * specify it in the `id-key` property of oc-table.
     */
    data: {
      type: Array,
      required: true,
    },
    /**
     * Name of the id property of your data items. See `data` for details on how to use it. The [idKey] is a required field
     * within your data items if you want to have working highlighting. For data representation it is not needed.
     */
    idKey: {
      type: String,
      default: "id",
    },
    /**
     * Closure function to mutate the item id into a valid DOM selector
     */
    itemDomSelector: {
      type: Function,
      required: false,
      default(item) {
        return item[this.idKey]
      },
    },
    /**
     * The column layout of the table.
     *
     * Each field can have the following data:<br />
     * - **name**: values need to be keys of your data items. Required.<br />
     * - **title**: title as displayed in the table header. Optional, falls back to the value of name.<br />
     * - **headerType**: the header field type, can be `slot`, entirely absent or unknown. If absent or unknown, the data will be rendered into a plain table cell.<br />
     * - **type**: the field type, can be `slot`, `callback`, entirely absent or unknown. If absent or unknown, the data will be rendered into a plain table cell.<br />
     * - **callback**: if `type="callback"` the return value of field.callback will be rendered into a plain table cell.<br />
     * - **alignH**: horizontal cell content alignment, can be `left`, `center` or `right`. Defaults to `left`.<br />
     * - **alignV**: vertical cell content alignment, can be `top`, `middle` or `bottom`. Defaults to `middle`.<br />
     * - **width**: horizontal size of a cell, can be `auto`, `shrink` or `expand`. Defaults to `auto`.<br />
     * - **wrap**: text behaviour of a data cell, can be `truncate`, `overflow`, `nowrap`, `break`. Omitted if not set. Header cells are always fixed to `nowrap`.<br />
     * - **thClass**:additional classes on header cells, provided as a string, classes separated by spaces. Optional, falls back to an empty string.<br />
     * - **tdClass**: additional classes on data cells, provided as a string, classes separated by spaces. Optional, falls back to an empty string.<br />
     * - **sortable**: defines if the column is sortable, can be `true` or `false`.
     */
    fields: {
      type: Array,
      required: true,
    },
    /**
     * Asserts whether the table has a header. The header markup is defined in the `fields` array.
     */
    hasHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * Asserts whether the header of the table is sticky.
     */
    sticky: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Asserts whether table rows should be highlighted when hovered.
     */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * The ids of highlighted data items. Null or an empty string/array for no highlighting.
     */
    highlighted: {
      type: [String, Array],
      default: null,
    },
    /**
     * The ids of disabled data items. Null or an empty string/array for no disabled items.
     */
    disabled: {
      type: [String, Array],
      default: null,
    },
    /**
     * Top position of header used when the header is sticky in pixels
     */
    headerPosition: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * Sets the padding size for x axis
     * @values xsmall, small, medium, large, xlarge
     */
    paddingX: {
      type: String,
      required: false,
      default: "small",
      validator: size => /(xsmall|small|medium|large|xlarge)/.test(size),
    },
    /**
     * Enable Drag & Drop events
     */
    dragDrop: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Array of items that should be selected by default.
     */
    selection: {
      type: Array,
      required: false,
      default: () => [],
    },
    /**
     * Determines if the table content should be loaded lazily.
     */
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      constants: {
        EVENT_THEAD_CLICKED,
        EVENT_TROW_CLICKED,
        EVENT_TROW_MOUNTED,
        EVENT_TROW_CONTEXTMENU,
      },
      ghostElement: null,
    }
  },
  computed: {
    currentSortBy() {
      return this.currentSortItem.title
    },
    currentSortDir() {
      return this.currentSortItem.sortDir
    },
    currentSortItem() {
      const currentSortField = this.fields.filter(field => field.name === this.sortBy)
      if (currentSortField.length) {
        return currentSortField[0]
      }
      return { title: "No Sorting found", sortDir: "None" }
    },
    sortableFields() {
      const returnFields = [
        { sortable: true, title: this.$gettext("A - Z"), name: "name", sortDir: "asc" },
        { sortable: true, title: this.$gettext("Z - A"), name: "name", sortDir: "desc" },
        { sortable: true, title: this.$gettext("Newest"), name: "mdate", sortDir: "asc" },
        { sortable: true, title: this.$gettext("Oldest"), name: "mdate", sortDir: "desc" },
        { sortable: true, title: this.$gettext("Smallest"), name: "size", sortDir: "asc" },
        { sortable: true, title: this.$gettext("Largest"), name: "size", sortDir: "desc" },
      ]
      return returnFields
    },
    getSortIcon() {
      console.log(this.sortBy, this.currentSortDir)
      return this.currentSortDir === "asc" ? "arrow-down" : "arrow-up"
    },
  },
  methods: {
    dragOver(event) {
      event.preventDefault()
    },
    setGhostElement(item, event) {
      const selection = [...this.selection]
      selection.splice(
        selection.findIndex(i => i.id === item.id),
        1
      )
      const GhostElementComponent = Vue.extend(OcGhostElement)
      const ghostInstances = new GhostElementComponent({
        propsData: {
          previewItems: [item, ...selection],
        },
      })
      ghostInstances.$mount()
      this.ghostElement = document.body.appendChild(ghostInstances.$el)
      this.ghostElement.ariaHidden = "true"
      this.ghostElement.style.left = "-99999px"
      this.ghostElement.style.top = "-99999px"
      event.dataTransfer.setDragImage(this.ghostElement, 0, 0)
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
    },
    dragStart(item, event) {
      if (!this.dragDrop) return
      this.setGhostElement(item, event)
      this.$emit(EVENT_ITEM_DRAGGED, item)
    },
    dropRowEvent(selector, event) {
      if (!this.dragDrop) return
      const hasFilePayload = (event.dataTransfer.types || []).some(e => e === "Files")
      if (hasFilePayload) return
      this.ghostElement.remove()
      const dropTarget = event.target
      const dropTargetTr = dropTarget.closest("tr")
      const dropItemId = dropTargetTr.dataset.itemId
      this.dropRowStyling(selector, true, event)
      this.$emit(EVENT_ITEM_DROPPED, dropItemId)
    },
    dropRowStyling(selector, leaving, event) {
      const hasFilePayload = (event.dataTransfer.types || []).some(e => e === "Files")
      if (hasFilePayload) return
      if (event.currentTarget?.contains(event.relatedTarget)) {
        return
      }

      const classList = document.getElementsByClassName(`oc-tbody-tr-${selector}`)[0].classList
      const className = "highlightedDropTarget"
      leaving ? classList.remove(className) : classList.add(className)
    },
    isFieldTypeSlot(field) {
      return field.type === "slot"
    },
    isFieldTypeCallback(field) {
      return ["callback", "function"].indexOf(field.type) >= 0
    },
    extractFieldTitle(field) {
      if (Object.prototype.hasOwnProperty.call(field, "title")) {
        return field.title
      }
      return field.name
    },
    isHighlighted(item) {
      if (!this.highlighted) {
        return false
      }

      if (Array.isArray(this.highlighted)) {
        return this.highlighted.indexOf(item[this.idKey]) > -1
      }

      return this.highlighted === item[this.idKey]
    },
    isDisabled(item) {
      if (!this.disabled) {
        return false
      }

      if (Array.isArray(this.disabled)) {
        return this.disabled.indexOf(item[this.idKey]) > -1
      }

      return this.disabled === item[this.idKey]
    },

    cellKey(field, index, item) {
      const prefix = [item[this.idKey], index + 1].filter(Boolean)

      if (this.isFieldTypeSlot(field)) {
        return [...prefix, field.name].join("-")
      }

      if (this.isFieldTypeCallback(field)) {
        return [...prefix, field.callback(item[field.name])].join("-")
      }

      return [...prefix, item[field.name]].join("-")
    },
    getSortLabel(name) {
      return this.$gettextInterpolate(this.$gettext("Sort by: %{ name }"), { name })
    },
  },
}
</script>
<style lang="scss" scoped>
ul.tiles-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 15px;
  justify-content: flex-start;
  list-style: none;
  padding: 20px;

  @media (max-width: $oc-breakpoint-xsmall-max) {
    max-width: calc(100vw - 70px);
  }

  li {
    aspect-ratio: 16 / 9;
    border-radius: 15px;
    background-color: var(--oc-color-background-muted);
    display: flex;
    overflow: hidden;
    padding: 15px;
    width: var(--oc-size-tiles-size);

    @media (max-width: $oc-breakpoint-xsmall-max) {
      width: 100%;
    }

    .resource-table-actions {
      align-self: flex-end;
      display: flex;
    }
  }
}
</style>
