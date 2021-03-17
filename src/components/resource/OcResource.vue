<template>
  <div class="oc-resource oc-text-overflow">
    <oc-img
      v-if="hasPreview"
      :key="preview"
      :src="preview"
      class="oc-resource-preview"
      aria-hidden="true"
      width="40"
      height="40"
    />
    <oc-icon
      v-else
      key="resource-icon"
      :name="resource.icon"
      variation="passive"
      size="large"
      aria-hidden="true"
    />
    <div class="oc-resource-details oc-text-overflow">
      <component
        :is="componentType"
        v-bind="componentProps"
        v-if="isResourceClickable"
        class="oc-text-overflow"
        @click.stop="emitClick"
        @click.native.stop
      >
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
import OcButton from "../OcButton.vue"
import OcImg from "../OcImage.vue"
import OcStatusIndicators from "../OcStatusIndicators.vue"
import OcIcon from "../OcIcon.vue"
import OcResourceName from "./OcResourceName.vue"

/**
 * Displays a resource together with the resource type icon or preview
 */
export default {
  name: "OcResource",
  status: "review",
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
     * Asserts whether the resource preview should be displayed
     */
    isPreviewDisplayed: {
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

    hasPreview() {
      return (
        this.isPreviewDisplayed && Object.prototype.hasOwnProperty.call(this.resource, "preview")
      )
    },

    preview() {
      return this.resource.preview
    },

    // broken due to recent button change (displays grey background around ressource name if button)
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

  &-preview {
    border-radius: 2px;
    object-fit: cover;
    height: $icons-size-default * 1.5;
    max-height: $icons-size-default * 1.5;
    width: $icons-size-default * 1.5;
    max-width: $icons-size-default * 1.5;
  }

  &-details {
    display: block;
    padding-left: $space-small;

    a:hover,
    a:focus {
      text-decoration: none;
    }
  }

  &-indicators {
    display: flex;
  }
}
</style>

<docs>
  ```vue
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
            preview: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
            indicators: [],
            type: "file"
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
