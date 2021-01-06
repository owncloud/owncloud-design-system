<template>
  <div class="oc-status-indicators">
    <template v-for="indicator in indicators">
      <oc-button
        v-if="hasHandler(indicator)"
        :key="indicator.id"
        :id="indicator.id"
        class="oc-status-indicators-indicator"
        :aria-label="indicator.label"
        :uk-tooltip="indicator.label"
        variation="raw"
        @click.stop="indicator.handler(resource, indicator.id)"
      >
        <oc-icon :name="indicator.icon" aria-hidden="true" variation="passive" />
      </oc-button>
      <oc-icon
        v-else
        tabindex="-1"
        class="oc-status-indicators-indicator"
        :id="indicator.id"
        :key="indicator.id"
        :name="indicator.icon"
        :aria-label="indicator.label"
        :uk-tooltip="indicator.label"
        variation="passive"
      />
    </template>
  </div>
</template>

<script>
import OcIcon from "./OcIcon.vue"
import OcButton from "./OcButton.vue"

/**
 * Status indicators which can be attatched to a resource
 */
export default {
  name: "oc-status-indicators",
  status: "review",
  release: "2.0.1",

  components: { OcIcon, OcButton },

  props: {
    /**
     * A resource to which the indicators are attatched to
     */
    resource: {
      type: Object,
      required: true,
    },
    /**
     * An array of indicators to be displayed. Indicator object has following properties:
     *
     * Required:
     * id: Id of the indicator
     * icon: Icon of the indicator
     * label: String to be used as a accessible label and tooltip for the indicator
     *
     * Optional:
     * handler: An action to be triggered when the indicator is clicked. Receives resource and indicator ID as arguments
     */
    indicators: {
      type: Array,
      required: true,
    },
  },

  methods: {
    hasHandler(indicator) {
      return Object.prototype.hasOwnProperty.call(indicator, "handler")
    },
  },
}
</script>

<style lang="scss" scoped>
.oc-status-indicators {
  align-items: center;
  display: flex;
}
</style>

<docs>
```vue
  <template>
    <oc-status-indicators :resource="resource" :indicators="indicators" />
  </template>
  <script>
    export default {
      data: () => ({
        resource: {
          name: "Documents",
          path: "/"
        },
        indicators: [
          {
            id: 'files-sharing',
            label: "Shared with other people",
            icon: 'group',
            handler: (resource, indicatorId) => alert(`Resource: ${resource.name}, indicator: ${indicatorId}`)
          },
          {
            id: 'file-link',
            label: "Shared via link",
            icon: 'link',
          }
        ]
      }),
    }
  </script>
```
</docs>
