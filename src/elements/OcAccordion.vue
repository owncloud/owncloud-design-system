<template>
  <ul class="oc-accordion">
    <!-- @slot Many oc-accordion-item elements  -->
    <slot />
  </ul>
</template>
<script>
export default {
  name: "oc-accordion",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Allow multiple items to be expanded at the same time. Defaults to `false`.
     */
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Set the ids of the expanded accordion items. Listens to changes and defaults to an empty array.
     * To be used when `multiple=true`.
     */
    expandedIds: {
      type: Array,
      required: false,
      default: () => [],
    },
    /**
     * Set the id of the expanded accordion item. Listens to changes and defaults to an empty string.
     * To be used when `multiple=false`.
     */
    expandedId: {
      type: String,
      required: false,
      default: "",
    },
    /**
     * Let the first accordion item be expanded on load. Defaults to `false`.
     * Will be ignored if non-empty `expandedId` or `expandedIds` is/are provided.
     */
    expandFirst: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  data() {
    return {
      expandedIdsInternal: []
    }
  },

  watch: {
    expandedIds(ids) {
      this.$_ocAccordion_updateExpandedIdsInternal(ids)
    },
    expandedId(id) {
      this.$_ocAccordion_updateExpandedIdsInternal(id ? [id] : [])
    },
    expandedIdsInternal(ids) {
      this.$children.forEach(child => {
        child.$data.expanded = ids.includes(child.$_ocAccordionItem_id)
      })
    }
  },

  mounted() {
    this.$_ocAccordion_init()
    this.$on("expand", id => this.$_ocAccordion_expandItem(id))
    this.$on("collapse", id => this.$_ocAccordion_collapseItem(id))
  },

  methods: {
    $_ocAccordion_init() {
      if (this.multiple) {
        if ((this.expandedIds === null || this.expandedIds.length === 0) && this.expandFirst && this.$children.length > 0) {
          this.$_ocAccordion_updateExpandedIdsInternal(this.$children[0].$_ocAccordionItem_id)
        } else {
          this.$_ocAccordion_updateExpandedIdsInternal(this.expandedIds)
        }
      } else {
        if ((this.expandedId === null || this.expandedId === "") && this.expandFirst && this.$children.length > 0) {
          this.$_ocAccordion_updateExpandedIdsInternal(this.$children[0].$_ocAccordionItem_id)
        } else {
          this.$_ocAccordion_updateExpandedIdsInternal(this.expandedId)
        }
      }
    },

    $_ocAccordion_updateExpandedIdsInternal(ids) {
      if (Array.isArray(ids)) {
        if (this.multiple) {
          this.expandedIdsInternal = ids
        } else {
          this.expandedIdsInternal = ids ? [ids[0]] : []
        }
      } else {
        this.expandedIdsInternal = ids ? [ids] : []
      }
    },

    $_ocAccordion_expandItem(id) {
      if (this.multiple) {
        this.expandedIdsInternal.push(id)
      } else {
        this.expandedIdsInternal = [id]
      }
    },

    $_ocAccordion_collapseItem(id) {
      this.expandedIdsInternal = this.expandedIdsInternal.filter(expandedId => expandedId !== id)
    },
  }
}
</script>
<docs>
An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.
The headings function as controls that enable users to reveal or hide their associated sections of content.
Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

The accordion component is using `oc-accordion-item` as its children.
To see documentation on how to use this component, see [oc-accordion-item](/#/Elements/oc-accordion-item).

```jsx
<oc-accordion :expand-first="true" :multiple="false" class="uk-width-1-2">
  <oc-accordion-item title="My accordion item" icon="folder">
    <p>
      I am the content of this accordion
    </p>
  </oc-accordion-item>
  <oc-accordion-item title="Something else with content" description="And a subtitle" icon="file">
      <p>Enter some text!</p>
      <oc-text-input label="Text"></oc-text-input>
  </oc-accordion-item>
</oc-accordion>
```
</docs>
