//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'InstaVue',
  props: {
    tag: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 4,
    },
    cols: {
      type: Number,
      default: 4,
    },
    links: {
      type: Boolean,
      default: false,
    },
    descriptions: {
      type: Boolean,
      default: false,
    }
  },
  data: function data() {
    return {
      posts: [],
      hashtag: false,
    }
  },
  mounted: function mounted() {
    this.getPosts();
  },
  methods: {
    link: function link(url) {
      if (this.links) {
        window.open(url, '_blank');
      }
    },
    getPosts: function getPosts() {
      var this$1 = this;

      this.hashtag = this.tag[0] === '#';
      var query = this.hashtag ? ("https://www.instagram.com/explore/tags/" + (this.tag.replace('#', '')) + "/?__a=1") : ("https://www.instagram.com/" + (this.tag) + "/?__a=1");
      fetch(query)
          .then(function (response) {
            if (response.status === 404){
              console.error(((this$1.hashtag ? 'Hashtag' : 'Account') + " not found for the tag " + (this$1.tag)));
            }
            response.json().then(function (data) {
              if (data.hasOwnProperty('graphql')) {
                for (var i = 0; i < this$1.quantity; i++) {
                  var post = this$1.hashtag ? data.graphql.hashtag.edge_hashtag_to_media.edges[i].node : data.graphql.user.edge_owner_to_timeline_media.edges[i].node;
                  if (post){
                    this$1.posts.push({
                      id: post.id,
                      src: post.display_url,
                      url: ("https://www.instagram.com/p/" + (post.shortcode) + "/"),
                      alt: post.accessibility_caption,
                      description: post.edge_media_to_caption.edges[0]?['node']['text']:'',
                    });
                  }
                }
              }
            });
          }).catch(function (error) {
        console.error(("Issue getting Instagram content: " + error));
      });
    }
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
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
    var hook;
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
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
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
                { style.element.setAttribute('media', css.media); }
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
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "insta-vue" },
    _vm._l(_vm.posts, function(post) {
      return _c(
        "div",
        {
          key: post.id,
          staticClass: "post",
          style:
            (_vm.links ? "cursor: pointer;" : "cursor: default;") +
            " width: " +
            100 / _vm.cols +
            "%;",
          on: {
            click: function($event) {
              $event.preventDefault();
              return _vm.link(post.url)
            }
          }
        },
        [
          _c("img", { attrs: { alt: post.alt, src: post.src } }),
          _vm._v(" "),
          _vm.descriptions
            ? _c("p", { staticClass: "description" }, [
                _vm._v(_vm._s(post.description))
              ])
            : _vm._e()
        ]
      )
    }),
    0
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-68e651d2_0", { source: "\n.insta-vue[data-v-68e651d2] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  width: 100%;\n}\n.insta-vue .post[data-v-68e651d2] {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  height: auto;\n}\n.insta-vue .post img[data-v-68e651d2] {\r\n  width: 100%;\n}\n.insta-vue p[data-v-68e651d2] {\r\n  margin-top: 0.5rem;\r\n  width: 100%;\r\n  font-size: 0.9rem;\r\n  color: #FFF;\r\n  mix-blend-mode: difference;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Alyios\\Desktop\\insta-vue\\src\\InstaVue.vue"],"names":[],"mappings":";AAmFA;EACA,aAAA;EACA,eAAA;EACA,WAAA;AACA;AAEA;EACA,cAAA;EACA,sBAAA;EACA,aAAA;EACA,YAAA;AACA;AAEA;EACA,WAAA;AACA;AAEA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,WAAA;EACA,0BAAA;AACA","file":"InstaVue.vue","sourcesContent":["<template>\r\n  <div class=\"insta-vue\">\r\n    <div @click.prevent=\"link(post.url)\" class=\"post\"\r\n         :style=\"`${links ? 'cursor: pointer;' : 'cursor: default;'} width: ${100 / cols}%;`\"\r\n         v-for=\"post in posts\" :key=\"post.id\">\r\n      <img :alt=\"post.alt\" :src=\"post.src\">\r\n      <p class=\"description\" v-if=\"descriptions\">{{ post.description }}</p>\r\n    </div>\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'InstaVue',\r\n  props: {\r\n    tag: {\r\n      type: String,\r\n      required: true,\r\n    },\r\n    quantity: {\r\n      type: Number,\r\n      default: 4,\r\n    },\r\n    cols: {\r\n      type: Number,\r\n      default: 4,\r\n    },\r\n    links: {\r\n      type: Boolean,\r\n      default: false,\r\n    },\r\n    descriptions: {\r\n      type: Boolean,\r\n      default: false,\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      posts: [],\r\n      hashtag: false,\r\n    }\r\n  },\r\n  mounted() {\r\n    this.getPosts();\r\n  },\r\n  methods: {\r\n    link(url) {\r\n      if (this.links) {\r\n        window.open(url, '_blank');\r\n      }\r\n    },\r\n    getPosts() {\r\n      this.hashtag = this.tag[0] === '#';\r\n      const query = this.hashtag ? `https://www.instagram.com/explore/tags/${this.tag.replace('#', '')}/?__a=1` : `https://www.instagram.com/${this.tag}/?__a=1`;\r\n      fetch(query)\r\n          .then(response => {\r\n            if (response.status === 404){\r\n              console.error(`${this.hashtag ? 'Hashtag' : 'Account'} not found for the tag ${this.tag}`);\r\n            }\r\n            response.json().then(data => {\r\n              if (data.hasOwnProperty('graphql')) {\r\n                for (let i = 0; i < this.quantity; i++) {\r\n                  let post = this.hashtag ? data.graphql.hashtag.edge_hashtag_to_media.edges[i].node : data.graphql.user.edge_owner_to_timeline_media.edges[i].node;\r\n                  if (post){\r\n                    this.posts.push({\r\n                      id: post.id,\r\n                      src: post.display_url,\r\n                      url: `https://www.instagram.com/p/${post.shortcode}/`,\r\n                      alt: post.accessibility_caption,\r\n                      description: post.edge_media_to_caption.edges[0]?['node']['text']:'',\r\n                    });\r\n                  }\r\n                }\r\n              }\r\n            })\r\n          }).catch(error => {\r\n        console.error(`Issue getting Instagram content: ${error}`);\r\n      });\r\n    }\r\n  },\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.insta-vue {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  width: 100%;\r\n}\r\n\r\n.insta-vue .post {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  height: auto;\r\n}\r\n\r\n.insta-vue .post img {\r\n  width: 100%;\r\n}\r\n\r\n.insta-vue p {\r\n  margin-top: 0.5rem;\r\n  width: 100%;\r\n  font-size: 0.9rem;\r\n  color: #FFF;\r\n  mix-blend-mode: difference;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-68e651d2";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
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

// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('InstaVue', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
    install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
