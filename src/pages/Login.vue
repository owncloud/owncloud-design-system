<script>
/**
 * Shows how to layout and structure the logon screen.
 *
 * ## Todo:
 * - [x] where to get the background image from? should be themable -> less/scss ??
 * - [x] where to get the logo image from? should be themable -> less/scss ??
 * - [x] define proper elements
 */
export default {
  name: "Login",
  status: "deprecated",
  release: "1.0.0",
}
</script>
<docs>
```
<template>
  <div class="oc-login" uk-height-viewport>
    <div class="oc-login-card uk-position-center">
      <h1 class="oc-login-logo">
          ownCloud
      </h1>
      <div class="oc-login-card-body">
        <h3 class="oc-login-card-title">
            Welcome to ownCloud
        </h3>
        <p>
            Please click the button below to authenticate and get access to your data.
        </p>
        <oc-button size="large" variation="primary" class="oc-login-authorize-button">
          Authorize
        </oc-button>
      </div>
      <div class="oc-login-card-footer">
        <p>
          <a href="https://owncloud.org">ownCloud</a> – A safe home for all your data
        </p>
      </div>
    </div>
  </div>
</template>
```
</docs>
