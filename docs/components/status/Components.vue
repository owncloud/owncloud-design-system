<template>
  <div class="component-status">
    <ul class="uk-list">
      <li>
        <oc-icon name="ready" variation="success" />
        Ready
      </li>
      <li>
        <oc-icon name="review" variation="warning" />
        Under review
      </li>
      <li>
        <oc-icon name="deprecated" variation="danger" />
        Deprecated
      </li>
      <li>
        <oc-icon name="prototype" />
        Prototype
      </li>
      <li>- Not applicable</li>
    </ul>
    <table>
      <thead>
        <tr class="uk-text-left">
          <th>Component Name</th>
          <th>Released in</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(component, index) in components" :key="index" class="component">
          <td v-if="component.name">
            <a :href="`/?path=/docs/atoms-${component.name.replace('Oc', '')}--component`">
              <code class="name">{{ component.name }}</code>
            </a>
          </td>
          <td v-else>N/A</td>
          <td v-if="component.release">
            {{ component.release }}
          </td>
          <td v-else>N/A</td>
          <td v-if="component.status">
            <oc-icon v-if="component.status === 'ready'" name="ready" variation="success" />
            <oc-icon
              v-if="component.status === 'under-review' || component.status === 'review'"
              name="review"
              variation="warning"
            />
            <oc-icon v-if="component.status === 'prototype'" name="prototype" variation="passive" />
            <oc-icon
              v-if="component.status === 'deprecated'"
              name="deprecated"
              variation="danger"
            />
          </td>
          <td v-else>—</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import orderBy from "../../utils/orderBy"
import OcIcon from "../../../src/components/atoms/OcIcon/OcIcon.vue"

export default {
  name: "Components",
  components: {
    OcIcon,
  },
  data() {
    return {
      components: this.orderData(this.getComponents()),
    }
  },
  methods: {
    getComponents: function () {
      const components = []
      const contexts = [require.context("../../../src/components/", true, /\.vue$/)]

      contexts.forEach(context => {
        context.keys().forEach(key => components.push(context(key).default))
      })

      return components.map(c => {
        return c
      })
    },
    orderData: function (data) {
      return orderBy(data, "name", "asc")
    },
  },
}
</script>
