<template>
  <vue-select ref="select" :value="model" class="oc-select" v-bind="$attrs" v-on="$listeners">
    <template v-for="(index, name) in $scopedSlots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <div slot="no-options" v-translate>No options available.</div>
  </vue-select>
</template>

<script>
import VueSelect from "vue-select"
import "vue-select/dist/vue-select.css"

/**
 * Select component with a trigger and dropdown based on [Vue Select](https://vue-select.org/)
 */
export default {
  name: "OcSelect",

  components: { VueSelect },

  inheritAttrs: true,

  model: {
    prop: "model",
    event: "input",
  },

  props: {
    model: {
      type: [Array, String, Object],
      required: false,
      default: null,
    },
  },

  mounted() {
    this.setComboBoxAriaLabel()
  },
  methods: {
    setComboBoxAriaLabel() {
      const comboBoxElement = this.$refs.select.$el.querySelector("div:first-child")
      comboBoxElement.setAttribute("aria-label", this.$gettext("Search for option"))
    },
  },
}
</script>

<style lang="scss">
.oc-select {
  .vs {
    &__search::placeholder,
    &__dropdown-toggle,
    &__dropdown-menu {
      background: var(--oc-color-input-bg);
      border: 1px solid var(--oc-color-input-border);
      color: var(--oc-color-input-text-default);
    }

    &__clear,
    &__open-indicator {
      fill: var(--oc-color-input-text-default);
    }

    &__dropdown-option {
      white-space: normal;

      &--highlight {
        background: var(--oc-color-input-text-default);
      }
    }

    &__actions svg {
      overflow: visible;
    }

    &__clear svg {
      max-width: 10px;
    }

    &__open-indicator {
      margin-top: 2px;
    }
  }

  &:focus-within {
    .vs__dropdown-menu,
    .vs__dropdown-toggle {
      border: 1px solid var(--oc-color-input-text-default);
    }
  }
}
</style>

<docs>
For detailed documentation (props, slots, events, etc.), please visit https://vue-select.org/

```js
<template>
  <div class="oc-docs-width-medium">
    <oc-select v-model="selected" :options="['Bannana', 'Orange', 'Pear']" />
  </div>
</template>
<script>
export default {
  data: () => ({
    selected: 'Apple'
  })
}
</script>
```

### Prevent user from clearing the selection
If we want to disable the clear button from the `oc-select`, we can set prop `clearable` to false. This will also prevent clearing the selected value by hitting `delete`.

```js
<template>
  <div class="oc-docs-width-medium">
    <oc-select v-model="selected" :options="['Apple', 'Bannana', 'Orange', 'Pear']" :clearable="false" />
  </div>
</template>
<script>
export default {
  data: () => ({
    selected: 'Apple'
  })
}
</script>
```

### Disable search
To prevent user from filtering options by typing a serach query into the `oc-select` component, set prop called `searchable` to false.

```js
<template>
  <div class="oc-docs-width-medium">
    <oc-select v-model="selected" :options="['Apple', 'Bannana', 'Orange', 'Pear']" :searchable="false" />
  </div>
</template>
<script>
export default {
  data: () => ({
    selected: 'Apple'
  })
}
</script>
```

### Using slots to display complex options
Sometimes we need to display more complex options. This can include e.g. an option with a title and a description. To still display all those values exactly as we want to, we need to use scoped slot called `option`.
We can then retrieve all the values that we want to display from the slots parametres. It is important to specify the `label` prop on the `oc-select` component which will specify which key should be used as the option label.

```js
<template>
  <div class="oc-docs-width-medium">
    <oc-select v-model="selected" :options="options" label="title" class="oc-mb-m">
      <template v-slot:option="{ title, desc }">
        <span class="option">
          <strong v-text="title" />
        </span>
        <span class="option" v-text="desc" />
      </template>
      <template #no-options>
        Your search query hasn't returned any results.
      </template>
    </oc-select>
    <p>
      Selected: {{ selected }}
    </p>
  </div>
</template>
<script>
const options = [
  {
    title: 'Apple',
    desc: 'An apple is an edible fruit produced by an apple tree (Malus domestica)'
  },
  {
    title: 'Bannana',
    desc: 'Bannana is a genus of goblin spiders (family Oonopidae) native to Xishuangbanna prefecture, Yunnan Province, China, where it lives in the leaf-litter of tropical rainforest'
  },
  {
    title: 'Orange',
    desc: 'The orange is the fruit of various citrus species in the family Rutaceae'
  },
]

export default {
  data: () => ({
    selected: options[0],
    options
  })
}
</script>
<style scoped>
.option {
  display: block;
}
</style>
```
</docs>
