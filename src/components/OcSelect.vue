<template>
  <div>
    <label :for="id" v-text="label" />
    <vue-select
      ref="select"
      :value="model"
      class="oc-select"
      v-bind="additionalAttributes"
      v-on="$listeners"
    >
      <template v-for="(index, name) in $scopedSlots" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
      <div slot="no-options" v-translate>No options available.</div>
    </vue-select>
  </div>
</template>

<script>
import uniqueId from "../utils/uniqueId"
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
    /**
     * The ID of the element.
     */
    id: {
      type: String,
      required: false,
      default: () => uniqueId("oc-select-"),
    },
    /**
     * The model of the select component. Provide it as value or bind it with v-model.
     **/
    model: {
      type: [Array, String, Object],
      required: false,
      default: null,
    },
    /**
     * Label of the select component
     * ATTENTION: this shadows the vue-select prop `label`. If you need access to that use `optionLabel`.
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * Key to use as label when option is an object
     * NOTE: this maps to the vue-select prop `label`
     */
    optionLabel: {
      type: String,
      default: null,
    },
  },

  computed: {
    additionalAttributes() {
      const additionalAttrs = {}
      additionalAttrs["input-id"] = this.id
      if (this.optionLabel) {
        additionalAttrs["label"] = this.optionLabel
      }
      return { ...this.$attrs, ...additionalAttrs }
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
    <oc-select label="Custom label" v-model="selected" :options="['Bannana', 'Orange', 'Pear']" />
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

### Use objects as options
If we want to select from a list of option objects, we can use `option-label` to select the key of the object to use as label.

```js
<template>
  <div class="oc-docs-width-medium">
    <oc-select
      label="Custom Label"
      option-label="title"
      :options="options"
      v-model="selected"
      class="oc-mb-m"
    />
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
    selected: options[1],
    options
  })
}
</script>
```




### Using slots to display complex options
Sometimes we need to display more complex options. This can include e.g. an option with a title and a description. To
still display all those values exactly as we want to, we need to use scoped slots called `option` and `selected-option`.
We can then retrieve all the values that we want to display from the slot parameters.
It is important to specify the `option-label` prop on the `oc-select` to make filtering work.

```js
<template>
  <div class="oc-docs-width-medium">
    <oc-select
      label="Custom Label"
       option-label="title"
      :options="options"
      v-model="selected"
      class="oc-mb-m"
    >
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
