<template>
  <ul class="uk-breadcrumb">
    <li v-if="home">
      <a @click="home"><oc-icon name="home"/></a>
    </li>
    <li v-for="(item, index) in items" :key="index">
      <router-link v-if="item.to" :to="item.to">{{ item.text }}</router-link>
      <a v-else-if="item.onClick" @click="item.onClick">{{ item.text }}</a>
      <span v-else v-text="item.text" />
    </li>
  </ul>
</template>

<script>
/**
 * Displays a breadcrumb. Each item in the items property has the following elements:
 *
 *  - text: mandatory element, holds the text which is to be displayed in the breadcrumb
 *  - to: optional element, the vue router link
 *  -
 */
export default {
  name: "oc-breadcrumb",
  status: "review",
  release: "1.0.0",
  props: {
    items: {
      type: Array,
      default: [],
      required: true,
    },
    home: {
      type: [Boolean, Function],
      default: false,
    },
  },
}
</script>

<docs>
```vue
<template>
  <oc-breadcrumb :items="items" :home="proclaim"></oc-breadcrumb>
</template>
<script>
  export default {
    data: () => {
      return {
        items: [
          {text:'Folder',to:{path:'folder'}},
          {text:'Subfolder', onClick:() => alert('Breadcrumb clicked!')}]
      }
    },
    methods : {
      proclaim() {
        alert("I'm going home")
      }
    }
  }
</script>
```
</docs>
