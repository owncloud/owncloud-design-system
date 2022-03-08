<template>
  <component :is="type" :class="$_ocTag_class" :to="to" @click="$_ocTag_click">
    <!-- @slot Content of the tag -->
    <slot />
  </component>
</template>

<script>
import { getSizeClass } from "../../../utils/sizeClasses"

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

    /**
     * The size of the tag. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
  },

  computed: {
    $_ocTag_class() {
      const classes = ["oc-tag", `oc-tag-${getSizeClass(this.size)}`]

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
  display: inline-flex;
  font-size: 0.875rem;
  gap: var(--oc-space-xsmall);
  padding: var(--oc-space-xsmall) var(--oc-space-small);
  text-decoration: none;

  &-s {
    min-height: 1.5rem;
  }

  &-m {
    min-height: 2.125rem;
  }

  &-l {
    min-height: 2.75rem;
  }

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
<oc-tag>
  <oc-icon name="links" />
  Shared via link
</oc-tag>
```
## Different sizes of the tag component

```js
<div>
<oc-tag size="small">
  <oc-icon name="links" />
  Small tag
</oc-tag>
<oc-tag size="medium">
  <oc-icon name="links" />
  Medium tag
</oc-tag>
<oc-tag size="large">
  <oc-icon name="links" />
  Large tag
</oc-tag>
</div>
```
## Different types of the tag component
The tag component can be rendered as a different element if desired. You can specify such element via property `type`.

```js
<oc-grid gutter="small" flex="true">
    <oc-tag class="oc-mr-s">
      <oc-icon name="group" />
      Shared with other people
    </oc-tag>
    <oc-tag class="oc-mr-s" type="a">
      <oc-icon name="links" />
      Shared via link
    </oc-tag>
    <oc-tag class="oc-mr-s" type="button">Expires in 2 days</oc-tag>
</oc-grid>
```
</docs>
