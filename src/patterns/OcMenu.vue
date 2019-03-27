<template>
  <div class="uk-inline">
    <slot name="activator">
      <oc-button variation="primary" type="button" :text="buttonText"></oc-button>
    </slot>
    <div uk-dropdown="mode: click, offset: 0">
      <!-- @slot The default slot for inner content  -->
      <slot name="default"> </slot>
      <ul class="uk-nav uk-dropdown-nav uk-nav-default">
        <!-- @slot This slot receives oc-menu-items as content -->
        <slot name="subnav" />
      </ul>
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
        <oc-menu buttonText="Put &lt;oc-menu-item&gt; into the 'subnav' slot ...">
          <template slot="subnav">
                <oc-menu-item icon="create_new_folder" content="New folder …" />
                <oc-menu-item icon="save" content="New file …" />
                <oc-menu-item content="iconless action" />
                <oc-menu-item>Another action</oc-menu-item>
          </template>
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
