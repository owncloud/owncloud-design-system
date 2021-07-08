<template>
  <component :is="type" :class="$_ocTag_class" :to="to" @click="$_ocTag_click">
    <!-- @slot Content of the tag -->
    <slot />
  </component>
</template>

<script>
export default {
  name: "OcTag",
  status: "ready",
  release: "2.0.0",

  props: {
    /**
     * Specify which component should be used for the tag.
     * Can be `span`, `button`, `router-link` or `a`.
     */
    type: {
      type: String,
      required: false,
      default: "span",
      validator: type => type.match(/(span|button|router-link|a)/),
    },

    /**
     * Target of the router link
     */
    to: {
      type: [String, Object],
      required: false,
      default: null,
    },
  },

  computed: {
    $_ocTag_class() {
      const classes = ["oc-tag"]

      this.type === "router-link" || this.type === "a"
        ? classes.push("oc-tag-link")
        : classes.push(`oc-tag-${this.type}`)

      return classes
    },
  },

  methods: {
    $_ocTag_click(event) {
      /**
       * Emitted as soon as the user clicks on the tag
       * @type {event}
       */
      this.$emit("click", event)
    },
  },
}
</script>

<style lang="scss">
.oc-tag {
  align-items: center;
  background-color: var(--oc-color-background-default);
  border: 1px solid var(--oc-color-text-muted);
  border-radius: 7px;
  box-sizing: border-box;
  color: var(--oc-color-text-muted);
  display: flex;
  font-size: 0.875rem;
  gap: var(--oc-space-xsmall);
  min-height: $oc-size-icon-default + (2 * $oc-space-xsmall) + 2px;
  padding: var(--oc-space-xsmall) var(--oc-space-small);
  text-decoration: none;

  .oc-icon > svg {
    fill: var(--oc-color-text-muted);
  }

  &-link,
  &-button {
    transition: color $transition-duration-short ease-in-out;

    .oc-icon > svg {
      transition: fill $transition-duration-short ease-in-out;
    }

    &:hover,
    &:focus {
      color: var(--oc-color-swatch-primary-hover);
      cursor: pointer;
      text-decoration: none;

      .oc-icon > svg {
        fill: var(--oc-color-swatch-primary-hover);
      }
    }
  }
}
</style>

<docs>
Component to display various information.
```js
<oc-grid>
  <oc-tag>
    <oc-icon name="link" />
    Shared via link
  </oc-tag>
</oc-grid>
```
## Different types of the tag component
The tag component can be rendered as a different element if desired. You can specify such element via property `type`.

```js
<oc-grid gutter="small" flex>
  <div>
    <oc-tag>
      <oc-icon name="group" />
      Shared with other people
    </oc-tag>
  </div>
  <div>
    <oc-tag type="a">
      <oc-icon name="link" />
      Shared via link
    </oc-tag>
  </div>
  <div>
    <oc-tag type="button">Expires in 2 days</oc-tag>
  </div>
</oc-grid>
```
</docs>
