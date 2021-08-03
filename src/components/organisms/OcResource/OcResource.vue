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
    <oc-icon
      v-else
      key="resource-icon"
      :variation="isFolder ? 'passive' : 'primary'"
      :name="resource.icon"
      size="large"
    />
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
      <div v-if="resource.indicators.length > 0" class="oc-resource-indicators">
        <oc-status-indicators :resource="resource" :indicators="resource.indicators" />
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

    a:hover,
    a:focus {
      outline-offset: 0;
      text-decoration: none;
    }
  }

  &-indicators {
    display: flex;
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
