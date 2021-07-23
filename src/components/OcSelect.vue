<template>
  <vue-select
    ref="select"
    :disabled="disabled"
    :filter="filter"
    class="oc-select"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #search="{ attributes, events }">
      <input class="vs__search" v-bind="attributes" @input="userInput" v-on="events" />
    </template>
    <template v-for="(index, name) in $scopedSlots" #[name]="data">
      <slot v-if="name !== 'search'" :name="name" v-bind="data" />
    </template>
    <div slot="no-options" v-translate>No options available.</div>
    <template #spinner="{ loading }">
      <oc-spinner v-if="loading" />
    </template>
  </vue-select>
</template>

<script>
import Fuse from "fuse.js"
import VueSelect from "vue-select"
import "vue-select/dist/vue-select.css"

/**
 * Select component with a trigger and dropdown based on [Vue Select](https://vue-select.org/)
 */
export default {
  name: "OcSelect",
  status: "ready",
  release: "4.3.0",

  components: { VueSelect },

  inheritAttrs: true,

  props: {
    filter: {
      type: Function,
      required: false,
      default: (items, search) => {
        if (items.length < 1) {
          return []
        }

        const fuse = new Fuse(items, {
          shouldSort: true,
          threshold: 0.2,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
        })

        return search.length ? fuse.search(search).map(({ item }) => item) : fuse.list
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
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
    userInput(event) {
      /**
       * Triggers when a value of search input is changed
       *
       * @property {string} query search query
       */
      this.$emit("search:input", event.target.value)
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

    &__actions {
      flex-flow: row wrap;
      gap: var(--oc-space-xsmall);

      svg {
        overflow: visible;
      }
    }

    &__clear svg {
      max-width: 10px;
    }

    &__open-indicator {
      margin-top: 2px;
    }

    &__selected-options {
      flex: auto;
    }
  }

  &[multiple="multiple"] {
    .vs {
      &__selected {
        background-color: var(--oc-color-swatch-inverse-default);
        border: 1px solid var(--oc-color-input-border);
        fill: var(--oc-color-text-default);
      }

      &__deselect {
        fill: var(--oc-color-text-default);
      }
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

### Multiple selection
```js
<template>
  <div class="oc-docs-width-medium">
    <oc-select v-model="selected" :multiple="true" :options="options" />
  </div>
</template>
<script>
export default {
  data: () => ({
    selected: ['Apple']
  }),

  computed: {
    options() {
      return ['Apple', 'Bannana', 'Orange', 'Pear'].filter(option => this.selected.indexOf(option) < 0)
    }
  }
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
      <template #selected-option="{ title, desc }">
        <strong class="oc-mr-s" v-text="title" /> <small v-text="desc.substr(0, 20) + '...'" />
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

## Loading spinner
```js
<oc-select :options="['Apple', 'Bannana', 'Orange', 'Pear']" :multiple="true" :loading="true" />
```
</docs>
