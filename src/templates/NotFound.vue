<template>
  <component :is="type" class="not-found">
    <NavBar
      active="NotFound"
      :navItems="[
        { name: 'Template', component: 'Index', href: '/#/' },
        { name: 'Documentation', href: 'http://localhost:6060/' },
      ]"
    />
    <Wrapper>
      <Heading>404 Error</Heading>
      <Paragraph
        >Couldn’t find a component that would match the URL you entered. Double check configuration
        in router/index.js.</Paragraph
      >
    </Wrapper>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure an error page.
 */
export default {
  name: "NotFound",
  metaInfo: {
    title: "Page Not Found | ownCloud Design System",
    htmlAttrs: {
      lang: "en",
    },
  },
  props: {
    /**
     * The html element name used for the component.
     */
    type: {
      type: String,
      default: "div",
    },
  },
}
</script>

<style lang="scss" scoped></style>

<docs>
  ```jsx
  <NotFound />
  ```
</docs>
