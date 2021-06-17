'use strict';Object.defineProperty(exports,'__esModule',{value:true});var OcButton=require('./OcButton.js');require('vue');var components=/*#__PURE__*/Object.freeze({__proto__:null,OcButton: OcButton['default']});/* eslint-disable */
var System = {
  install: function install(app, options) {

    for (var componentKey in components) {
      app.use(components[componentKey]);
    }
  }
};exports.default=System;