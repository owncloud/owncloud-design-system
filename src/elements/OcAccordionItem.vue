<template>
  <li :id="$_ocAccordionItem_id" class="oc-accordion-item">
    <component :is="'h' + headingLevel" :id="$_ocAccordionItem_titleId" class="oc-accordion-title">
      <oc-button
        variation="raw"
        justify-content="space-between"
        class="uk-text-left uk-width-1-1"
        :aria-expanded="expanded"
        :aria-controls="$_ocAccordionItem_contentId"
        @click="$_ocAccordionItem_toggleExpanded"
        @keydown.space="$_ocAccordionItem_toggleExpanded"
        @keydown.enter="$_ocAccordionItem_toggleExpanded"
      >
        <div class="uk-width-1-1">
          <oc-grid flex>
            <oc-icon v-if="icon" :name="icon" class="oc-mr-s" aria-hidden="true" />
            <div class="uk-width-expand" v-text="title" />
            <oc-icon name="expand_more" class="oc-ml-xs" :class="{'rotate': expanded}" size="large" />
          </oc-grid>
          <oc-grid v-if="description">
            <div v-if="icon" class="oc-icon-m oc-mr-s" />
            <div class="uk-text-meta">{{ description }}</div>
          </oc-grid>
        </div>
      </oc-button>
    </component>
    <div class="oc-accordion-content" :aria-labelledby="$_ocAccordionItem_titleId" :id="$_ocAccordionItem_contentId" role="region">
      <!-- @slot Content of the accordion item -->
      <slot v-if="expanded" />
    </div>
  </li>
</template>
<script>
import * as _uniqueId from "../utils/uniqueId"
export default {
  name: "oc-accordion-item",
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
      default: null
    },
    /**
     * Asserts whether the accordion item should be expanded by default. If the accordion doesn't allow multiple items
     * to be expanded, but multiple items have only the first one to be found will actually be expanded.
     */
    expandedByDefault: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Id of the accordion item. If not specified, a unique id will be generated.
     */
    id: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Id of the accordion title. If not specified, a unique id will be generated.
     */
    titleId: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Id of the content of the accordion item. If not specified, a unique id will be generated.
     */
    contentId: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Heading level of the accordion title. Defaults to 3 (i.e. `h3`).
     */
    headingLevel: {
      type: String,
      required: false,
      default: "3"
    }
  },
  data: () => ({
    expanded: false
  }),
  computed: {
    $_ocAccordionItem_id() {
      return this.id || _uniqueId("oc-accordion-id-")
    },
    $_ocAccordionItem_titleId() {
      return this.titleId || _uniqueId("oc-accordion-title-")
    },
    $_ocAccordionItem_contentId() {
      return this.contentId || _uniqueId("oc-accordion-content-")
    },
  },
  mounted() {
    this.expanded = this.expandedByDefault
  },
  methods: {
    $_ocAccordionItem_toggleExpanded() {
      this.$parent.$emit("toggle", this.$_ocAccordionItem_id)
    }
  }
}
</script>
