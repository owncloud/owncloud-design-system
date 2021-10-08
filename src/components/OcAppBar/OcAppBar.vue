<template>
  <div class="oc-app-bar oc-p-s">
    <oc-grid flex gutter="small">
      <slot />
    </oc-grid>
  </div>
</template>

<script>
/**
 * The top bar is a basic navigation bar element.
 * It has 3 slots: `left, title, right` which can be filled with elements.
 *
 * Elements within the top bar are: `oc-topbar-logo` and `oc-topbar-item`
 *
 *
 * ##TODO:
 *
 * - [ ] add capability to have the topbar stick to the browser window - remaining content is scrollable
 */
export default {
  name: "OcAppBar",
  status: "ready",
  release: "1.0.0",
}
</script>

<style lang="scss">
.oc-app-bar {
  min-height: $global-control-height;
}
</style>

<docs>
```js
<oc-app-bar>
  <div class="uk-width-expand">
    <oc-breadcrumb :home="goHome" :items="[{text:'Folder',to:{path:'folder'}},{text:'Subfolder'}]"></oc-breadcrumb>
  </div>
  <div class="uk-width-auto uk-visible@m">
    <oc-search-bar label="Search"></oc-search-bar>
  </div>
  <div class="uk-width-auto">
    <div class="uk-button-group">
      <oc-button id="_new">+ New</oc-button>
      <oc-button id="_filter"><oc-icon name="filter_list" /></oc-button>
    </div>
  </div>
</oc-app-bar>
```
</docs>
