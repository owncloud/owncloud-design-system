<template>
  <oc-table
    :data="resources"
    :fields="fields"
    :highlighted="highlighted"
    :disabled="disabled"
    :row-height="rowHeight"
    :sticky="true"
    :header-position="headerPosition"
    @highlight="showDetails"
  >
    <template #selectHeader>
      <div class="oc-table-files-select-all">
        <oc-checkbox
          id="oc-table-files-select-all"
          :label="$gettext('Select all resources')"
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
        :key="`${item.path}-${item.id}-${item.preview}`"
        :resource="item"
        :is-path-displayed="arePathsDisplayed"
        :is-preview-displayed="arePreviewsDisplayed"
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
      <oc-avatar-group
        class="oc-table-files-people"
        :users="item.sharedWith"
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
      <oc-avatar-group
        class="oc-table-files-people"
        :users="item.owner"
        :is-tooltip-displayed="true"
        :accessible-description="getOwnerAvatarDescription(item)"
      />
    </template>
    <template #actions="{ item }">
      <div class="oc-table-files-actions">
        <!-- @slot Add quick actions directly next to the `showDetails` button in the actions column -->
        <slot name="quickActions" :resource="item" />
        <oc-button
          :aria-label="$gettext('Show details')"
          class="oc-table-files-btn-show-details"
          variation="passive"
          appearance="raw"
          @click="showDetails(item)"
        >
          <oc-icon name="more_vert" />
        </oc-button>
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

import OcTable from "./OcTable.vue"
import OcResource from "../resource/OcResource.vue"
import OcIcon from "../OcIcon.vue"
import OcAvatarGroup from "../avatars/OcAvatarGroup.vue"
import OcCheckbox from "../OcCheckbox.vue"
import OcButton from "../OcButton.vue"
import OcResourceSize from "../resource/OcResourceSize.vue"

export default {
  name: "OcTableFiles",
  status: "review",
  release: "2.1.0",
  components: { OcTable, OcResource, OcIcon, OcAvatarGroup, OcCheckbox, OcButton, OcResourceSize },
  model: {
    prop: "selection",
    event: "select",
  },
  props: {
    /**
     * Resources to be displayed in the table.
     * Required fields:
     * - name: The name of the resource containing the file extension in case of a file
     * - path: The full path of the resource
     * - type: The type of the resource. Can be `file` or `folder`
     * Optional fields:
     * - preview
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
     * Asserts whether icons should be replaced with previews for resources which provide them
     */
    arePreviewsDisplayed: {
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
     * The ids of highlighted resources. Null or an empty string/array for no highlighting.
     */
    highlighted: {
      type: [String, Array],
      required: false,
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
  },
  computed: {
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
            sortable: true,
          },
          {
            name: "mdate",
            title: this.$gettext("Modified"),
            type: "callback",
            alignH: "right",
            wrap: "nowrap",
            callback: date => this.formatDate(date),
            sortable: true,
          },
          {
            name: "sdate",
            title: this.$gettext("Shared on"),
            type: "callback",
            alignH: "right",
            wrap: "nowrap",
            callback: date => this.formatDate(date),
            sortable: true,
          },
          {
            name: "ddate",
            title: this.$gettext("Deleted"),
            type: "callback",
            alignH: "right",
            wrap: "nowrap",
            callback: date => this.formatDate(date),
            sortable: true,
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
  },
  methods: {
    showDetails(resource) {
      /**
       * Triggered when the showDetails button in the actions column is clicked
       * @property {object} resource The resource for which the event is triggered
       */
      this.$emit("showDetails", resource)
    },

    formatDate(date) {
      return DateTime.fromJSDate(new Date(date)).toRelative()
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
      const users = resource.sharedWith.filter(u => !u.link)
      const links = resource.sharedWith.filter(u => !!u.link)
      let userList
      let linkList

      if (users.length) {
        userList = users.map(user => user.displayName).join(", ")
      }

      if (links.length) {
        linkList = links.map(link => link.name).join(", ")
      }

      if (resource.type === "folder") {
        if (userList && linkList) {
          return `${this.$gettext(
            "This folder is shared with the users"
          )} ${userList}. ${this.$gettext("and via the links")} ${linkList}.`
        } else if (users) {
          return `${this.$gettext("This folder is shared with the users")} ${userList}.`
        } else {
          return `${this.$gettext("This folder is shared via the links")} ${linkList}.`
        }
      }

      if (userList && linkList) {
        return `${this.$gettext("This file is shared with the users")} ${userList}. ${this.$gettext(
          "and via the links"
        )} ${linkList}.`
      } else if (users) {
        return `${this.$gettext("This file is shared with the users")} ${userList}.`
      } else {
        return `${this.$gettext("This file is shared via the links")} ${linkList}.`
      }
    },

    getOwnerAvatarDescription(resource) {
      const translated = this.$gettext('This %{ resourceType } is owned by %{ ownerName }')
      const resourceType = resource.type === 'folder' ? this.$gettext('folder') : this.$gettext('file')
      const description = this.$gettextInterpolate(translated, {
        resourceType,
        ownerName: resource.owner[0].displayName
      })

      return description
    }
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
</style>

<docs>
```vue
<template>
  <div>
    <oc-table-files :resources="resources" :highlighted="highlighted" disabled="notes" v-model="selected" class="oc-mb" @showDetails="highlightResource" @action="handleAction">
      <template v-slot:quickActions="props">
        <oc-button @click.stop variation="passive" appearance="raw" aria-label="Share with other people">
          <oc-icon name="group-add" />
        </oc-button>
        <oc-button @click.stop variation="passive" appearance="raw" aria-label="Create a public link">
          <oc-icon name="link-add" />
        </oc-button>
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
    selected: [],
    highlighted: 'forest'
  }),
  computed: {
    resources() {
      return [
        {
          id: "forest",
          name: "forest.jpg",
          path: "images/nature/forest.jpg",
          preview: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
          indicators: [],
          type: "file",
          size: "111000234",
          mdate: "Mon, 11 Jan 2021 14:34:04 GMT",
          opensInNewWindow: true
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
        }
      ]
    },
    indicators() {
      return [
        {
          id: 'files-sharing',
          label: "Shared with other people",
          visible: true,
          icon: 'group',
          accessibleDescription: 'This resource is shared via link',
          handler: (resource, indicatorId) => alert(`Resource: ${resource.name}, indicator: ${indicatorId}`)
        },
        {
          id: 'file-link',
          label: "Shared via link",
          visible: true,
          icon: 'link',
        }
      ]
    },
    selectedIds() {
      return this.selected.map(resource => resource.id)
    }
  },
  methods: {
    highlightResource(resource) {
      this.highlighted = resource.id
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
```vue
<template>
  <oc-table-files :resources="resources" :arePathsDisplayed="true" v-model="selected" />
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
          preview: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
          indicators: [],
          type: "file",
          sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
          sharedWith: this.sharedWith
        },
        {
          name: "notes.txt",
          path: "/Documents/notes.txt",
          icon: "text",
          indicators: [],
          type: "file",
          sdate: "Mon, 11 Jan 2021 14:34:04 GMT",
          sharedWith: this.sharedWithOverlapping
        },
        {
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
          avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
          id: "marie",
          username: "marie",
          displayName: "Marie",
          avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
          id: "john",
          username: "john",
          displayName: "John Richards Emperor of long names"
        }
      ]
    },
    sharedWithOverlapping() {
      return [
        {
          id: "bob",
          username: "bob",
          displayName: "Bob",
          avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
          id: "marie",
          username: "marie",
          displayName: "Marie",
          avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
          id: "john",
          username: "john",
          displayName: "John Richards Emperor of long names"
        },
        {
          id: "einstein",
          username: "einstein",
          displayName: "Einstein"
        }
      ]
    },
    sharedWithSingle() {
      return [
        {
          id: "bob",
          username: "bob",
          displayName: "Bob",
          avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        }
      ]
    }
  }
}
</script>
```

## Shared with me files table
```vue
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
          name: "forest.jpg",
          path: "images/nature/forest.jpg",
          preview: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
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
          return 'Accepted'

        case 1:
          return 'Pending'

        case 2:
          return 'Declined'
      }
    }
  }
}
</script>
```

## Trashbin files table
```vue
<template>
  <oc-table-files :resources="resources" :arePathsDisplayed="true" :arePreviewsDisplayed="false" v-model="selected" />
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
    },
  }
}
</script>
```

## With disabled actions
```vue
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
          preview: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
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
