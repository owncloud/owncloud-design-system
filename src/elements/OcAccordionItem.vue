<template>
  <li :id="$_ocAccordionItem_ref" class="oc-accordion-item">
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
            <oc-icon :key="`chevron-${$_ocAccordionItem_headerIconName}`" :name="$_ocAccordionItem_headerIconName" class="oc-ml-xs" size="large" />
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
     * Id of the content of the accordion item. If not specified, unique id will be generated.
     */
    contentId: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Icon to be displayed on the left side of the accordion title
     */
    icon: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Title to be displayed
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Description of the accordion item to be displayed below the accordion title
     */
    description: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Asserts whether the accordion item should be expanded by default
     */
    expandedByDefault: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Id of the accordion title
     */
    titleId: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Heading level of the accordion title
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
    $_ocAccordionItem_headerIconName() {
      return this.expanded ? "expand_less" : "expand_more"
    },
    $_ocAccordionItem_ref() {
      return _uniqueId("oc-accordion-ref-")
    },
    $_ocAccordionItem_contentId() {
      return this.contentId || _uniqueId("oc-accordion-content-")
    },
    $_ocAccordionItem_titleId() {
      return this.titleId || _uniqueId("oc-accordion-title-")
    }
  },
  mounted() {
    this.expanded = this.expandedByDefault
  },
  methods: {
    $_ocAccordionItem_toggleExpanded() {
      this.$parent.$emit("toggle", this.$_ocAccordionItem_ref)
    }
  }
}
</script>
