<template>
  <div class="oc-resource oc-text-overflow">
    <oc-img
      v-if="hasThumbnail"
      :key="thumbnail"
      :src="thumbnail"
      class="oc-resource-thumbnail"
      width="40"
      height="40"
    />
    <oc-icon v-else key="resource-icon" :name="resource.icon" size="large" />
    <div class="oc-resource-details oc-text-overflow">
      <component
        :is="componentType"
        v-bind="componentProps"
        v-if="isResourceClickable"
        :target="linkTargetBlank"
        :aria-describedby="opensInNewWindowDescriptionId"
        class="oc-text-overflow"
        @click.stop="emitClick"
        @click.native.stop
      >
        <span
          v-if="opensInNewWindowDescriptionId"
          :id="opensInNewWindowDescriptionId"
          class="oc-invisible-sr"
          v-text="$gettext('Opens in a new window')"
        />
        <oc-resource-name
          :key="resource.name"
          :name="resource.name"
          :extension="resource.extension"
          :type="resource.type"
          :full-path="resource.path"
          :is-path-displayed="isPathDisplayed"
        />
      </component>
      <oc-resource-name
        v-else
        :name="resource.name"
        :extension="resource.extension"
        :type="resource.type"
        :full-path="resource.path"
        :is-path-displayed="isPathDisplayed"
      />
      <div class="oc-resource-indicators">
        <component
          :is="parentFolderComponentType"
          :to="parentFolderLinkPath"
          :style="parentFolderStyle"
          v-if="isPathDisplayed"
          class="parent-folder"
        >
          <oc-icon name="folder-2" size="small" fill-type="line" />
          <span class="text" v-text="parentFolder" />
        </component>
        <oc-status-indicators
          v-if="resource.indicators.length"
          :resource="resource"
          :indicators="resource.indicators"
        />
      </div>
    </div>
  </div>
</template>
<script>
import OcButton from "../../atoms/OcButton/OcButton.vue"
import OcImg from "../../atoms/OcImage/OcImage.vue"
import OcStatusIndicators from "../../molecules/OcStatusIndicators/OcStatusIndicators.vue"
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import OcResourceName from "../../atoms/OcResourceName/OcResourceName.vue"
import uniqueId from "../../../utils/uniqueId"
import * as path from "path"

/**
 * Displays a resource together with the resource type icon or thumbnail
 */
export default {
  name: "OcResource",
  status: "ready",
  release: "2.1.0",
  components: { OcButton, OcImg, OcStatusIndicators, OcIcon, OcResourceName },
  props: {
    /**
     * The resource to be displayed
     */
    resource: {
      type: Object,
      required: true,
    },
    /**
     * Asserts whether the resource path should be displayed
     */
    isPathDisplayed: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Asserts whether the resource thumbnail should be displayed
     */
    isThumbnailDisplayed: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * Target route object used to build the link when navigating into a resource.
     * @values { name, query }
     */
    targetRoute: {
      type: Object,
      required: false,
      default: null,
      validator: value => {
        if (value === null) {
          return true
        }

        if (!Object.prototype.hasOwnProperty.call(value, "name")) {
          console.error("Target route needs to have a route name")

          return false
        }

        if (typeof value.name !== "string") {
          console.error("Target route name needs to be of type String")

          return false
        }

        if (
          Object.prototype.hasOwnProperty.call(value, "query") &&
          typeof value.query !== "object"
        ) {
          console.error("Target route query needs to be of type Object")

          return false
        }

        return true
      },
    },
    /**
     * Asserts whether clicking on the resource name triggers any action
     */
    isResourceClickable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    parentFolderComponentType() {
      return this.targetRoute !== null ? "router-link" : "span"
    },

    parentFolder() {
      const folder = path.basename(path.dirname(this.resource.path)).replace(".", "")
      return folder !== "" ? folder : this.$gettext("All Files and Folders")
    },

    parentFolderStyle() {
      const hasLinkTarget = this.targetRoute !== null
      return {
        cursor: hasLinkTarget ? "pointer" : "default",
      }
    },

    parentFolderLinkPath() {
      if (this.targetRoute === null) {
        return {}
      }
      return {
        name: this.targetRoute.name,
        query: this.targetRoute.query,
        params: {
          item: path.dirname(this.resource.path),
          ...this.targetRoute.params,
        },
      }
    },

    isFolder() {
      return this.resource.type === "folder"
    },

    hasThumbnail() {
      return (
        this.isThumbnailDisplayed &&
        Object.prototype.hasOwnProperty.call(this.resource, "thumbnail")
      )
    },

    thumbnail() {
      return this.resource.thumbnail
    },

    componentType() {
      return this.isFolder ? "router-link" : "oc-button"
    },

    isRouterLink() {
      return this.isResourceClickable && this.isFolder
    },

    folderLink() {
      if (this.targetRoute === null) {
        return null
      }

      const path = this.resource.path.replace(/^\//, "")

      return {
        name: this.targetRoute.name,
        query: this.targetRoute.query,
        params: {
          item: path,
          ...this.targetRoute.params,
        },
      }
    },

    componentProps() {
      if (!this.isRouterLink) {
        return {
          appearance: "raw",
          gapSize: "none",
          justifyContent: "left",
        }
      }

      return {
        to: this.folderLink,
      }
    },

    opensInNewWindowDescriptionId() {
      if (this.resource.opensInNewWindow) {
        return uniqueId("oc-link-description-")
      }

      return null
    },

    linkTargetBlank() {
      if (this.isRouterLink && this.resource.opensInNewWindow) {
        return "_blank"
      }

      return null
    },
  },

  methods: {
    emitClick() {
      if (this.isFolder) {
        return
      }

      /**
       * Triggered when the resource is a file and the name is clicked
       */
      this.$emit("click")
    },
  },
}
</script>

<style lang="scss">
.oc-resource {
  align-items: center;
  display: flex;
  justify-content: flex-start;

  &-thumbnail {
    border-radius: 2px;
    object-fit: cover;
    height: $oc-size-icon-default * 1.5;
    max-height: $oc-size-icon-default * 1.5;
    width: $oc-size-icon-default * 1.5;
    max-width: $oc-size-icon-default * 1.5;
  }

  &-details {
    display: block;
    padding-left: var(--oc-space-small);

    a {
      text-decoration: none;
    }
    a:hover,
    a:focus {
      outline-offset: 0;
    }
  }

  &-indicators {
    display: flex;

    .parent-folder {
      display: flex;
      align-items: center;

      padding: 0 2px 0 2px;
      margin: 0 8px 0 -2px;

      .oc-icon {
        padding-right: 3px;
      }

      .text {
        font-size: 0.8125rem;
        color: var(--oc-color-text-muted);
      }

      &:hover {
        background-color: var(--oc-color-input-bg);
        border-radius: 2px;
      }
    }
  }
}
</style>

<docs>
  ```js
    <template>
      <div>
        <oc-resource :resource="documents" :targetRoute="targetRoute" class="oc-mb" />
        <oc-resource :resource="notes" :isPathDisplayed="true" class="oc-mb" />
        <oc-resource :resource="notes" :isResourceClickable="false" class="oc-mb" />
        <oc-resource :resource="forest" :isPathDisplayed="true" />
      </div>
    </template>
    <script>
    export default {
      computed: {
        documents() {
          return {
            name: "Documents",
            path: "/Documents",
            icon: "folder",
            indicators: [],
            type: "folder"
          }
        },
        notes() {
          return {
            name: "notes.txt",
            extension: "txt",
            path: "Documents/notes.txt",
            icon: "text",
            indicators: this.indicators,
            type: "file"
          }
        },
        forest() {
          return {
            name: "forest-image-with-filename-with-a-lot-of-characters.jpg",
            extension: "jpg",
            path: "images/nature/forest-image-with-filename-with-a-lot-of-characters.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file",
            opensInNewWindow: true,
          }
        },
        indicators() {
          return [
            {
              id: 'files-sharing',
              label: "Shared with other people",
              visible: true,
              icon: 'group',
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
        targetRoute() {
          return {
            name: "home",
            params: {
              action: "copy"
            },
            query: {
              resource: "notes"
            }
          }
        }
      },
    }
  </script>
  ```
</docs>
