<template>
  <component
    :is="type"
    :aria-label="ariaLabel"
    :class="['oc-icon', prefix(size), prefix(variation)]"
    v-html="svg"
    @click="$_ocIcon_click"
  />
</template>

<script>
const req = require.context("@/assets/icons/", true, /^\.\/.*\.svg$/)
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. They can act as wayfinding tools to help users more
 * easily understand where they are in the product.
 */
export default {
  name: "oc-icon",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The name of the icon to display.
     */
    name: {
      required: true,
      default: "settings",
    },
    /**
     * Descriptive text to be read to screenreaders.
     */
    ariaLabel: {
      type: String,
      default: "icon",
    },
    /**
     * The html element name used for the icon.
     */
    type: {
      type: String,
      default: "span",
    },
    /**
     * The size of the icon. Defaults to medium.
     * `medium, large`
     */
    size: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(medium|large)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     * `inverted, danger, success, warning`
     */
    variation: {
      type: String,
      default: "system",
      validator: value => {
        return value.match(/(file-type|system|inverted|danger|success|warning)/)
      },
    },
  },
  methods: {
    prefix(string) {
      if (string !== null) return `oc-icon-${string}`
    },
    $_ocIcon_click() {
      this.$emit("click")
    },
  },
  data() {
    return {
      svg: req("./" + this.name + ".svg"),
    }
  },
}
</script>
<style lang="scss"></style>
<docs>
  ```jsx
<section>
	<h3 class="uk-heading-divider">
		Default icons
	</h3>
	<oc-icon name="close" aria-label="Close"/>
	<oc-icon name="delete" aria-label="Delete"/>
	<oc-icon name="info" aria-label="Information"/>
	<oc-icon name="account_circle" aria-label="My Account"/>

	<h3 class="uk-heading-divider">
		Icon color variations
	</h3>
	<div class="uk-grid-collapse uk-child-width-auto" uk-grid>
		<div class="uk-background-primary uk-padding-small">
			<oc-icon variation="inverted" name="close"/>
			<oc-icon variation="inverted" name="delete"/>
			<oc-icon variation="inverted" name="info"/>
			<oc-icon variation="inverted" name="account_circle"/>
		</div>
		<div class="uk-padding-small">
			<oc-icon variation="danger" name="close"/>
			<oc-icon variation="danger" name="delete"/>
			<oc-icon variation="danger" name="info"/>
			<oc-icon variation="danger" name="account_circle"/>
		</div>
		<div class="uk-padding-small">
			<oc-icon variation="success" name="close"/>
			<oc-icon variation="success" name="delete"/>
			<oc-icon variation="success" name="info"/>
			<oc-icon variation="success" name="account_circle"/>
		</div>
		<div class="uk-padding-small">
			<oc-icon variation="warning" name="close"/>
			<oc-icon variation="warning" name="delete"/>
			<oc-icon variation="warning" name="info"/>
			<oc-icon variation="warning" name="account_circle"/>
		</div>
	</div>

	<h3 class="uk-heading-divider">
		Medium and large icons
	</h3>
	<div class="uk-margin">
		<oc-icon size="medium" name="close"/>
		<oc-icon size="medium" name="delete"/>
		<oc-icon size="medium" name="info"/>
		<oc-icon size="medium" name="account_circle"/>
	</div>
	<div class="uk-margin">
		<oc-icon size="large" name="close"/>
		<oc-icon size="large" name="delete"/>
		<oc-icon size="large" name="info"/>
		<oc-icon size="large" name="account_circle"/>
	</div>
</section>
  ```
</docs>
