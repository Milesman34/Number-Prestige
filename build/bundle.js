(function (Vue, Vuex) {
    'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
    Vuex = Vuex && Vuex.hasOwnProperty('default') ? Vuex['default'] : Vuex;

    // This mixin grants access to the theme variable
    const theme = {
        methods: {
            getTheme() {
                return this.$store.state.theme;
            },

            setTheme(theme) {
                this.$store.commit("setTheme", theme);
            },

            // Creates a class for a component based on the current theme
            themeClass(className) {
                return `${className}-${this.getTheme()}`;
            }
        }
    };

    // This mixin grants access to the selector variable
    const selector = {
        methods: {
            getSelector() {
                return this.$store.state.selector;
            },

            openSelector(selector) {
                this.$store.commit("openSelector", selector);
            },

            closeSelector() {
                this.$store.commit("closeSelector");
            }
        }
    };

    // This mixin grants access to the gameState variable
    const gameState = {
        methods: {
            getGameState() {
                return this.$store.state.gameState;
            },

            setGameState(gameState) {
                this.$store.commit("setGameState", gameState);

                // Closes open selectors
                this.$store.commit("closeSelector");
            }
        }
    };

    // This mixin grants access to the score variable
    const score = {
        methods: {
            getScore() {
                return this.$store.state.score;
            },

            setScore(score) {
                this.$store.commit("setScore", score);
            },

            // Uses an underscore, since another function is named addScore
            _addScore(score) {
                this.$store.commit("addScore", score);
            },

            resetScore() {
                this.$store.commit("resetScore");
            }
        }
    };

    // This mixin grants access to the goal variable
    const goal = {
        methods: {
            getGoal() {
                return this.$store.state.goal;
            },

            setGoal(goal) {
                this.$store.commit("setGoal", goal);
            },

            increaseGoal() {
                this.$store.commit("increaseGoal");
            },

            resetGoal() {
                this.$store.commit("resetGoal");
            }
        }
    };

    // This mixin grants access to the gain variable
    const gain = {
        methods: {
            getGain() {
                return this.$store.state.gain;
            },

            setGain(gain) {
                this.$store.commit("setGain", gain);
            },

            increaseGain() {
                this.$store.commit("increaseGain");
            },

            resetGain() {
                this.$store.commit("resetGain");
            }
        }
    };

    // This mixin grants access to the prestigePoints variable
    const prestigePoints = {
        methods: {
            getPrestigePoints() {
                return this.$store.state.prestigePoints;
            },

            setPrestigePoints(prestigePoints) {
                this.$store.commit("setPrestigePoints", prestigePoints);
            },

            addPrestigePoints(prestigePoints) {
                this.$store.commit("addPrestigePoints", prestigePoints);
            },

            subtractPrestigePoints(prestigePoints) {
                this.$store.commit("subtractPrestigePoints", prestigePoints);
            }
        }
    };

    // This mixin grants access to the prestiges variable
    const prestiges = {
        methods: {
            getPrestiges() {
                return this.$store.state.prestiges;
            },

            setPrestiges(prestiges) {
                this.$store.commit("setPrestiges", prestiges);
            },

            increasePrestiges() {
                this.$store.commit("increasePrestiges");
            },

            // Checks if the player has prestiged
            hasPrestiged() {
                return this.getPrestiges() > 0;
            }
        }
    };

    // This mixin grants access to the upgrades variable
    const upgrades = {
        methods: {
            // Gets the upgrades array
            getUpgrades() {
                return this.$store.state.upgrades;
            },

            // Returns the cost of a given upgrade
            getUpgradeCost(id) {
                return this.getUpgrades()[id].cost;
            },

            // Returns the amount of a given upgrade
            getUpgradeAmount(id) {
                return this.getUpgrades()[id].amount;
            },

            // Returns the boost given by a given upgrade
            getUpgradeBoost(id) {
                return this.getUpgrades()[id].boost();
            },

            setUpgradeAmount(id, amount) {
                this.$store.commit("setUpgradeAmount", { id, amount });
            },

            setUpgradeCost(id, cost) {
                this.$store.commit("setUpgradeCost", { id, cost });
            },

            buyUpgrade(id) {
                this.$store.commit("buyUpgrade", id);
            }
        }
    };

    // This mixin grants access to the autoClick variable
    const autoClick = {
        methods: {
            // Gets the auto-click variable
            getAutoClick() {
                return this.$store.state.autoClick;
            },

            // Checks if auto-click is unlocked
            isAutoClickUnlocked() {
                return this.getAutoClick().unlocked;
            },

            // Checks if auto-click is enabled
            isAutoClickEnabled() {
                return this.getAutoClick().enabled;
            },

            // Checks if auto-click is active (unlocked + enabled)
            isAutoClickActive() {
                return this.isAutoClickUnlocked() && this.isAutoClickEnabled();
            },

            unlockAutoClick() {
                this.$store.commit("unlockAutoClick");
            },

            lockAutoClick() {
                this.$store.commit("lockAutoClick");
            },

            enableAutoClick() {
                this.$store.commit("enableAutoClick");
            },

            disableAutoClick() {
                this.$store.commit("disableAutoClick");
            },

            toggleAutoClick() {
                this.$store.commit("toggleAutoClick");
            },
        }
    };

    // This mixin grants access to the autoPrestige variable
    const autoPrestige = {
        methods: {
            // Gets the auto-prestige variable
            getAutoPrestige() {
                return this.$store.state.autoPrestige;
            },

            // Checks if auto-prestige is unlocked
            isAutoPrestigeUnlocked() {
                return this.getAutoPrestige().unlocked;
            },

            // Checks if auto-prestige is enabled
            isAutoPrestigeEnabled() {
                return this.getAutoPrestige().enabled;
            },

            // Checks if auto-prestige is active (unlocked + enabled)
            isAutoPrestigeActive() {
                return this.isAutoPrestigeUnlocked() && this.isAutoPrestigeEnabled();
            },

            unlockAutoPrestige() {
                this.$store.commit("unlockAutoPrestige");
            },

            lockAutoPrestige() {
                this.$store.commit("lockAutoPrestige");
            },

            enableAutoPrestige() {
                this.$store.commit("enableAutoPrestige");
            },

            disableAutoPrestige() {
                this.$store.commit("disableAutoPrestige");
            },

            toggleAutoPrestige() {
                this.$store.commit("toggleAutoPrestige");
            },
        }
    };

    // Gets calculated variants of certain game values
    var calculatedValues = {
        methods: {
            ...gain.methods,
            ...goal.methods,
            ...prestigePoints.methods,
            ...upgrades.methods,

            // Calculates the total number gain
            getTotalGain() {
                return this.getGain() + this.getUpgradeBoost(1);
            },

            // Calculates the actual prestige goal
            getActualGoal() {
                return Math.floor(this.getGoal() * this.getUpgradeBoost(2));
            },

            // Gets the interval for auto-click (10 / prestige points)
            // This formula is boosted by the 4th repeatable upgrade
            getAutoClickInterval() {
                return 10 / Math.max(this.getPrestigePoints() * this.getUpgradeBoost(3), 1);
            },

            // Determines if the player can prestige
            canPrestige() {
                return this.getScore() >= this.getActualGoal();
            },

            // Determines if the auto-click interval is more than once per second
            isClickIntervalSubSecond() {
                return this.getAutoClickInterval() > 1;
            }
        }
    };

    // This mixin provides some useful utility functions
    var utils = {
        methods: {
            // Capitalizes a word
            capitalize(word) {
                return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
            },

            //Rounds a number based on the given number of decimal places, rounding it normally if it is too big
            roundTo(num, places = 0) {
                return num * 10 ** places === Infinity
                    ? Math.round(num)
                    : Math.round(num * 10 ** places) / 10 ** places;
            },

            //Formats a number with scientific notation
            //limit variable controls how large a number must be to be formatted
            formatSci(num, limit = 1e6, places = 2) {
                if (num === Infinity) return "Infinity";
                if (num < 0) return `-${this.formatSci(-num, limit, places)}`;
                else if (num === 0) return "0";
                else if (num < 10 ** -places / 2)
                    return `1 / ${this.formatSci(1 / num, limit, places)}`;
                else if (num >= limit) {
                    //Splits the orders of magnitude and the amount before it to format it
                    let oom = Math.floor(Math.log10(num));
                    let div = this.roundTo(num / 10 ** oom, places);

                    return `${div}e${oom}`;
                } else return this.roundTo(num, places).toString();
            },

            //Returns the plural ending of a number (for standard uses)
            pluralEnding(num) {
                return Math.abs(num) === 1 ? "" : "s";
            }
        }
    };

    //

    var script = {
        mixins: [calculatedValues, theme, utils]
    };

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
      return _c(
        "div",
        { class: _vm.themeClass("text"), attrs: { id: "goal-display" } },
        [_vm._v("Goal: " + _vm._s(_vm.formatSci(_vm.getActualGoal())))]
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-9981f6cc_0", { source: "\n#goal-display[data-v-9981f6cc] {\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 75%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/number-display/GoalDisplay.vue"],"names":[],"mappings":";AAiBA;IACA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,cAAA;AACA","file":"GoalDisplay.vue","sourcesContent":["<!-- This component displays the goal -->\r\n<template>\r\n    <div id=\"goal-display\" v-bind:class=\"themeClass('text')\">Goal: {{ formatSci(getActualGoal()) }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../mixins/storeIO.js\";\r\n\r\n    import calculatedValues from \"../../../../mixins/calculatedValues.js\";\r\n    import utils from \"../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [calculatedValues, theme, utils]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #goal-display {\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 75%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = "data-v-9981f6cc";
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
        mixins: [score, theme, utils]
    };

    /* script */
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("text"), attrs: { id: "score-display" } },
        [_vm._v(_vm._s(_vm.formatSci(Math.floor(_vm.getScore()))))]
      )
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = function (inject) {
        if (!inject) return
        inject("data-v-7dfc4ada_0", { source: "\n#score-display[data-v-7dfc4ada] {\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 200%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/number-display/ScoreDisplay.vue"],"names":[],"mappings":";AAgBA;IACA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,eAAA;AACA","file":"ScoreDisplay.vue","sourcesContent":["<!-- This component displays the score -->\r\n<template>\r\n    <div id=\"score-display\" v-bind:class=\"themeClass('text')\">{{ formatSci(Math.floor(getScore())) }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { score, theme } from \"../../../../mixins/storeIO.js\";\r\n\r\n    import utils from \"../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [score, theme, utils]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #score-display {\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 200%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = "data-v-7dfc4ada";
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
            "goal-display": __vue_component__,
            "score-display": __vue_component__$1
        }
    };

    /* script */
    const __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "number-display" } },
        [_c("score-display"), _vm._v(" "), _c("goal-display")],
        1
      )
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      const __vue_inject_styles__$2 = function (inject) {
        if (!inject) return
        inject("data-v-78cc66b7_0", { source: "\n#number-display[data-v-78cc66b7] {\n    width: 100%;\n    height: 100%;\n\n    grid-column: 2;\n\n    display: grid;\n\n    grid-template-rows: 75% 25%;\n    grid-template-columns: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/number-display/NumberDisplay.vue"],"names":[],"mappings":";AAqBA;IACA,WAAA;IACA,YAAA;;IAEA,cAAA;;IAEA,aAAA;;IAEA,2BAAA;IACA,2BAAA;AACA","file":"NumberDisplay.vue","sourcesContent":["<!-- This component represents the section where the number is displayed -->\r\n<template>\r\n    <div id=\"number-display\">\r\n        <score-display></score-display>\r\n        <goal-display></goal-display>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import GoalDisplay from \"./GoalDisplay.vue\";\r\n    import ScoreDisplay from \"./ScoreDisplay.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"goal-display\": GoalDisplay,\r\n            \"score-display\": ScoreDisplay\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #number-display {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-column: 2;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 75% 25%;\r\n        grid-template-columns: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$2 = "data-v-78cc66b7";
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

    // This mixin has some useful game functions
    var gameFunctions = {
        methods: {
            ...autoClick.methods,
            ...autoPrestige.methods,
            ...calculatedValues.methods,
            ...gain.methods,
            ...goal.methods,
            ...prestigePoints.methods,
            ...prestiges.methods,
            ...score.methods,

            // Prestiges the game, resetting the player's score but increasing their number gain by 1 and doubling their goal
            prestige() {
                // Gives the player a warning if it is their first prestige
                if (!this.hasPrestiged() && !confirm(
                    "Are you sure you want to prestige? This will reset your score, while adding 1 to your number gain and doubling the goal. You will also receive a Prestige point."
                )) return;

                // Resets the score
                this.resetScore();

                // Updates the number gain and prestige goal
                this.increaseGain();
                this.increaseGoal();

                // Gives the player the required number of prestige points and a prestiged stat
                this.addPrestigePoints(this.getUpgradeBoost(0));
                this.increasePrestiges();

                // If the player has at least 25 prestige points, auto-prestige is enabled
                if (this.getPrestigePoints() >= 25 && !this.isAutoPrestigeUnlocked())
                    this.unlockAutoPrestige();
            },

            // Adds to the player's score
            addScore(score) {
                this._addScore(score);

                // Unlocks auto-click if the score >= 1000
                if (this.getScore() >= 1000 && !this.isAutoClickUnlocked())
                    this.unlockAutoClick();

                // Auto-prestiges if applicable
                if (this.isAutoPrestigeActive() && this.canPrestige())
                    this.prestige();
            }
        }
    };

    //

    var script$3 = {
        mixins: [gameFunctions, theme, utils, upgrades]
    };

    /* script */
    const __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        {
          class: [_vm.themeClass("game-button"), _vm.themeClass("text")],
          attrs: { id: "prestige-button" },
          on: {
            click: function($event) {
              return _vm.prestige()
            }
          }
        },
        [
          _vm._v(
            "Prestige for " +
              _vm._s(_vm.getUpgradeBoost(0)) +
              " Prestige Point" +
              _vm._s(_vm.pluralEnding(_vm.getUpgradeBoost(0)))
          )
        ]
      )
    };
    var __vue_staticRenderFns__$3 = [];
    __vue_render__$3._withStripped = true;

      /* style */
      const __vue_inject_styles__$3 = function (inject) {
        if (!inject) return
        inject("data-v-2500f0ed_0", { source: "\n#prestige-button[data-v-2500f0ed] {\n    width: 55%;\n    height: 100%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 92.5%;\n\n    text-align: center;\n\n    user-select: none;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/prestige-display/PrestigeButton.vue"],"names":[],"mappings":";AAiBA;IACA,UAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,gBAAA;;IAEA,kBAAA;;IAEA,iBAAA;AACA","file":"PrestigeButton.vue","sourcesContent":["<!-- This component represents the button for prestiging -->\r\n<template>\r\n    <button id=\"prestige-button\" @click=\"prestige()\" v-bind:class=\"[themeClass('game-button'), themeClass('text')]\">Prestige for {{ getUpgradeBoost(0) }} Prestige Point{{ pluralEnding(getUpgradeBoost(0)) }}</button>\r\n</template>\r\n\r\n<script>\r\n    import { theme, upgrades } from \"../../../../mixins/storeIO.js\";\r\n\r\n    import gameFunctions from \"../../../../mixins/gameFunctions.js\";\r\n    import utils from \"../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [gameFunctions, theme, utils, upgrades]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #prestige-button {\r\n        width: 55%;\r\n        height: 100%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 92.5%;\r\n\r\n        text-align: center;\r\n\r\n        user-select: none;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$3 = "data-v-2500f0ed";
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

    //

    var script$4 = {
        mixins: [prestigePoints, theme, utils]
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
        { class: _vm.themeClass("text"), attrs: { id: "prestige-point-display" } },
        [
          _vm._v(
            "You have " +
              _vm._s(_vm.formatSci(_vm.getPrestigePoints())) +
              " Prestige Point" +
              _vm._s(_vm.pluralEnding(_vm.getPrestigePoints()))
          )
        ]
      )
    };
    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;

      /* style */
      const __vue_inject_styles__$4 = function (inject) {
        if (!inject) return
        inject("data-v-3d5b4a2a_0", { source: "\n#prestige-point-display[data-v-3d5b4a2a] {\n    width: 100%;\n    height: 100%;\n\n    grid-row: 1;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 72%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/prestige-display/PrestigePointDisplay.vue"],"names":[],"mappings":";AAgBA;IACA,WAAA;IACA,YAAA;;IAEA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,cAAA;AACA","file":"PrestigePointDisplay.vue","sourcesContent":["<!-- This component displays how many prestige points the player has -->\r\n<template>\r\n    <div id=\"prestige-point-display\" v-bind:class=\"themeClass('text')\">You have {{ formatSci(getPrestigePoints()) }} Prestige Point{{ pluralEnding(getPrestigePoints()) }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { prestigePoints, theme } from \"../../../../mixins/storeIO.js\";\r\n\r\n    import utils from \"../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [prestigePoints, theme, utils]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #prestige-point-display {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-row: 1;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 72%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$4 = "data-v-3d5b4a2a";
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
        mixins: [calculatedValues, prestiges, score],

        components: {
            "prestige-button": __vue_component__$3,
            "prestige-point-display": __vue_component__$4
        }
    };

    /* script */
    const __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "prestige-display" } },
        [
          _vm.hasPrestiged() ? _c("prestige-point-display") : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { id: "prestige-button-container" } },
            [_vm.canPrestige() ? _c("prestige-button") : _vm._e()],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

      /* style */
      const __vue_inject_styles__$5 = function (inject) {
        if (!inject) return
        inject("data-v-55c9e568_0", { source: "\n#prestige-display[data-v-55c9e568] {\n    width: 100%;\n    height: 100%;\n\n    grid-column: 3;\n\n    display: grid;\n}\n#prestige-button-container[data-v-55c9e568] {\n\twidth: 100%;\n\theight: 100%;\n\n\tgrid-row: 2;\n\n\tdisplay: flex;\n\n    justify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/prestige-display/PrestigeDisplay.vue"],"names":[],"mappings":";AA8BA;IACA,WAAA;IACA,YAAA;;IAEA,cAAA;;IAEA,aAAA;AACA;AAEA;CACA,WAAA;CACA,YAAA;;CAEA,WAAA;;CAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;AACA","file":"PrestigeDisplay.vue","sourcesContent":["<!-- This component contains the prestige points display and the prestige button -->\r\n<template>\r\n    <div id=\"prestige-display\">\r\n        <prestige-point-display v-if=\"hasPrestiged()\"></prestige-point-display>\r\n\r\n        <div id=\"prestige-button-container\">\r\n            <prestige-button v-if=\"canPrestige()\"></prestige-button>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import PrestigeButton from \"./PrestigeButton.vue\";\r\n    import PrestigePointDisplay from \"./PrestigePointDisplay.vue\";\r\n\r\n    import { prestiges, score } from \"../../../../mixins/storeIO.js\";\r\n\r\n    import calculatedValues from \"../../../../mixins/calculatedValues.js\";\r\n\r\n    export default {\r\n        mixins: [calculatedValues, prestiges, score],\r\n\r\n        components: {\r\n            \"prestige-button\": PrestigeButton,\r\n            \"prestige-point-display\": PrestigePointDisplay\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #prestige-display {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-column: 3;\r\n\r\n        display: grid;\r\n    }\r\n\r\n    #prestige-button-container {\r\n    \twidth: 100%;\r\n    \theight: 100%;\r\n\r\n    \tgrid-row: 2;\r\n\r\n    \tdisplay: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$5 = "data-v-55c9e568";
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
        components: {
            "number-display": __vue_component__$2,
            "prestige-display": __vue_component__$5
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
        { attrs: { id: "display-section" } },
        [_c("number-display"), _vm._v(" "), _c("prestige-display")],
        1
      )
    };
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

      /* style */
      const __vue_inject_styles__$6 = function (inject) {
        if (!inject) return
        inject("data-v-788f7464_0", { source: "\n#display-section[data-v-788f7464] {\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: 30% 40% 30%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/display-section/DisplaySection.vue"],"names":[],"mappings":";AAqBA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,kCAAA;AACA","file":"DisplaySection.vue","sourcesContent":["<!-- This component represents the section used to display the player's score -->\r\n<template>\r\n    <div id=\"display-section\">\r\n        <number-display></number-display>\r\n        <prestige-display></prestige-display>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import NumberDisplay from \"./number-display/NumberDisplay.vue\";\r\n    import PrestigeDisplay from \"./prestige-display/PrestigeDisplay.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"number-display\": NumberDisplay,\r\n            \"prestige-display\": PrestigeDisplay\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #display-section {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: 30% 40% 30%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$6 = "data-v-788f7464";
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
        mixins: [theme],

        props: ["text"]
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
        {
          staticClass: "automation-next-unlock-text",
          class: _vm.themeClass("text")
        },
        [_vm._v(_vm._s(_vm.text))]
      )
    };
    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;

      /* style */
      const __vue_inject_styles__$7 = function (inject) {
        if (!inject) return
        inject("data-v-665e8bcc_0", { source: "\n.automation-next-unlock-text[data-v-665e8bcc] {\n    height: 95%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 90%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/automation/AutomationNextUnlockText.vue"],"names":[],"mappings":";AAgBA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,cAAA;AACA","file":"AutomationNextUnlockText.vue","sourcesContent":["<!-- This component displays the next piece of automation that can be unlocked -->\r\n<template>\r\n    <div class=\"automation-next-unlock-text\" v-bind:class=\"themeClass('text')\" >{{ text }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        props: [\"text\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .automation-next-unlock-text {\r\n        height: 95%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 90%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$7 = "data-v-665e8bcc";
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

        props: ["text", "func", "condition"]
    };

    /* script */
    const __vue_script__$8 = script$8;

    /* template */
    var __vue_render__$8 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        {
          staticClass: "automation-toggle-button",
          class: [_vm.themeClass("text"), _vm.themeClass("game-button")],
          on: { click: _vm.func }
        },
        [_vm._v(_vm._s(_vm.text) + ": " + _vm._s(_vm.condition() ? "On" : "Off"))]
      )
    };
    var __vue_staticRenderFns__$8 = [];
    __vue_render__$8._withStripped = true;

      /* style */
      const __vue_inject_styles__$8 = function (inject) {
        if (!inject) return
        inject("data-v-e71fd2ee_0", { source: "\n.automation-toggle-button[data-v-e71fd2ee] {\n    user-select: none;\n    padding: 5px;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/automation/AutomationToggleButton.vue"],"names":[],"mappings":";AAgBA;IACA,iBAAA;IACA,YAAA;AACA","file":"AutomationToggleButton.vue","sourcesContent":["<!-- This button toggles auto-click -->\r\n<template>\r\n    <button class=\"automation-toggle-button\" v-bind:class=\"[themeClass('text'), themeClass('game-button')]\" @click=\"func\">{{ text }}: {{ condition() ? \"On\" : \"Off\" }}</button>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        props: [\"text\", \"func\", \"condition\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .automation-toggle-button {\r\n        user-select: none;\r\n        padding: 5px;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$8 = "data-v-e71fd2ee";
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

    //

    var script$9 = {
        mixins: [utils],

        props: ["number"]
    };

    /* script */
    const __vue_script__$9 = script$9;

    /* template */
    var __vue_render__$9 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("font", { staticClass: "autoclick-speed-text-big" }, [
        _vm._v(_vm._s(_vm.formatSci(_vm.number)))
      ])
    };
    var __vue_staticRenderFns__$9 = [];
    __vue_render__$9._withStripped = true;

      /* style */
      const __vue_inject_styles__$9 = function (inject) {
        if (!inject) return
        inject("data-v-0e4ad612_0", { source: "\n.autoclick-speed-text-big[data-v-0e4ad612] {\n    font-size: 175%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/automation/auto-click/auto-click-speed-text/AutoClickSpeedDisplay.vue"],"names":[],"mappings":";AAgBA;IACA,eAAA;AACA","file":"AutoClickSpeedDisplay.vue","sourcesContent":["<!-- Text that displays the auto-click interval -->\r\n<template>\r\n    <font class=\"autoclick-speed-text-big\">{{ formatSci(number) }}</font>\r\n</template>\r\n\r\n<script>\r\n    import utils from \"../../../../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [utils],\r\n\r\n        props: [\"number\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .autoclick-speed-text-big {\r\n        font-size: 175%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$9 = "data-v-0e4ad612";
      /* module identifier */
      const __vue_module_identifier__$9 = undefined;
      /* functional template */
      const __vue_is_functional_template__$9 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$9 = normalizeComponent(
        { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
        __vue_inject_styles__$9,
        __vue_script__$9,
        __vue_scope_id__$9,
        __vue_is_functional_template__$9,
        __vue_module_identifier__$9,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$a = {
        mixins: [calculatedValues, theme, utils],

        methods: {
            // Returns the text rendered before the number
            getRenderedPreText() {
                return this.isClickIntervalSubSecond() ? "once every " : "";
            },

            // Returns the number rendered
            getRenderedNumber() {
                return this.isClickIntervalSubSecond() ? this.getAutoClickInterval() : 1 / this.getAutoClickInterval();
            },

            // Returns the text rendered after the number
            getRenderedPostText() {
                return this.isClickIntervalSubSecond() ? " seconds" : ` time${this.pluralEnding(this.getAutoClickInterval())} per second`;
            }
        },

        components: {
            "auto-click-speed-display": __vue_component__$9
        }
    };

    /* script */
    const __vue_script__$a = script$a;

    /* template */
    var __vue_render__$a = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("text"), attrs: { id: "autoclick-speed-text" } },
        [
          _vm._v(
            "\n    Based on your Prestige Points, Auto-Click currently clicks " +
              _vm._s(_vm.getRenderedPreText())
          ),
          _c("auto-click-speed-display", {
            attrs: { number: _vm.getRenderedNumber() }
          }),
          _vm._v(_vm._s(_vm.getRenderedPostText()) + "\n")
        ],
        1
      )
    };
    var __vue_staticRenderFns__$a = [];
    __vue_render__$a._withStripped = true;

      /* style */
      const __vue_inject_styles__$a = function (inject) {
        if (!inject) return
        inject("data-v-373620c1_0", { source: "\n#autoclick-speed-text[data-v-373620c1] {\n    width: 40%;\n\n    font-size: 85%;\n\n    text-align: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/automation/auto-click/auto-click-speed-text/AutoClickSpeedText.vue"],"names":[],"mappings":";AA0CA;IACA,UAAA;;IAEA,cAAA;;IAEA,kBAAA;AACA","file":"AutoClickSpeedText.vue","sourcesContent":["<!-- This component displays how fast auto-click currently is -->\r\n<template>\r\n    <div id=\"autoclick-speed-text\" v-bind:class=\"themeClass('text')\">\r\n        Based on your Prestige Points, Auto-Click currently clicks {{ getRenderedPreText() }}<auto-click-speed-display v-bind:number=\"getRenderedNumber()\"></auto-click-speed-display>{{ getRenderedPostText() }}\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import AutoClickSpeedDisplay from \"./AutoClickSpeedDisplay.vue\";\r\n\r\n    import { theme } from \"../../../../../../../mixins/storeIO.js\";\r\n\r\n    import calculatedValues from \"../../../../../../../mixins/calculatedValues.js\";\r\n    import utils from \"../../../../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [calculatedValues, theme, utils],\r\n\r\n        methods: {\r\n            // Returns the text rendered before the number\r\n            getRenderedPreText() {\r\n                return this.isClickIntervalSubSecond() ? \"once every \" : \"\";\r\n            },\r\n\r\n            // Returns the number rendered\r\n            getRenderedNumber() {\r\n                return this.isClickIntervalSubSecond() ? this.getAutoClickInterval() : 1 / this.getAutoClickInterval();\r\n            },\r\n\r\n            // Returns the text rendered after the number\r\n            getRenderedPostText() {\r\n                return this.isClickIntervalSubSecond() ? \" seconds\" : ` time${this.pluralEnding(this.getAutoClickInterval())} per second`;\r\n            }\r\n        },\r\n\r\n        components: {\r\n            \"auto-click-speed-display\": AutoClickSpeedDisplay\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #autoclick-speed-text {\r\n        width: 40%;\r\n\r\n        font-size: 85%;\r\n\r\n        text-align: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$a = "data-v-373620c1";
      /* module identifier */
      const __vue_module_identifier__$a = undefined;
      /* functional template */
      const __vue_is_functional_template__$a = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$a = normalizeComponent(
        { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
        __vue_inject_styles__$a,
        __vue_script__$a,
        __vue_scope_id__$a,
        __vue_is_functional_template__$a,
        __vue_module_identifier__$a,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$b = {
        mixins: [autoClick],

        components: {
            "automation-toggle-button": __vue_component__$8,
            "auto-click-speed-text": __vue_component__$a
        }
    };

    /* script */
    const __vue_script__$b = script$b;

    /* template */
    var __vue_render__$b = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "autoclick" } }, [
        _c(
          "div",
          { attrs: { id: "autoclick-toggle-bar" } },
          [
            _c("automation-toggle-button", {
              attrs: {
                text: "Auto-Click",
                func: _vm.toggleAutoClick,
                condition: _vm.isAutoClickEnabled
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { attrs: { id: "autoclick-speed-text-container" } },
          [_c("auto-click-speed-text")],
          1
        )
      ])
    };
    var __vue_staticRenderFns__$b = [];
    __vue_render__$b._withStripped = true;

      /* style */
      const __vue_inject_styles__$b = function (inject) {
        if (!inject) return
        inject("data-v-599fd004_0", { source: "\n#autoclick[data-v-599fd004] {\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: 50% 50%;\n}\n#autoclick-toggle-bar[data-v-599fd004] {\n\twidth: 100%;\n\n\tdisplay: flex;\n\n\tjustify-content: center;\n    align-items: center;\n}\n#autoclick-speed-text-container[data-v-599fd004] {\n\tdisplay: flex;\n\n\tjustify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/automation/auto-click/AutoClick.vue"],"names":[],"mappings":";AA+BA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,2BAAA;AACA;AAEA;CACA,WAAA;;CAEA,aAAA;;CAEA,uBAAA;IACA,mBAAA;AACA;AAEA;CACA,aAAA;;CAEA,uBAAA;IACA,mBAAA;AACA","file":"AutoClick.vue","sourcesContent":["<!-- This component represents the auto-click element -->\r\n<template>\r\n    <div id=\"autoclick\">\r\n        <div id=\"autoclick-toggle-bar\">\r\n            <automation-toggle-button text=\"Auto-Click\" v-bind:func=\"toggleAutoClick\" v-bind:condition=\"isAutoClickEnabled\"></automation-toggle-button>\r\n        </div>\r\n\r\n        <div id=\"autoclick-speed-text-container\">\r\n            <auto-click-speed-text></auto-click-speed-text>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import AutomationToggleButton from \"../AutomationToggleButton.vue\";\r\n\r\n    import AutoClickSpeedText from \"./auto-click-speed-text/AutoClickSpeedText.vue\";\r\n\r\n    import { autoClick } from \"../../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [autoClick],\r\n\r\n        components: {\r\n            \"automation-toggle-button\": AutomationToggleButton,\r\n            \"auto-click-speed-text\": AutoClickSpeedText\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #autoclick {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 50% 50%;\r\n    }\r\n\r\n    #autoclick-toggle-bar {\r\n    \twidth: 100%;\r\n\r\n    \tdisplay: flex;\r\n\r\n    \tjustify-content: center;\r\n        align-items: center;\r\n    }\r\n\r\n    #autoclick-speed-text-container {\r\n    \tdisplay: flex;\r\n\r\n    \tjustify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$b = "data-v-599fd004";
      /* module identifier */
      const __vue_module_identifier__$b = undefined;
      /* functional template */
      const __vue_is_functional_template__$b = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$b = normalizeComponent(
        { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
        __vue_inject_styles__$b,
        __vue_script__$b,
        __vue_scope_id__$b,
        __vue_is_functional_template__$b,
        __vue_module_identifier__$b,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$c = {
        mixins: [autoPrestige],

        components: {
            "automation-toggle-button": __vue_component__$8
        }
    };

    /* script */
    const __vue_script__$c = script$c;

    /* template */
    var __vue_render__$c = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "autoprestige-toggle-bar" } },
        [
          _c("automation-toggle-button", {
            attrs: {
              text: "Auto-Prestige",
              func: _vm.toggleAutoPrestige,
              condition: _vm.isAutoPrestigeEnabled
            }
          })
        ],
        1
      )
    };
    var __vue_staticRenderFns__$c = [];
    __vue_render__$c._withStripped = true;

      /* style */
      const __vue_inject_styles__$c = function (inject) {
        if (!inject) return
        inject("data-v-d5b958d8_0", { source: "\n#autoprestige-toggle-bar[data-v-d5b958d8] {\n\twidth: 100%;\n\n\tdisplay: flex;\n\n\tjustify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/automation/AutoPrestige.vue"],"names":[],"mappings":";AAsBA;CACA,WAAA;;CAEA,aAAA;;CAEA,uBAAA;IACA,mBAAA;AACA","file":"AutoPrestige.vue","sourcesContent":["<!-- This component represents the auto-prestige element -->\r\n<template>\r\n    <div id=\"autoprestige-toggle-bar\">\r\n        <automation-toggle-button text=\"Auto-Prestige\" v-bind:func=\"toggleAutoPrestige\" v-bind:condition=\"isAutoPrestigeEnabled\"></automation-toggle-button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import AutomationToggleButton from \"./AutomationToggleButton.vue\";\r\n\r\n    import { autoPrestige } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [autoPrestige],\r\n\r\n        components: {\r\n            \"automation-toggle-button\": AutomationToggleButton\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #autoprestige-toggle-bar {\r\n    \twidth: 100%;\r\n\r\n    \tdisplay: flex;\r\n\r\n    \tjustify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$c = "data-v-d5b958d8";
      /* module identifier */
      const __vue_module_identifier__$c = undefined;
      /* functional template */
      const __vue_is_functional_template__$c = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$c = normalizeComponent(
        { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
        __vue_inject_styles__$c,
        __vue_script__$c,
        __vue_scope_id__$c,
        __vue_is_functional_template__$c,
        __vue_module_identifier__$c,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$d = {
        mixins: [autoClick, autoPrestige],

        components: {
            "automation-next-unlock-text": __vue_component__$7,
            "auto-click": __vue_component__$b,
            "auto-prestige": __vue_component__$c
        }
    };

    /* script */
    const __vue_script__$d = script$d;

    /* template */
    var __vue_render__$d = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "automation" } },
        [
          _c(
            "div",
            { attrs: { id: "automation-next-unlock" } },
            [
              !_vm.isAutoClickUnlocked()
                ? _c("automation-next-unlock-text", {
                    attrs: { text: "Unlock Auto-Click at 1000 points" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.isAutoClickUnlocked() && !_vm.isAutoPrestigeUnlocked()
                ? _c("automation-next-unlock-text", {
                    attrs: { text: "Unlock Auto-Prestige at 25 Prestige Points" }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _vm.isAutoClickUnlocked() ? _c("auto-click") : _vm._e(),
          _vm._v(" "),
          _vm.isAutoPrestigeUnlocked() ? _c("auto-prestige") : _vm._e()
        ],
        1
      )
    };
    var __vue_staticRenderFns__$d = [];
    __vue_render__$d._withStripped = true;

      /* style */
      const __vue_inject_styles__$d = function (inject) {
        if (!inject) return
        inject("data-v-0b36ee06_0", { source: "\n#automation[data-v-0b36ee06] {\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: 12% 18% 12% auto;\n}\n#automation-next-unlock[data-v-0b36ee06] {\n\twidth: 100%;\n\theight: 100%;\n\n\tdisplay: flex;\n\n    justify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/automation/AutomationState.vue"],"names":[],"mappings":";AAiCA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,oCAAA;AACA;AAEA;CACA,WAAA;CACA,YAAA;;CAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;AACA","file":"AutomationState.vue","sourcesContent":["<!-- This component represents the automation tab of the game -->\r\n<template>\r\n    <div id=\"automation\">\r\n        <div id=\"automation-next-unlock\">\r\n            <automation-next-unlock-text text=\"Unlock Auto-Click at 1000 points\" v-if=\"!isAutoClickUnlocked()\"></automation-next-unlock-text>\r\n            <automation-next-unlock-text text=\"Unlock Auto-Prestige at 25 Prestige Points\" v-if=\"isAutoClickUnlocked() && !isAutoPrestigeUnlocked()\"></automation-next-unlock-text>\r\n        </div>\r\n\r\n        <auto-click v-if=\"isAutoClickUnlocked()\"></auto-click>\r\n        <auto-prestige v-if=\"isAutoPrestigeUnlocked()\"></auto-prestige>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import AutomationNextUnlockText from \"./AutomationNextUnlockText.vue\";\r\n\r\n    import AutoClick from \"./auto-click/AutoClick.vue\";\r\n    import AutoPrestige from \"./AutoPrestige.vue\";\r\n\r\n    import { autoClick, autoPrestige } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [autoClick, autoPrestige],\r\n\r\n        components: {\r\n            \"automation-next-unlock-text\": AutomationNextUnlockText,\r\n            \"auto-click\": AutoClick,\r\n            \"auto-prestige\": AutoPrestige\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #automation {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 12% 18% 12% auto;\r\n    }\r\n\r\n    #automation-next-unlock {\r\n    \twidth: 100%;\r\n    \theight: 100%;\r\n\r\n    \tdisplay: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$d = "data-v-0b36ee06";
      /* module identifier */
      const __vue_module_identifier__$d = undefined;
      /* functional template */
      const __vue_is_functional_template__$d = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$d = normalizeComponent(
        { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
        __vue_inject_styles__$d,
        __vue_script__$d,
        __vue_scope_id__$d,
        __vue_is_functional_template__$d,
        __vue_module_identifier__$d,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$e = {
        mixins: [autoClick, calculatedValues, gameFunctions, theme, utils]
    };

    /* script */
    const __vue_script__$e = script$e;

    /* template */
    var __vue_render__$e = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        {
          class: [_vm.themeClass("game-button"), _vm.themeClass("text")],
          attrs: { id: "click-button" },
          on: {
            click: function() {
              return _vm.addScore(_vm.getTotalGain())
            }
          }
        },
        [_vm._v("Increase number by " + _vm._s(_vm.formatSci(_vm.getTotalGain())))]
      )
    };
    var __vue_staticRenderFns__$e = [];
    __vue_render__$e._withStripped = true;

      /* style */
      const __vue_inject_styles__$e = function (inject) {
        if (!inject) return
        inject("data-v-6f2f640a_0", { source: "\n#click-button[data-v-6f2f640a] {\n    width: 22%;\n    height: 35%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/main/ClickButton.vue"],"names":[],"mappings":";AAkBA;IACA,UAAA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,eAAA;AACA","file":"ClickButton.vue","sourcesContent":["<!-- This component is for the button clicked to increase the player's score -->\r\n<template>\r\n    <button id=\"click-button\" v-bind:class=\"[themeClass('game-button'), themeClass('text')]\" v-on:click=\"() => addScore(getTotalGain())\">Increase number by {{ formatSci(getTotalGain()) }}</button>\r\n</template>\r\n\r\n<script>\r\n    import { autoClick, gain, score, theme, upgrades } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    import calculatedValues from \"../../../../../mixins/calculatedValues.js\";\r\n    import gameFunctions from \"../../../../../mixins/gameFunctions.js\";\r\n    import utils from \"../../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [autoClick, calculatedValues, gameFunctions, theme, utils]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #click-button {\r\n        width: 22%;\r\n        height: 35%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$e = "data-v-6f2f640a";
      /* module identifier */
      const __vue_module_identifier__$e = undefined;
      /* functional template */
      const __vue_is_functional_template__$e = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$e = normalizeComponent(
        { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
        __vue_inject_styles__$e,
        __vue_script__$e,
        __vue_scope_id__$e,
        __vue_is_functional_template__$e,
        __vue_module_identifier__$e,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$f = {
        components: {
            "click-button": __vue_component__$e
        }
    };

    /* script */
    const __vue_script__$f = script$f;

    /* template */
    var __vue_render__$f = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "main" } }, [
        _c(
          "div",
          { attrs: { id: "click-button-container" } },
          [_c("click-button")],
          1
        )
      ])
    };
    var __vue_staticRenderFns__$f = [];
    __vue_render__$f._withStripped = true;

      /* style */
      const __vue_inject_styles__$f = function (inject) {
        if (!inject) return
        inject("data-v-6f557658_0", { source: "\n#main[data-v-6f557658] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: 30% 70%;\n    grid-template-columns: 100%;\n}\n#click-button-container[data-v-6f557658] {\n\tgrid-row: 1;\n\tgrid-column: 1;\n\n\tdisplay: flex;\n\n    justify-content: center;\n    align-items: center;\n\n\tuser-select: none;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/main/MainState.vue"],"names":[],"mappings":";AAoBA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,2BAAA;IACA,2BAAA;AACA;AAEA;CACA,WAAA;CACA,cAAA;;CAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;CAEA,iBAAA;AACA","file":"MainState.vue","sourcesContent":["<!-- This component represents the main area of the game -->\r\n<template>\r\n    <div id=\"main\">\r\n        <div id=\"click-button-container\">\r\n            <click-button></click-button>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ClickButton from \"./ClickButton.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"click-button\": ClickButton\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #main {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 30% 70%;\r\n        grid-template-columns: 100%;\r\n    }\r\n\r\n    #click-button-container {\r\n    \tgrid-row: 1;\r\n    \tgrid-column: 1;\r\n\r\n    \tdisplay: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n    \tuser-select: none;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$f = "data-v-6f557658";
      /* module identifier */
      const __vue_module_identifier__$f = undefined;
      /* functional template */
      const __vue_is_functional_template__$f = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$f = normalizeComponent(
        { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
        __vue_inject_styles__$f,
        __vue_script__$f,
        __vue_scope_id__$f,
        __vue_is_functional_template__$f,
        __vue_module_identifier__$f,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$g = {
        mixins: [theme],

        props: ["title", "func"]
    };

    /* script */
    const __vue_script__$g = script$g;

    /* template */
    var __vue_render__$g = function() {
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
    var __vue_staticRenderFns__$g = [];
    __vue_render__$g._withStripped = true;

      /* style */
      const __vue_inject_styles__$g = function (inject) {
        if (!inject) return
        inject("data-v-15c79276_0", { source: "\n.options-button[data-v-15c79276] {\n    width: 100%;\n    height: 100%;\n\n    grid-row: 2;\n    grid-column: 2;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 235%;\n\n\tuser-select: none;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/options/OptionsButton.vue"],"names":[],"mappings":";AAoBA;IACA,WAAA;IACA,YAAA;;IAEA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,eAAA;;CAEA,iBAAA;AACA","file":"OptionsButton.vue","sourcesContent":["<!-- This button triggers an action -->\r\n<template>\r\n    <div class=\"options-button-container\">\r\n        <button class=\"options-button\" v-bind:class=\"[themeClass('game-button'), themeClass('text')]\" @click=\"func\">\r\n            {{ title }}\r\n        </button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        props: [\"title\", \"func\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .options-button {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-row: 2;\r\n        grid-column: 2;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 235%;\r\n\r\n    \tuser-select: none;\r\n    }\r\n</style>\r\n\r\n<style>\r\n    .options-button-container {\r\n        display: grid;\r\n\r\n        grid-template-rows: 10% auto 10%;\r\n        grid-template-columns: 10% auto 10%;\r\n    }\r\n</style>\r\n"]}, media: undefined })
    ,inject("data-v-15c79276_1", { source: "\n.options-button-container {\n    display: grid;\n\n    grid-template-rows: 10% auto 10%;\n    grid-template-columns: 10% auto 10%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/options/OptionsButton.vue"],"names":[],"mappings":";AAuCA;IACA,aAAA;;IAEA,gCAAA;IACA,mCAAA;AACA","file":"OptionsButton.vue","sourcesContent":["<!-- This button triggers an action -->\r\n<template>\r\n    <div class=\"options-button-container\">\r\n        <button class=\"options-button\" v-bind:class=\"[themeClass('game-button'), themeClass('text')]\" @click=\"func\">\r\n            {{ title }}\r\n        </button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        props: [\"title\", \"func\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .options-button {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-row: 2;\r\n        grid-column: 2;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 235%;\r\n\r\n    \tuser-select: none;\r\n    }\r\n</style>\r\n\r\n<style>\r\n    .options-button-container {\r\n        display: grid;\r\n\r\n        grid-template-rows: 10% auto 10%;\r\n        grid-template-columns: 10% auto 10%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$g = "data-v-15c79276";
      /* module identifier */
      const __vue_module_identifier__$g = undefined;
      /* functional template */
      const __vue_is_functional_template__$g = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$g = normalizeComponent(
        { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
        __vue_inject_styles__$g,
        __vue_script__$g,
        __vue_scope_id__$g,
        __vue_is_functional_template__$g,
        __vue_module_identifier__$g,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$h = {
        mixins: [theme, utils]
    };

    /* script */
    const __vue_script__$h = script$h;

    /* template */
    var __vue_render__$h = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("text"), attrs: { id: "theme-options-current" } },
        [_vm._v("Currently: " + _vm._s(_vm.capitalize(_vm.getTheme())))]
      )
    };
    var __vue_staticRenderFns__$h = [];
    __vue_render__$h._withStripped = true;

      /* style */
      const __vue_inject_styles__$h = function (inject) {
        if (!inject) return
        inject("data-v-8e0341de_0", { source: "\n#theme-options-current[data-v-8e0341de] {\n    font-size: 95%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/options/theme-options-button/CurrentThemeDisplayText.vue"],"names":[],"mappings":";AAeA;IACA,cAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;AACA","file":"CurrentThemeDisplayText.vue","sourcesContent":["<!-- This component displays the current theme -->\r\n<template>\r\n    <div id=\"theme-options-current\" v-bind:class=\"themeClass('text')\">Currently: {{ capitalize(getTheme()) }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../../../mixins/storeIO.js\";\r\n    import utils from \"../../../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [theme, utils]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #theme-options-current {\r\n        font-size: 95%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$h = "data-v-8e0341de";
      /* module identifier */
      const __vue_module_identifier__$h = undefined;
      /* functional template */
      const __vue_is_functional_template__$h = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$h = normalizeComponent(
        { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
        __vue_inject_styles__$h,
        __vue_script__$h,
        __vue_scope_id__$h,
        __vue_is_functional_template__$h,
        __vue_module_identifier__$h,
        false,
        createInjector,
        undefined,
        undefined
      );

    // This enum represents all valid themes
    const themes = {
        light: "light",
        dark: "dark",
        gradient: "gradient"
    };

    // This enum represents all valid game states
    const gameStates = {
        main: "main",
        options: "options",
        upgrades: "upgrades",
        automation: "automation"
    };

    // This enum represents all valid selector states
    const selectorStates = {
        none: "none",
        theme: "theme"
    };

    // This enum represents the default save file
    const defaultSave = {
        theme: themes.light,
        gameState: gameStates.main,
        score: 0,
        goal: 10,
        gain: 1,
        prestigePoints: 0,
        prestiges: 0,

        upgrades: [
            {
                cost: 2,
                amount: 0
            },

            {
                cost: 4,
                amount: 0
            },

            {
                cost: 5,
                amount: 0
            },

            {
                cost: 4,
                amount: 0
            }
        ],

        autoClick: {
            unlocked: false,
            enabled: true
        },

        autoPrestige: {
            unlocked: false,
            enabled: true
        }
    };

    //

    var script$i = {
        mixins: [selector, theme],

        data: () => ({
            selectorStates
        }),

        components: {
            "current-theme-display-text": __vue_component__$h
        }
    };

    /* script */
    const __vue_script__$i = script$i;

    /* template */
    var __vue_render__$i = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "options-button-container" }, [
        _c(
          "button",
          {
            class: [_vm.themeClass("game-button"), _vm.themeClass("text")],
            attrs: { id: "theme-options-button" },
            on: {
              click: function($event) {
                return _vm.openSelector(_vm.selectorStates.theme)
              }
            }
          },
          [
            _c(
              "div",
              { attrs: { id: "theme-options-container" } },
              [
                _c(
                  "div",
                  {
                    class: _vm.themeClass("text"),
                    attrs: { id: "theme-options-text" }
                  },
                  [_vm._v("Theme")]
                ),
                _vm._v(" "),
                _c("current-theme-display-text")
              ],
              1
            )
          ]
        )
      ])
    };
    var __vue_staticRenderFns__$i = [];
    __vue_render__$i._withStripped = true;

      /* style */
      const __vue_inject_styles__$i = function (inject) {
        if (!inject) return
        inject("data-v-85091dd8_0", { source: "\n#theme-options-button[data-v-85091dd8] {\n    width: 100%;\n    height: 100%;\n\n    grid-row: 2;\n    grid-column: 2;\n\n    display: grid;\n\n    grid-template-rows: 25% auto 25%;\n    grid-template-columns: 100%;\n\n    user-select: none;\n}\n#theme-options-container[data-v-85091dd8] {\n    grid-row: 2;\n\n    width: 100%;\n    height: 100%;\n\n    display: flex;\n\n    flex-direction: column;\n    justify-content: center;\n}\n#theme-options-text[data-v-85091dd8] {\n    font-size: 215%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/options/theme-options-button/ThemeOptionsButton.vue"],"names":[],"mappings":";AAkCA;IACA,WAAA;IACA,YAAA;;IAEA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,gCAAA;IACA,2BAAA;;IAEA,iBAAA;AACA;AAEA;IACA,WAAA;;IAEA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,sBAAA;IACA,uBAAA;AACA;AAEA;IACA,eAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;AACA","file":"ThemeOptionsButton.vue","sourcesContent":["<!-- Represents the button for changing themes -->\r\n<template>\r\n    <div class=\"options-button-container\">\r\n        <button id=\"theme-options-button\" v-bind:class=\"[themeClass('game-button'), themeClass('text')]\" @click=\"openSelector(selectorStates.theme)\">\r\n            <div id=\"theme-options-container\">\r\n                <div id=\"theme-options-text\" v-bind:class=\"themeClass('text')\">Theme</div>\r\n\r\n                <current-theme-display-text></current-theme-display-text>\r\n            </div>\r\n        </button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import CurrentThemeDisplayText from \"./CurrentThemeDisplayText.vue\";\r\n\r\n    import { selectorStates } from \"../../../../../../enums.js\";\r\n\r\n    import { selector, theme } from \"../../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [selector, theme],\r\n\r\n        data: () => ({\r\n            selectorStates\r\n        }),\r\n\r\n        components: {\r\n            \"current-theme-display-text\": CurrentThemeDisplayText\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #theme-options-button {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-row: 2;\r\n        grid-column: 2;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 25% auto 25%;\r\n        grid-template-columns: 100%;\r\n\r\n        user-select: none;\r\n    }\r\n\r\n    #theme-options-container {\r\n        grid-row: 2;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: flex;\r\n\r\n        flex-direction: column;\r\n        justify-content: center;\r\n    }\r\n\r\n    #theme-options-text {\r\n        font-size: 215%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$i = "data-v-85091dd8";
      /* module identifier */
      const __vue_module_identifier__$i = undefined;
      /* functional template */
      const __vue_is_functional_template__$i = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$i = normalizeComponent(
        { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
        __vue_inject_styles__$i,
        __vue_script__$i,
        __vue_scope_id__$i,
        __vue_is_functional_template__$i,
        __vue_module_identifier__$i,
        false,
        createInjector,
        undefined,
        undefined
      );

    // This mixin handles the player's save data
    var save = {
        methods: {
            // Due to how saving works, it must also contain the methods used in some other mixins
            ...gain.methods,
            ...gameState.methods,
            ...goal.methods,
            ...prestigePoints.methods,
            ...prestiges.methods,
            ...score.methods,
            ...selector.methods,
            ...theme.methods,
            ...upgrades.methods,
            ...autoClick.methods,
            ...autoPrestige.methods,

            // Encodes the player's save data
            encodeSaveData({ theme, gameState, score, goal, gain, prestigePoints, prestiges, upgrades, autoClick, autoPrestige }) {
                return `${theme}|${gameState}|${score}|${goal}|${gain}|${prestigePoints}|${prestiges}|${upgrades[0].cost}|${upgrades[0].amount}|${upgrades[1].cost}|${upgrades[1].amount}|${upgrades[2].cost}|${upgrades[2].amount}|${autoClick.unlocked}|${autoClick.enabled}|${autoPrestige.unlocked}|${autoPrestige.enabled}|${upgrades[3].cost}|${upgrades[3].amount}`;
            },

            // Decodes the given save data
            decodeSaveData(saveData) {
                let items = saveData.split("|");

                // Loads default items if needed
                return {
                    theme: items.length > 0 ? items[0] : defaultSave.theme,
                    gameState: items.length > 1 ? items[1] : defaultSave.gameState,
                    score: items.length > 2 ? parseInt(items[2]) : defaultSave.score,
                    goal: items.length > 3 ? parseInt(items[3]) : defaultSave.goal,
                    gain: items.length > 4 ? parseInt(items[4]) : defaultSave.gain,
                    prestigePoints: items.length > 5 ? parseInt(items[5]) : defaultSave.prestigePoints,
                    prestiges: items.length > 6 ? parseInt(items[6]) : defaultSave.prestiges,

                    upgrades: [
                        {
                            cost: items.length > 7 ? parseInt(items[7]) : defaultSave.upgrades[0].cost,
                            amount: items.length > 8 ? parseInt(items[8]) : defaultSave.upgrades[0].amount
                        },

                        {
                            cost: items.length > 9 ? parseInt(items[9]) : defaultSave.upgrades[1].cost,
                            amount: items.length > 10 ? parseInt(items[10]) : defaultSave.upgrades[1].amount
                        },

                        {
                            cost: items.length > 11 ? parseInt(items[11]) : defaultSave.upgrades[2].cost,
                            amount: items.length > 12 ? parseInt(items[12]) : defaultSave.upgrades[2].amount
                        },

                        {
                            cost: items.length > 17 ? parseInt(items[17]) : defaultSave.upgrades[3].cost,
                            amount: items.length > 18 ? parseInt(items[18]) : defaultSave.upgrades[3].amount
                        }
                    ],

                    autoClick: {
                        unlocked: items.length > 13 ? items[13] === "true" : defaultSave.autoClick.unlocked,
                        enabled: items.length > 14 ? items[14] === "true" : defaultSave.autoClick.enabled
                    },

                    autoPrestige: {
                        unlocked: items.length > 15 ? items[15] === "true": defaultSave.autoPrestige.unlocked,
                        enabled: items.length > 16 ? items[16] === "true": defaultSave.autoPrestige.enabled
                    }
                };
            },

            // Saves the player's save data
            save() {
                localStorage.setItem("save", this.encodeSaveData({
                    theme: this.getTheme(),
                    gameState: this.getGameState(),
                    score: this.getScore(),
                    goal: this.getGoal(),
                    gain: this.getGain(),
                    prestigePoints: this.getPrestigePoints(),
                    prestiges: this.getPrestiges(),

                    upgrades: [
                        {
                            cost: this.getUpgradeCost(0),
                            amount: this.getUpgradeAmount(0)
                        },

                        {
                            cost: this.getUpgradeCost(1),
                            amount: this.getUpgradeAmount(1)
                        },

                        {
                            cost: this.getUpgradeCost(2),
                            amount: this.getUpgradeAmount(2)
                        },

                        {
                            cost: this.getUpgradeCost(3),
                            amount: this.getUpgradeAmount(3)
                        }
                    ],

                    autoClick: {...this.getAutoClick()},
                    autoPrestige: {...this.getAutoPrestige()}
                }));
            },

            // Confirms if the player wants to reset the game
            confirmReset() {
                return confirm("Do you want to reset your save? You will lose everything!") &&
                    confirm("Are you sure about this? There is no way to get your save back!") &&
                    confirm("This is your last warning!")
            },

            // Resets the player's save data
            resetSave() {
                this.setGameState(defaultSave.gameState);
                this.closeSelector();
                this.setTheme(defaultSave.theme);
                this.setScore(defaultSave.score);
                this.setGoal(defaultSave.goal);
                this.setGain(defaultSave.gain);
                this.setPrestigePoints(defaultSave.prestigePoints);
                this.setPrestiges(defaultSave.prestiges);

                // Sets upgrade variables
                defaultSave.upgrades.forEach((upgrade, id) => {
                    this.setUpgradeCost(id, upgrade.cost);
                    this.setUpgradeAmount(id, upgrade.amount);
                });

                // Handles auto-click and auto-prestige
                if (defaultSave.autoClick.unlocked)
                    this.unlockAutoClick();
                else this.lockAutoClick();

                if (defaultSave.autoClick.enabled)
                    this.enableAutoClick();
                else this.disableAutoClick();

                if (defaultSave.autoPrestige.unlocked)
                    this.unlockAutoPrestige();
                else this.lockAutoPrestige();

                if (defaultSave.autoPrestige.enabled)
                    this.enableAutoPrestige();
                else this.disableAutoPrestige();

                // Saves over player's save file
                this.save();
            },

            // Attempts to get the save data from localStorage
            getSaveFromStorage() {
                let save = localStorage.getItem("save");

                // Returns the save if possible, returning the default save data if the save could not be found
                return save === null ? decodeSaveData({...defaultSave}) : save;
            },

            // Loads the player's save data
            loadSaveData() {
                let saveData = this.getSaveFromStorage();

                let saveObject = this.decodeSaveData(saveData);

                // Sets certain values based on the values in the save object
                this.setGameState(saveObject.gameState);
                this.setTheme(saveObject.theme);
                this.setScore(saveObject.score);
                this.setGoal(saveObject.goal);
                this.setGain(saveObject.gain);
                this.setPrestigePoints(saveObject.prestigePoints);
                this.setPrestiges(saveObject.prestiges);

                // Sets variables for upgrades
                saveObject.upgrades.forEach((upgrade, id) => {
                    this.setUpgradeCost(id, upgrade.cost);
                    this.setUpgradeAmount(id, upgrade.amount);
                });

                // Handles auto-click and auto-prestige
                if (saveObject.autoClick.unlocked)
                    this.unlockAutoClick();
                else this.lockAutoClick();

                if (saveObject.autoClick.enabled)
                    this.enableAutoClick();
                else this.disableAutoClick();

                if (saveObject.autoPrestige.unlocked)
                    this.unlockAutoPrestige();
                else this.lockAutoPrestige();

                if (saveObject.autoPrestige.enabled)
                    this.enableAutoPrestige();
                else this.disableAutoPrestige();
            }
        }
    };

    //

    var script$j = {
        mixins: [save],

        components: {
            "options-button": __vue_component__$g,
            "theme-options-button": __vue_component__$i
        }
    };

    /* script */
    const __vue_script__$j = script$j;

    /* template */
    var __vue_render__$j = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "options" } }, [
        _c(
          "div",
          { staticClass: "options-row" },
          [
            _c("theme-options-button"),
            _vm._v(" "),
            _c("options-button", { attrs: { title: "Save", func: _vm.save } }),
            _vm._v(" "),
            _c("options-button", {
              attrs: { title: "Load", func: _vm.loadSaveData }
            }),
            _vm._v(" "),
            _c("options-button", {
              attrs: {
                title: "Reset",
                func: function() {
                  return _vm.confirmReset() && _vm.resetSave()
                }
              }
            })
          ],
          1
        )
      ])
    };
    var __vue_staticRenderFns__$j = [];
    __vue_render__$j._withStripped = true;

      /* style */
      const __vue_inject_styles__$j = function (inject) {
        if (!inject) return
        inject("data-v-23f5cbd0_0", { source: "\n#options[data-v-23f5cbd0] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: repeat(4, auto);\n}\n.options-row[data-v-23f5cbd0] {\n    width: 100%;\n\n    display: grid;\n\n    grid-template-columns: repeat(4, 25%);\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/options/OptionsState.vue"],"names":[],"mappings":";AA6BA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,mCAAA;AACA;AAEA;IACA,WAAA;;IAEA,aAAA;;IAEA,qCAAA;AACA","file":"OptionsState.vue","sourcesContent":["<!-- This component represents the options tab of the game -->\r\n<template>\r\n    <div id=\"options\">\r\n        <div class=\"options-row\">\r\n            <theme-options-button></theme-options-button>\r\n            <options-button title=\"Save\" v-bind:func=\"save\"></options-button>\r\n            <options-button title=\"Load\" v-bind:func=\"loadSaveData\"></options-button>\r\n            <options-button title=\"Reset\" v-bind:func=\"() => confirmReset() && resetSave()\"></options-button>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import OptionsButton from \"./OptionsButton.vue\";\r\n    import ThemeOptionsButton from \"./theme-options-button/ThemeOptionsButton.vue\";\r\n\r\n    import save from \"../../../../../mixins/save.js\";\r\n\r\n    export default {\r\n        mixins: [save],\r\n\r\n        components: {\r\n            \"options-button\": OptionsButton,\r\n            \"theme-options-button\": ThemeOptionsButton\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #options {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: repeat(4, auto);\r\n    }\r\n\r\n    .options-row {\r\n        width: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-columns: repeat(4, 25%);\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$j = "data-v-23f5cbd0";
      /* module identifier */
      const __vue_module_identifier__$j = undefined;
      /* functional template */
      const __vue_is_functional_template__$j = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$j = normalizeComponent(
        { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
        __vue_inject_styles__$j,
        __vue_script__$j,
        __vue_scope_id__$j,
        __vue_is_functional_template__$j,
        __vue_module_identifier__$j,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$k = {
        mixins: [theme, upgrades, utils],

        props: ["id"]
    };

    /* script */
    const __vue_script__$k = script$k;

    /* template */
    var __vue_render__$k = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { staticClass: "prestige-upgrade-cost", class: _vm.themeClass("text") },
        [
          _vm._v(
            "Cost: " +
              _vm._s(_vm.getUpgradeCost(_vm.id)) +
              " Prestige Point" +
              _vm._s(_vm.pluralEnding(_vm.getUpgradeCost(_vm.id)))
          )
        ]
      )
    };
    var __vue_staticRenderFns__$k = [];
    __vue_render__$k._withStripped = true;

      /* style */
      const __vue_inject_styles__$k = function (inject) {
        if (!inject) return
        inject("data-v-2c180bc7_0", { source: "\n.prestige-upgrade-cost[data-v-2c180bc7] {\n    grid-row: 6;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 90%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/upgrades/prestige-upgrade-button/PrestigeUpgradeCostDisplay.vue"],"names":[],"mappings":";AAkBA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,cAAA;AACA","file":"PrestigeUpgradeCostDisplay.vue","sourcesContent":["<!-- Represents the part of a prestige upgrade that displays the current cost -->\r\n<template>\r\n    <div class=\"prestige-upgrade-cost\" v-bind:class=\"themeClass('text')\">Cost: {{ getUpgradeCost(id) }} Prestige Point{{ pluralEnding(getUpgradeCost(id)) }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme, upgrades } from \"../../../../../../mixins/storeIO.js\";\r\n\r\n    import utils from \"../../../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [theme, upgrades, utils],\r\n\r\n        props: [\"id\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .prestige-upgrade-cost {\r\n        grid-row: 6;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 90%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$k = "data-v-2c180bc7";
      /* module identifier */
      const __vue_module_identifier__$k = undefined;
      /* functional template */
      const __vue_is_functional_template__$k = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$k = normalizeComponent(
        { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
        __vue_inject_styles__$k,
        __vue_script__$k,
        __vue_scope_id__$k,
        __vue_is_functional_template__$k,
        __vue_module_identifier__$k,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$l = {
        mixins: [theme, upgrades],

        props: ["id", "func"]
    };

    /* script */
    const __vue_script__$l = script$l;

    /* template */
    var __vue_render__$l = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { staticClass: "prestige-upgrade-current", class: _vm.themeClass("text") },
        [_vm._v("Currently: " + _vm._s(_vm.func(_vm.getUpgradeBoost(_vm.id))))]
      )
    };
    var __vue_staticRenderFns__$l = [];
    __vue_render__$l._withStripped = true;

      /* style */
      const __vue_inject_styles__$l = function (inject) {
        if (!inject) return
        inject("data-v-14ddec16_0", { source: "\n.prestige-upgrade-current[data-v-14ddec16] {\n    grid-row: 4;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 90%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/upgrades/prestige-upgrade-button/PrestigeUpgradeCurrentDisplay.vue"],"names":[],"mappings":";AAgBA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,cAAA;AACA","file":"PrestigeUpgradeCurrentDisplay.vue","sourcesContent":["<!-- Represents the part of a prestige upgrade that displays the current boost -->\r\n<template>\r\n    <div class=\"prestige-upgrade-current\" v-bind:class=\"themeClass('text')\">Currently: {{ func(getUpgradeBoost(id)) }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme, upgrades } from \"../../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme, upgrades],\r\n\r\n        props: [\"id\", \"func\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .prestige-upgrade-current {\r\n        grid-row: 4;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 90%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$l = "data-v-14ddec16";
      /* module identifier */
      const __vue_module_identifier__$l = undefined;
      /* functional template */
      const __vue_is_functional_template__$l = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$l = normalizeComponent(
        { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
        __vue_inject_styles__$l,
        __vue_script__$l,
        __vue_scope_id__$l,
        __vue_is_functional_template__$l,
        __vue_module_identifier__$l,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$m = {
        mixins: [theme],

        props: ["description"]
    };

    /* script */
    const __vue_script__$m = script$m;

    /* template */
    var __vue_render__$m = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          staticClass: "prestige-upgrade-description",
          class: _vm.themeClass("text")
        },
        [_vm._v(_vm._s(_vm.description))]
      )
    };
    var __vue_staticRenderFns__$m = [];
    __vue_render__$m._withStripped = true;

      /* style */
      const __vue_inject_styles__$m = function (inject) {
        if (!inject) return
        inject("data-v-b27115d2_0", { source: "\n.prestige-upgrade-description[data-v-b27115d2] {\n    grid-row: 2;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    text-align: center;\n\n    font-size: 140%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/upgrades/prestige-upgrade-button/PrestigeUpgradeDescription.vue"],"names":[],"mappings":";AAgBA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,kBAAA;;IAEA,eAAA;AACA","file":"PrestigeUpgradeDescription.vue","sourcesContent":["<!-- Represents the description of a prestige upgrade -->\r\n<template>\r\n    <div class=\"prestige-upgrade-description\" v-bind:class=\"themeClass('text')\">{{ description }}</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        props: [\"description\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .prestige-upgrade-description {\r\n        grid-row: 2;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        text-align: center;\r\n\r\n        font-size: 140%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$m = "data-v-b27115d2";
      /* module identifier */
      const __vue_module_identifier__$m = undefined;
      /* functional template */
      const __vue_is_functional_template__$m = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$m = normalizeComponent(
        { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
        __vue_inject_styles__$m,
        __vue_script__$m,
        __vue_scope_id__$m,
        __vue_is_functional_template__$m,
        __vue_module_identifier__$m,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$n = {
        mixins: [gain, goal, prestigePoints, score, theme, upgrades],

        props: ["id", "description", "func"],

        components: {
            "prestige-upgrade-cost-display": __vue_component__$k,
            "prestige-upgrade-current-display": __vue_component__$l,
            "prestige-upgrade-description": __vue_component__$m
        },

        methods: {
            // Checks if the upgrade is affordable
            canAfford() {
                return this.getPrestigePoints() >= this.getUpgradeCost(this.id);
            },

            // Buys an upgrade
            buy() {
                // Subtracts the cost of the upgrade
                this.subtractPrestigePoints(this.getUpgradeCost(this.id));

                this.buyUpgrade(this.id);

                // Resets the player's score, gain, and goal
                this.resetScore();
                this.resetGain();
                this.resetGoal();
            }
        }
    };

    /* script */
    const __vue_script__$n = script$n;

    /* template */
    var __vue_render__$n = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "prestige-upgrade-container" }, [
        _c(
          "button",
          {
            staticClass: "prestige-upgrade-button",
            class: [
              _vm.themeClass("game-button"),
              _vm.canAfford() ? "" : _vm.themeClass("unaffordable")
            ],
            on: {
              click: function() {
                return _vm.canAfford() && _vm.buy()
              }
            }
          },
          [
            _c("prestige-upgrade-description", {
              attrs: { description: _vm.description }
            }),
            _vm._v(" "),
            _c("prestige-upgrade-current-display", {
              attrs: { id: _vm.id, func: _vm.func }
            }),
            _vm._v(" "),
            _c("prestige-upgrade-cost-display", { attrs: { id: _vm.id } })
          ],
          1
        )
      ])
    };
    var __vue_staticRenderFns__$n = [];
    __vue_render__$n._withStripped = true;

      /* style */
      const __vue_inject_styles__$n = function (inject) {
        if (!inject) return
        inject("data-v-6620b1fc_0", { source: "\n.prestige-upgrade-container[data-v-6620b1fc] {\n    width: 100%;\n    height: 100%;\n\n    grid-row: 1;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n}\n.prestige-upgrade-button[data-v-6620b1fc] {\n    width: 85%;\n    height: 85%;\n\n    grid-template-rows: 5% 17% 15% 10% 3% 12% auto;\n    grid-template-columns: 100%;\n\n    user-select: none;\n}\n\n/* Unaffordable themes */\n.unaffordable-dark[data-v-6620b1fc] {\n\tbackground-color: rgb(24, 24, 24);\n}\n.unaffordable-dark[data-v-6620b1fc]:hover {\n\tbackground-color: rgb(15, 15, 15);\n}\n.unaffordable-light[data-v-6620b1fc] {\n\tbackground-color: rgb(185, 185, 185);\n}\n.unaffordable-light[data-v-6620b1fc]:hover {\n\tbackground-color: rgb(175, 175, 175);\n}\n.unaffordable-gradient[data-v-6620b1fc] {\n\tbackground-color: rgb(24, 24, 24);\n}\n.unaffordable-gradient[data-v-6620b1fc]:hover {\n\tbackground-image: linear-gradient(rgb(86, 56, 56), rgb(111, 81, 81));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/upgrades/prestige-upgrade-button/PrestigeUpgradeButton.vue"],"names":[],"mappings":";AAoDA;IACA,WAAA;IACA,YAAA;;IAEA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;AACA;AAEA;IACA,UAAA;IACA,WAAA;;IAEA,8CAAA;IACA,2BAAA;;IAEA,iBAAA;AACA;;AAEA,wBAAA;AACA;CACA,iCAAA;AACA;AAEA;CACA,iCAAA;AACA;AAEA;CACA,oCAAA;AACA;AAEA;CACA,oCAAA;AACA;AAEA;CACA,iCAAA;AACA;AAEA;CACA,oEAAA;AACA","file":"PrestigeUpgradeButton.vue","sourcesContent":["<!-- Represents a prestige upgrade's button -->\r\n<template>\r\n    <div class=\"prestige-upgrade-container\">\r\n        <button class=\"prestige-upgrade-button\" v-bind:class=\"[themeClass('game-button'), canAfford() ? '' : themeClass('unaffordable')]\" @click=\"() => canAfford() && buy()\">\r\n            <prestige-upgrade-description v-bind:description=\"description\"></prestige-upgrade-description>\r\n            <prestige-upgrade-current-display v-bind:id=\"id\" v-bind:func=\"func\"></prestige-upgrade-current-display>\r\n            <prestige-upgrade-cost-display v-bind:id=\"id\"></prestige-upgrade-cost-display>\r\n        </button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import PrestigeUpgradeCostDisplay from \"./PrestigeUpgradeCostDisplay.vue\";\r\n    import PrestigeUpgradeCurrentDisplay from \"./PrestigeUpgradeCurrentDisplay.vue\";\r\n    import PrestigeUpgradeDescription from \"./PrestigeUpgradeDescription.vue\";\r\n\r\n    import { gain, goal, prestigePoints, score, theme, upgrades } from \"../../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [gain, goal, prestigePoints, score, theme, upgrades],\r\n\r\n        props: [\"id\", \"description\", \"func\"],\r\n\r\n        components: {\r\n            \"prestige-upgrade-cost-display\": PrestigeUpgradeCostDisplay,\r\n            \"prestige-upgrade-current-display\": PrestigeUpgradeCurrentDisplay,\r\n            \"prestige-upgrade-description\": PrestigeUpgradeDescription\r\n        },\r\n\r\n        methods: {\r\n            // Checks if the upgrade is affordable\r\n            canAfford() {\r\n                return this.getPrestigePoints() >= this.getUpgradeCost(this.id);\r\n            },\r\n\r\n            // Buys an upgrade\r\n            buy() {\r\n                // Subtracts the cost of the upgrade\r\n                this.subtractPrestigePoints(this.getUpgradeCost(this.id));\r\n\r\n                this.buyUpgrade(this.id);\r\n\r\n                // Resets the player's score, gain, and goal\r\n                this.resetScore();\r\n                this.resetGain();\r\n                this.resetGoal();\r\n            }\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .prestige-upgrade-container {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-row: 1;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n\r\n    .prestige-upgrade-button {\r\n        width: 85%;\r\n        height: 85%;\r\n\r\n        grid-template-rows: 5% 17% 15% 10% 3% 12% auto;\r\n        grid-template-columns: 100%;\r\n\r\n        user-select: none;\r\n    }\r\n\r\n    /* Unaffordable themes */\r\n    .unaffordable-dark {\r\n    \tbackground-color: rgb(24, 24, 24);\r\n    }\r\n\r\n    .unaffordable-dark:hover {\r\n    \tbackground-color: rgb(15, 15, 15);\r\n    }\r\n\r\n    .unaffordable-light {\r\n    \tbackground-color: rgb(185, 185, 185);\r\n    }\r\n\r\n    .unaffordable-light:hover {\r\n    \tbackground-color: rgb(175, 175, 175);\r\n    }\r\n\r\n    .unaffordable-gradient {\r\n    \tbackground-color: rgb(24, 24, 24);\r\n    }\r\n\r\n    .unaffordable-gradient:hover {\r\n    \tbackground-image: linear-gradient(rgb(86, 56, 56), rgb(111, 81, 81));\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$n = "data-v-6620b1fc";
      /* module identifier */
      const __vue_module_identifier__$n = undefined;
      /* functional template */
      const __vue_is_functional_template__$n = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$n = normalizeComponent(
        { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
        __vue_inject_styles__$n,
        __vue_script__$n,
        __vue_scope_id__$n,
        __vue_is_functional_template__$n,
        __vue_module_identifier__$n,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$o = {
        mixins: [theme]
    };

    /* script */
    const __vue_script__$o = script$o;

    /* template */
    var __vue_render__$o = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("text"), attrs: { id: "upgrades-subtext" } },
        [
          _vm._v(
            "Buying an upgrade will reset your score, prestige requirement, and number gain."
          )
        ]
      )
    };
    var __vue_staticRenderFns__$o = [];
    __vue_render__$o._withStripped = true;

      /* style */
      const __vue_inject_styles__$o = function (inject) {
        if (!inject) return
        inject("data-v-77d44387_0", { source: "\n#upgrades-subtext[data-v-77d44387] {\n    width: 100%;\n    height: 100%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 85%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/upgrades/UpgradesSubtext.vue"],"names":[],"mappings":";AAcA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,cAAA;AACA","file":"UpgradesSubtext.vue","sourcesContent":["<!-- This component displays important text about buying upgrades -->\r\n<template>\r\n    <div id=\"upgrades-subtext\" v-bind:class=\"themeClass('text')\">Buying an upgrade will reset your score, prestige requirement, and number gain.</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme]\r\n    }\r\n</script>\r\n\r\n<style scoped>\r\n    #upgrades-subtext {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 85%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$o = "data-v-77d44387";
      /* module identifier */
      const __vue_module_identifier__$o = undefined;
      /* functional template */
      const __vue_is_functional_template__$o = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$o = normalizeComponent(
        { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
        __vue_inject_styles__$o,
        __vue_script__$o,
        __vue_scope_id__$o,
        __vue_is_functional_template__$o,
        __vue_module_identifier__$o,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$p = {
        mixins: [autoClick, goal, utils],

        components: {
            "prestige-upgrade-button": __vue_component__$n,
            "upgrades-subtext": __vue_component__$o
        }
    };

    /* script */
    const __vue_script__$p = script$p;

    /* template */
    var __vue_render__$p = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "upgrades" } },
        [
          _c("upgrades-subtext"),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { id: "prestige-upgrades-container" } },
            [
              _c("prestige-upgrade-button", {
                attrs: {
                  id: 0,
                  description: "Multiply Prestige Point gain by 2",
                  func: function(e) {
                    return _vm.formatSci(e) + "x"
                  }
                }
              }),
              _vm._v(" "),
              _c("prestige-upgrade-button", {
                attrs: {
                  id: 1,
                  description: "Add 1 to number gain",
                  func: function(e) {
                    return "+" + _vm.formatSci(e)
                  }
                }
              }),
              _vm._v(" "),
              _c("prestige-upgrade-button", {
                attrs: {
                  id: 2,
                  description: "Reduce prestige goal by 10%",
                  func: function(e) {
                    return "-" + _vm.formatSci((1 - e) * 100) + "%"
                  }
                }
              }),
              _vm._v(" "),
              _vm.isAutoClickUnlocked()
                ? _c("prestige-upgrade-button", {
                    attrs: {
                      id: 3,
                      description: "Make Auto-Click 2x faster",
                      func: function(e) {
                        return _vm.formatSci(e) + "x"
                      }
                    }
                  })
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$p = [];
    __vue_render__$p._withStripped = true;

      /* style */
      const __vue_inject_styles__$p = function (inject) {
        if (!inject) return
        inject("data-v-4842db76_0", { source: "\n#upgrades[data-v-4842db76] {\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: 12% 30% auto;\n    grid-template-columns: 100%;\n}\n#prestige-upgrades-container[data-v-4842db76] {\n    width: 100%;\n    height: 100%;\n\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: repeat(4, 25%);\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/states/upgrades/UpgradesState.vue"],"names":[],"mappings":";AAkCA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,gCAAA;IACA,2BAAA;AACA;AAEA;IACA,WAAA;IACA,YAAA;;IAEA,cAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,qCAAA;AACA","file":"UpgradesState.vue","sourcesContent":["<!-- This component represents the upgrades tab of the game -->\r\n<template>\r\n    <div id=\"upgrades\">\r\n        <upgrades-subtext></upgrades-subtext>\r\n\r\n        <div id=\"prestige-upgrades-container\">\r\n            <prestige-upgrade-button v-bind:id=\"0\" description=\"Multiply Prestige Point gain by 2\" v-bind:func=\"e => `${formatSci(e)}x`\"></prestige-upgrade-button>\r\n            <prestige-upgrade-button v-bind:id=\"1\" description=\"Add 1 to number gain\" v-bind:func=\"e => `+${formatSci(e)}`\"></prestige-upgrade-button>\r\n            <prestige-upgrade-button v-bind:id=\"2\" description=\"Reduce prestige goal by 10%\" v-bind:func=\"e => `-${formatSci((1 - e) * 100)}%`\"></prestige-upgrade-button>\r\n            <prestige-upgrade-button v-if=\"isAutoClickUnlocked()\" v-bind:id=\"3\" description=\"Make Auto-Click 2x faster\" v-bind:func=\"e => `${formatSci(e)}x`\"></prestige-upgrade-button>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import PrestigeUpgradeButton from \"./prestige-upgrade-button/PrestigeUpgradeButton.vue\";\r\n\r\n    import UpgradesSubtext from \"./UpgradesSubtext.vue\";\r\n\r\n    import { autoClick, goal } from \"../../../../../mixins/storeIO.js\";\r\n\r\n    import utils from \"../../../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [autoClick, goal, utils],\r\n\r\n        components: {\r\n            \"prestige-upgrade-button\": PrestigeUpgradeButton,\r\n            \"upgrades-subtext\": UpgradesSubtext\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #upgrades {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 12% 30% auto;\r\n        grid-template-columns: 100%;\r\n    }\r\n\r\n    #prestige-upgrades-container {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: repeat(4, 25%);\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$p = "data-v-4842db76";
      /* module identifier */
      const __vue_module_identifier__$p = undefined;
      /* functional template */
      const __vue_is_functional_template__$p = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$p = normalizeComponent(
        { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
        __vue_inject_styles__$p,
        __vue_script__$p,
        __vue_scope_id__$p,
        __vue_is_functional_template__$p,
        __vue_module_identifier__$p,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$q = {
        mixins: [gameState],

        data: () => ({
            gameStates
        }),

        components: {
            "automation-state": __vue_component__$d,
            "main-state": __vue_component__$f,
            "options-state": __vue_component__$j,
            "upgrades-state": __vue_component__$p
        }
    };

    /* script */
    const __vue_script__$q = script$q;

    /* template */
    var __vue_render__$q = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "game-component" } },
        [
          _vm.getGameState() === _vm.gameStates.main ? _c("main-state") : _vm._e(),
          _vm._v(" "),
          _vm.getGameState() === _vm.gameStates.options
            ? _c("options-state")
            : _vm._e(),
          _vm._v(" "),
          _vm.getGameState() === _vm.gameStates.upgrades
            ? _c("upgrades-state")
            : _vm._e(),
          _vm._v(" "),
          _vm.getGameState() === _vm.gameStates.automation
            ? _c("automation-state")
            : _vm._e()
        ],
        1
      )
    };
    var __vue_staticRenderFns__$q = [];
    __vue_render__$q._withStripped = true;

      /* style */
      const __vue_inject_styles__$q = function (inject) {
        if (!inject) return
        inject("data-v-2332b070_0", { source: "\n#game-component[data-v-2332b070] {\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/game/GameComponent.vue"],"names":[],"mappings":";AAqCA;IACA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,2BAAA;AACA","file":"GameComponent.vue","sourcesContent":["<!-- This component represents the area that contains the game's UI, based on the current gameState -->\r\n<template>\r\n    <div id=\"game-component\">\r\n        <main-state v-if=\"getGameState() === gameStates.main\"></main-state>\r\n        <options-state v-if=\"getGameState() === gameStates.options\"></options-state>\r\n        <upgrades-state v-if=\"getGameState() === gameStates.upgrades\"></upgrades-state>\r\n        <automation-state v-if=\"getGameState() === gameStates.automation\"></automation-state>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import AutomationState from \"./states/automation/AutomationState.vue\";\r\n    import MainState from \"./states/main/MainState.vue\";\r\n    import OptionsState from \"./states/options/OptionsState.vue\";\r\n    import UpgradesState from \"./states/upgrades/UpgradesState.vue\";\r\n\r\n    import { gameStates } from \"../../../enums.js\";\r\n\r\n    import { gameState } from \"../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [gameState],\r\n\r\n        data: () => ({\r\n            gameStates\r\n        }),\r\n\r\n        components: {\r\n            \"automation-state\": AutomationState,\r\n            \"main-state\": MainState,\r\n            \"options-state\": OptionsState,\r\n            \"upgrades-state\": UpgradesState\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #game-component {\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$q = "data-v-2332b070";
      /* module identifier */
      const __vue_module_identifier__$q = undefined;
      /* functional template */
      const __vue_is_functional_template__$q = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$q = normalizeComponent(
        { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
        __vue_inject_styles__$q,
        __vue_script__$q,
        __vue_scope_id__$q,
        __vue_is_functional_template__$q,
        __vue_module_identifier__$q,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$r = {
        mixins: [gameState, theme, utils],

        props: ["state"]
    };

    /* script */
    const __vue_script__$r = script$r;

    /* template */
    var __vue_render__$r = function() {
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
        [_vm._v("\n    " + _vm._s(_vm.capitalize(_vm.state)) + "\n")]
      )
    };
    var __vue_staticRenderFns__$r = [];
    __vue_render__$r._withStripped = true;

      /* style */
      const __vue_inject_styles__$r = function (inject) {
        if (!inject) return
        inject("data-v-42363776_0", { source: "\n.header-item[data-v-42363776] {\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    grid-row: 1;\n\n    font-size: 175%;\n\n    user-select: none;\n}\n.header-item-dark[data-v-42363776] {\n\tbox-shadow: 2px 2px 2px black;\n}\n.header-item-dark[data-v-42363776]:hover {\n    background-color: rgb(40, 40, 40);\n}\n.header-item-light[data-v-42363776] {\n\tbox-shadow: 2px 2px 2px rgb(180, 180, 180);\n}\n.header-item-light[data-v-42363776]:hover {\n    background-color: rgb(215, 215, 215);\n}\n.header-item-gradient[data-v-42363776] {\n\tborder: 2px solid rgb(195, 195, 195);\n}\n.header-item-gradient[data-v-42363776]:hover {\n    background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/header/HeaderItem.vue"],"names":[],"mappings":";AAoBA;IACA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,WAAA;;IAEA,eAAA;;IAEA,iBAAA;AACA;AAEA;CACA,6BAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;CACA,0CAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;CACA,oCAAA;AACA;AAEA;IACA,mEAAA;AACA","file":"HeaderItem.vue","sourcesContent":["<!-- This component represents an item in the header -->\r\n<template>\r\n    <button class=\"header-item\" @click=\"setGameState(state)\" v-bind:class=\"[themeClass('header-item'), themeClass('text')]\">\r\n        {{ capitalize(state) }}\r\n    </button>\r\n</template>\r\n\r\n<script>\r\n    import { gameState, theme } from \"../../../mixins/storeIO.js\";\r\n\r\n    import utils from \"../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [gameState, theme, utils],\r\n\r\n        props: [\"state\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .header-item {\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        grid-row: 1;\r\n\r\n        font-size: 175%;\r\n\r\n        user-select: none;\r\n    }\r\n\r\n    .header-item-dark {\r\n    \tbox-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .header-item-dark:hover {\r\n        background-color: rgb(40, 40, 40);\r\n    }\r\n\r\n    .header-item-light {\r\n    \tbox-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .header-item-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .header-item-gradient {\r\n    \tborder: 2px solid rgb(195, 195, 195);\r\n    }\r\n\r\n    .header-item-gradient:hover {\r\n        background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$r = "data-v-42363776";
      /* module identifier */
      const __vue_module_identifier__$r = undefined;
      /* functional template */
      const __vue_is_functional_template__$r = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$r = normalizeComponent(
        { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
        __vue_inject_styles__$r,
        __vue_script__$r,
        __vue_scope_id__$r,
        __vue_is_functional_template__$r,
        __vue_module_identifier__$r,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$s = {
        mixins: [prestiges, theme],

        //This seems to be a good way to load enums
        data: () => ({
            gameStates
        }),

        components: {
            "header-item": __vue_component__$r
        }
    };

    /* script */
    const __vue_script__$s = script$s;

    /* template */
    var __vue_render__$s = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("header"), attrs: { id: "header" } },
        [
          _c("header-item", { attrs: { state: _vm.gameStates.main } }),
          _vm._v(" "),
          _c("header-item", { attrs: { state: _vm.gameStates.options } }),
          _vm._v(" "),
          _vm.hasPrestiged()
            ? [
                _c("header-item", { attrs: { state: _vm.gameStates.upgrades } }),
                _vm._v(" "),
                _c("header-item", { attrs: { state: _vm.gameStates.automation } })
              ]
            : _vm._e()
        ],
        2
      )
    };
    var __vue_staticRenderFns__$s = [];
    __vue_render__$s._withStripped = true;

      /* style */
      const __vue_inject_styles__$s = function (inject) {
        if (!inject) return
        inject("data-v-12a79238_0", { source: "\n#header[data-v-12a79238] {\n    width: 100%;\n\n    display: grid;\n\n    grid-template-rows: 100%;\n    grid-template-columns: repeat(auto-fill, auto);\n}\n.header-dark[data-v-12a79238] {\n    background-color: rgb(24, 24, 24);\n}\n.header-light[data-v-12a79238] {\n    background-color: rgb(200, 200, 200);\n}\n.header-gradient[data-v-12a79238] {\n    background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/header/HeaderComponent.vue"],"names":[],"mappings":";AAoCA;IACA,WAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,8CAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;IACA,mEAAA;AACA","file":"HeaderComponent.vue","sourcesContent":["<!-- This component represents the app's header -->\r\n<!-- Name is used to avoid conflicts with builtin HTML elements -->\r\n<template>\r\n    <div id=\"header\" v-bind:class=\"themeClass('header')\">\r\n        <header-item v-bind:state=\"gameStates.main\"></header-item>\r\n        <header-item v-bind:state=\"gameStates.options\"></header-item>\r\n\r\n        <template v-if=\"hasPrestiged()\">\r\n            <header-item v-bind:state=\"gameStates.upgrades\"></header-item>\r\n            <header-item v-bind:state=\"gameStates.automation\"></header-item>\r\n        </template>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import HeaderItem from \"./HeaderItem.vue\";\r\n\r\n    import { gameStates } from \"../../../enums.js\";\r\n\r\n    import { prestiges, theme } from \"../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [prestiges, theme],\r\n\r\n        //This seems to be a good way to load enums\r\n        data: () => ({\r\n            gameStates\r\n        }),\r\n\r\n        components: {\r\n            \"header-item\": HeaderItem\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #header {\r\n        width: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 100%;\r\n        grid-template-columns: repeat(auto-fill, auto);\r\n    }\r\n\r\n    .header-dark {\r\n        background-color: rgb(24, 24, 24);\r\n    }\r\n\r\n    .header-light {\r\n        background-color: rgb(200, 200, 200);\r\n    }\r\n\r\n    .header-gradient {\r\n        background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$s = "data-v-12a79238";
      /* module identifier */
      const __vue_module_identifier__$s = undefined;
      /* functional template */
      const __vue_is_functional_template__$s = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$s = normalizeComponent(
        { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
        __vue_inject_styles__$s,
        __vue_script__$s,
        __vue_scope_id__$s,
        __vue_is_functional_template__$s,
        __vue_module_identifier__$s,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$t = {
        components: {
            "display-section": __vue_component__$6,
            "game-component": __vue_component__$q,
            "header-component": __vue_component__$s
        }
    };

    /* script */
    const __vue_script__$t = script$t;

    /* template */
    var __vue_render__$t = function() {
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
    var __vue_staticRenderFns__$t = [];
    __vue_render__$t._withStripped = true;

      /* style */
      const __vue_inject_styles__$t = function (inject) {
        if (!inject) return
        inject("data-v-f7da23f8_0", { source: "\n#content-container[data-v-f7da23f8] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: 5% 10% auto;\n    grid-template-columns: 100%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/content/ContentContainer.vue"],"names":[],"mappings":";AAwBA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,+BAAA;IACA,2BAAA;AACA","file":"ContentContainer.vue","sourcesContent":["<!-- This component contains the app's main contents -->\r\n<template>\r\n    <div id=\"content-container\">\r\n        <header-component></header-component>\r\n        <display-section></display-section>\r\n        <game-component></game-component>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import DisplaySection from \"./display-section/DisplaySection.vue\";\r\n    import GameComponent from \"./game/GameComponent.vue\";\r\n    import HeaderComponent from \"./header/HeaderComponent.vue\";\r\n\r\n    export default {\r\n        components: {\r\n            \"display-section\": DisplaySection,\r\n            \"game-component\": GameComponent,\r\n            \"header-component\": HeaderComponent\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #content-container {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 5% 10% auto;\r\n        grid-template-columns: 100%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$t = "data-v-f7da23f8";
      /* module identifier */
      const __vue_module_identifier__$t = undefined;
      /* functional template */
      const __vue_is_functional_template__$t = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$t = normalizeComponent(
        { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
        __vue_inject_styles__$t,
        __vue_script__$t,
        __vue_scope_id__$t,
        __vue_is_functional_template__$t,
        __vue_module_identifier__$t,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$u = {
        mixins: [selector, theme]
    };

    /* script */
    const __vue_script__$u = script$u;

    /* template */
    var __vue_render__$u = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        {
          class: [
            _vm.themeClass("selector-hover"),
            _vm.themeClass("selector-item"),
            _vm.themeClass("text")
          ],
          attrs: { id: "theme-selector-exit-button" },
          on: {
            click: function($event) {
              return _vm.closeSelector()
            }
          }
        },
        [_vm._v("Exit")]
      )
    };
    var __vue_staticRenderFns__$u = [];
    __vue_render__$u._withStripped = true;

      /* style */
      const __vue_inject_styles__$u = function (inject) {
        if (!inject) return
        inject("data-v-4320e190_0", { source: "\n#theme-selector-exit-button[data-v-4320e190] {\n    width: 100%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/selectors/theme-selector/ThemeSelectorExitButton.vue"],"names":[],"mappings":";AAcA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;AACA","file":"ThemeSelectorExitButton.vue","sourcesContent":["<!-- This component allows the player to exit the theme selector -->\r\n<template>\r\n    <button id=\"theme-selector-exit-button\" v-bind:class=\"[themeClass('selector-hover'), themeClass('selector-item'), themeClass('text')]\" @click=\"closeSelector()\">Exit</button>\r\n</template>\r\n\r\n<script>\r\n    import { selector, theme } from \"../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [selector, theme]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #theme-selector-exit-button {\r\n        width: 100%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$u = "data-v-4320e190";
      /* module identifier */
      const __vue_module_identifier__$u = undefined;
      /* functional template */
      const __vue_is_functional_template__$u = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$u = normalizeComponent(
        { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
        __vue_inject_styles__$u,
        __vue_script__$u,
        __vue_scope_id__$u,
        __vue_is_functional_template__$u,
        __vue_module_identifier__$u,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$v = {
        mixins: [theme, utils],

        props: ["theme"]
    };

    /* script */
    const __vue_script__$v = script$v;

    /* template */
    var __vue_render__$v = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        {
          staticClass: "theme-selector-list-button",
          class: [
            _vm.themeClass("selector-hover"),
            _vm.themeClass("selector-item"),
            _vm.themeClass("text")
          ],
          on: {
            click: function($event) {
              return _vm.setTheme(_vm.theme)
            }
          }
        },
        [_vm._v(_vm._s(_vm.capitalize(_vm.theme)) + "\n")]
      )
    };
    var __vue_staticRenderFns__$v = [];
    __vue_render__$v._withStripped = true;

      /* style */
      const __vue_inject_styles__$v = function (inject) {
        if (!inject) return
        inject("data-v-102a339e_0", { source: "\n.theme-selector-list-button[data-v-102a339e] {\n    width: 100%;\n    height: 50%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n\n    font-size: 155%;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/selectors/theme-selector/ThemeSelectorListButton.vue"],"names":[],"mappings":";AAsBA;IACA,WAAA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;;IAEA,eAAA;AACA","file":"ThemeSelectorListButton.vue","sourcesContent":["<!-- Represents a button that can be used to select a list -->\r\n<template>\r\n    <button\r\n        class=\"theme-selector-list-button\"\r\n        v-bind:class=\"[themeClass('selector-hover'), themeClass('selector-item'), themeClass('text')]\"\r\n        @click=\"setTheme(theme)\">{{ capitalize(theme) }}\r\n    </button>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../mixins/storeIO.js\";\r\n\r\n    import utils from \"../../../mixins/utils.js\";\r\n\r\n    export default {\r\n        mixins: [theme, utils],\r\n\r\n        props: [\"theme\"]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    .theme-selector-list-button {\r\n        width: 100%;\r\n        height: 50%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n\r\n        font-size: 155%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$v = "data-v-102a339e";
      /* module identifier */
      const __vue_module_identifier__$v = undefined;
      /* functional template */
      const __vue_is_functional_template__$v = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$v = normalizeComponent(
        { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
        __vue_inject_styles__$v,
        __vue_script__$v,
        __vue_scope_id__$v,
        __vue_is_functional_template__$v,
        __vue_module_identifier__$v,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$w = {
        mixins: [theme]
    };

    /* script */
    const __vue_script__$w = script$w;

    /* template */
    var __vue_render__$w = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          class: [_vm.themeClass("selector-item"), _vm.themeClass("text")],
          attrs: { id: "theme-selector-title" }
        },
        [_vm._v("Select Theme")]
      )
    };
    var __vue_staticRenderFns__$w = [];
    __vue_render__$w._withStripped = true;

      /* style */
      const __vue_inject_styles__$w = function (inject) {
        if (!inject) return
        inject("data-v-978afc10_0", { source: "\n#theme-selector-title[data-v-978afc10] {\n    width: 100%;\n\n    display: flex;\n\n    justify-content: center;\n    align-items: center;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/selectors/theme-selector/ThemeSelectorTitle.vue"],"names":[],"mappings":";AAcA;IACA,WAAA;;IAEA,aAAA;;IAEA,uBAAA;IACA,mBAAA;AACA","file":"ThemeSelectorTitle.vue","sourcesContent":["<!-- This component represents the title of the theme selector -->\r\n<template>\r\n    <div id=\"theme-selector-title\" v-bind:class=\"[themeClass('selector-item'), themeClass('text')]\">Select Theme</div>\r\n</template>\r\n\r\n<script>\r\n    import { theme } from \"../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme]\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #theme-selector-title {\r\n        width: 100%;\r\n\r\n        display: flex;\r\n\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$w = "data-v-978afc10";
      /* module identifier */
      const __vue_module_identifier__$w = undefined;
      /* functional template */
      const __vue_is_functional_template__$w = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$w = normalizeComponent(
        { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
        __vue_inject_styles__$w,
        __vue_script__$w,
        __vue_scope_id__$w,
        __vue_is_functional_template__$w,
        __vue_module_identifier__$w,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$x = {
        mixins: [theme],

        data: () => ({
            themes
        }),

        components: {
            "theme-selector-exit-button": __vue_component__$u,
            "theme-selector-list-button": __vue_component__$v,
            "theme-selector-title": __vue_component__$w
        }
    };

    /* script */
    const __vue_script__$x = script$x;

    /* template */
    var __vue_render__$x = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { attrs: { id: "theme-selector-container" } }, [
        _c(
          "div",
          {
            class: _vm.themeClass("theme-selector"),
            attrs: { id: "theme-selector" }
          },
          [
            _c("theme-selector-title"),
            _vm._v(" "),
            _c(
              "div",
              { attrs: { id: "theme-selector-list" } },
              _vm._l(Object.values(_vm.themes), function(theme) {
                return _c("theme-selector-list-button", { attrs: { theme: theme } })
              }),
              1
            ),
            _vm._v(" "),
            _c("theme-selector-exit-button")
          ],
          1
        )
      ])
    };
    var __vue_staticRenderFns__$x = [];
    __vue_render__$x._withStripped = true;

      /* style */
      const __vue_inject_styles__$x = function (inject) {
        if (!inject) return
        inject("data-v-1d3358f3_0", { source: "\n#theme-selector-container[data-v-1d3358f3] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: 30% auto 30%;\n    grid-template-columns: 45% auto 45%;\n}\n#theme-selector[data-v-1d3358f3] {\n    position: relative;\n\n    grid-row: 2;\n    grid-column: 2;\n\n    display: grid;\n\n    grid-template-rows: 10% auto 10%;\n    grid-template-columns: auto;\n\n    user-select: none;\n}\n#theme-selector-list[data-v-1d3358f3] {\n    display: flex;\n\n    flex-direction: column;\n}\n\n/* Theme selector themes */\n.theme-selector-dark[data-v-1d3358f3] {\n    color: rgb(255, 255, 255);\n\n    background-color: rgb(36, 36, 36);\n\n    box-shadow: 2px 2px 2px black;\n}\n.theme-selector-light[data-v-1d3358f3] {\n    color: rgb(0, 0, 0);\n\n    background-color: rgb(195, 195, 195);\n\n    box-shadow: 2px 2px 2px rgb(180, 180, 180);\n}\n.theme-selector-gradient[data-v-1d3358f3] {\n    color: rgb(255, 255, 255);\n\n    background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));\n\n    border: 2px 2px 2px 2px solid rgb(195, 195, 195);\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/selectors/theme-selector/ThemeSelector.vue"],"names":[],"mappings":";AAwCA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,gCAAA;IACA,mCAAA;AACA;AAEA;IACA,kBAAA;;IAEA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,gCAAA;IACA,2BAAA;;IAEA,iBAAA;AACA;AAEA;IACA,aAAA;;IAEA,sBAAA;AACA;;AAEA,0BAAA;AACA;IACA,yBAAA;;IAEA,iCAAA;;IAEA,6BAAA;AACA;AAEA;IACA,mBAAA;;IAEA,oCAAA;;IAEA,0CAAA;AACA;AAEA;IACA,yBAAA;;IAEA,mEAAA;;IAEA,gDAAA;AACA","file":"ThemeSelector.vue","sourcesContent":["<!-- This component represents the selector for themes -->\r\n<template>\r\n    <div id=\"theme-selector-container\">\r\n        <div id=\"theme-selector\" v-bind:class=\"themeClass('theme-selector')\">\r\n            <theme-selector-title></theme-selector-title>\r\n\r\n            <div id=\"theme-selector-list\">\r\n                <theme-selector-list-button v-for=\"theme in Object.values(themes)\" v-bind:theme=\"theme\"/>\r\n            </div>\r\n\r\n            <theme-selector-exit-button></theme-selector-exit-button>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ThemeSelectorExitButton from \"./ThemeSelectorExitButton.vue\";\r\n    import ThemeSelectorListButton from \"./ThemeSelectorListButton.vue\";\r\n    import ThemeSelectorTitle from \"./ThemeSelectorTitle.vue\";\r\n\r\n    import { themes } from \"../../../enums.js\";\r\n\r\n    import { theme } from \"../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        data: () => ({\r\n            themes\r\n        }),\r\n\r\n        components: {\r\n            \"theme-selector-exit-button\": ThemeSelectorExitButton,\r\n            \"theme-selector-list-button\": ThemeSelectorListButton,\r\n            \"theme-selector-title\": ThemeSelectorTitle\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #theme-selector-container {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 30% auto 30%;\r\n        grid-template-columns: 45% auto 45%;\r\n    }\r\n\r\n    #theme-selector {\r\n        position: relative;\r\n\r\n        grid-row: 2;\r\n        grid-column: 2;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 10% auto 10%;\r\n        grid-template-columns: auto;\r\n\r\n        user-select: none;\r\n    }\r\n\r\n    #theme-selector-list {\r\n        display: flex;\r\n\r\n        flex-direction: column;\r\n    }\r\n\r\n    /* Theme selector themes */\r\n    .theme-selector-dark {\r\n        color: rgb(255, 255, 255);\r\n\r\n        background-color: rgb(36, 36, 36);\r\n\r\n        box-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .theme-selector-light {\r\n        color: rgb(0, 0, 0);\r\n\r\n        background-color: rgb(195, 195, 195);\r\n\r\n        box-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .theme-selector-gradient {\r\n        color: rgb(255, 255, 255);\r\n\r\n        background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));\r\n\r\n        border: 2px 2px 2px 2px solid rgb(195, 195, 195);\r\n    }\r\n</style>\r\n\r\n<style>\r\n    /* Selector hover themes */\r\n    .selector-hover-dark:hover {\r\n        background-color: rgb(44, 44, 44);\r\n    }\r\n\r\n    .selector-hover-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .selector-hover-gradient:hover {\r\n        background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n\r\n    /* Selector item themes */\r\n    .selector-item-dark {\r\n        color: rgb(255, 255, 255);\r\n\r\n        border-bottom: solid black 2px;\r\n    }\r\n\r\n    .selector-item-light {\r\n        color: rgb(0, 0, 0);\r\n\r\n        border-bottom: solid rgb(180, 180, 180) 2px;\r\n    }\r\n\r\n    .selector-item-gradient {\r\n        color: rgb(255, 255, 255);\r\n\r\n        border: 2px solid rgb(195, 195, 195);\r\n    }\r\n</style>\r\n"]}, media: undefined })
    ,inject("data-v-1d3358f3_1", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Selector hover themes */\n.selector-hover-dark:hover {\n    background-color: rgb(44, 44, 44);\n}\n.selector-hover-light:hover {\n    background-color: rgb(215, 215, 215);\n}\n.selector-hover-gradient:hover {\n    background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\n}\n\n/* Selector item themes */\n.selector-item-dark {\n    color: rgb(255, 255, 255);\n\n    border-bottom: solid black 2px;\n}\n.selector-item-light {\n    color: rgb(0, 0, 0);\n\n    border-bottom: solid rgb(180, 180, 180) 2px;\n}\n.selector-item-gradient {\n    color: rgb(255, 255, 255);\n\n    border: 2px solid rgb(195, 195, 195);\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/selectors/theme-selector/ThemeSelector.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAiGA,0BAAA;AACA;IACA,iCAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;IACA,mEAAA;AACA;;AAEA,yBAAA;AACA;IACA,yBAAA;;IAEA,8BAAA;AACA;AAEA;IACA,mBAAA;;IAEA,2CAAA;AACA;AAEA;IACA,yBAAA;;IAEA,oCAAA;AACA","file":"ThemeSelector.vue","sourcesContent":["<!-- This component represents the selector for themes -->\r\n<template>\r\n    <div id=\"theme-selector-container\">\r\n        <div id=\"theme-selector\" v-bind:class=\"themeClass('theme-selector')\">\r\n            <theme-selector-title></theme-selector-title>\r\n\r\n            <div id=\"theme-selector-list\">\r\n                <theme-selector-list-button v-for=\"theme in Object.values(themes)\" v-bind:theme=\"theme\"/>\r\n            </div>\r\n\r\n            <theme-selector-exit-button></theme-selector-exit-button>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ThemeSelectorExitButton from \"./ThemeSelectorExitButton.vue\";\r\n    import ThemeSelectorListButton from \"./ThemeSelectorListButton.vue\";\r\n    import ThemeSelectorTitle from \"./ThemeSelectorTitle.vue\";\r\n\r\n    import { themes } from \"../../../enums.js\";\r\n\r\n    import { theme } from \"../../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [theme],\r\n\r\n        data: () => ({\r\n            themes\r\n        }),\r\n\r\n        components: {\r\n            \"theme-selector-exit-button\": ThemeSelectorExitButton,\r\n            \"theme-selector-list-button\": ThemeSelectorListButton,\r\n            \"theme-selector-title\": ThemeSelectorTitle\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #theme-selector-container {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 30% auto 30%;\r\n        grid-template-columns: 45% auto 45%;\r\n    }\r\n\r\n    #theme-selector {\r\n        position: relative;\r\n\r\n        grid-row: 2;\r\n        grid-column: 2;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: 10% auto 10%;\r\n        grid-template-columns: auto;\r\n\r\n        user-select: none;\r\n    }\r\n\r\n    #theme-selector-list {\r\n        display: flex;\r\n\r\n        flex-direction: column;\r\n    }\r\n\r\n    /* Theme selector themes */\r\n    .theme-selector-dark {\r\n        color: rgb(255, 255, 255);\r\n\r\n        background-color: rgb(36, 36, 36);\r\n\r\n        box-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .theme-selector-light {\r\n        color: rgb(0, 0, 0);\r\n\r\n        background-color: rgb(195, 195, 195);\r\n\r\n        box-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .theme-selector-gradient {\r\n        color: rgb(255, 255, 255);\r\n\r\n        background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));\r\n\r\n        border: 2px 2px 2px 2px solid rgb(195, 195, 195);\r\n    }\r\n</style>\r\n\r\n<style>\r\n    /* Selector hover themes */\r\n    .selector-hover-dark:hover {\r\n        background-color: rgb(44, 44, 44);\r\n    }\r\n\r\n    .selector-hover-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .selector-hover-gradient:hover {\r\n        background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n\r\n    /* Selector item themes */\r\n    .selector-item-dark {\r\n        color: rgb(255, 255, 255);\r\n\r\n        border-bottom: solid black 2px;\r\n    }\r\n\r\n    .selector-item-light {\r\n        color: rgb(0, 0, 0);\r\n\r\n        border-bottom: solid rgb(180, 180, 180) 2px;\r\n    }\r\n\r\n    .selector-item-gradient {\r\n        color: rgb(255, 255, 255);\r\n\r\n        border: 2px solid rgb(195, 195, 195);\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$x = "data-v-1d3358f3";
      /* module identifier */
      const __vue_module_identifier__$x = undefined;
      /* functional template */
      const __vue_is_functional_template__$x = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$x = normalizeComponent(
        { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
        __vue_inject_styles__$x,
        __vue_script__$x,
        __vue_scope_id__$x,
        __vue_is_functional_template__$x,
        __vue_module_identifier__$x,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$y = {
        mixins: [selector],

        data: () => ({
            selectorStates
        }),

        components: {
            "theme-selector": __vue_component__$x
        }
    };

    /* script */
    const __vue_script__$y = script$y;

    /* template */
    var __vue_render__$y = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { attrs: { id: "selector-container" } },
        [
          _vm.getSelector() === _vm.selectorStates.theme
            ? _c("theme-selector")
            : _vm._e()
        ],
        1
      )
    };
    var __vue_staticRenderFns__$y = [];
    __vue_render__$y._withStripped = true;

      /* style */
      const __vue_inject_styles__$y = function (inject) {
        if (!inject) return
        inject("data-v-76c48c2e_0", { source: "\n#selector-container[data-v-76c48c2e] {\n    grid-row: 1;\n    grid-column: 1;\n\n    display: grid;\n\n    grid-template-rows: auto;\n    grid-template-columns: auto;\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/selectors/SelectorContainer.vue"],"names":[],"mappings":";AA4BA;IACA,WAAA;IACA,cAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,2BAAA;AACA","file":"SelectorContainer.vue","sourcesContent":["<!-- This component containers any selectors -->\r\n<template>\r\n    <div id=\"selector-container\">\r\n        <theme-selector v-if=\"getSelector() === selectorStates.theme\"></theme-selector>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ThemeSelector from \"./theme-selector/ThemeSelector.vue\";\r\n\r\n    import { selectorStates } from \"../../enums.js\";\r\n\r\n    import { selector } from \"../../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [selector],\r\n\r\n        data: () => ({\r\n            selectorStates\r\n        }),\r\n\r\n        components: {\r\n            \"theme-selector\": ThemeSelector\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #selector-container {\r\n        grid-row: 1;\r\n        grid-column: 1;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: auto;\r\n        grid-template-columns: auto;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$y = "data-v-76c48c2e";
      /* module identifier */
      const __vue_module_identifier__$y = undefined;
      /* functional template */
      const __vue_is_functional_template__$y = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$y = normalizeComponent(
        { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
        __vue_inject_styles__$y,
        __vue_script__$y,
        __vue_scope_id__$y,
        __vue_is_functional_template__$y,
        __vue_module_identifier__$y,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$z = {
        mixins: [autoClick, calculatedValues, gameFunctions, save, theme],

        components: {
            "content-container": __vue_component__$t,
            "selector-container": __vue_component__$y
        },

        methods: {
            // This function runs every tick
            tick(tps) {
                if (this.isAutoClickActive()) {
                    let seconds = this.getAutoClickInterval();
                    let gain = this.getTotalGain();

                    // This adds up to the actual score per second
                    this.addScore(gain / (seconds * tps));
                }
            }
        },

        created() {
            // Loads save data
            this.loadSaveData();

            // Current ticks per second
            const tps = 20;

            // Sets up autosave (5 second interval)
            setInterval(this.save, 5000);

            // Sets up the tick function to run every tick
            setInterval(() => this.tick(tps), 1000 / tps);
        }
    };

    /* script */
    const __vue_script__$z = script$z;

    /* template */
    var __vue_render__$z = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { class: _vm.themeClass("app"), attrs: { id: "app" } },
        [_c("selector-container"), _vm._v(" "), _c("content-container")],
        1
      )
    };
    var __vue_staticRenderFns__$z = [];
    __vue_render__$z._withStripped = true;

      /* style */
      const __vue_inject_styles__$z = function (inject) {
        if (!inject) return
        inject("data-v-55e861d7_0", { source: "\n#app[data-v-55e861d7] {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    display: grid;\n\n    grid-template-rows: auto;\n    grid-template-columns: auto;\n}\n.app-dark[data-v-55e861d7] {\n    background-color: rgb(20, 20, 20);\n}\n.app-light[data-v-55e861d7] {\n    background-color: rgb(210, 210, 210);\n}\n.app-gradient[data-v-55e861d7] {\n    background-image: linear-gradient(rgb(0, 0, 0), rgb(25, 25, 25));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/App.vue"],"names":[],"mappings":";AAyDA;IACA,kBAAA;;IAEA,MAAA;IACA,OAAA;;IAEA,WAAA;IACA,YAAA;;IAEA,aAAA;;IAEA,wBAAA;IACA,2BAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;IACA,gEAAA;AACA","file":"App.vue","sourcesContent":["<!-- This is the core app component -->\r\n<template>\r\n    <div id=\"app\" v-bind:class=\"themeClass('app')\">\r\n        <selector-container></selector-container>\r\n        <content-container></content-container>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ContentContainer from \"./content/ContentContainer.vue\";\r\n\r\n    import SelectorContainer from \"./selectors/SelectorContainer.vue\";\r\n\r\n    import calculatedValues from \"../mixins/calculatedValues.js\";\r\n    import gameFunctions from \"../mixins/gameFunctions.js\";\r\n    import save from \"../mixins/save.js\";\r\n\r\n    import { autoClick, theme } from \"../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [autoClick, calculatedValues, gameFunctions, save, theme],\r\n\r\n        components: {\r\n            \"content-container\": ContentContainer,\r\n            \"selector-container\": SelectorContainer\r\n        },\r\n\r\n        methods: {\r\n            // This function runs every tick\r\n            tick(tps) {\r\n                if (this.isAutoClickActive()) {\r\n                    let seconds = this.getAutoClickInterval();\r\n                    let gain = this.getTotalGain();\r\n\r\n                    // This adds up to the actual score per second\r\n                    this.addScore(gain / (seconds * tps));\r\n                }\r\n            }\r\n        },\r\n\r\n        created() {\r\n            // Loads save data\r\n            this.loadSaveData();\r\n\r\n            // Current ticks per second\r\n            const tps = 20;\r\n\r\n            // Sets up autosave (5 second interval)\r\n            setInterval(this.save, 5000);\r\n\r\n            // Sets up the tick function to run every tick\r\n            setInterval(() => this.tick(tps), 1000 / tps);\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #app {\r\n        position: absolute;\r\n\r\n        top: 0;\r\n        left: 0;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: auto;\r\n        grid-template-columns: auto;\r\n    }\r\n\r\n    .app-dark {\r\n        background-color: rgb(20, 20, 20);\r\n    }\r\n\r\n    .app-light {\r\n        background-color: rgb(210, 210, 210);\r\n    }\r\n\r\n    .app-gradient {\r\n        background-image: linear-gradient(rgb(0, 0, 0), rgb(25, 25, 25));\r\n    }\r\n</style>\r\n\r\n<!-- Global styles -->\r\n<!-- This includes themes for global components -->\r\n<style>\r\n    @font-face {\r\n        font-family: \"Open Sans\";\r\n        src: url(\"../fonts/opensans-regular-webfont.woff\");\r\n    }\r\n\r\n    @font-face {\r\n        font-family: \"Plex Mono\";\r\n        src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\r\n    }\r\n\r\n    /*To let me style buttons*/\r\n    button {\r\n        all: unset\r\n    }\r\n\r\n    /*Text themes*/\r\n    .text-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Plex Mono\";\r\n    }\r\n\r\n    /* Game button themes */\r\n    .game-button-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgb(32, 32, 32);\r\n\r\n        box-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .game-button-dark:hover {\r\n        background-color: rgb(40, 40, 40);\r\n    }\r\n\r\n    .game-button-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n\r\n        background-color: rgb(200, 200, 200);\r\n\r\n        box-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .game-button-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .game-button-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgba(0, 0, 0, 0);\r\n\r\n    \tborder: 2px solid rgb(195, 195, 195);\r\n    }\r\n\r\n    .game-button-gradient:hover {\r\n    \tbackground-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n</style>\r\n"]}, media: undefined })
    ,inject("data-v-55e861d7_1", { source: "\n@font-face {\n    font-family: \"Open Sans\";\n    src: url(\"../fonts/opensans-regular-webfont.woff\");\n}\n@font-face {\n    font-family: \"Plex Mono\";\n    src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\n}\n\n/*To let me style buttons*/\nbutton {\n    all: unset\n}\n\n/*Text themes*/\n.text-dark {\n\tcolor: rgb(255, 255, 255);\n\tfont-family: \"Open Sans\";\n}\n.text-light {\n\tcolor: rgb(0, 0, 0);\n\tfont-family: \"Open Sans\";\n}\n.text-gradient {\n\tcolor: rgb(255, 255, 255);\n\tfont-family: \"Plex Mono\";\n}\n\n/* Game button themes */\n.game-button-dark {\n\tcolor: rgb(255, 255, 255);\n\n    background-color: rgb(32, 32, 32);\n\n    box-shadow: 2px 2px 2px black;\n}\n.game-button-dark:hover {\n    background-color: rgb(40, 40, 40);\n}\n.game-button-light {\n\tcolor: rgb(0, 0, 0);\n\n    background-color: rgb(200, 200, 200);\n\n    box-shadow: 2px 2px 2px rgb(180, 180, 180);\n}\n.game-button-light:hover {\n    background-color: rgb(215, 215, 215);\n}\n.game-button-gradient {\n\tcolor: rgb(255, 255, 255);\n\n    background-color: rgba(0, 0, 0, 0);\n\n\tborder: 2px solid rgb(195, 195, 195);\n}\n.game-button-gradient:hover {\n\tbackground-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\n}\n", map: {"version":3,"sources":["/mnt/c/users/miles/onedrive/documents/atom-programs-new/games/number-prestige/src/components/App.vue"],"names":[],"mappings":";AAwFA;IACA,wBAAA;IACA,kDAAA;AACA;AAEA;IACA,wBAAA;IACA,4CAAA;AACA;;AAEA,0BAAA;AACA;IACA;AACA;;AAEA,cAAA;AACA;CACA,yBAAA;CACA,wBAAA;AACA;AAEA;CACA,mBAAA;CACA,wBAAA;AACA;AAEA;CACA,yBAAA;CACA,wBAAA;AACA;;AAEA,uBAAA;AACA;CACA,yBAAA;;IAEA,iCAAA;;IAEA,6BAAA;AACA;AAEA;IACA,iCAAA;AACA;AAEA;CACA,mBAAA;;IAEA,oCAAA;;IAEA,0CAAA;AACA;AAEA;IACA,oCAAA;AACA;AAEA;CACA,yBAAA;;IAEA,kCAAA;;CAEA,oCAAA;AACA;AAEA;CACA,mEAAA;AACA","file":"App.vue","sourcesContent":["<!-- This is the core app component -->\r\n<template>\r\n    <div id=\"app\" v-bind:class=\"themeClass('app')\">\r\n        <selector-container></selector-container>\r\n        <content-container></content-container>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import ContentContainer from \"./content/ContentContainer.vue\";\r\n\r\n    import SelectorContainer from \"./selectors/SelectorContainer.vue\";\r\n\r\n    import calculatedValues from \"../mixins/calculatedValues.js\";\r\n    import gameFunctions from \"../mixins/gameFunctions.js\";\r\n    import save from \"../mixins/save.js\";\r\n\r\n    import { autoClick, theme } from \"../mixins/storeIO.js\";\r\n\r\n    export default {\r\n        mixins: [autoClick, calculatedValues, gameFunctions, save, theme],\r\n\r\n        components: {\r\n            \"content-container\": ContentContainer,\r\n            \"selector-container\": SelectorContainer\r\n        },\r\n\r\n        methods: {\r\n            // This function runs every tick\r\n            tick(tps) {\r\n                if (this.isAutoClickActive()) {\r\n                    let seconds = this.getAutoClickInterval();\r\n                    let gain = this.getTotalGain();\r\n\r\n                    // This adds up to the actual score per second\r\n                    this.addScore(gain / (seconds * tps));\r\n                }\r\n            }\r\n        },\r\n\r\n        created() {\r\n            // Loads save data\r\n            this.loadSaveData();\r\n\r\n            // Current ticks per second\r\n            const tps = 20;\r\n\r\n            // Sets up autosave (5 second interval)\r\n            setInterval(this.save, 5000);\r\n\r\n            // Sets up the tick function to run every tick\r\n            setInterval(() => this.tick(tps), 1000 / tps);\r\n        }\r\n    };\r\n</script>\r\n\r\n<style scoped>\r\n    #app {\r\n        position: absolute;\r\n\r\n        top: 0;\r\n        left: 0;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        display: grid;\r\n\r\n        grid-template-rows: auto;\r\n        grid-template-columns: auto;\r\n    }\r\n\r\n    .app-dark {\r\n        background-color: rgb(20, 20, 20);\r\n    }\r\n\r\n    .app-light {\r\n        background-color: rgb(210, 210, 210);\r\n    }\r\n\r\n    .app-gradient {\r\n        background-image: linear-gradient(rgb(0, 0, 0), rgb(25, 25, 25));\r\n    }\r\n</style>\r\n\r\n<!-- Global styles -->\r\n<!-- This includes themes for global components -->\r\n<style>\r\n    @font-face {\r\n        font-family: \"Open Sans\";\r\n        src: url(\"../fonts/opensans-regular-webfont.woff\");\r\n    }\r\n\r\n    @font-face {\r\n        font-family: \"Plex Mono\";\r\n        src: url(\"../fonts/IBMPlexMono-Regular.ttf\");\r\n    }\r\n\r\n    /*To let me style buttons*/\r\n    button {\r\n        all: unset\r\n    }\r\n\r\n    /*Text themes*/\r\n    .text-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n    \tfont-family: \"Open Sans\";\r\n    }\r\n\r\n    .text-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n    \tfont-family: \"Plex Mono\";\r\n    }\r\n\r\n    /* Game button themes */\r\n    .game-button-dark {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgb(32, 32, 32);\r\n\r\n        box-shadow: 2px 2px 2px black;\r\n    }\r\n\r\n    .game-button-dark:hover {\r\n        background-color: rgb(40, 40, 40);\r\n    }\r\n\r\n    .game-button-light {\r\n    \tcolor: rgb(0, 0, 0);\r\n\r\n        background-color: rgb(200, 200, 200);\r\n\r\n        box-shadow: 2px 2px 2px rgb(180, 180, 180);\r\n    }\r\n\r\n    .game-button-light:hover {\r\n        background-color: rgb(215, 215, 215);\r\n    }\r\n\r\n    .game-button-gradient {\r\n    \tcolor: rgb(255, 255, 255);\r\n\r\n        background-color: rgba(0, 0, 0, 0);\r\n\r\n    \tborder: 2px solid rgb(195, 195, 195);\r\n    }\r\n\r\n    .game-button-gradient:hover {\r\n    \tbackground-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$z = "data-v-55e861d7";
      /* module identifier */
      const __vue_module_identifier__$z = undefined;
      /* functional template */
      const __vue_is_functional_template__$z = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$z = normalizeComponent(
        { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
        __vue_inject_styles__$z,
        __vue_script__$z,
        __vue_scope_id__$z,
        __vue_is_functional_template__$z,
        __vue_module_identifier__$z,
        false,
        createInjector,
        undefined,
        undefined
      );

    // This class represents an upgrade in the game
    var Upgrade = ({ cost, scaling, amount = 0, boost } = {}) => ({
        // Cost of the upgrade
        cost,

        // Amount the upgrade's cost increases on purchase
        scaling,

        // Number of times the upgrade has been bought
        amount,

        // Function that determines how powerful the upgrade is
        boost,

        // Buys the upgrade
        buy() {
            this.amount++;
            this.cost *= this.scaling;
        }
    });

    var store = new Vuex.Store({
        state: {
            // Current theme
            theme: defaultSave.theme,

            // Current game state
            gameState: defaultSave.gameState,

            // Current open selector
            selector: selectorStates.none,

            // Current score
            score: defaultSave.score,

            // Current goal for prestiging
            goal: defaultSave.goal,

            // Amount gained per click
            gain: defaultSave.gain,

            // Number of prestige points
            prestigePoints: defaultSave.prestigePoints,

            // Number of times prestiged
            prestiges: defaultSave.prestiges,

            // Purchaseable upgrades
            upgrades: [
                // Prestige point multiplier
                Upgrade({
                    cost: defaultSave.upgrades[0].cost,
                    scaling: 5,

                    amount: defaultSave.upgrades[0].amount,

                    boost() {
                        return 2 ** this.amount;
                    }
                }),

                // Number gain boost
                Upgrade({
                    cost: defaultSave.upgrades[1].cost,
                    scaling: 5,

                    amount: defaultSave.upgrades[1].amount,

                    boost() {
                        return this.amount;
                    }
                }),

                // Goal reduction upgrade
                Upgrade({
                    cost: defaultSave.upgrades[2].cost,
                    scaling: 5,

                    amount: defaultSave.upgrades[2].amount,

                    boost() {
                        return 0.9 ** this.amount;
                    }
                }),

                // Auto-click speed boost upgrade
                Upgrade({
                    cost: defaultSave.upgrades[3].cost,
                    scaling: 3,

                    amount: defaultSave.upgrades[3].amount,

                    boost() {
                        return 2 ** this.amount;
                    }
                })
            ],

            // Auto-click
            autoClick: {...defaultSave.autoClick},

            // Auto-prestige
            autoPrestige: {...defaultSave.autoPrestige}
        },

        mutations: {
            // Sets the theme
            setTheme(state, theme) {
                state.theme = theme;
            },

            // Changes the game's state
            setGameState(state, gameState) {
                state.gameState = gameState;
            },

            // Opens a selector
            openSelector(state, selector) {
                state.selector = selector;
            },

            // Closes any active selectors
            closeSelector(state) {
                state.selector = selectorStates.none;
            },

            // Sets the score
            setScore(state, score) {
                state.score = score;
            },

            // Adds to the score
            addScore(state, score) {
                state.score += score;
            },

            // Resets the score
            resetScore(state) {
                state.score = 0;
            },

            // Sets the goal
            setGoal(state, goal) {
                state.goal = goal;
            },

            // Increases the goal by doubling it (done on prestige)
            increaseGoal(state) {
                state.goal *= 2;
            },

            // Resets the goal
            resetGoal(state) {
                state.goal = 10;
            },

            // Sets the amount gained on click
            setGain(state, gain) {
                state.gain = gain;
            },

            // Increases the gain by adding 1 to it
            increaseGain(state) {
                state.gain++;
            },

            // Resets the number gained
            resetGain(state) {
                state.gain = 1;
            },

            // Sets the number of prestige points
            setPrestigePoints(state, prestigePoints) {
                state.prestigePoints = prestigePoints;
            },

            // Adds to the number of prestige points
            addPrestigePoints(state, prestigePoints) {
                state.prestigePoints += prestigePoints;
            },

            // Subtracts from the number of prestige points
            subtractPrestigePoints(state, prestigePoints) {
                state.prestigePoints -= prestigePoints;
            },

            // Sets the number of prestiges
            setPrestiges(state, prestiges) {
                state.prestiges = prestiges;
            },

            // Increases the number of prestiges by 1
            increasePrestiges(state) {
                state.prestiges++;
            },

            // Sets the amount of an upgrade
            setUpgradeAmount(state, { id, amount }) {
                state.upgrades[id].amount = amount;
            },

            // Sets the cost of an upgrade
            setUpgradeCost(state, { id, cost }) {
                state.upgrades[id].cost = cost;
            },

            // Buys an upgrade
            buyUpgrade(state, id) {
                state.upgrades[id].buy();
            },

            // Unlocks auto-click
            unlockAutoClick(state) {
                state.autoClick.unlocked = true;
            },

            // Locks auto-click
            lockAutoClick(state) {
                state.autoClick.unlocked = false;
            },

            // Enables auto-click
            enableAutoClick(state) {
                state.autoClick.enabled = true;
            },

            // Disables auto-click
            disableAutoClick(state) {
                state.autoClick.enabled = false;
            },

            // Toggles auto-click
            toggleAutoClick(state) {
                state.autoClick.enabled = !state.autoClick.enabled;
            },

            // Unlocks auto-prestige
            unlockAutoPrestige(state) {
                state.autoPrestige.unlocked = true;
            },

            // Locks auto-prestige
            lockAutoPrestige(state) {
                state.autoPrestige.unlocked = false;
            },

            // Enables auto-prestige
            enableAutoPrestige(state) {
                state.autoPrestige.enabled = true;
            },

            // Disables auto-prestige
            disableAutoPrestige(state) {
                state.autoPrestige.enabled = false;
            },

            // Toggles auto-prestige
            toggleAutoPrestige(state) {
                state.autoPrestige.enabled = !state.autoPrestige.enabled;
            }
        }
    });

    let app = new Vue({
        el: "#app",

        store,

        components: {
            app: __vue_component__$z
        },

        template: `<app></app>`
    });

}(Vue, Vuex));
