<template>
  <div class="oc-resource">
    <oc-img
      v-if="hasPreview"
      :src="resource.preview"
      class="oc-resource-preview"
      aria-hidden="true"
      width="40"
      height="40"
    />
    <oc-icon v-else :name="resource.icon" variation="file-type" size="large" aria-hidden="true" />
    <div class="oc-resource-details">
      <component
        v-if="isResourceClickable"
        :is="componentType"
        v-bind="componentProps"
        @click.stop="emitClick"
      >
        <oc-resource-name :full-path="resource.path" :is-path-displayed="isPathDisplayed" />
      </component>
      <oc-resource-name v-else :full-path="resource.path" :is-path-displayed="isPathDisplayed" />
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
  name: "oc-resource",
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
     * Target route path used to build the link when navigating into a resource
     */
    targetRoute: {
      type: String,
      required: false,
      default: "",
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
      return this.isPreviewDisplayed && this.resource.preview
    },

    componentType() {
      return this.isFolder ? "router-link" : "oc-button"
    },

    isRouterLink() {
      return this.isResourceClickable && this.isFolder
    },

    componentProps() {
      if (!this.isRouterLink) {
        return {
          variation: "raw",
          gapSize: "none",
        }
      }

      return {
        to: { path: this.targetRoute, params: { item: this.resource.path } },
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

<style lang="scss" scoped>
.oc-resource {
  align-items: center;
  display: flex;
  justify-content: flex-start;

  &-preview {
    border-radius: 2px;
    height: $icons-size-default * 1.5;
    object-fit: cover;
    width: $icons-size-default * 1.5;
  }

  &-details {
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
        <oc-resource :resource="documents" targetRoute="/home" class="oc-mb" />
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
            path: "/Documents/notes.txt",
            icon: "text",
            indicators: this.indicators,
            type: "file"
          }
        },
        forest() {
          return {
            name: "forest.jpg",
            path: "images/nature/forest.jpg",
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
        }
      },
    }
  </script>
  ```
</docs>
