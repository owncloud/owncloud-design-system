<template>
  <ul class="oc-accordion">
    <!-- @slot Many oc-accordion-item elements  -->
    <slot />
  </ul>
</template>
<script>
import OcAccordionItem from "./OcAccordionItem"
export default {
  name: "oc-accordion",
  components: { OcAccordionItem },
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
    },
    /**
     * Decide if the accordion should be used with clicks or via the `expandedIds`/`expandedId` property.
     * Defaults to `click`.
     */
    mode: {
      type: String,
      required: false,
      default: "click",
      validator: value => {
        return value.match(/(click|data)/)
      },
    }
  },

  data() {
    return {
      expandedIdsInternal: []
    }
  },

  watch: {
    expandedIds(ids) {
      if (this.mode === "data") {
        this.$_ocAccordion_updateExpandedIdsInternal(ids)
      }
    },
    expandedId(id) {
      if (this.mode === "data") {
        this.$_ocAccordion_updateExpandedIdsInternal(id ? [id] : [])
      }
    },
    expandedIdsInternal(ids) {
      this.$children.forEach(child => {
        child.$data.expanded = ids.includes(child.$_ocAccordionItem_id)
      })
    }
  },

  mounted() {
    this.$_ocAccordion_init()
    if (this.mode === "click") {
      this.$on("expand", id => this.$_ocAccordion_expandItem(id))
      this.$on("collapse", id => this.$_ocAccordion_collapseItem(id))
    }
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
To see documentation on how to use this component, see [oc-accordion-item](/#/oC%20Components/oc-accordion-item).

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

The expanded/collapsed state of accordion items can be controlled by setting `ids` for the oc-accordion-items and then
utilizing the property `expanded-id` in case of `multiple=false` or `expanded-ids` in case of `multiple=true` of
oc-accordion. The accordion component watches these properties, so it can be for external collapse/expand triggers.
Try the buttons below to show/hide the accordion items. In case you want to react on clicks on the accordion items,
you need to listen to the `expand` and `collapse` events, which are emitted on the oc-accordion.

```jsx
<template>
  <div>
    <oc-grid gutter="small" class="oc-my">
      <div><oc-button size="small" @click="toggleItem(FIRST)">Toggle first</oc-button></div>
      <div><oc-button size="small" @click="toggleItem(SECOND)">Toggle second</oc-button></div>
      <div><oc-button size="small" @click="toggleItem(THIRD)">Toggle third</oc-button></div>
      <div><oc-button variation="primary" size="small" @click="expandAll()">Expand all</oc-button></div>
      <div><oc-button variation="danger" size="small" @click="collapseAll()">Collapse all</oc-button></div>
    </oc-grid>
    <div>
      <oc-accordion :expanded-ids="expandedIds" :multiple="true" mode="data" class="uk-width-1-2">
        <oc-accordion-item :id="FIRST" icon="filter_1" title="First accordion item">
          <p>Hello there.</p>
        </oc-accordion-item>
        <oc-accordion-item :id="SECOND" icon="filter_2" title="Second accordion item">
          <p>Hello here.</p>
        </oc-accordion-item>
        <oc-accordion-item :id="THIRD" icon="filter_3" title="Third accordion item">
          <p>Hello world.</p>
        </oc-accordion-item>
      </oc-accordion>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        expandedIds: [],
        FIRST: "first",
        SECOND: "second",
        THIRD: "third"
      }
    },
    methods: {
      toggleItem(id) {
        if (this.expandedIds.includes(id)) {
          this.expandedIds = this.expandedIds.filter(a => a !== id)
        } else {
          this.expandedIds.push(id)
        }
      },
      expandAll() {
        this.expandedIds = [this.FIRST, this.SECOND, this.THIRD]
      },
      collapseAll() {
        this.expandedIds = []
      }
    }
  }
</script>
```
</docs>
