<template>
  <div class="oc-breadcrumb">
    <ul class="oc-breadcrumb-list">
      <li v-for="(item, index) in items" :key="index">
        <router-link v-if="home && index === 0" :to="item.to" class="uk-flex"
          ><oc-icon name="home"
        /></router-link>
        <router-link v-else-if="item.to" :to="item.to">{{ item.text }}</router-link>
        <a v-else-if="item.onClick" @click="item.onClick">{{ item.text }}</a>
        <span v-else v-text="item.text" />
      </li>
    </ul>
    <div class="oc-breadcrumb-drop">
      <label class="oc-breadcrumb-drop-label">
        <span
          v-if="$_ocBreadcrumb_currentFolder"
          class="oc-breadcrumb-drop-label-text"
          v-text="$_ocBreadcrumb_currentFolder.text"
        />
        <oc-icon class="oc-breadcrumb-drop-label-icon" name="expand_more" />
      </label>
      <oc-drop v-if="$_ocBreadcrumb_dropdownItems" :options="{ offset: 20 }">
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
  props: {
    /**
     * Array of breadcrub items
     */
    items: {
      type: Array,
      default: () => [],
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
  },
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
}
</script>

<docs>
```vue
<template>
  <section>
    <oc-breadcrumb :items="items" home></oc-breadcrumb>
  </section>
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
