<template>
  <div :class="`oc-breadcrumb oc-breadcrumb-${variation}`">
    <ul class="oc-breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="oc-breadcrumb-list-item">
        <router-link
          v-if="home && index === 0"
          :to="item.to"
          class="uk-flex uk-float-left"
          :aria-label="homeAccessibleLabelValue"
        >
          <oc-icon name="home" :accessible-label="homeAccessibleLabelValue" />
        </router-link>
        <router-link v-else-if="item.to" :to="item.to">{{ item.text }}</router-link>
        <a v-else-if="item.onClick" @click="item.onClick">{{ item.text }}</a>
        <span v-else v-text="item.text" />
      </li>
    </ul>
    <div class="oc-breadcrumb-drop">
      <label class="oc-breadcrumb-drop-label">
        <span
          v-if="currentFolder"
          class="oc-breadcrumb-drop-label-text"
          v-text="currentFolder.text"
        />
        <oc-icon
          class="oc-breadcrumb-drop-label-icon"
          name="expand_more"
          :aria-label="$gettext('Expand more')"
        />
      </label>
      <oc-drop v-if="dropdownItems" :options="{ offset: 20 }">
        <ul class="uk-nav uk-nav-default">
          <li v-for="(item, index) in dropdownItems" :key="index">
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
 * ## Accessibility
 *
 * You can provide an accessibility label to the home icon via `homeAccessibleLabel`. If not set, it will default to "Go to Home".
 */
export default {
  name: "OcBreadcrumb",
  status: "review",
  release: "1.0.0",

  components: {
    OcDrop,
    OcIcon,
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
     * Aria-label for the home icon
     */
    homeAccessibleLabel: {
      type: String,
      required: false,
      default: "",
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
    homeAccessibleLabelValue() {
      return this.homeAccessibleLabel || this.$gettext("Go to root directory")
    },
  },
}
</script>

<docs>
```js
<template>
  <div>
    <oc-breadcrumb :items="items" home class="oc-mb" />
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
