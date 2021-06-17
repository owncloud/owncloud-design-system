(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.OcButton = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  var sizeClassMappings = {
    xxxsmall: "xxxs",
    xxsmall: "xxs",
    xsmall: "xs",
    small: "s",
    medium: "m",
    large: "l",
    xlarge: "xl",
    xxlarge: "xxl",
    xxxlarge: "xxxl"
  };
  function getSizeClass(size) {
    return sizeClassMappings[size];
  }

  var script = {
    name: "OcButton",
    status: "review",
    release: "1.0.0",
    props: {
      /**
       * The html element used for the button.
       * `button, a, router`
       */
      type: {
        type: String,
        default: "button",
        validator: function validator(value) {
          return value.match(/(button|a|router-link)/);
        }
      },

      /**
       * Disable the button
       */
      disabled: {
        type: Boolean,
        default: false
      },

      /**
       * The size of the button. Defaults to medium.
       * `small, medium, large`
       */
      size: {
        type: String,
        default: "medium",
        validator: function validator(value) {
          return value.match(/(small|medium|large)/);
        }
      },

      /**
       * When setting the button’s type to a link, use this option to give a href.
       */
      href: {
        type: String,
        default: null
      },

      /**
       * When setting the button’s type to a router-link, use this option to give a to.
       */
      to: {
        type: Object,
        default: null
      },

      /**
       * The aria-label of the button.
       */
      ariaLabel: {
        type: String,
        default: null
      },

      /**
       * Set the button’s type to “submit”.
       */
      submit: {
        type: String,
        default: null,
        validator: function validator(value) {
          return value.match(/(null|submit)/);
        }
      },

      /**
       * Style variation to give additional meaning.
       * `primary, danger`
       */
      variation: {
        type: String,
        default: "default",
        validator: function validator(value) {
          return value.match(/(default|primary|danger|raw)/);
        }
      },

      /**
       * Don't add the element class to this element.
       */
      stopClassPropagation: {
        type: Boolean,
        default: false
      },

      /**
       * How to justify content within the button. Defaults to center.
       * `left, center, right, space-around, space-between, space-evenly`
       */
      justifyContent: {
        type: String,
        default: "center",
        validator: function validator(value) {
          return value.match(/(left|center|right|space-around|space-between|space-evenly)/);
        }
      },

      /**
       * Distance between children of the button. Defaults to medium. Might be overruled by justify-content value.
       * @values none, xsmall, small, medium, large, xlarge
       */
      gapSize: {
        type: String,
        default: "medium",
        validator: function validator(value) {
          return value.match(/(none|xsmall|small|medium|large|xlarge)/);
        }
      },

      /**
       * Color to be given to the content of the button with variation `raw`.
       * Will not do anything when combined with different variations.
       */
      color: {
        type: String,
        required: false,
        default: "default",
        validator: function validator(value) {
          return value.match(/(default|text|primary)/);
        }
      }
    },
    computed: {
      $_ocButton_buttonClass: function $_ocButton_buttonClass() {
        if (this.stopClassPropagation) return "";
        var classes = ["oc-button", "oc-button-".concat(getSizeClass(this.size)), "oc-button-justify-content-".concat(this.justifyContent), "oc-button-gap-".concat(getSizeClass(this.gapSize))];

        if (this.variation) {
          classes.push("oc-button-".concat(this.variation));
        }

        if (this.variation === "raw") {
          classes.push("oc-button-raw-color-".concat(this.color));
        }

        return classes;
      }
    },
    methods: {
      $_ocButton_onClick: function $_ocButton_onClick(event) {
        this.$emit("click", event);
      }
    }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.type), {
      href: $props.href,
      to: $props.to,
      type: $props.submit,
      "aria-label": $props.ariaLabel,
      class: $options.$_ocButton_buttonClass,
      disabled: $props.disabled,
      onClick: $options.$_ocButton_onClick
    }, {
      default: vue.withCtx(function () {
        return [vue.createCommentVNode(" @slot Content of the button "), vue.renderSlot(_ctx.$slots, "default")];
      }),
      _: 3
      /* FORWARDED */

    }, 8
    /* PROPS */
    , ["href", "to", "type", "aria-label", "class", "disabled", "onClick"]);
  }

  script.render = render;
  script.__file = "src/components/OcButton/OcButton.vue";

  var Component = {
    install: function install(app) {
      app.component(script.name, script);
    }
  };

  exports.OcButton = script;
  exports.default = Component;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
