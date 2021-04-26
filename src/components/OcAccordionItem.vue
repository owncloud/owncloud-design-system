<template>
  <div :id="id" class="oc-accordion-item">
    <component :is="'h' + headingLevel" :id="titleId" class="oc-accordion-title">
      <oc-button
        appearance="raw"
        justify-content="space-between"
        class="uk-text-left uk-width-1-1"
        :aria-expanded="expanded.toString()"
        :aria-controls="contentId"
        @click="toggleExpanded"
        @keydown.space="toggleExpanded"
        @keydown.enter="toggleExpanded"
      >
        <span class="uk-width-1-1">
          <span class="uk-flex uk-flex-middle">
            <oc-icon v-if="icon" :name="icon" class="oc-mr-s" />
            <span class="uk-width-expand" v-text="title" />
            <span class="oc-ml-xs oc-icon-l">
              <oc-icon
                name="expand_more"
                class="oc-accordion-title-arrow-icon"
                :class="{ rotate: expanded }"
                size="large"
                :accessible-label="expandIconLabel"
              />
            </span>
          </span>
          <span v-if="description">
            <span v-if="icon" class="oc-icon-m oc-mr-s" />
            <span class="oc-text-muted">{{ description }}</span>
          </span>
        </span>
      </oc-button>
    </component>
    <div :id="contentId" class="oc-accordion-content" :aria-labelledby="titleId" role="region">
      <!-- @slot Content of the accordion item -->
      <slot v-if="expanded" />
    </div>
  </div>
</template>
<script>
import uniqueId from "../utils/uniqueId"
export default {
  name: "OcAccordionItem",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Icon to be displayed on the left side of the accordion title.
     */
    icon: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Title to be displayed.
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Description of the accordion item to be displayed below the accordion title.
     */
    description: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Id of the accordion item. If not specified, a unique id will be generated.
     * If the expanded items are supposed to be controlled via `expandedIds` or `expandedId` on the
     * wrapping accordion element, the `id` must be provided.
     */
    id: {
      type: String,
      required: false,
      default: () => uniqueId("oc-accordion-id-"),
    },
    /**
     * Id of the accordion title. If not specified, a unique id will be generated.
     */
    titleId: {
      type: String,
      required: false,
      default: () => uniqueId("oc-accordion-title-"),
    },
    /**
     * Id of the content of the accordion item. If not specified, a unique id will be generated.
     */
    contentId: {
      type: String,
      required: false,
      default: () => uniqueId("oc-accordion-content-"),
    },
    /**
     * Heading level of the accordion title. Defaults to 3 (i.e. `h3`).
     */
    headingLevel: {
      type: String,
      required: false,
      default: "3",
    },
  },
  data: () => ({
    expanded: false,
  }),
  computed: {
    expandIconLabel() {
      if (this.expanded) {
        return this.$gettext("Click to collapse content")
      }
      return this.$gettext("Click to expand content")
    },
  },
  methods: {
    toggleExpanded() {
      if (this.expanded) {
        this.$parent.$emit("collapse", this.id)
      } else {
        this.$parent.$emit("expand", this.id)
      }
    },
  },
}
</script>
