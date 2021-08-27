<template>
  <span
    class="oc-avatar-item"
    :style="{ backgroundColor: backgroundColor, '--icon-color': iconColor }"
    :aria-label="accessibleLabel === '' ? null : accessibleLabel"
    :aria-hidden="accessibleLabel === '' ? 'true' : null"
    :focusable="accessibleLabel === '' ? 'false' : null"
    :role="accessibleLabel === '' ? null : 'img'"
    :data-test-link-name="name"
  >
    <oc-icon v-if="hasIcon" :name="icon" size="small"></oc-icon>
  </span>
</template>
<script>
export default {
  name: "OcAvatarItem",
  status: "ready",
  release: "2.1.0",

  props: {
    /**
     * Name of the public link used as an accessible label
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Icon that should be used for the avatar
     */
    icon: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Color that should be used for the icon
     */
    iconColor: {
      type: String,
      required: false,
      default: "#ffffff",
    },
    /**
     * Background color that should be used for the avatar. If empty
     * a random color will be picked
     */
    background: {
      type: String,
      required: false,
      default: "var(--oc-color-swatch-brand-default)",
    },
    /**
     * Accessibility label used as alt. Use only in case the avatar is used alone.
     * In case the avatar is used next to username or display name leave empty.
     * If not specified, avatar will get `aria-hidden="true"`.
     **/
    accessibleLabel: {
      type: String,
      required: false,
      default: "",
    },
  },

  computed: {
    hasIcon() {
      return this.icon !== null
    },
    backgroundColor() {
      return this.background ? this.background : this.pickBackgroundColor
    },
    pickBackgroundColor() {
      const backgroundColors = [
        "#b82015",
        "#c21c53",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#106892",
        "#055c68",
        "#208377",
        "#1a761d",
        "#476e1a",
        "#636d0b",
        "#8e5c11",
        "#795548",
        "#465a64",
      ]
      let bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]

      return bgColor
    },
  },
}
</script>

<style lang="scss">
.oc-avatar-item {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 18px;
  border-radius: 50%;
  display: block;
  height: 30px;
  width: 30px;

  .oc-icon {
    margin-left: 6.5px;
    margin-top: 6.5px;
  }
  .oc-icon > svg {
    fill: var(--icon-color);
  }
  .oc-icon > svg:after {
    content: "";
    background-color: red;
    margin-right: -5px;
    margin-bottom: -5px;
    width: 30px;
    height: 30px;
  }
}
</style>

<docs>
```js
<oc-avatar-item name="Public link" accessible-label="Public link" />
<br/>
<oc-avatar-item name="Public link" icon="close" accessible-label="Public link" />
<br/>
<oc-avatar-item name="Public link" icon="close" background="#465a64" accessible-label="Public link" />
```
</docs>
