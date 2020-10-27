<template>
  <li :id="$_ocAccordionItem_ref">
    <h3 class="oc-accordion-title">
      <oc-button
          variation="raw"
          justify-content="space-between"
          :aria-expanded="expanded"
          :aria-controls="$_ocAccordionItem_contentId"
          @click="$_ocAccordionItem_toggleExpanded"
          @keydown.space="$_ocAccordionItem_toggleExpanded"
          @keydown.enter="$_ocAccordionItem_toggleExpanded"
      >
        <oc-grid>
          <div v-if="icon">
            <oc-icon name="icon" />
          </div>
          <div>
            <div>{{ title }}</div>
            <div v-if="description" class="uk-text-meta">{{ description }}</div>
          </div>
        </oc-grid>
        <oc-icon :key="`chevron-${$_ocAccordionItem_headerIconName}`" :name="$_ocAccordionItem_headerIconName" />
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
    expanded: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null
    }
  },
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
  methods: {
    $_ocAccordionItem_toggleExpanded() {
      this.$parent.$emit("toggle", this.$_ocAccordionItem_ref)
    }
  }
}
</script>
