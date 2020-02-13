(function (Vue, Vuex) {
    'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
    Vuex = Vuex && Vuex.hasOwnProperty('default') ? Vuex['default'] : Vuex;

    //
    //
    //
    //
    //
    //

    var script = {};

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        let hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }
    //# sourceMappingURL=normalize-component.mjs.map

    const isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return (id, style) => addStyle(id, style);
    }
    let HEAD;
    const styles = {};
    function addStyle(id, css) {
        const group = isOldIE ? css.media || 'default' : id;
        const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            let code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    style.element.setAttribute('media', css.media);
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                const index = style.ids.size - 1;
                const textNode = document.createTextNode(code);
                const nodes = style.element.childNodes;
                if (nodes[index])
                    style.element.removeChild(nodes[index]);
                if (nodes.length)
                    style.element.insertBefore(textNode, nodes[index]);
                else
                    style.element.appendChild(textNode);
            }
        }
    }
    //# sourceMappingURL=browser.mjs.map

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "display-section" } })
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-15d03ffa_0", { source: "\n#display-section[data-v-15d03ffa] {\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: 30% 40% 30%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/DisplaySection.vue"],"names":[],"mappings":";AAWA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,kCAAA;AACA","file":"DisplaySection.vue","sourcesContent":["<!-- This component represents the section used to display the player's score -->\r\n<template>\r\n    <div id=\"display-section\">\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {};\r\n</script>\r\n\r\n<style scoped>\r\n    #display-section {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: 30% 40% 30%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = "data-v-15d03ffa";
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //

    var script$1 = {};

    /* script */
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "main" } })
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = function (inject) {
        if (!inject) return
        inject("data-v-08600a8a_0", { source: "\n#main[data-v-08600a8a] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: 30% 70%;\n    grid-template-columns: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/MainState.vue"],"names":[],"mappings":";AAYA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,2BAAA;IACA,2BAAA;AACA","file":"MainState.vue","sourcesContent":["<!-- This component represents the main area of the game -->\r\n<template>\r\n    <div id=\"main\">\r\n\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {};\r\n</script>\r\n\r\n<style scoped>\r\n    #main {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 30% 70%;\r\n        grid-template-columns: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = "data-v-08600a8a";
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        createInjector,
        undefined,
        undefined
      );

    //This mixin provides access to the theme variable in the store
    var theme = {
        computed: {
            //Gets the current theme
            theme() {
                return this.$store.state.theme;
            }
        },

        methods: {
            //Sets the theme
            setTheme(theme) {
                this.$store.commit("setTheme", theme);
            },

            //Generates the current theme based on the class name provided
            themeClass(className) {
                return `${className}-${this.theme}`;
            }
        }
    };

    //

    var script$2 = {
        mixins: [theme],

        props: ["title", "func"]
    };

    /* script */
    const __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "options-button-container" }, [
        _c(
          "button",
          {
            staticClass: "options-button",
            class: [_vm.themeClass("game-button"), _vm.themeClass("text")],
            on: { click: _vm.func }
          },
          [_vm._v("\n        " + _vm._s(_vm.title) + "\n    ")]
        )
      ])
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      const __vue_inject_styles__$2 = function (inject) {
        if (!inject) return
        inject("data-v-21eda97c_0", { source: "\n.options-button-container[data-v-21eda97c] {\n    display: grid;\n\n    grid-template-rows: 10% auto 10%;\n    grid-template-columns: 10% auto 10%;\n}\n.options-button[data-v-21eda97c] {\n    width: 100%;\n    height: 100%;\n\n    grid-row: 2;\n    grid-column: 2;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 235%;\n\n\tuser-select: none;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/options/OptionsButton.vue"],"names":[],"mappings":";AAoBA;IACA,aAAA;;IAEA,gCAAA;IACA,mCAAA;AACA;AAEA;IACA,WAAA;IACA,YAAA;;IAEA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,eAAA;;CAEA,iBAAA;AACA","file":"OptionsButton.vue","sourcesContent":["<!-- This button triggers an action -->\r\n<template>\r\n    <div class=\"options-button-container\">\r\n        <button class=\"options-button\" v-bind:class=\"[themeClass('game-button'), themeClass('text')]\" @click=\"func\">\r\n            {{ title }}\r\n        </button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import theme from \"../../../../../mixins/store/theme.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        props: [\"title\", \"func\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .options-button-container {\r\n        display: grid;\r\n\r\n        grid-template-rows: 10% auto 10%;\r\n        grid-template-columns: 10% auto 10%;\r\n    }\r\n\r\n    .options-button {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-row: 2;\r\n        grid-column: 2;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 235%;\r\n\r\n    \tuser-select: none;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$2 = "data-v-21eda97c";
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$2 = normalizeComponent(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$3 = {
        components: {
            "options-button": __vue_component__$2
        }
    };

    /* script */
    const __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "options" } }, [
        _c(
          "div",
          { staticClass: "options-row" },
          [
            _c("options-button", {
              attrs: {
                title: "Save",
                func: function() {
                  return 3
                }
              }
            }),
            _vm._v(" "),
            _c("options-button", {
              attrs: {
                title: "Reset",
                func: function() {
                  return 4
                }
              }
            })
          ],
          1
        )
      ])
    };
    var __vue_staticRenderFns__$3 = [];
    __vue_render__$3._withStripped = true;

      /* style */
      const __vue_inject_styles__$3 = function (inject) {
        if (!inject) return
        inject("data-v-54b8fde7_0", { source: "\n#options[data-v-54b8fde7] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: repeat(4, auto);\n}\n.options-row[data-v-54b8fde7] {\n    width: 100%;\n\n    display: grid;\n\n    grid-template-columns: repeat(4, 25%);\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/options/OptionsState.vue"],"names":[],"mappings":";AAqBA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,mCAAA;AACA;AAEA;IACA,WAAA;;IAEA,aAAA;;IAEA,qCAAA;AACA","file":"OptionsState.vue","sourcesContent":["<!-- This component represents the options tab of the game -->\r\n<template>\r\n    <div id=\"options\">\r\n        <div class=\"options-row\">\r\n            <options-button title=\"Save\" v-bind:func=\"() => 3\"></options-button>\r\n            <options-button title=\"Reset\" v-bind:func=\"() => 4\"></options-button>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import OptionsButton from \"./OptionsButton.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"options-button\": OptionsButton\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #options {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: repeat(4, auto);\r\n    }\r\n\r\n    .options-row {\r\n        width: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-columns: repeat(4, 25%);\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$3 = "data-v-54b8fde7";
      /* module identifier */
      const __vue_module_identifier__$3 = undefined;
      /* functional template */
      const __vue_is_functional_template__$3 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$3 = normalizeComponent(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
        false,
        createInjector,
        undefined,
        undefined
      );

    //This enum represents all valid states the game can be in
    var gameStates = {
        main: "main",
        options: "options"
    };

    //This mixin provides access to the gameState variable in the store
    var gameState = {
        computed: {
            //Gets the current game state
            gameState() {
                return this.$store.state.gameState;
            }
        },

        methods: {
            //Sets the game state
            setGameState(gameState) {
                this.$store.commit("setGameState", gameState);
            }
        }
    };

    //

    var script$4 = {
        mixins: [gameState],

        data: () => ({
            gameStates
        }),

        components: {
            "main-state": __vue_component__$1,
            "options-state": __vue_component__$3
        }
    };

    /* script */
    const __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "game-component" } },
        [
          _vm.gameState === _vm.gameStates.main ? _c("main-state") : _vm._e(),
          _vm._v(" "),
          _vm.gameState === _vm.gameStates.options ? _c("options-state") : _vm._e()
        ],
        1
      )
    };
    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;

      /* style */
      const __vue_inject_styles__$4 = function (inject) {
        if (!inject) return
        inject("data-v-01ee9891_0", { source: "\n#game-component[data-v-01ee9891] {\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/GameComponent.vue"],"names":[],"mappings":";AA+BA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,2BAAA;AACA","file":"GameComponent.vue","sourcesContent":["<!-- This component represents the area that contains the game's UI, based on the current gameState -->\r\n<template>\r\n    <div id=\"game-component\">\r\n        <main-state v-if=\"gameState === gameStates.main\"></main-state>\r\n        <options-state v-if=\"gameState === gameStates.options\"></options-state>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import MainState from \"./states/MainState.vue\";\r\n    import OptionsState from \"./states/options/OptionsState.vue\";\r\n\r\n    import gameStates from \"../../../enums/gameStates.js\";\r\n\r\n    import gameState from \"../../../mixins/store/gameState.js\";\r\n\r\n    export default {\r\n        mixins: [gameState],\r\n\r\n        data: () => ({\r\n            gameStates\r\n        }),\r\n\r\n        components: {\r\n            \"main-state\": MainState,\r\n            \"options-state\": OptionsState\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #game-component {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$4 = "data-v-01ee9891";
      /* module identifier */
      const __vue_module_identifier__$4 = undefined;
      /* functional template */
      const __vue_is_functional_template__$4 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$4 = normalizeComponent(
        { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$5 = {
        mixins: [gameState, theme],

        props: ["text", "state"]
    };

    /* script */
    const __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        {
          staticClass: "header-item",
          class: [_vm.themeClass("header-item"), _vm.themeClass("text")],
          on: {
            click: function($event) {
              return _vm.setGameState(_vm.state)
            }
          }
        },
        [_vm._v("\n    " + _vm._s(_vm.text) + "\n")]
      )
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

      /* style */
      const __vue_inject_styles__$5 = function (inject) {
        if (!inject) return
        inject("data-v-5c1de37d_0", { source: "\n.header-item[data-v-5c1de37d] {\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    grid-row: 1;\n\n    font-size: 175%;\n\n    user-select: none;\n}\n.header-item-dark[data-v-5c1de37d] {\n\tbox-shadow: 2px 2px 2px black;\n}\n.header-item-dark[data-v-5c1de37d]:hover {\n    background-color: rgb(40, 40, 40);\n}\n.header-item-light[data-v-5c1de37d] {\n\tbox-shadow: 2px 2px 2px rgb(180, 180, 180);\n}\n.header-item-light[data-v-5c1de37d]:hover {\n    background-color: rgb(215, 215, 215);\n}\n.header-item-gradient[data-v-5c1de37d] {\n\tborder: 2px solid rgb(195, 195, 195);\n}\n.header-item-gradient[data-v-5c1de37d]:hover {\n    background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/header/HeaderItem.vue"],"names":[],"mappings":";AAmBA;IACA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,WAAA;;IAEA,eAAA;;IAEA,iBAAA;AACA;AAEA;CACA,6BAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;CACA,0CAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;CACA,oCAAA;AACA;AAEA;IACA,mEAAA;AACA","file":"HeaderItem.vue","sourcesContent":["<!-- This component represents an item in the header -->\r\n<template>\r\n    <button class=\"header-item\" @click=\"setGameState(state)\" v-bind:class=\"[themeClass('header-item'), themeClass('text')]\">\r\n        {{ text }}\r\n    </button>\r\n</template>\r\n\r\n<script>\r\n    import gameState from \"../../../mixins/store/gameState.js\";\r\n    import theme from \"../../../mixins/store/theme.js\";\r\n\r\n    export default {\r\n        mixins: [gameState, theme],\r\n\r\n        props: [\"text\", \"state\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .header-item {\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        grid-row: 1;\r\n\r\n        font-size: 175%;\r\n\r\n        user-select: none;\r\n    }\r\n\r\n    .header-item-dark {\r\n    \tbox-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .header-item-dark:hover {\r\n        background-color: rgb(40, 40, 40);\r\n    }\r\n\r\n    .header-item-light {\r\n    \tbox-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .header-item-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .header-item-gradient {\r\n    \tborder: 2px solid rgb(195, 195, 195);\r\n    }\r\n\r\n    .header-item-gradient:hover {\r\n        background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$5 = "data-v-5c1de37d";
      /* module identifier */
      const __vue_module_identifier__$5 = undefined;
      /* functional template */
      const __vue_is_functional_template__$5 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$5 = normalizeComponent(
        { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
        __vue_inject_styles__$5,
        __vue_script__$5,
        __vue_scope_id__$5,
        __vue_is_functional_template__$5,
        __vue_module_identifier__$5,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$6 = {
        mixins: [theme],

        //This seems to be a good way to load enums
        data: () => ({
            gameStates
        }),

        components: {
            "header-item": __vue_component__$5
        }
    };

    /* script */
    const __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$6 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("header"), attrs: { id: "header" } },
        [
          _c("header-item", {
            attrs: { text: "Main", state: _vm.gameStates.main }
          }),
          _vm._v(" "),
          _c("header-item", {
            attrs: { text: "Options", state: _vm.gameStates.options }
          })
        ],
        1
      )
    };
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

      /* style */
      const __vue_inject_styles__$6 = function (inject) {
        if (!inject) return
        inject("data-v-0056e6e1_0", { source: "\n#header[data-v-0056e6e1] {\n    width: 100%;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: repeat(auto-fill, auto);\n}\n.header-dark[data-v-0056e6e1] {\n    background-color: rgb(24, 24, 24);\n}\n.header-light[data-v-0056e6e1] {\n    background-color: rgb(200, 200, 200);\n}\n.header-gradient[data-v-0056e6e1] {\n    background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/header/HeaderComponent.vue"],"names":[],"mappings":";AA+BA;IACA,WAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,8CAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;IACA,mEAAA;AACA","file":"HeaderComponent.vue","sourcesContent":["<!-- This component represents the app's header -->\r\n<!-- Name is used to avoid conflicts with builtin HTML elements -->\r\n<template>\r\n    <div id=\"header\" v-bind:class=\"themeClass('header')\">\r\n        <header-item text=\"Main\" v-bind:state=\"gameStates.main\"></header-item>\r\n        <header-item text=\"Options\" v-bind:state=\"gameStates.options\"></header-item>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import HeaderItem from \"./HeaderItem.vue\";\r\n\r\n    import gameStates from \"../../../enums/gameStates.js\";\r\n\r\n    import theme from \"../../../mixins/store/theme.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        //This seems to be a good way to load enums\r\n        data: () => ({\r\n            gameStates\r\n        }),\r\n\r\n        components: {\r\n            \"header-item\": HeaderItem\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #header {\r\n        width: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: repeat(auto-fill, auto);\r\n    }\r\n\r\n    .header-dark {\r\n        background-color: rgb(24, 24, 24);\r\n    }\r\n\r\n    .header-light {\r\n        background-color: rgb(200, 200, 200);\r\n    }\r\n\r\n    .header-gradient {\r\n        background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$6 = "data-v-0056e6e1";
      /* module identifier */
      const __vue_module_identifier__$6 = undefined;
      /* functional template */
      const __vue_is_functional_template__$6 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$6 = normalizeComponent(
        { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
        __vue_inject_styles__$6,
        __vue_script__$6,
        __vue_scope_id__$6,
        __vue_is_functional_template__$6,
        __vue_module_identifier__$6,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$7 = {
        components: {
            "display-section": __vue_component__,
            "game-component": __vue_component__$4,
            "header-component": __vue_component__$6
        }
    };

    /* script */
    const __vue_script__$7 = script$7;

    /* template */
    var __vue_render__$7 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "content-container" } },
        [
          _c("header-component"),
          _vm._v(" "),
          _c("display-section"),
          _vm._v(" "),
          _c("game-component")
        ],
        1
      )
    };
    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;

      /* style */
      const __vue_inject_styles__$7 = function (inject) {
        if (!inject) return
        inject("data-v-f7da23f8_0", { source: "\n#content-container[data-v-f7da23f8] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: 5% 10% auto;\n    grid-template-columns: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/ContentContainer.vue"],"names":[],"mappings":";AAwBA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,+BAAA;IACA,2BAAA;AACA","file":"ContentContainer.vue","sourcesContent":["<!-- This component contains the app's main contents -->\r\n<template>\r\n    <div id=\"content-container\">\r\n        <header-component></header-component>\r\n        <display-section></display-section>\r\n        <game-component></game-component>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import DisplaySection from \"./display-section/DisplaySection.vue\";\r\n    import GameComponent from \"./game/GameComponent.vue\";\r\n    import HeaderComponent from \"./header/HeaderComponent.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"display-section\": DisplaySection,\r\n            \"game-component\": GameComponent,\r\n            \"header-component\": HeaderComponent\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #content-container {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 5% 10% auto;\r\n        grid-template-columns: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$7 = "data-v-f7da23f8";
      /* module identifier */
      const __vue_module_identifier__$7 = undefined;
      /* functional template */
      const __vue_is_functional_template__$7 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$7 = normalizeComponent(
        { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
        __vue_inject_styles__$7,
        __vue_script__$7,
        __vue_scope_id__$7,
        __vue_is_functional_template__$7,
        __vue_module_identifier__$7,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$8 = {
        mixins: [theme],

        components: {
            "content-container": __vue_component__$7
        }
    };

    /* script */
    const __vue_script__$8 = script$8;

    /* template */
    var __vue_render__$8 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("app"), attrs: { id: "app" } },
        [_c("content-container")],
        1
      )
    };
    var __vue_staticRenderFns__$8 = [];
    __vue_render__$8._withStripped = true;

      /* style */
      const __vue_inject_styles__$8 = function (inject) {
        if (!inject) return
        inject("data-v-7ba41ee2_0", { source: "\n#app[data-v-7ba41ee2] {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: auto;\n    grid-template-columns: auto;\n}\n.app-dark[data-v-7ba41ee2] {\n    background-color: rgb(20, 20, 20);\n}\n.app-light[data-v-7ba41ee2] {\n    background-color: rgb(210, 210, 210);\n}\n.app-gradient[data-v-7ba41ee2] {\n    background-image: linear-gradient(rgb(0, 0, 0), rgb(25, 25, 25));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/App.vue"],"names":[],"mappings":";AAsBA;IACA,kBAAA;;IAEA,MAAA;IACA,OAAA;;IAEA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,2BAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;IACA,gEAAA;AACA","file":"App.vue","sourcesContent":["<!-- This is the core app component -->\r\n<template>\r\n    <div id=\"app\" v-bind:class=\"themeClass('app')\">\r\n        <content-container></content-container>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ContentContainer from \"./content/ContentContainer.vue\";\r\n\r\n    import theme from \"../mixins/store/theme.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        components: {\r\n            \"content-container\": ContentContainer\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #app {\r\n        position: absolute;\r\n\r\n        top: 0;\r\n        left: 0;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: auto;\r\n        grid-template-columns: auto;\r\n    }\r\n\r\n    .app-dark {\r\n        background-color: rgb(20, 20, 20);\r\n    }\r\n\r\n    .app-light {\r\n        background-color: rgb(210, 210, 210);\r\n    }\r\n\r\n    .app-gradient {\r\n        background-image: linear-gradient(rgb(0, 0, 0), rgb(25, 25, 25));\r\n    }\r\n</style>\r\n\r\n<!-- Global styles -->\r\n<style>\r\n    @font-face {\r\n        font-family: \"Open Sans\";\r\n        src: url(\"../fonts/opensans-regular-webfont.woff\");\r\n    }\r\n\r\n    @font-face {\r\n        font-family: \"Plex Mono\";\r\n        src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\r\n    }\r\n\r\n    /*To let me style buttons*/\r\n    button {\r\n        all: unset\r\n    }\r\n\r\n    /*Text themes*/\r\n    .text-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Plex Mono\";\r\n    }\r\n\r\n    /* Game button themes */\r\n    .game-button-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgb(32, 32, 32);\r\n\r\n        box-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .game-button-dark:hover {\r\n        background-color: rgb(40, 40, 40);\r\n    }\r\n\r\n    .game-button-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n\r\n        background-color: rgb(200, 200, 200);\r\n\r\n        box-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .game-button-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .game-button-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgba(0, 0, 0, 0);\r\n\r\n    \tborder: 2px solid rgb(195, 195, 195);\r\n    }\r\n\r\n    .game-button-gradient:hover {\r\n    \tbackground-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n</style>\r\n"]}, media: undefined })
    ,inject("data-v-7ba41ee2_1", { source: "\n@font-face {\n    font-family: \"Open Sans\";\n    src: url(\"../fonts/opensans-regular-webfont.woff\");\n}\n@font-face {\n    font-family: \"Plex Mono\";\n    src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\n}\n\n/*To let me style buttons*/\nbutton {\n    all: unset\n}\n\n/*Text themes*/\n.text-dark {\n\tcolor: rgb(255, 255, 255);\n\tfont-family: \"Open Sans\";\n}\n.text-light {\n\tcolor: rgb(0, 0, 0);\n\tfont-family: \"Open Sans\";\n}\n.text-gradient {\n\tcolor: rgb(255, 255, 255);\n\tfont-family: \"Plex Mono\";\n}\n\n/* Game button themes */\n.game-button-dark {\n\tcolor: rgb(255, 255, 255);\n\n    background-color: rgb(32, 32, 32);\n\n    box-shadow: 2px 2px 2px black;\n}\n.game-button-dark:hover {\n    background-color: rgb(40, 40, 40);\n}\n.game-button-light {\n\tcolor: rgb(0, 0, 0);\n\n    background-color: rgb(200, 200, 200);\n\n    box-shadow: 2px 2px 2px rgb(180, 180, 180);\n}\n.game-button-light:hover {\n    background-color: rgb(215, 215, 215);\n}\n.game-button-gradient {\n\tcolor: rgb(255, 255, 255);\n\n    background-color: rgba(0, 0, 0, 0);\n\n\tborder: 2px solid rgb(195, 195, 195);\n}\n.game-button-gradient:hover {\n\tbackground-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/App.vue"],"names":[],"mappings":";AAoDA;IACA,wBAAA;IACA,kDAAA;AACA;AAEA;IACA,wBAAA;IACA,4CAAA;AACA;;AAEA,0BAAA;AACA;IACA;AACA;;AAEA,cAAA;AACA;CACA,yBAAA;CACA,wBAAA;AACA;AAEA;CACA,mBAAA;CACA,wBAAA;AACA;AAEA;CACA,yBAAA;CACA,wBAAA;AACA;;AAEA,uBAAA;AACA;CACA,yBAAA;;IAEA,iCAAA;;IAEA,6BAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;CACA,mBAAA;;IAEA,oCAAA;;IAEA,0CAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;CACA,yBAAA;;IAEA,kCAAA;;CAEA,oCAAA;AACA;AAEA;CACA,mEAAA;AACA","file":"App.vue","sourcesContent":["<!-- This is the core app component -->\r\n<template>\r\n    <div id=\"app\" v-bind:class=\"themeClass('app')\">\r\n        <content-container></content-container>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ContentContainer from \"./content/ContentContainer.vue\";\r\n\r\n    import theme from \"../mixins/store/theme.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        components: {\r\n            \"content-container\": ContentContainer\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #app {\r\n        position: absolute;\r\n\r\n        top: 0;\r\n        left: 0;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: auto;\r\n        grid-template-columns: auto;\r\n    }\r\n\r\n    .app-dark {\r\n        background-color: rgb(20, 20, 20);\r\n    }\r\n\r\n    .app-light {\r\n        background-color: rgb(210, 210, 210);\r\n    }\r\n\r\n    .app-gradient {\r\n        background-image: linear-gradient(rgb(0, 0, 0), rgb(25, 25, 25));\r\n    }\r\n</style>\r\n\r\n<!-- Global styles -->\r\n<style>\r\n    @font-face {\r\n        font-family: \"Open Sans\";\r\n        src: url(\"../fonts/opensans-regular-webfont.woff\");\r\n    }\r\n\r\n    @font-face {\r\n        font-family: \"Plex Mono\";\r\n        src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\r\n    }\r\n\r\n    /*To let me style buttons*/\r\n    button {\r\n        all: unset\r\n    }\r\n\r\n    /*Text themes*/\r\n    .text-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Plex Mono\";\r\n    }\r\n\r\n    /* Game button themes */\r\n    .game-button-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgb(32, 32, 32);\r\n\r\n        box-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .game-button-dark:hover {\r\n        background-color: rgb(40, 40, 40);\r\n    }\r\n\r\n    .game-button-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n\r\n        background-color: rgb(200, 200, 200);\r\n\r\n        box-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .game-button-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .game-button-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgba(0, 0, 0, 0);\r\n\r\n    \tborder: 2px solid rgb(195, 195, 195);\r\n    }\r\n\r\n    .game-button-gradient:hover {\r\n    \tbackground-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$8 = "data-v-7ba41ee2";
      /* module identifier */
      const __vue_module_identifier__$8 = undefined;
      /* functional template */
      const __vue_is_functional_template__$8 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$8 = normalizeComponent(
        { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
        __vue_inject_styles__$8,
        __vue_script__$8,
        __vue_scope_id__$8,
        __vue_is_functional_template__$8,
        __vue_module_identifier__$8,
        false,
        createInjector,
        undefined,
        undefined
      );

    //This enum represents all valid states the game can be in
    var themes = {
        dark: "dark",
        gradient: "gradient",
        light: "light"
    };

    var store = new Vuex.Store({
        state: {
            //Current theme
            theme: themes.dark,

            //Current game state
            gameState: gameStates.main
        },

        mutations: {
            //Sets the theme
            setTheme(state, theme) {
                state.theme = theme;
            },

            //Changes the game's state
            setGameState(state, gameState) {
                state.gameState = gameState;
            }
        }
    });

    //Exposes enums
    window.gameStates = gameStates;
    window.themes = themes;

    let app = new Vue({
        el: "#app",

        store,

        components: {
            app: __vue_component__$8
        },

        template: `<app></app>`
    });

}(Vue, Vuex));
