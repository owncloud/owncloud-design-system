<template>
  <component :is="type" :class="$_ocTag_class" :to="to" @click="$_ocTag_click">
    <!-- @slot Content of the tag -->
    <slot />
  </component>
</template>

<script>
export default {
  name: "OcTag",

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
