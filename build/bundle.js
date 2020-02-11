(function (Vue) {
    'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    //
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
      return _c("div", { attrs: { id: "header" } })
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-2d7e52ba_0", { source: "\n#header[data-v-2d7e52ba] {\n    width: 100%;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: repeat(auto-fill, auto);\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/header/Header.vue"],"names":[],"mappings":";AAYA;IACA,WAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,8CAAA;AACA","file":"Header.vue","sourcesContent":["<!-- This component represents the app's header -->\r\n<template>\r\n    <div id=\"header\">\r\n\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {};\r\n</script>\r\n\r\n<style scoped>\r\n    #header {\r\n        width: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: repeat(auto-fill, auto);\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = "data-v-2d7e52ba";
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

    var script$1 = {
        components: {
            header: __vue_component__
        }
    };

    /* script */
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _vm._m(0)
    };
    var __vue_staticRenderFns__$1 = [
      function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c("div", { attrs: { id: "content-container" } }, [_c("header")])
      }
    ];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = function (inject) {
        if (!inject) return
        inject("data-v-7e05e123_0", { source: "\n#content-container[data-v-7e05e123] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: 5% 10% auto;\n    grid-template-columns: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/ContentContainer.vue"],"names":[],"mappings":";AAkBA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,+BAAA;IACA,2BAAA;AACA","file":"ContentContainer.vue","sourcesContent":["<!-- This component contains the app's main contents -->\r\n<template>\r\n    <div id=\"content-container\">\r\n        <header></header>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import Header from \"./header/Header.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            header: Header\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #content-container {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 5% 10% auto;\r\n        grid-template-columns: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = "data-v-7e05e123";
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

    //

    var script$2 = {
        components: {
            "content-container": __vue_component__$1
        }
    };

    /* script */
    const __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "app" } }, [_c("content-container")], 1)
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      const __vue_inject_styles__$2 = function (inject) {
        if (!inject) return
        inject("data-v-488fca71_0", { source: "\n#app[data-v-488fca71] {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: auto;\n    grid-template-columns: auto;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/App.vue"],"names":[],"mappings":";AAkBA;IACA,kBAAA;;IAEA,MAAA;IACA,OAAA;;IAEA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,2BAAA;AACA","file":"App.vue","sourcesContent":["<!-- This is the core app component -->\r\n<template>\r\n    <div id=\"app\">\r\n        <content-container></content-container>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ContentContainer from \"./content/ContentContainer.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"content-container\": ContentContainer\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #app {\r\n        position: absolute;\r\n\r\n        top: 0;\r\n        left: 0;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: auto;\r\n        grid-template-columns: auto;\r\n    }\r\n</style>\r\n\r\n<!-- Global styles -->\r\n<style>\r\n    @font-face {\r\n        font-family: \"Open Sans\";\r\n        src: url(\"../fonts/opensans-regular-webfont.woff\");\r\n    }\r\n\r\n    @font-face {\r\n        font-family: \"Plex Mono\";\r\n        src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\r\n    }\r\n\r\n    /*To let me style buttons*/\r\n    button {\r\n        all: unset\r\n    }\r\n</style>\r\n"]}, media: undefined })
    ,inject("data-v-488fca71_1", { source: "\n@font-face {\n    font-family: \"Open Sans\";\n    src: url(\"../fonts/opensans-regular-webfont.woff\");\n}\n@font-face {\n    font-family: \"Plex Mono\";\n    src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\n}\n\n/*To let me style buttons*/\nbutton {\n    all: unset\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/App.vue"],"names":[],"mappings":";AAoCA;IACA,wBAAA;IACA,kDAAA;AACA;AAEA;IACA,wBAAA;IACA,4CAAA;AACA;;AAEA,0BAAA;AACA;IACA;AACA","file":"App.vue","sourcesContent":["<!-- This is the core app component -->\r\n<template>\r\n    <div id=\"app\">\r\n        <content-container></content-container>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ContentContainer from \"./content/ContentContainer.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"content-container\": ContentContainer\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #app {\r\n        position: absolute;\r\n\r\n        top: 0;\r\n        left: 0;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: auto;\r\n        grid-template-columns: auto;\r\n    }\r\n</style>\r\n\r\n<!-- Global styles -->\r\n<style>\r\n    @font-face {\r\n        font-family: \"Open Sans\";\r\n        src: url(\"../fonts/opensans-regular-webfont.woff\");\r\n    }\r\n\r\n    @font-face {\r\n        font-family: \"Plex Mono\";\r\n        src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\r\n    }\r\n\r\n    /*To let me style buttons*/\r\n    button {\r\n        all: unset\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$2 = "data-v-488fca71";
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

    let app = new Vue({
        el: "#app",

        components: {
            app: __vue_component__$2
        },

        template: `<app></app>`
    });

}(Vue));
