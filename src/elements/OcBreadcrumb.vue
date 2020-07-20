<template>
  <div :class="`oc-breadcrumb oc-breadcrumb-${variation}`">
    <ul class="oc-breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="oc-breadcrumb-list-item">
        <router-link v-if="home && index === 0" :to="item.to" class="uk-flex"
          ><oc-icon name="home"
        /></router-link>
        <router-link v-else-if="item.to" :to="item.to">{{ item.text }}</router-link>
        <a v-else-if="item.onClick" @click="item.onClick">{{ item.text }}</a>
        <span v-else v-text="item.text" />
      </li>
    </ul>
    <div class="oc-breadcrumb-drop">
      <label class="oc-breadcrumb-drop-label" @click="$_ocBreadcrumb_toggleDropdown">
        <span
          v-if="$_ocBreadcrumb_currentFolder"
          class="oc-breadcrumb-drop-label-text"
          v-text="$_ocBreadcrumb_currentFolder.text"
        />
        <oc-icon class="oc-breadcrumb-drop-label-icon" name="expand_more" />
      </label>
      <oc-drop
        v-if="$_ocBreadcrumb_dropdownItems && isDropdownVisible"
        id="oc-breadcrumb-mobile-drop"
        class="uk-padding-small"
        boundary=".oc-breadcrumb-drop"
        position="bottom"
        :match-parent-width="true"
        role="menu"
      >
        <ul class="uk-nav uk-nav-default">
          <li v-for="(item, index) in $_ocBreadcrumb_dropdownItems" :key="index">
            <router-link v-if="item.to" :to="item.to">{{ item.text }}</router-link>
            <a v-else-if="item.onClick" @click="item.onClick">{{ item.text }}</a>
            <span v-else v-text="item.text" />
          </li>
        </ul>
      </oc-drop>
    </div>
  </div>
</template>

<script>
import OcDrop from "./OCDrop.vue"
import OcIcon from "./OcIcon.vue"

/**
 * Displays a breadcrumb. Each item in the items property has the following elements:
 *
 *  - text: mandatory element, holds the text which is to be displayed in the breadcrumb
 *  - to: optional element, the vue router link
 *
 */
export default {
  name: "oc-breadcrumb",
  status: "review",
  release: "1.0.0",

  components: {
    OcDrop,
    OcIcon
  },

  props: {
    /**
     * Array of breadcrub items
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     * First item will be
     * displayed as a home icon
     */
    home: {
      type: [Boolean],
      default: false,
    },
    /**
     * Variation of breadcrumbs
     * Can be `default` or `lead`
     */
    variation: {
      type: String,
      required: false,
      default: "default",
      validator: value => value === "lead" || value === "default"
    }
  },

  data: () => ({
    isDropdownVisible: false
  }),

  computed: {
    $_ocBreadcrumb_dropdownItems() {
      if (this.items.length <= 1 || !this.items) return false

      return [...this.items].reverse().slice(1)
    },
    $_ocBreadcrumb_currentFolder() {
      if (this.items.length === 0 || !this.items) return false

      return [...this.items].reverse()[0]
    },
  },

  methods: {
    $_ocBreadcrumb_toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible
    }
  }
}
</script>

<docs>
```js
<template>
  <div class="oc-height-medium">
    <oc-breadcrumb :items="items" home class="uk-margin-bottom" />
    <oc-breadcrumb :items="items" variation="lead" class="uk-visible@s" />
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
