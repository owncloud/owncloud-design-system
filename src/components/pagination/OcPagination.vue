<template>
  <nav class="oc-pagination" :aria-label="$gettext('Pagination')">
    <ol class="oc-pagination-list">
      <li v-if="isPrevPageAvailable" class="oc-pagination-list-item">
        <router-link
          class="oc-pagination-list-item-prev"
          :aria-label="$gettext('Go to the previous page')"
          :to="previousPageLink"
        >
          <oc-icon name="chevron_left" />
        </router-link>
      </li>
      <li v-for="(page, index) in displayedPages" :key="index" class="oc-pagination-list-item">
        <component
          :is="pageComponent(page)"
          :class="pageClass(page)"
          v-bind="bindPageProps(page)"
          v-text="page"
        />
      </li>
      <li v-if="isNextPageAvailable" class="oc-pagination-list-item">
        <router-link
          class="oc-pagination-list-item-next"
          :aria-label="$gettext('Go to the next page')"
          :to="nextPageLink"
        >
          <oc-icon name="chevron_right" />
        </router-link>
      </li>
      <li v-if="isGoToLinkVisible" class="oc-pagination-list-item-goto">
        <oc-text-input
          v-model="goToTarget"
          :label="$gettext('Go to')"
          class="oc-pagination-list-item-goto-input"
        />
        <component
          :is="goToLinkComponent"
          v-bind="goToLinkProps"
          class="oc-pagination-list-item-goto-link"
        >
          <oc-icon name="chevron_right" />
        </component>
      </li>
    </ol>
  </nav>
</template>

<script>
import OcIcon from "../OcIcon.vue"

/**
 * A list of links used for switching to different pages
 */
export default {
  name: "OcPagination",

  components: { OcIcon },

  props: {
    /**
     * Number of pages to be displayed
     */
    pages: {
      type: Number,
      required: true,
    },
    /**
     * Currently active page
     */
    currentPage: {
      type: Number,
      required: true,
    },
    /**
     * Number of pages to be displayed. Needs to be an even number.
     * Pages will be equaly split into two parts and remaining pages will be displayed as ellipsis
     */
    maxDisplayed: {
      type: Number,
      required: false,
      default: null,
      validator: value => {
        if (value % 2 === 0) {
          return true
        }

        // Since Vue doens't support custom validator error message, log the error manually
        console.error("maxDisplayed needs to be an even number")
      },
    },
    /**
     * Current route which is used to render pages
     */
    currentRoute: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    goToTarget: "",
  }),

  computed: {
    displayedPages() {
      if (this.maxDisplayed && this.maxDisplayed < this.pages) {
        let pages = []

        for (let i = 0; i < this.pages; i++) {
          pages.push(i + 1)
        }

        const pagesRight =
          this.$_currentPage === this.pages
            ? []
            : pages.slice(this.$_currentPage, this.$_currentPage + this.maxDisplayed / 2)
        const pagesLeft =
          this.$_currentPage === 1
            ? []
            : pages.slice(this.$_currentPage - 1 - this.maxDisplayed / 2, this.$_currentPage - 1)

        pages = [...pagesLeft, this.$_currentPage, ...pagesRight]

        if (this.$_currentPage > 2) {
          pages[0] > 2 ? pages.unshift(1, "...") : pages.unshift(1)
        }

        if (this.$_currentPage < this.pages - 1) {
          pages[pages.length - 1] < this.pages - 1
            ? pages.push("...", this.pages)
            : pages.push(this.pages)
        }

        return pages
      }

      return this.pages
    },

    isPrevPageAvailable() {
      return this.$_currentPage > 1
    },

    isNextPageAvailable() {
      return this.pages < this.$_currentPage
    },

    previousPageLink() {
      return this.bindPageLink(this.$_currentPage - 1)
    },

    nextPageLink() {
      return this.bindPageLink(this.$_currentPage + 1)
    },

    isGoToLinkVisible() {
      if (this.maxDisplayed) {
        return this.displayedPages.includes("...")
      }

      return false
    },

    goToLinkComponent() {
      if (this.goToTarget === "") {
        return "span"
      }

      return "router-link"
    },

    goToLinkProps() {
      if (this.goToTarget === "") {
        return { "aria-hidden": true }
      }

      return {
        "aria-label": this.$gettext("Go"),
        to: this.bindPageLink(this.goToTarget),
      }
    },

    $_currentPage() {
      return Math.min(this.currentPage, this.pages)
    },
  },

  methods: {
    pageLabel(page) {
      const translated = this.$gettext("Go to page %{ page }")

      return this.$gettextInterpolate(translated, { page })
    },

    isCurrentPage(page) {
      return this.$_currentPage === page
    },

    pageComponent(page) {
      return page === "..." || this.isCurrentPage(page) ? "span" : "router-link"
    },

    bindPageProps(page) {
      if (page === "...") {
        return
      }

      if (this.isCurrentPage(page)) {
        return {
          "aria-current": "page",
        }
      }

      const link = this.bindPageLink(page)

      return {
        "aria-label": this.pageLabel(page),
        to: link,
      }
    },

    pageClass(page) {
      const classes = ["oc-pagination-list-item-page"]

      if (this.isCurrentPage(page)) {
        classes.push("oc-pagination-list-item-current")
      } else if (page === "...") {
        classes.push("oc-pagination-list-item-ellipsis")
      } else {
        classes.push("oc-pagination-list-item-link")
      }

      return classes
    },

    bindPageLink(page) {
      return {
        name: this.currentRoute.name,
        query: this.currentRoute.query,
        params: {
          ...this.currentRoute.params,
          page,
        },
      }
    },
  },
}
</script>

<style lang="scss">
.oc-pagination {
  &-list {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--oc-space-small);
    list-style: none;
    margin: 0;

    &-item {
      &-page {
        border-radius: 4px;
        color: var(--oc-color-swatch-brand-default);
        padding: var(--oc-space-xsmall) var(--oc-space-small);
        transition: background-color $transition-duration-short ease-in-out;

        &:not(span):hover,
        &:not(span):focus {
          background-color: var(--oc-color-swatch-brand-default);
          color: var(--oc-color-text-inverse);
          text-decoration: none;
        }
      }

      &-current {
        background-color: var(--oc-color-swatch-brand-default);
        color: var(--oc-color-text-inverse);
        font-weight: bold;
      }

      &-prev,
      &-next {
        display: flex;

        > .oc-icon > svg {
          fill: var(--oc-color-swatch-brand-default);
        }
      }

      &-prev {
        margin-right: var(--oc-space-small);
      }

      &-next {
        margin-left: var(--oc-space-small);
      }

      &-goto {
        margin-left: var(--oc-space-small);
        position: relative;

        &-input {
          align-items: center;
          display: flex;
          flex-wrap: nowrap;
          gap: var(--oc-space-small);

          .oc-text-input {
            padding: 0 var(--oc-size-icon-default) 0 var(--oc-space-small);
            width: calc(
              var(--oc-space-small) + var(--oc-space-large) + var(--oc-size-icon-default)
            );
          }
        }

        &-link {
          align-items: center;
          display: flex;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);

          > .oc-icon > svg {
            fill: var(--oc-color-swatch-brand-default);
          }

          &:not(a) > .oc-icon > svg {
            fill: var(--oc-color-input-text-muted);
          }
        }
      }
    }
  }
}
</style>

<docs>
## Examples
```vue
<div>
    <oc-pagination :pages="3" :currentPage="3" currentRoute="/files" />
    <oc-pagination :pages="4" :currentPage="1" currentRoute="/files" />
    <oc-pagination :pages="5" :currentPage="3" currentRoute="/files" />
</div>
```

### Truncate visible pages with ellipsis
If the current page is close enough to the first or/and last page and ellipsis would hide only 1 page, ellipsis will be omitted and the actual page will be still displayed instead.

```vue
<div>
    <oc-pagination :pages="5" :currentPage="3" :maxDisplayed="2" currentRoute="/files" />
    <oc-pagination :pages="10" :currentPage="3" :maxDisplayed="2" currentRoute="/files" />
    <oc-pagination :pages="54" :currentPage="28" :maxDisplayed="2" currentRoute="/files" />
    <oc-pagination :pages="54" :currentPage="51" :maxDisplayed="4" currentRoute="/files" />
</div>
```
</docs>
