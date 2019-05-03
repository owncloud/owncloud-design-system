<template>
  <span>
    <oc-spinner v-if="loading" size="medium" class="uk-height-1-1 uk-width-1-1" />
    <template v-if="!loading">
      <oc-img v-if="src" :src="src" class="oc-avatar" width="64" :uk-tooltip="_tooltip" />
      <oc-icon
        v-else
        class="uk-flex uk-flex-middle uk-height-1-1 uk-width-1-1"
        size="medium"
        name="account_circle"
        :uk-tooltip="_tooltip"
      />
    </template>
  </span>
</template>
<script>
/**
 * A simple component to show an avatar image
 */
export default {
  name: "oc-avatar",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Defines if the avatar is being loaded
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Image source, path to avatar
     **/
    src: {
      type: String,
      required: false,
    },
    /**
     * Image title, usualy the user name
     **/
    title: {
      type: String,
      required: false,
    },
  },
  computed: {
    _tooltip() {
      if (!this.title) return null

      return `title: ${this.title}; pos: right`
    },
  },
}
</script>
<docs>
```jsx
<template>
  <div class="uk-flex uk-flex-middle">
    <oc-avatar :loading="loading" :src="srcLion" title="I'm a Lion"  />
    <oc-avatar :loading="loading" :src="srcWolf" />
    <oc-avatar :loading="loading" :src="srcEmpty" title="I'm using the placeholder" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      srcLion: 'https://picsum.photos/64/64?image=1074',
      srcWolf: 'https://picsum.photos/64/64?image=718',
      srcEmpty: ''
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.endLoading()
    }, 1000)
  },
  methods: {
    endLoading () {
      this.loading = false
    }
  }
}
</script>
```
</docs>
