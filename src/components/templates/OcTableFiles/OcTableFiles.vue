<template>
  <oc-table
    :grouping-settings="groupingSettings"
    :data="resources"
    :fields="fields"
    :highlighted="selectedIds"
    :disabled="disabled"
    :sticky="true"
    :header-position="headerPosition"
    :drag-drop="dragDrop"
    :hover="hover"
    @highlight="fileClicked"
    @rowMounted="rowMounted"
    @contextmenuClicked="showContextMenu"
    @fileDropped="fileDropped"
    @fileDragged="fileDragged"
  >
    <template #selectHeader>
      <div class="oc-table-files-select-all">
        <oc-checkbox
          id="oc-table-files-select-all"
          :label="allResourcesCheckboxLabel"
          :hide-label="true"
          :value="areAllResourcesSelected"
          @input="toggleSelectionAll"
        />
      </div>
    </template>
    <template #select="{ item }">
      <oc-checkbox
        :id="`oc-table-files-select-${item.id}`"
        :label="getResourceCheckboxLabel(item)"
        :hide-label="true"
        size="large"
        :value="selection"
        :option="item"
        @input="emitSelect"
        @click.native.stop
      />
    </template>
    <template #name="{ item }">
      <oc-resource
        :key="`${item.path}-${item.id}-${item.thumbnail}`"
        :resource="item"
        :is-path-displayed="arePathsDisplayed"
        :is-thumbnail-displayed="areThumbnailsDisplayed"
        :target-route="targetRoute"
        :is-resource-clickable="isResourceClickable(item.id)"
        @click="emitFileClick(item)"
      />
    </template>
    <template #status="{ item }">
      <!-- @slot Status column -->
      <slot name="status" :resource="item" />
    </template>
    <template #sharedWith="{ item }">
      <oc-avatars
        class="oc-table-files-people"
        :items="item.sharedWith"
        :stacked="true"
        :max-displayed="3"
        :is-tooltip-displayed="true"
        :accessible-description="getSharedWithAvatarDescription(item)"
      />
    </template>
    <template #size="{ item }">
      <oc-resource-size :size="item.size" />
    </template>
    <template #owner="{ item }">
      <oc-avatars
        class="oc-table-files-people"
        :items="item.owner"
        :is-tooltip-displayed="true"
        :accessible-description="getOwnerAvatarDescription(item)"
      />
    </template>
    <template #actions="{ item }">
      <div class="oc-table-files-actions">
        <!-- @slot Add quick actions before the `context-menu / three dot` button in the actions column -->
        <slot name="quickActions" :resource="item" />
        <oc-button
          :id="`context-menu-trigger-${item.id.replace(/=+/, '')}`"
          v-oc-tooltip="contextMenuLabel"
          :aria-label="contextMenuLabel"
          class="oc-table-files-btn-action-dropdown"
          appearance="raw"
          @click.stop.prevent="
            resetDropPosition(`context-menu-drop-ref-${item.id.replace(/=+/, '')}`, $event, item)
          "
        >
          <oc-icon name="more_vert" />
        </oc-button>
        <oc-drop
          :ref="`context-menu-drop-ref-${item.id.replace(/=+/, '')}`"
          :drop-id="`context-menu-drop-${item.id.replace(/=+/, '')}`"
          :toggle="`#context-menu-trigger-${item.id.replace(/=+/, '')}`"
          :popper-options="popperOptions"
          mode="click"
          close-on-click
          @click.native.stop.prevent
        >
          <!-- @slot Add context actions that open in a dropdown when clicking on the "three dots" button -->
          <slot name="contextMenu" :resource="item" />
        </oc-drop>
      </div>
    </template>
    <template v-if="$slots.footer" #footer>
      <!-- @slot Footer of the files table -->
      <slot name="footer" />
    </template>
  </oc-table>
</template>

<script>
import { DateTime } from "luxon"
import maxSize from "popper-max-size-modifier"

import OcTable from "../../molecules/OcTable/OcTable.vue"
import OcResource from "../../organisms/OcResource/OcResource.vue"
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import OcAvatars from "../../organisms/OcAvatars/OcAvatars.vue"
import OcCheckbox from "../../atoms/OcCheckbox/OcCheckbox.vue"
import OcButton from "../../atoms/OcButton/OcButton.vue"
import OcResourceSize from "../../atoms/OcResourceSize/OcResourceSize.vue"
import OcDrop from "../../atoms/OcDrop/OcDrop.vue"
import { EVENT_TROW_MOUNTED, EVENT_FILE_DROPPED } from "../../../helpers/constants"

export default {
  name: "OcTableFiles",
  status: "ready",
  release: "2.1.0",
  components: {
    OcTable,
    OcResource,
    OcIcon,
    OcAvatars,
    OcCheckbox,
    OcButton,
    OcResourceSize,
    OcDrop,
  },
  model: {
    prop: "selection",
    event: "select",
  },
  props: {
    /**
     * Grouping settings for the table. Following settings are possible:<br />
     * -**groupingFunctions**: Object with keys as grouping options names and functions that get a table data row and return a group name for that row. The names of the functions are used as grouping options.
     * -**groupingBy**: must be either one of the keys in groupingFunctions or 'None'. If not set, default grouping will be 'None'.<br />
     * -**ShowGroupingOptions**:  boolean value for showing or hinding the select element with grouping options above the table. <br />
     * -**PreviewAmount**: Integer value that is used to show only the first n data rows of the table.
     */
    groupingSettings: {
      type: Object,
      required: false,
    },
    /**
     * Resources to be displayed in the table.
     * Required fields:
     * - name: The name of the resource containing the file extension in case of a file
     * - path: The full path of the resource
     * - type: The type of the resource. Can be `file` or `folder`
     * Optional fields:
     * - thumbnail
     * - size: The size of the resource
     * - modificationDate: The date of the last modification of the resource
     * - shareDate: The date when the share was created
     * - deletionDate: The date when the resource has been deleted
     * - status: The status of the share. Contains also actions to accept/decline the share
     * - opensInNewWindow: Open the link in a new window
     */
    resources: {
      type: Array,
      required: true,
    },
    /**
     * Asserts whether resources path should be shown in the resource name
     */
    arePathsDisplayed: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Asserts whether icons should be replaced with thumbnails for resources which provide them
     */
    areThumbnailsDisplayed: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * V-model for the selection
     */
    selection: {
      type: Array,
      default: () => [],
    },
    /**
     * Asserts whether actions are available
     */
    hasActions: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * Target route path used to build the link when navigating into a resource
     */
    targetRoute: {
      type: Object,
      required: false,
      default: null,
    },
    /**
     * Asserts whether clicking on the resource name triggers any action
     */
    areResourcesClickable: {
      type: Boolean,
      required: false,
      default: true,
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
     * Asserts whether resources in the table can be selected
     */
    isSelectable: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * The ids of disabled resources. Null or an empty string/array for no disabled resources.
     */
    disabled: {
      type: [String, Array],
      required: false,
      default: null,
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
     * Enable hover effect
     */
    hover: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      constants: {
        EVENT_TROW_MOUNTED,
      },
    }
  },
  computed: {
    popperOptions() {
      return {
        modifiers: [
          maxSize,
          {
            name: "applyMaxSize",
            enabled: true,
            phase: "beforeWrite",
            requires: ["maxSize"],
            fn({ state }) {
              const { height } = state.modifiersData.maxSize

              state.styles.popper.overflowY = `auto`
              state.styles.popper.maxHeight = `${height - 5}px`
            },
          },
        ],
      }
    },
    fields() {
      if (this.resources.length === 0) {
        return []
      }

      const firstResource = this.resources[0]
      const fields = []

      if (this.isSelectable) {
        fields.push({
          name: "select",
          title: "",
          type: "slot",
          headerType: "slot",
          width: "shrink",
        })
      }

      fields.push(
        ...[
          {
            name: "name",
            title: this.$gettext("Name"), // How do we get the translations here?
            type: "slot",
            width: "expand",
            wrap: "truncate",
            sortable: true,
          },
          {
            name: "size",
            title: this.$gettext("Size"),
            type: "slot",
            alignH: "right",
            wrap: "nowrap",
            sortable: true,
          },
          {
            name: "sharedWith",
            title: this.$gettext("Shared with"),
            type: "slot",
            alignH: "right",
            wrap: "nowrap",
            sortable: true,
          },
          {
            name: "status",
            title: this.$gettext("Status"),
            type: "slot",
            alignH: "right",
            wrap: "nowrap",
            sortable: true,
          },
          {
            name: "owner",
            title: this.$gettext("Share owner"),
            type: "slot",
            alignH: "right",
            wrap: "nowrap",
            sortable: "displayName",
          },
          {
            name: "mdate",
            title: this.$gettext("Modified"),
            type: "callback",
            alignH: "right",
            wrap: "nowrap",
            callback: date => this.formatDate(date),
            sortable: date => this.unixDate(date),
          },
          {
            name: "sdate",
            title: this.$gettext("Shared on"),
            type: "callback",
            alignH: "right",
            wrap: "nowrap",
            callback: date => this.formatDate(date),
            sortable: date => this.unixDate(date),
          },
          {
            name: "ddate",
            title: this.$gettext("Deleted"),
            type: "callback",
            alignH: "right",
            wrap: "nowrap",
            callback: date => this.formatDate(date),
            sortable: date => this.unixDate(date),
          },
        ].filter(field => Object.prototype.hasOwnProperty.call(firstResource, field.name))
      )

      if (this.hasActions) {
        fields.push({
          name: "actions",
          title: this.$gettext("Actions"),
          type: "slot",
          alignH: "right",
          wrap: "nowrap",
        })
      }

      return fields
    },

    areAllResourcesSelected() {
      return this.selection.length === this.resources.length
    },

    selectedIds() {
      return this.selection.map(r => r.id)
    },

    allResourcesCheckboxLabel() {
      return this.$gettext("Select all resources")
    },

    contextMenuLabel() {
      return this.$gettext("Show context menu")
    },
  },
  methods: {
    fileDragged(file) {
      this.addSelectedResource(file)
    },
    fileDropped(fileId) {
      this.$emit(EVENT_FILE_DROPPED, fileId)
    },
    addSelectedResource(file) {
      const isSelected = this.selection.some(e => e.id === file.id)
      if (!isSelected) {
        this.$emit("select", this.selection.concat([file]))
      } else {
        this.$emit("select", this.selection)
      }
    },
    resetDropPosition(id, event, item) {
      const instance = this.$refs[id].tippy
      if (instance === undefined) return
      this.emitSelect([item])
      this.displayPositionedDropdown(instance, event)
    },

    showContextMenu(row, event, item) {
      event.preventDefault()

      const instance = row.$el.getElementsByClassName("oc-table-files-btn-action-dropdown")[0]
      if (instance === undefined) return
      this.emitSelect([item])
      this.displayPositionedDropdown(instance._tippy, event)
    },

    displayPositionedDropdown(dropdown, event) {
      dropdown.setProps({
        getReferenceClientRect: () => ({
          width: 0,
          height: 0,
          top: event.clientY,
          bottom: event.clientY,
          left: event.clientX,
          right: event.clientX,
        }),
      })
      dropdown.show()
    },

    rowMounted(resource, component) {
      /**
       * Triggered whenever a row is mounted
       * @property {object} resource The resource which was mounted as table row
       * @property {object} component The table row component
       */
      this.$emit("rowMounted", resource, component)
    },
    fileClicked(resource) {
      /**
       * Triggered when the file row is clicked
       * @property {object} resource The resource for which the event is triggered
       */
      this.emitSelect([resource])
    },
    formatDate(date) {
      return DateTime.fromJSDate(new Date(date)).toRelative()
    },
    unixDate(date) {
      return DateTime.fromJSDate(new Date(date)).valueOf()
    },

    emitSelect(resources) {
      /**
       * Triggered when a checkbox for selecting a resource or the checkbox for selecting all resources is clicked
       * @property {array} resources The selected resources
       */
      this.$emit("select", resources)
    },

    toggleSelectionAll() {
      if (this.areAllResourcesSelected) {
        return this.emitSelect([])
      }

      this.emitSelect(this.resources)
    },

    emitFileClick(resource) {
      /**
       * Triggered when a default action is triggered on a file
       * @property {object} resource resource for which the event is triggered
       */
      this.$emit("fileClick", resource)
    },

    isResourceClickable(resourceId) {
      if (!this.areResourcesClickable) {
        return false
      }

      return Array.isArray(this.disabled)
        ? !this.disabled.includes(resourceId)
        : this.disabled !== resourceId
    },

    getResourceCheckboxLabel(resource) {
      if (resource.type === "folder") {
        return this.$gettext("Select folder")
      }

      return this.$gettext("Select file")
    },

    getSharedWithAvatarDescription(resource) {
      const resourceType =
        resource.type === "folder" ? this.$gettext("folder") : this.$gettext("file")

      const shareCount = resource.sharedWith.filter(u => !u.link).length
      const linkCount = resource.sharedWith.filter(u => !!u.link).length

      const shareText =
        shareCount > 0
          ? this.$ngettext(
              "This %{ resourceType } is shared via %{ shareCount } invite",
              "This %{ resourceType } is shared via %{ shareCount } invites",
              shareCount
            )
          : ""
      const linkText =
        linkCount > 0
          ? this.$ngettext(
              "This %{ resourceType } is shared via %{ linkCount } link",
              "This %{ resourceType } is shared via %{ linkCount } links",
              linkCount
            )
          : ""

      const description = [shareText, linkText].join(" ")

      const translated = this.$gettextInterpolate(description, {
        resourceType,
        shareCount,
        linkCount,
      })

      return translated
    },

    getOwnerAvatarDescription(resource) {
      const translated = this.$gettext("This %{ resourceType } is owned by %{ ownerName }")
      const resourceType =
        resource.type === "folder" ? this.$gettext("folder") : this.$gettext("file")
      const description = this.$gettextInterpolate(translated, {
        resourceType,
        ownerName: resource.owner[0].displayName,
      })

      return description
    },
  },
}
</script>

<style lang="scss">
.oc-table-files {
  &-people {
    position: absolute;
    right: var(--oc-space-xsmall);
    top: 50%;
    transform: translateY(-50%);
  }

  &-actions {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: var(--oc-space-xsmall);
    justify-content: flex-end;
  }

  &-select-all {
    align-items: center;
    display: flex;
    justify-content: center;
  }
}

.tippy-box,
div[data-tippy-root] {
  box-shadow: 0 5px 15px rgb(0 0 0 / 8%);
}
</style>

<docs>
```js
<template>
  <div>
    <oc-table-files :resources="resources" disabled="notes" v-model="selected" class="oc-mb"
                    @action="handleAction" @fileDropped="fileDropped" :drag-drop="true">
      <template v-slot:quickActions="props">
        <oc-button @click.stop variation="passive" appearance="raw" aria-label="Share with other people">
          <oc-icon name="group-add" />
        </oc-button>
        <oc-button @click.stop variation="passive" appearance="raw" aria-label="Create a public link">
          <oc-icon name="link-add" />
        </oc-button>
      </template>
      <template v-slot:contextMenu="props">
        <p>Action Dropdown Placeholder</p>
      </template>
      <template #footer>
        {{ resources.length }} resources
      </template>
    </oc-table-files>
    <div>
      Selected resources: {{ selectedIds }}
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            id: "forest",
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file",
            size: "111000234",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "notes",
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: this.indicators,
            type: "file",
            size: "1245",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "documents",
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "5324435",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "pdfs",
            name: "PDFs",
            path: "/pdfs",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "5324435",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          }
        ]
      },
      indicators() {
        return [
          {
            id: "files-sharing",
            label: "Shared with other people",
            visible: true,
            icon: "group",
            handler: (resource, indicatorId) => alert(`Resource: ${resource.name}, indicator: ${indicatorId}`)
          },
          {
            id: "file-link",
            label: "Shared via link",
            visible: true,
            icon: "link"
          }
        ]
      },
      selectedIds() {
        return this.selected.map(resource => resource.id)
      }
    },
    methods: {
      fileDropped(fileId) {
        const selectedString = this.selectedIds.join(`, `)
        alert(selectedString + ` -> ` + fileId);
      },
      handleAction(resource) {
        alert(`Clicked ${resource.name}`)
      }
    },
    mounted() {
      this.selected = [this.resources[1]]
    }
  }
</script>
```

## Shared with others files table
```js
<template>
  <oc-table-files :resources="resources" :arePathsDisplayed="true" v-model="selected" />
</template>
<script>
  import { shareType } from "../../../utils/shareType"

  export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            id: "example1-forest",
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file",
            sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
            sharedWith: this.sharedWith
          },
          {
            id: "example1-notes",
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: [],
            type: "file",
            sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
            sharedWith: this.sharedWithOverlapping
          },
          {
            id: "example1-Documents",
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
            sharedWith: this.sharedWithSingle
          }
        ]
      },
      sharedWith() {
        return [
          {
            id: "bob",
            username: "bob",
            displayName: "Bob",
            avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            shareType: shareType.user
          },
          {
            id: "marie",
            username: "marie",
            displayName: "Marie",
            avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            shareType: shareType.user
          },
          {
            id: "john",
            username: "john",
            displayName: "John Richards Emperor of long names",
            shareType: shareType.user
          }
        ]
      },
      sharedWithOverlapping() {
        return [
          {
            id: "bob",
            username: "bob",
            displayName: "Bob",
            avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            shareType: shareType.user
          },
          {
            id: "marie",
            username: "marie",
            displayName: "Marie",
            avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            shareType: shareType.user
          },
          {
            id: "john",
            username: "john",
            displayName: "John Richards Emperor of long names",
            shareType: shareType.user
          },
          {
            id: "einstein",
            username: "einstein",
            displayName: "Einstein",
            shareType: shareType.user
          }
        ]
      },
      sharedWithSingle() {
        return [
          {
            id: "bob",
            username: "bob",
            displayName: "Bob",
            avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            shareType: shareType.user
          }
        ]
      }
    }
  }
</script>
```

## Shared with me files table
```js
<template>
  <oc-table-files :resources="resources" :arePathsDisplayed="true" v-model="selected">
    <template v-slot:status="props">
      <div class="uk-flex uk-flex-right" style="align-items: baseline;">
        <oc-button
          v-if="props.resource.status === 1 || props.resource.status === 2"
          appearance="raw"
          variation="primary"
          class="oc-mr-xs"
          v-text="'Accept'"
        />
        <oc-button
          v-if="props.resource.status === 1 || props.resource.status === 0"
          appearance="raw"
          variation="primary"
          class="oc-mr-xs"
          v-text="'Decline'"
        />
        <span
          v-text="shareStatus(props.resource.status)"
        />
      </div>
    </template>
  </oc-table-files>
</template>
<script>
  export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            id: "example3-forest",
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file",
            sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
            owner: [{
              id: "bob",
              username: "bob",
              displayName: "Bob",
              avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            }],
            status: 1
          },
          {
            id: "example3-notes",
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: [],
            type: "file",
            sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
            owner: [{
              id: "einstein",
              username: "einstein",
              displayName: "Einstein"
            }],
            status: 0
          },
          {
            id: "example3-documents",
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
            owner: [{
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            }],
            status: 2
          }
        ]
      }
    },
    methods: {
      shareStatus(status) {
        switch (status) {
          case 0:
            return "Accepted"

          case 1:
            return "Pending"
          case 2:
            return "Declined"
        }
      }
    }
  }
</script>
```

## Trashbin files table
```js
<template>
  <oc-table-files :resources="resources" :arePathsDisplayed="true" :areThumbnailsDisplayed="false" v-model="selected" />
</template>
<script>
  export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            icon: "image",
            indicators: [],
            type: "file",
            ddate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: [],
            type: "file",
            ddate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            ddate: "Mon, 11 Jan 2021 14:34:04 GMT"
          }
        ]
      }
    }
  }
</script>
```

## With disabled actions
```js
<template>
  <oc-table-files :resources="resources" v-model="selected" :hasActions="false" :isResourceClickable="false" />
</template>
<script>
export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            id: "forest",
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file",
            size: "111000234",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "notes",
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: [],
            type: "file",
            size: "1245",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "documents",
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "5324435",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "pictures",
            name: "Pictures and Movies as well as other resources",
            path: "/Pictures and Movies as well as other resources",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "4323556",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          }
        ]
      }
    }
  }
</script>
```

## Shared with me files table with grouping options
```js
<template>
  <oc-table-files :resources="resources" :arePathsDisplayed="true" v-model="selected" :groupingSettings="groupingSettings">
  </oc-table-files>
</template>
<script>
  export default {
    data: () => ({
      selected: []
    }),
    computed: {
      groupingSettings(){
        return {
          groupingBy: "owner",
          showGroupingOptions: true,
          previewAmount: 4,
          groupingFunctions: {
            "owner": function(row) {
              return row.owner[0].displayName
            },
            "alphabetically": function(row) {
              return row.name.charAt(0).toLowerCase()
            },
            "creation": function(row) {
              let now = new Date()
              let interval1 = new Date()
              interval1.setDate(interval1.getDate()-7)
              let interval2 = new Date()
              interval2.setDate(interval2.getDate()-30)

              if (Date.parse(row.sdate)>interval1.getTime()){
                return "Recent"
              } else if (Date.parse(row.sdate)>interval2.getTime()){
                return "This Month"
              } else return "Older"
            }
          },
          functionColMappings: {
            "Share owner": "owner",
            "Shared on": "sdate"
          }
      }
    },
    resources() {
      return [
        {
          id: "A",
          name: "A",
          path: "/Documents",
          icon: "folder",
          indicators: [],
          type: "folder",
          sdate: "Mon, 29 Jun 2021 14:34:04 GMT",
          owner: [
            {
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar:
                "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 2,
        },
        {id: "B",
          name: "B",
          path: "/Documents",
          icon: "folder",
          indicators: [],
          type: "folder",
          sdate: "Mon, 4 May 2021 14:34:04 GMT",
          owner: [
            {
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar:
                "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 2,
        },
        {id: "D",
          name: "D",
          path: "/Documents",
          icon: "folder",
          indicators: [],
          type: "folder",
          sdate: "Mon, 6 May 2021 14:34:04 GMT",
          owner: [
            {
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar:
                "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 2,
        },
        {id: "Dodo",
          name: "Dodo",
          path: "/Documents",
          icon: "folder",
          indicators: [],
          type: "folder",
          sdate: "Mon, 15 May 2021 14:34:04 GMT",
          owner: [
            {
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar:
                "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 2,
        },
        {id: "C",
          name: "C",
          path: "/Documents",
          icon: "folder",
          indicators: [],
          type: "folder",
          sdate: "Mon, 17 May 2021 14:34:04 GMT",
          owner: [
            {
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar:
                "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 2,
        },
        {id: "Aforest.jpg",
          name: "Aforest.jpg",
          path: "images/nature/forest.jpg",
          preview: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
          indicators: [],
          type: "file",
          sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
          owner: [
            {
              id: "bob",
              username: "bob",
              displayName: "Bob",
              avatar:
                "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 1,
        },
        {id: "ag.txt",
          name: "ag.txt",
          path: "/Documents/notes.txt",
          icon: "text",
          indicators: [],
          type: "file",
          sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
          owner: [
            {
              id: "einstein",
              username: "einstein",
              displayName: "Einstein",
            },
          ],
          status: 0,
        },
        {id: "H",
          name: "H",
          path: "/Documents",
          icon: "folder",
          indicators: [],
          type: "folder",
          sdate: "Mon, 07 Jun 2021 14:34:04 GMT",
          owner: [
            {
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar:
                "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 2,
        },
        {id: "Hey",
          name: "Hey",
          path: "/Documents",
          icon: "folder",
          indicators: [],
          type: "folder",
          sdate: "Mon, 11 Jan 2020 14:34:04 GMT",
          owner: [
            {
              id: "marie",
              username: "marie",
              displayName: "Marie",
              avatar:
                "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            },
          ],
          status: 2,
        },
      ]
    },
  },
    methods: {

      shareStatus(status) {
        switch (status) {
          case 0:
            return "Accepted"
          case 1:
            return "Pending"
          case 2:
            return "Declined"
        }
      }
    }
  }
</script>
```

## Trashbin files table
```js
<template>
  <oc-table-files :resources="resources" :arePathsDisplayed="true" :areThumbnailsDisplayed="false" v-model="selected" />
</template>
<script>
  export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            id: "example4-forest",
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            icon: "image",
            indicators: [],
            type: "file",
            ddate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "example4-notes",
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: [],
            type: "file",
            ddate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "example4-documents",
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            ddate: "Mon, 11 Jan 2021 14:34:04 GMT"
          }
        ]
      }
    }
  }
</script>
```

## With disabled actions
```js
<template>
  <oc-table-files :resources="resources" v-model="selected" :hasActions="false" :isResourceClickable="false" />
</template>
<script>
export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            id: "forest",
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file",
            size: "111000234",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "notes",
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: [],
            type: "file",
            size: "1245",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "documents",
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "5324435",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "pictures",
            name: "Pictures and Movies as well as other resources",
            path: "/Pictures and Movies as well as other resources",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "4323556",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          }
        ]
      }
    }
  }
</script>
```

## With hover enabled
```js
<template>
  <oc-table-files :resources="resources" v-model="selected" :hover="true" />
</template>
<script>
export default {
    data: () => ({
      selected: []
    }),
    computed: {
      resources() {
        return [
          {
            id: "forest",
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file",
            size: "111000234",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "notes",
            name: "notes.txt",
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: [],
            type: "file",
            size: "1245",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "documents",
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "5324435",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          },
          {
            id: "pictures",
            name: "Pictures and Movies as well as other resources",
            path: "/Pictures and Movies as well as other resources",
            icon: "folder",
            indicators: [],
            type: "folder",
            size: "4323556",
            mdate: "Mon, 11 Jan 2021 14:34:04 GMT"
          }
        ]
      }
    }
  }
</script>
```
</docs>
