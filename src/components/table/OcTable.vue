<template>
  <table :class="tableClasses">
    <oc-thead v-if="hasHeader">
      <oc-tr>
        <oc-th
          v-for="field in fields"
          :key="`oc-thead-${field.name}`"
          v-bind="extractThProps(field)"
          :class="`oc-table-header-cell oc-table-header-cell-${field.name}`"
        >
          <slot v-if="field.headerType === 'slot'" :name="field.name + 'Header'" />
          <template v-else>
            {{ extractFieldTitle(field) }}
          </template>
        </oc-th>
      </oc-tr>
    </oc-thead>
    <oc-tbody>
      <oc-tr
        v-for="(item, index) in data"
        :key="`oc-tbody-tr-${item[idKey] || index}`"
        :class="[
          'oc-tbody-tr',
          `oc-tbody-tr-${item[idKey] || index}`,
          { 'oc-table-highlighted': isHighlighted(item) },
        ]"
        :style="{ height: rowHeight + 'px' }"
        @click.native="$emit('highlight', item)"
      >
        <oc-td
          v-for="field in fields"
          :key="`oc-tbody-tr-${item[idKey] || index}-${field.name}`"
          :class="`oc-table-data-cell oc-table-data-cell-${field.name}`"
          v-bind="extractTdProps(field)"
        >
          <slot v-if="isFieldTypeSlot(field)" :name="field.name" :item="item" />
          <template v-else-if="isFieldTypeCallback(field)">
            {{ field.callback(item[field.name]) }}
          </template>
          <template v-else>{{ item[field.name] }}</template>
        </oc-td>
      </oc-tr>
    </oc-tbody>
  </table>
</template>
<script>
import OcThead from "./_OcTableHeader"
import OcTbody from "./_OcTableBody"
import OcTr from "./_OcTableRow"
import OcTh from "./_OcTableCellHead"
import OcTd from "./_OcTableCellData"

/**
 * A table component with dynamic layout and data.
 */
export default {
  name: "OcTable",
  status: "review",
  release: "2.1.0",
  components: {
    OcThead,
    OcTbody,
    OcTr,
    OcTh,
    OcTd,
  },
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
     * The column layout of the table.
     *
     * Each field can have the following data:<br />
     * - name: values need to be keys of your data items. Required.<br />
     * - title: title as displayed in the table header. Optional, falls back to the value of name.<br />
     * - headerType: the header field type, can be `slot`, entirely absent or unknown. If absent or unknown, the data will be rendered into a plain table cell.<br />
     * - type: the field type, can be `slot`, `callback`, entirely absent or unknown. If absent or unknown, the data will be rendered into a plain table cell.<br />
     * - callback: if `type="callback"` the return value of field.callback will be rendered into a plain table cell.<br />
     * - alignH: horizontal cell content alignment, can be `left`, `center` or `right`. Defaults to `left`.<br />
     * - alignV: vertical cell content alignment, can be `top`, `middle` or `bottom`. Defaults to `middle`.<br />
     * - width: horizontal size of a cell, can be `auto`, `shrink` or `expand`. Defaults to `auto`.<br />
     */
    fields: {
      type: Array,
      required: true,
    },
    /**
     * Whether or not the table has a header. The header markup is defined in the `fields` array.
     */
    hasHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * Whether or not table rows should be highlighted when hovered.
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
     * Height of the row in pixels
     */
    rowHeight: {
      type: Number,
      required: false,
      default: 64,
    },
    /**
     * Asserts whether the header of the table is sticky
     */
    sticky: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
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
  },
  methods: {
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
    extractTdProps(field) {
      return this.extractCellProps(field)
    },
    extractThProps(field) {
      return this.extractCellProps(field)
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
  },
}
</script>
<style lang="scss">
.oc-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  &-hover tr {
    transition: background-color $transition-duration-short ease-in-out;
  }

  tr + tr {
    border-top: 1px solid $border-primary;
  }

  &-hover tr:hover {
    background-color: lighten($selected-background, 20%);
  }

  &-highlighted {
    background-color: $selected-background;
  }

  &-sticky {
    position: relative;

    .oc-table-header-cell {
      background-color: $inverse-color;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }
}
</style>
<docs>
```
<template>
  <section>
    <h3 class="uk-heading-divider">
      A simple table with plain field types
    </h3>
    <oc-table :fields="fields" :data="data" highlighted="4b136c0a-5057-11eb-ac70-eba264112003" :sticky="true" />
  </section>
</template>
<script>
  export default {
    computed: {
      fields() {
        return [{
          name: "resource",
          title: "Resource",
          alignH: "left",
        }, {
          name: "last_modified",
          title: "Last modified",
          alignH: "right",
        }]
      },
      data() {
        return [{
          id: "4b136c0a-5057-11eb-ac70-eba264112003",
          resource: "hello-world.txt",
          last_modified: 1609962211,
        }, {
          id: "8468c9f0-5057-11eb-924b-934c6fd827a2",
          resource: "I am a folder",
          last_modified: 1608887766,
        }, {
          id: "9c4cf97e-5057-11eb-8044-b3d5df9caa21",
          resource: "this is fine.png",
          last_modified: 1599999999,
        }]
      },
    },
  }
</script>
```
```
<template>
  <section>
    <h3 class="uk-heading-divider">
      A simple table with all existing field types
    </h3>
    <oc-table :fields="fields" :data="data">
      <template v-slot:resourceHeader>
        <div class="uk-flex uk-flex-middle">
          <oc-icon name="folder" aria-hidden="true" class="oc-mr-s" />
          Resource
        </div>
      </template>
      <template v-slot:resource="rowData">
        <oc-tag>
          <oc-icon :name="rowData.item.icon" aria-hidden="true"/>
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
          type: "slot",
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
          },
        }]
      },
      data() {
        return [{
          id: "4b136c0a-5057-11eb-ac70-eba264112003",
          resource: "hello-world.txt",
          icon: "text",
          last_modified: 1609962211,
        }, {
          id: "8468c9f0-5057-11eb-924b-934c6fd827a2",
          resource: "I am a folder",
          icon: "folder",
          last_modified: 1608887766,
        }, {
          id: "9c4cf97e-5057-11eb-8044-b3d5df9caa21",
          resource: "this is fine.png",
          icon: "image",
          last_modified: 1599999999,
        }]
      },
    },
  }
</script>
```
```
<template>
  <section>
    <h3 class="uk-heading-divider">
      An interactive table showcasing different table features/properties
    </h3>
    <oc-table :fields="fields" :data="data" :has-header="hasHeader" :hover="hover">
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
        hover: true,
      }
    },
    computed: {
      fields() {
        return [
          {
            name: "property",
            title: "Property",
          },
          {
            name: "description",
            title: "Description",
            width: "expand",
          },
          {
            name: "state",
            title: "State",
            width: "shrink",
          },
          {
            name: "action",
            title: "",
            type: "slot",
            width: "shrink",
          },
        ]
      },
      data() {
        return [
          {
            property: "has-header",
            description: "Whether or not the table header is visible",
            state: this.hasHeader,
            variable: "hasHeader",
          },
          {
            property: "hover",
            description: "Highlight table rows on mouseover",
            state: this.hover,
            variable: "hover",
          },
        ]
      },
    },
    methods: {
      toggle(rowData) {
        this[rowData.item.variable] = !this[rowData.item.variable]
      },
    },
  }
</script>
```
</docs>
