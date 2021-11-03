<template>
  <div>
    <div
      v-if="groupingSettings && groupingAllowed && groupingSettings.showGroupingOptions"
      style="padding-bottom: 20px"
    >
      <div class="oc-docs-width-small" style="display: inline">
        <label class="oc-mx-s">Group By:</label>
      </div>
      <div class="oc-docs-width-medium" style="display: inline-block; width: 250px">
        <oc-select
          v-model="selected"
          :options="['None', ...Object.keys(groupingSettings.groupingFunctions)]"
          :clearable="false"
          :searchable="false"
        />
      </div>
    </div>
    <table v-bind="extractTableProps()">
      <oc-thead v-if="hasHeader">
        <oc-tr class="oc-table-header-row">
          <oc-th
            v-for="(field, index) in fields"
            :key="`oc-thead-${field.name}`"
            v-bind="extractThProps(field, index)"
            @click.native="clickedField(field)"
          >
            <span
              v-if="field.headerType === 'slot'"
              :key="field.name + 'Header'"
              class="oc-table-thead-content"
            >
              <slot :name="field.name + 'Header'" />
            </span>
            <span
              v-else
              :key="field.name + 'Header'"
              class="oc-table-thead-content"
              v-text="extractFieldTitle(field)"
            />
            <oc-button
              v-if="field.sortable"
              :aria-label="getSortLabel(field.name)"
              class="oc-button-sort"
              variant="passive"
              appearance="raw"
              @click.stop="clickedField(field)"
            />
          </oc-th>
        </oc-tr>
      </oc-thead>
      <oc-tbody v-if="selected === 'None' || !selected">
        <oc-tr
          v-for="(item, trIndex) in tableData"
          :key="`oc-tbody-tr-${item[idKey] || trIndex}`"
          :ref="`row-${trIndex}`"
          v-bind="extractTbodyTrProps(item, trIndex)"
          :data-file-id="item.id"
          :draggable="dragDrop"
          @click.native="$emit(constants.EVENT_TROW_CLICKED, item)"
          @contextmenu.native="
            $emit(constants.EVENT_TROW_CONTEXTMENU, $refs[`row-${trIndex}`][0], $event, item)
          "
          @hook:mounted="$emit(constants.EVENT_TROW_MOUNTED, item, $refs[`row-${trIndex}`][0])"
          @dragstart.native.stop="dragStart(item)"
          @drop.native.stop="dropRowEvent(item.id, $event)"
          @dragenter.native.prevent.stop="dropRowStyling(item.id, false, $event)"
          @dragleave.native.prevent.stop="dropRowStyling(item.id, true, $event)"
          @mouseleave="dropRowStyling(item.id, true, $event)"
          @dragover.native.prevent.stop
        >
          <oc-td
            v-for="(field, tdIndex) in fields"
            :key="'oc-tbody-td-' + cellKey(field, tdIndex, item)"
            v-bind="extractTdProps(field, tdIndex)"
          >
            <slot v-if="isFieldTypeSlot(field)" :name="field.name" :item="item" />
            <template v-else-if="isFieldTypeCallback(field)">
              <span
                v-oc-tooltip="getTip(field, item)"
                aria-hidden="true"
              >
                {{ field.callback(item[field.name]) }}
              </span>
            </template>
            <template v-else>
              <span
                v-oc-tooltip="getTip(field, item)"
                aria-hidden="true"
              >
                {{ item[field.name] }}
              </span>
            </template>
          </oc-td>
        </oc-tr>
      </oc-tbody>

      <!-- Collapsibles -->

      <tbody
        v-for="(item, index) in groupedItems"
        v-else-if="groupingAllowed && selected !== 'None'"
        :key="`${item.name + index}`"
      >
        <oc-tr
          style="
             {
              height: rowHeight + 'px';
              cursor: pointer;
            }
          "
          :class="['oc-tbody-tr', 'oc-tbody-tr-accordion']"
          @click.native="toggle(item, index)"
          ><oc-td style="colspan='2'"
            ><oc-avatar
              v-if="selected === 'Share owner'"
              :width="30"
              style="
                 {
                  width: 30px;
                  height: 30px;
                }
              "
              :user-name="item.name"
              :src="item.data[0].owner[0].avatar"
              accessible-label="item.name" /></oc-td
          ><oc-td :colspan="fields.length - 2"> {{ item.name }} </oc-td
          ><oc-td>
            <span
              class="oc-ml-xs oc-icon-l"
              :style="[resultArray[index].open ? { display: 'none' } : {}]"
            >
              <oc-icon
                name="expand_less"
                class="oc-accordion-title-arrow-icon"
                :class="{ rotate: resultArray[index].open }"
                size="large"
              />
            </span>
            <span
              class="oc-ml-xs oc-icon-l"
              :style="[resultArray[index].open ? {} : { display: 'none' }]"
            >
              <oc-icon
                name="expand_more"
                class="oc-accordion-title-arrow-icon"
                :class="{ rotate: resultArray[index].open }"
                size="large"
              /> </span></oc-td
        ></oc-tr>
        <template v-if="resultArray[index].open">
          <oc-tr
            v-for="(item, trIndex) in item['data']"
            :key="`oc-tbody-tr-${item[idKey] || trIndex}`"
            :ref="`row-${trIndex}`"
            v-bind="extractTbodyTrProps(item, trIndex)"
            :data-file-id="item.id"
            :draggable="dragDrop"
            @click.native="$emit(constants.EVENT_TROW_CLICKED, item)"
            @contextmenu.native="
              $emit(constants.EVENT_TROW_CONTEXTMENU, $refs[`row-${trIndex}`][0], $event, item)
            "
            @hook:mounted="$emit(constants.EVENT_TROW_MOUNTED, item, $refs[`row-${trIndex}`][0])"
            @dragstart.native.stop="dragStart(item)"
            @drop.native.stop="dropRowEvent(item.id, $event)"
            @dragenter.native.prevent.stop="dropRowStyling(item.id, false, $event)"
            @dragleave.native.prevent.stop="dropRowStyling(item.id, true, $event)"
            @mouseleave="dropRowStyling(item.id, true, $event)"
            @dragover.native.prevent.stop
          >
            <oc-td
              v-for="(field, tdIndex) in fields"
              :key="'oc-tbody-td-' + cellKey(field, tdIndex, item)"
              v-bind="extractTdProps(field, tdIndex)"
            >
              <slot v-if="isFieldTypeSlot(field)" :name="field.name" :item="item" />
              <template v-else-if="isFieldTypeCallback(field)">
                <span
                  v-oc-tooltip="getTip(field, item)"
                  aria-hidden="true"
                >
                  {{ field.callback(item[field.name]) }}
                </span>
              </template>
              <template v-else>
                <span
                  v-oc-tooltip="getTip(field, item)"
                  aria-hidden="true"
                >
                  {{ item[field.name] }}
                </span>
              </template>
            </oc-td>
          </oc-tr>
        </template>
      </tbody>

      <!-- Show more/show less footer for preview enabled -->
      <tbody
        v-if="
          groupingSettings &&
          groupingSettings.previewAmount &&
          data.length > groupingSettings.previewAmount + 1
        "
      >
        <oc-tr
          style="
             {
              height: rowHeight + 'px';
              font-weight: 600;
            }
          "
          :class="['oc-tbody-tr', 'preview-settings']"
          @click.native="previewEnabled = !previewEnabled"
        >
          <oc-td
            v-if="previewEnabled"
            key="showMore"
            :colspan="fields.length"
            style="
               {
                text-align: center;
              }
            "
            ><div class="preview-heading"><span>Show more</span> <oc-icon
                name="expand_more"           
                size="large"
              /> </div> </oc-td
          ><oc-td
            v-else
            key="showLess"
            :colspan="fields.length"
            style="
               {
                text-align: center;
              }
            "
            ><div class="preview-heading"><span>Show less </span><oc-icon
                name="expand_less"                             
                size="large"
              /> </div>
          </oc-td>
        </oc-tr>
      </tbody>
      <tfoot v-if="$slots.footer" class="oc-table-footer">
        <tr class="oc-table-footer-row">
          <td :colspan="footerColspan" class="oc-table-footer-cell">
            <!-- @slot Footer of the table -->
            <slot name="footer" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import OcThead from "../../atoms/_OcTableHeader/_OcTableHeader.vue"
import OcTbody from "../../atoms/_OcTableBody/_OcTableBody.vue"
import OcTr from "../../atoms/_OcTableRow/_OcTableRow"
import OcTh from "../../atoms/_OcTableCellHead/_OcTableCellHead"
import OcTd from "../../atoms/_OcTableCellData/_OcTableCellData.vue"
import OcButton from "../../atoms/OcButton/OcButton.vue"
import SortMixin from "../../../mixins/sort"
import { getSizeClass } from "../../../utils/sizeClasses"

import {
  EVENT_THEAD_CLICKED,
  EVENT_TROW_CLICKED,
  EVENT_TROW_MOUNTED,
  EVENT_TROW_CONTEXTMENU,
  EVENT_FILE_DROPPED,
  EVENT_FILE_DRAGGED,
} from "../../../helpers/constants"

/**
 * A table component with dynamic layout and data.
 */
export default {
  name: "OcTable",
  status: "ready",
  release: "2.1.0",
  components: {
    OcThead,
    OcTbody,
    OcTr,
    OcTh,
    OcTd,
    OcButton,
  },
  mixins: [SortMixin],
  props: {
    /**
     * Web view in which the table is shown. Used to save sorting settings 
     * -**
     */
    view: {
      type: String,
      required: false,
    },
    /**
     * Grouping settings for the table. Following settings are possible:<br />
     * -**groupingFunctions**: Object with keys as grouping options names and functions that get a table data row and return a group name for that row. The names of the functions are used as grouping options.<br />
     * -**groupingBy**: must be either one of the keys in groupingFunctions or 'None'. If not set, default grouping will be 'None'.<br />
     * -**ShowGroupingOptions**:  boolean value for showing or hinding the select element with grouping options above the table. <br />
     * -**PreviewAmount**: Integer value that is used to show only the first n data rows of the table.
     */
    groupingSettings: {
      type: Object,
      required: false,
    },
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
  },
  data() {
    return {
      selected:
        this.groupingSettings && this.groupingSettings.groupingBy
          ? this.groupingSettings.groupingBy
          : "None",
      accordionClosed: [],
      previewEnabled: true,
      previewData: [],
      resultArray: [],
      showMore: false,
      groupingOrderAsc:
        this.groupingSettings && this.groupingSettings.groupingFunctions
          ? this.groupingOrder()
          : {},
      constants: {
        EVENT_THEAD_CLICKED,
        EVENT_TROW_CLICKED,
        EVENT_TROW_MOUNTED,
        EVENT_TROW_CONTEXTMENU,
      },
    }
  },
  computed: {
    tableData() {
      if (
        this.groupingSettings &&
        this.groupingSettings.previewAmount &&
        this.data.length > this.groupingSettings.previewAmount + 1 &&
        this.selected === "None" &&
        this.previewEnabled
      )
        return this.sortedData
          ? this.sortedData.slice(0, this.groupingSettings.previewAmount || 3)
          : this.data.slice(0, this.groupingSettings.previewAmount || 3)
      return this.sortedData || this.data
    },
    tableClasses() {
      const result = ["oc-table"]

      if (this.hover) {
        result.push("oc-table-hover")
      }

      if (this.sticky) {
        result.push("oc-table-sticky")
      }

      return result
    },

    footerColspan() {
      return this.fields.length
    },
    groupedItems() {
      let result = this.createGroupedItems(
        this.selected,
        this.tableData,
        this.groupingOrderAsc[this.selected]
      )

      if (this.groupingSettings && this.previewEnabled && this.groupingSettings.previewAmount) {
        let previewCount = this.groupingSettings.previewAmount + 1
        result.forEach(e => {
          let eLength = e.data.length
          if (eLength - previewCount >= 0) e.data = e.data.slice(0, previewCount - 1)
          previewCount = previewCount - eLength
        })
        result = result.filter(e => e.data.length > 0)
      }
      this.resultArray = result
      return result
    },
    groupingAllowed() {
      return this.groupingSettings &&
        this.groupingSettings.groupingFunctions &&
        Object.keys(this.groupingSettings.groupingFunctions).length > 0
        ? true
        : false
    },
  },
  mounted(){
    let view = this.view || window.location.href.split('?')[0]
    if (localStorage.getItem(`sortBy:${view}`)){
      let sortBy = JSON.parse(localStorage.getItem(`sortBy:${view}`))
       this.$emit(this.constants.EVENT_THEAD_CLICKED, sortBy.field)
       if (!sortBy.asc) this.$emit(this.constants.EVENT_THEAD_CLICKED, sortBy.field)
    }
  },
  
  methods: {
    groupingOrder() {
      let groupingOrder = {}
      Object.keys(this.groupingSettings.groupingFunctions).forEach(
        group => (groupingOrder[group] = true)
      )
      return groupingOrder
    },
    createGroupedItems(col, data, asc) {
      let groups = {}
      let resultArray = []
      if (Object.keys(this.groupingSettings.groupingFunctions).includes(col)) {
        data.forEach(row => {
          groups[this.groupingSettings.groupingFunctions[col](row)]
            ? groups[this.groupingSettings.groupingFunctions[col](row)].push(row)
            : (groups[this.groupingSettings.groupingFunctions[col](row)] = [row])
        })
        for (const [key, value] of Object.entries(groups)) {
          resultArray.push({
            name: key.toUpperCase(),
            open: true,
            data: value,
          })
        }

        if (col === "sdate" || this.groupingSettings.functionColMappings[col] === "sdate") {
          //resultArray = resultArray.reverse()

          let sorted = resultArray.sort((a, b) => {
            return asc ? b.data[0].sdate - a.data[0].sdate : a.data[0].sdate - b.data[0].sdate
          })
          return sorted
        }
        if (asc) return resultArray.sort((a, b) => (a.name > b.name ? 1 : -1))
        else return resultArray.sort((a, b) => (a.name > b.name ? -1 : 1))
      }
    },
    toggle(item, index) {
      this.resultArray[index].open = !this.resultArray[index].open
    },
    itemOpen(item, index) {
      return this.resultArray[index].open
    },
    clickedField(field) {

      this.$emit(this.constants.EVENT_THEAD_CLICKED, field)
      let view = this.view || window.location.href.split('?')[0]
      
      let orderBy = JSON.parse(localStorage.getItem(`sortBy:${view}`))
      //case: setup exists, same field clicked
      if (orderBy && field.title === orderBy.field.title){
        orderBy.asc = !orderBy.asc
        localStorage.setItem(`sortBy:${view}`, JSON.stringify(orderBy));
      } 
      //case: setup exists, different field clicked
      else if (orderBy && field.title != orderBy.field.title){
        localStorage.setItem(`sortBy:${view}`, JSON.stringify({field: field, asc: orderBy.asc}));
      }
      //case: first setup
      else
      localStorage.setItem(`sortBy:${view}`, JSON.stringify({field: field, asc: field.title==="Name"? false: true}));

      if (this.groupingSettings && this.groupingAllowed) {
        let group =
          Object.keys(this.groupingSettings.functionColMappings).find(
            key => this.groupingSettings.functionColMappings[key] === field.name
          ) || field.name
        this.groupingOrderAsc[group] = !this.groupingOrderAsc[group]
      }
    },
    onSwitchAdvanced() {
      this.isAdvanced = !this.isAdvanced
    },
    ///
    dragStart(file) {
      if (!this.dragDrop) return
      this.$emit(EVENT_FILE_DRAGGED, file)
    },
    dropRowEvent(id, event) {
      if (!this.dragDrop) return
      const dropTarget = event.target
      const dropTargetTr = dropTarget.closest("tr")
      const dropFileId = dropTargetTr.dataset.fileId
      this.dropRowStyling(id, true, event)
      this.$emit(EVENT_FILE_DROPPED, dropFileId)
    },
    dropRowStyling(id, leaving, event) {
      if (event.currentTarget?.contains(event.relatedTarget)) {
        return
      }

      const classList = document.getElementsByClassName(`oc-tbody-tr-${id}`)[0].classList
      const className = "highlightedDropTarget"
      leaving ? classList.remove(className) : classList.add(className)
    },
    isFieldTypeSlot(field) {
      return field.type === "slot"
    },
    isFieldTypeCallback(field) {
      return ["callback", "function"].indexOf(field.type) >= 0
    },
    getTip(field, item) {
      if ('tip' in field) {
        return field.tip(item[field.name])
      }
      return null
    },
    extractFieldTitle(field) {
      if (Object.prototype.hasOwnProperty.call(field, "title")) {
        return field.title
      }
      return field.name
    },
    extractTableProps() {
      return {
        class: this.tableClasses,
      }
    },
    extractThProps(field, index) {
      const props = this.extractCellProps(field)
      props.class = `oc-table-header-cell oc-table-header-cell-${field.name}`
      if (Object.prototype.hasOwnProperty.call(field, "thClass")) {
        props.class += ` ${field.thClass}`
      }
      if (this.sticky) {
        props.style = `top: ${this.headerPosition}px;`
      }

      if (index === 0) {
        props.class += ` oc-pl-${getSizeClass(this.paddingX)} `
      }

      if (index === this.fields.length - 1) {
        props.class += ` oc-pr-${getSizeClass(this.paddingX)}`
      }

      this.extractSortThProps(props, field, index)

      return props
    },
    extractTbodyTrProps(item, index) {
      return {
        class: [
          "oc-tbody-tr",
          `oc-tbody-tr-${item[this.idKey] || index}`,
          this.isHighlighted(item) ? "oc-table-highlighted" : undefined,
          this.isDisabled(item) ? "oc-table-disabled" : undefined,
        ].filter(Boolean),
      }
    },
    extractTdProps(field, index) {
      const props = this.extractCellProps(field, index)
      props.class = `oc-table-data-cell oc-table-data-cell-${field.name}`
      if (Object.prototype.hasOwnProperty.call(field, "tdClass")) {
        props.class += ` ${field.tdClass}`
      }
      if (Object.prototype.hasOwnProperty.call(field, "wrap")) {
        props.wrap = field.wrap
      }

      if (index === 0) {
        props.class += ` oc-pl-${getSizeClass(this.paddingX)} `
      }

      if (index === this.fields.length - 1) {
        props.class += ` oc-pr-${getSizeClass(this.paddingX)}`
      }

      return props
    },
    extractCellProps(field) {
      const result = {}
      if (Object.prototype.hasOwnProperty.call(field, "alignH")) {
        result.alignH = field.alignH
      }
      if (Object.prototype.hasOwnProperty.call(field, "alignV")) {
        result.alignV = field.alignV
      }
      if (Object.prototype.hasOwnProperty.call(field, "width")) {
        result.width = field.width
      }

      return result
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
      const label = this.$gettext("Sort by %{ name }")

      return this.$gettextInterpolate(label, { name })
    },
  },
}
</script>
<style lang="scss">
.preview-heading {
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-settings {
  background-color: rgb(247, 245, 245);
  cursor: pointer;
}
.grouping-settings {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.oc-tbody-tr-accordion {
  background-color: var(--oc-color-input-bg);
}
.oc-table {
  border-collapse: collapse;
  border-spacing: 0;
  color: var(--oc-color-text-default);
  width: 100%;

  &-hover tr {
    transition: background-color $transition-duration-short ease-in-out;
  }

  tr:not(&-header-row) {
    height: var(--oc-size-height-table-row);
  }

  tr + tr {
    border-top: 1px solid var(--oc-color-border);
  }

  &-hover tr:not(&-footer-row):hover {
    background-color: var(--oc-color-input-border);
  }

  &-highlighted {
    background-color: var(--oc-color-background-highlight);
  }

  &-disabled {
    background-color: var(--oc-color-background-muted);
    opacity: 0.8;
    pointer-events: none;
  }

  &-sticky {
    position: relative;

    .oc-table-header-cell {
      background-color: var(--oc-color-background-default);
      position: sticky;
      z-index: 1;
    }
  }

  .highlightedDropTarget {
    background-color: var(--oc-color-input-border);
  }

  &-thead-content {
    vertical-align: middle;
  }

  &-footer {
    border-top: 1px solid var(--oc-color-border);

    &-cell {
      color: var(--oc-color-text-muted);
      font-size: 0.875rem;
      line-height: 1.4;
      padding: var(--oc-space-xsmall);
    }
  }
}
</style>
<docs>
```js
<template>
  <section>
    <h3 class="oc-heading-divider">
      A simple table with plain field types
    </h3>
    <oc-table :fields="fields" :data="data" highlighted="4b136c0a-5057-11eb-ac70-eba264112003"
      disabled="8468c9f0-5057-11eb-924b-934c6fd827a2" :sticky="true">
      <template #footer>
        3 resources
      </template>
    </oc-table>
  </section>
</template>
<script>
  export default {
    computed: {
      fields() {
        return [{
          name: "resource",
          title: "Resource",
          alignH: "left"
        }, {
          name: "last_modified",
          title: "Last modified",
          alignH: "right"
        }]
      },
      data() {
        return [{
          id: "4b136c0a-5057-11eb-ac70-eba264112003",
          resource: "hello-world.txt",
          last_modified: 1609962211
        }, {
          id: "8468c9f0-5057-11eb-924b-934c6fd827a2",
          resource: "I am a folder",
          last_modified: 1608887766
        }, {
          id: "9c4cf97e-5057-11eb-8044-b3d5df9caa21",
          resource: "this is fine.png",
          last_modified: 1599999999
        }]
      }
    }
  }
</script>
```
```js
<template>
  <section>
    <h3 class="oc-heading-divider">
      A simple table with all existing field types
    </h3>
    <oc-table :fields="fields" :data="data">
      <template v-slot:resourceHeader>
        <div class="uk-flex uk-flex-middle">
          <oc-icon name="folder" class="oc-mr-s" />
          Resource
        </div>
      </template>
      <template v-slot:resource="rowData">
        <oc-tag>
          <oc-icon :name="rowData.item.icon" />
          {{ rowData.item.resource }}
        </oc-tag>
      </template>
    </oc-table>
  </section>
</template>
<script>
  export default {
    computed: {
      fields() {
        return [{
          name: "resource",
          title: "Resource",
          headerType: "slot",
          type: "slot"
        }, {
          name: "last_modified",
          title: "Last modified",
          type: "callback",
          callback: function(timestamp) {
            const date = new Date(timestamp * 1000)
            const hours = date.getHours()
            const minutes = "0" + date.getMinutes()
            const seconds = "0" + date.getSeconds()
            return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
          }
        }]
      },
      data() {
        return [{
          id: "4b136c0a-5057-11eb-ac70-eba264112003",
          resource: "hello-world.txt",
          icon: "text",
          last_modified: 1609962211
        }, {
          id: "8468c9f0-5057-11eb-924b-934c6fd827a2",
          resource: "I am a folder",
          icon: "folder",
          last_modified: 1608887766
        }, {
          id: "9c4cf97e-5057-11eb-8044-b3d5df9caa21",
          resource: "this is fine.png",
          icon: "image",
          last_modified: 1599999999
        }]
      }
    }
  }
</script>
```
```js
<template>
  <section>
    <h3 class="oc-heading-divider">
      A table with long text showing the different text wrapping mechanisms
    </h3>
    <oc-table :fields="fields" :data="data" :has-header="true" :hover="true" />
  </section>
</template>
<script>
  export default {
    computed: {
      fields() {
        return [
          {
            name: "truncate",
            title: "truncate",
            wrap: "truncate"
          },
          {
            name: "break",
            title: "break",
            wrap: "break"
          },
          {
            name: "nowrap",
            title: "nowrap",
            wrap: "nowrap"
          }
        ]
      },
      data() {
        return [
          {
            truncate: "This is very long text that will get truncated eventually. This is very long text that will get truncated eventually. This is very long text that will get truncated eventually. This is very long text that will get truncated eventually. This is very long text that will get truncated eventually. This is very long text that will get truncated eventually. This is very long text that will get truncated eventually.",
            break: "This text is supposed to break to new lines if it becomes too long. This text is supposed to break to new lines if it becomes too long. This text is supposed to break to new lines if it becomes too long. This text is supposed to break to new lines if it becomes too long.",
            nowrap: "This text stays on one line."
          }
        ]
      }
    }
  }
</script>
```
```js
<template>
  <section>
    <h3 class="oc-heading-divider">
      An interactive table showcasing different table features/properties
    </h3>
    <oc-table :fields="fields" :data="data" :has-header="hasHeader" :sticky="stickyHeader" :hover="hover">
      <template v-slot:action="rowData">
        <oc-button @click="toggle(rowData)" size="small">Toggle</oc-button>
      </template>
    </oc-table>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        hasHeader: true,
        stickyHeader: false,
        hover: true
      }
    },
    computed: {
      fields() {
        return [
          {
            name: "property",
            title: "Property",
            sortable: true
          },
          {
            name: "description",
            title: "Description",
            width: "expand",
            sortable: true
          },
          {
            name: "state",
            title: "State",
            width: "shrink",
            sortable: true
          },
          {
            name: "action",
            title: "",
            type: "slot",
            width: "shrink"
          }
        ]
      },
      data() {
        return [
          {
            property: "has-header",
            description: "Whether or not the table header is visible",
            state: this.hasHeader,
            variable: "hasHeader"
          },
          {
            property: "sticky",
            description: "Whether or not the table header is sticky, causing it to float above the table content when scrolling",
            state: this.stickyHeader,
            variable: "stickyHeader"
          },
          {
            property: "hover",
            description: "Highlight table rows on mouseover",
            state: this.hover,
            variable: "hover"
          }
        ]
      }
    },
    methods: {
      toggle(rowData) {
        this[rowData.item.variable] = !this[rowData.item.variable];
      }
    },
  }
</script>
```
</docs>
