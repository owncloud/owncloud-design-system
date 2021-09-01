<template>
  <nav :class="`oc-breadcrumb oc-breadcrumb-${variation}`">
    <ol class="oc-breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="oc-breadcrumb-list-item">
        <router-link v-if="item.to" :aria-current="getAriaCurrent(index)" :to="item.to">
          {{ item.text }}
        </router-link>
        <oc-button
          v-else-if="item.onClick"
          :aria-current="getAriaCurrent(index)"
          appearance="raw"
          @click="item.onClick"
        >
          {{ item.text }}
        </oc-button>
        <span v-else :aria-current="getAriaCurrent(index)" tabindex="-1" v-text="item.text" />
      </li>
    </ol>
    <div class="oc-breadcrumb-drop">
      <label
        ref="mobileDropdown"
        tabindex="0"
        class="oc-breadcrumb-drop-label"
        @keydown.enter="$refs.mobileDropdown.click()"
      >
        <span
          v-if="currentFolder"
          class="oc-breadcrumb-drop-label-text"
          aria-current="page"
          v-text="currentFolder.text"
        />
        <oc-icon
          class="oc-breadcrumb-drop-label-icon"
          name="expand_more"
          :accessible-label="$gettext('Expand more')"
        />
      </label>
      <oc-drop v-if="dropdownItems" :options="{ offset: 20 }">
        <ol class="uk-nav uk-nav-default">
          <li v-for="(item, index) in dropdownItems" :key="index">
            <router-link v-if="item.to" :aria-current="getAriaCurrent(index)" :to="item.to">
              {{ item.text }}
            </router-link>
            <oc-button
              v-else-if="item.onClick"
              justify-content="left"
              appearance="raw"
              :aria-current="getAriaCurrent(index)"
              @click="item.onClick"
            >
              {{ item.text }}
            </oc-button>
            <span v-else :aria-current="getAriaCurrent(index)" v-text="item.text" />
          </li>
        </ol>
      </oc-drop>
    </div>
  </nav>
</template>

<script>
import OcButton from "./OcButton.vue"
import OcDrop from "./OcDrop.vue"
import OcIcon from "./OcIcon.vue"

/**
 * Displays a breadcrumb. Each item in the items property has the following elements:
 *
 *  - text: mandatory element, holds the text which is to be displayed in the breadcrumb
 *  - to: optional element, the vue router link
 */
export default {
  name: "OcBreadcrumb",
  status: "ready",
  release: "1.0.0",

  components: {
    OcDrop,
    OcIcon,
    OcButton,
  },

  props: {
    /**
     * Array of breadcrumb items
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     * Variation of breadcrumbs
     * Can be `default` or `lead`
     */
    variation: {
      type: String,
      required: false,
      default: "default",
      validator: value => value === "lead" || value === "default",
    },
  },
  computed: {
    dropdownItems() {
      if (this.items.length <= 1 || !this.items) return false

      return [...this.items].reverse().slice(1)
    },
    currentFolder() {
      if (this.items.length === 0 || !this.items) return false

      return [...this.items].reverse()[0]
    },
  },
  methods: {
    getAriaCurrent(index) {
      return this.items.length - 1 === index ? "page" : null
    },
  },
}
</script>

<style lang="scss">
.oc-breadcrumb {
  overflow: hidden;

  &-list {
    @extend .uk-visible\@s;
    @extend .uk-breadcrumb;
    @extend .oc-m-rm;

    > li button {
      display: inline;
    }

    > li a,
    > li button,
    > li span,
    > :nth-child(n + 2):not(.uk-first-column)::before {
      color: var(--oc-color-text-muted);
    }

    > :last-child > span {
      color: var(--oc-color-text-default);
    }

    > li a:hover,
    > li span:not([aria-current="page"]):hover,
    > li button:hover {
      color: var(--oc-color-swatch-primary-default);
    }
  }

  /* stylelint-disable */
  &-list-item {
    &::before,
    a,
    button,
    span {
      font-size: 1rem;
    }
  }

  /* stylelint-disable */
  &-lead &-list-item {
    &::before,
    a,
    button,
    span {
      font-size: var(--oc-font-size-large);
    }
  }
  /* stylelint-enable */

  &-drop {
    @extend .uk-hidden\@s;

    .uk-drop > .uk-card > .uk-nav-default {
      > li a,
      > li button,
      > li span {
        color: var(--oc-color-text-muted);
        font-size: 0.875rem;
      }

      > li a:hover,
      > li span:hover,
      > li button:hover {
        color: var(--oc-color-swatch-brand-default);
      }

      li button {
        padding-left: 20px;
        padding-right: 20px;
        width: 100%;
      }
    }

    &-label {
      @extend .uk-flex;
      @extend .uk-flex-middle;
      @extend .uk-flex-between;
      @extend .uk-background-default;

      border: $global-border-width solid var(--oc-color-swatch-primary-muted);
      cursor: pointer;
      height: $global-control-height;
      padding: var(--oc-space-small);

      &-text {
        @extend .uk-text-truncate;
      }
    }
  }
}
</style>

<docs>
```js
<template>
  <div>
    <oc-breadcrumb :items="items" class="oc-mb" />
    <oc-breadcrumb :items="items" variation="lead" />
  </div>
</template>
<script>
  export default {
    data: () => {
      return {
        items: [
          {text:'First folder',to:{path:'folder'}},
          {text:'Subfolder', onClick:() => alert('Breadcrumb clicked!')},
          {text:'Deep',to:{path:'folder'}},
          {text:'Deeper ellipsize in responsive mode'},
        ]
      }
    }
  }
</script>
```
</docs>
