<template>
  <li :id="$_ocAccordionItem_ref" class="oc-accordion-item">
    <h3 class="oc-accordion-title">
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
            <oc-icon v-if="icon" :name="icon" class="oc-mr-s" />
            <div class="uk-width-expand" v-text="title" />
            <oc-icon :key="`chevron-${$_ocAccordionItem_headerIconName}`" :name="$_ocAccordionItem_headerIconName" class="oc-ml-xs" size="large" />
          </oc-grid>
          <oc-grid v-if="description">
            <div v-if="icon" class="oc-icon-m oc-mr-s" />
            <div class="uk-text-meta">{{ description }}</div>
          </oc-grid>
        </div>
      </oc-button>
    </h3>
    <div v-if="expanded" class="oc-accordion-content" :id="$_ocAccordionItem_contentId">
      <slot />
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
    contentId: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null
    },
    expandedByDefault: {
      type: Boolean,
      required: false,
      default: false
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
