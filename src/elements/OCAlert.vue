<template>
  <div :class="_variation" uk-alert>
    <a v-if="!noClose" class="uk-alert-close" uk-close></a>
    <slot />
  </div>
</template>
<script>
/**
 * Display success, warning and error messages.
 */
export default {
  name: "oc-alert",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Defines if a close button is present
     */
    noClose: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * Style variation to give additional meaning.
     * `primary, success, warning, danger`
     */
    variation: {
      type: String,
      required: false,
      default: null,
      validator: value => {
        return value.match(/(primary|success|warning|danger)/)
      },
    },
  },
  computed: {
    _variation() {
      return this.variation ? `uk-alert-${this.variation}` : null
    },
  },
}
</script>
<docs>
```jsx
<div>
	<oc-alert>
		<p>
			This is an plain alert-box.
		</p>
	</oc-alert>
	<oc-alert variation="primary">
		<p>
			<oc-icon name="info" class="uk-float-left uk-margin-small-right" />
			I am nice and blue and have an icon
		</p>
	</oc-alert>
	<oc-alert variation="success">
		<p>
			Yes! It worked
		</p>
	</oc-alert>
	<oc-alert variation="warning">
		<p>
			Be carefull!
		</p>
	</oc-alert>
	<oc-alert variation="danger">
		<p>
			I'm in danger!!
		</p>
	</oc-alert>
</div>
```
</docs>
