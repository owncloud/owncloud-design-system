/* eslint-disable */
import * as components from "./components/index";

const System = {
  install(app, options) {
    if (!options) {
      options = {};
    }

    for (const componentKey in components) {
      app.use((components)[componentKey]);
    }
  },
};

export default System;