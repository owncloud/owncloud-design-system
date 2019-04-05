<template>
  <div class="oc-user">
    <div class="uk-inline">
      <oc-avatar :src="avatar" :title="userName" />
    </div>
    <div class="uk-inline">
      <div class="uk-text-lead" v-text="displayName"></div>
      <div class="uk-text-meta" v-text="email"></div>
      <slot name="properties"></slot>
    </div>
    <div class="uk-inline uk-align-right">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
/**
 * The user is a small component with an avatar showing user properties like
 * display name and username.
 * Additional properties can be added to the `properties` slot.
 * Actions can be added to the `actions` slot.
 */
export default {
  name: "oc-user",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Image source, path to avatar
     **/
    avatar: {
      type: String,
      required: true,
    },
    /**
     * Readable display name of the user
     **/
    displayName: {
      type: String,
      required: false,
    },
    /**
     * User name / login of the user
     **/
    userName: {
      type: String,
      required: false,
    },
    /**
     * Email of the user
     **/
    email: {
      type: String,
      required: false,
    },
  },
}
</script>

<docs>
```jsx
<div>
Minimal version:<br>
  <oc-user avatar="https://picsum.photos/64/64?image=718"/>


All slots and properties used:<br>
  <oc-user avatar="https://picsum.photos/64/64?image=1074" user-name="simba1" display-name="Simba" email="simba@djungle.com">
    <template slot="properties">
      <span>Owner | Expires: July 4, 2019</span>
    </template>
    <template slot="actions">
      <oc-icon name="delete"/>
      <oc-icon name="edit"/>
    </template>
  </oc-user>
</div>
```
</docs>
