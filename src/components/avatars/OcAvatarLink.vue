<template>
  <span
    class="oc-avatar-link"
    :style="{ backgroundColor: pickBackgroundColor }"
    :aria-label="accessibleLabel === '' ? null : accessibleLabel"
    :aria-hidden="accessibleLabel === '' ? 'true' : null"
    :focusable="accessibleLabel === '' ? 'false' : null"
    :role="accessibleLabel === '' ? null : 'img'"
    :data-test-link-name="name"
  />
</template>

<script>
export default {
  name: "OcAvatarLink",
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
.oc-avatar-link {
  background-image: url("data:image/svg+xml,%3Csvg width='48' height='49' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.7393 36.2607C10.2686 33.7899 10.2784 29.7634 12.7612 27.2805L18.5689 21.4727L15.8236 18.7275L10.0158 24.5352C6.0085 28.5426 5.99275 35.0315 9.98064 39.0194C13.9685 43.0073 20.4574 42.9915 24.4648 38.9841L30.2725 33.1764L27.5272 30.4311L21.7195 36.2389C19.2367 38.7217 15.2101 38.7315 12.7393 36.2607ZM20.1371 31.7527L31.7526 20.1371L28.8629 17.2474L17.2474 28.8629L20.1371 31.7527ZM24.5353 10.0159L18.7275 15.8236L21.4728 18.5689L27.2805 12.7612C29.7633 10.2783 33.7899 10.2685 36.2607 12.7393C38.7314 15.2101 38.7217 19.2366 36.2388 21.7194L30.4311 27.5272L33.1764 30.2725L38.9842 24.4648C42.9915 20.4574 43.0073 13.9685 39.0194 9.98063C35.0315 5.99273 28.5426 6.00852 24.5353 10.0159Z' fill='white'/%3E%3C/svg%3E%0A");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 18px;
  border-radius: 50%;
  display: block;
  height: 30px;
  width: 30px;
}
</style>

<docs>
```js
<oc-avatar-link name="Public link" accessible-label="Public link" />
```
</docs>
