<template>
  <ul class="uk-list uk-margin-remove">
    <li v-for="(item, index) in items" :key="index">
      <slot name="default">
        <div class="uk-flex">
          <oc-icon name="file_copy" class="uk-margin-small-right" />
          <div class="uk-flex-1">
            <span class="uk-text-bold">{{ item.name }}</span>
            <div class="uk-flex uk-flex-middle">
              <span class="uk-flex-2 uk-margin-small-right">{{ item.size }}</span>
              <oc-progress
                color="primary"
                :value="item.progress | toInt"
                :max="100"
                class="uk-flex-1 uk-margin-remove"
              ></oc-progress>
            </div>
          </div>
        </div>
        <template v-if="index !== items.length - 1">
          <hr class="uk-margin-bottom uk-margin-top" />
        </template>
      </slot>
    </li>
  </ul>
</template>
<script>
/**
 * Create a upload menu item component
 */
export default {
  name: "oc-upload-menu",
  status: "review",
  release: "0.0.1",
  props: {
    /**
     * Array with items to display in menu, has a `name`, `size` and `progress` property.
     */
    items: {
      type: Array,
      default: [],
      required: true,
    },
  },
  filters: {
    toInt(int) {
      return parseInt(int)
    },
  },
}
</script>
<docs>
  ```jsx
  <template>
    <div>
      <oc-menu buttonText="Click Me!">
        <oc-upload-menu :items="items" />
      </oc-menu>
    </div>
  </template>
  <script>
    export default {
      data: () => {
        return {
          items: [
            {name:'codecanyon-19412099-my-app-build-android-app-for-your-website-file-and-license.zip',size:'32 MB',progress:'40'},
            {name:'logo.png',size:'18 KB', progress:'25'},
            {name:'placeholder.jpg',size:'4 KB',progress:'70'}
          ]
        }
      }
    }
  </script>
  ```
</docs>
