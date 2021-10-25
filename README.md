# ownCloud Design System
[![Build Status](https://drone.owncloud.com/api/badges/owncloud/owncloud-design-system/status.svg)](https://drone.owncloud.com/owncloud/owncloud-design-system)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=owncloud_owncloud-design-system&metric=coverage)](https://sonarcloud.io/dashboard?id=owncloud_owncloud-design-system)

Head over to the [generated docs](https://owncloud.design/) for more information! The documentation is built using [Storybook](https://storybook.js.org/)

# How to build locally

You basically run

```sh
yarn install
```

followed by

```sh
yarn start
```

This will fire up a web server at http://localhost:6060.
Any changes to the code base will result in rebuilding the docs and reloading the content in the browser.

Before opening a PR, please run

```sh
yarn lint && yarn test
```

to make sure your changes will pass our continous integration.
