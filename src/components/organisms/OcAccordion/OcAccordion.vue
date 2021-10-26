<template>
  <div class="oc-accordion">
    <!-- @slot Many oc-accordion-item elements  -->
    <slot />
  </div>
</template>

<script>
import OcAccordionItem from "../../molecules/OcAccordionItem/OcAccordionItem.vue"

/**
 *
 * An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.
 * The headings function as controls that enable users to reveal or hide their associated sections of content.
 * Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.
 *
 * The accordion component is using `oc-accordion-item` as its children.
 * To see documentation on how to use this component, see [oc-accordion-item](/#/oC%20Components/oc-accordion-item).
 */

export default {
  name: "OcAccordion",
  // eslint-disable-next-line vue/no-unused-components
  components: { OcAccordionItem },
  status: "ready",
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
    },
  },

  data() {
    return {
      expandedIdsInternal: [],
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
        child.$data.expanded = ids.includes(child.id)
      })
    },
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
        if (
          (this.expandedIds === null || this.expandedIds.length === 0) &&
          this.expandFirst &&
          this.$children.length > 0
        ) {
          this.$_ocAccordion_updateExpandedIdsInternal(this.$children[0].id)
        } else {
          this.$_ocAccordion_updateExpandedIdsInternal(this.expandedIds)
        }
      } else {
        if (
          (this.expandedId === null || this.expandedId === "") &&
          this.expandFirst &&
          this.$children.length > 0
        ) {
          this.$_ocAccordion_updateExpandedIdsInternal(this.$children[0].id)
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
  },
}
</script>

<style lang="scss">
.oc-accordion {
  padding: 0;

  &-item + &-item {
    margin-top: var(--oc-space-medium);
  }

  &-title {
    @extend .oc-mb-rm;

    display: block;
    font-size: var(--oc-font-size-medium);

    &-arrow-icon {
      position: absolute;
      right: 0;
    }

    > .oc-button.oc-button-passive-raw,
    > .oc-button.oc-button-passive-raw:hover,
    > .oc-button.oc-button-passive-raw:focus {
      color: var(--oc-color-text-default);
      position: relative;
      text-decoration: none;

      .oc-icon {
        transition-duration: 0.3s;

        &.rotate {
          transform: rotate(180deg);
        }

        > svg {
          fill: var(--oc-color-text-default);
        }
      }
    }
  }

  &-content {
    margin-top: var(--oc-space-small);
  }
}
</style>
