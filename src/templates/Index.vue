<template>
  <component :is="type" class="index">
    <NavBar
      active="Index"
      :navItems="[
        { name: 'Template', component: 'Index', href: '/#/' },
        { name: 'Documentation', href: 'http://localhost:6060/' },
      ]"
    />
    <Wrapper>
      <Heading>ownCloud Design System</Heading>
      <Paragraph>
        <a href="https://owncloud.github.io/owncloud-design-system/">ownCloud Design System</a>is an
        open-source tool for building design systems with Vue.js. It provides you and your team a
        set of organized tools, patterns &amp; practices. It works as the foundation for your
        application development.
      </Paragraph>
    </Wrapper>
  </component>
</template>

<script>
/**
 * Shows how to layout and structure a home page.
 */
export default {
  name: "Index",
  status: "deprecated",
  release: "1.0.0",
  metaInfo: {
    title: "ownCloud Design System",
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
  <Index />
  ```
</docs>
