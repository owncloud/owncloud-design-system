import Component from './OcButton.js';
import 'vue';

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  OcButton: Component
});

/* eslint-disable */
var System = {
  install: function install(app, options) {

    for (var componentKey in components) {
      app.use(components[componentKey]);
    }
  }
};

export default System;
