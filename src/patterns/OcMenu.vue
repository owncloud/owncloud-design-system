<template>
  <div class="uk-inline">
    <slot name="activator">
      <oc-button variation="primary" type="button" :text="buttonText"></oc-button>
    </slot>
    <div uk-dropdown="mode: click, offset: 0">
      <slot />
    </div>
  </div>
</template>

<script>
// import UiKit from "uikit"
/**
 * A menus comes by default with a button as activator. But the activator is customizable
 */
export default {
  name: "oc-menu",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Text on the button
     */
    buttonText: {
      type: String,
      default: "Click",
    },
  },
}
</script>

<style scoped>
.uk-dropdown {
  margin-top: 0px;
}
</style>

<docs>
    ```jsx
    <div>
        <oc-menu buttonText="Click Me!">
            Welcome to ownCloud Design System!
        </oc-menu>
        <oc-menu buttonText="Click to open ...">
            <!-- TODO: replace with oc-list elements-->
            <ul class="uk-nav uk-dropdown-nav uk-nav-default">
                <li><a href="#"><oc-icon name="create_new_folder"/>New folder ...</a> </li>
                <li><a href="#"><oc-icon name="save"/>New file ...</a> </li>
            </ul>
        </oc-menu>
        <br />
        <oc-menu buttonText="Click Me!">
            <template slot="activator">
                <div>
                    <oc-icon name="info"></oc-icon>Anything can be used as activator
                </div>
            </template>
            <oc-icon name="info"></oc-icon>
            <span>Some more information about ownCloud design system!</span>
        </oc-menu>
    </div>
    ```
</docs>
