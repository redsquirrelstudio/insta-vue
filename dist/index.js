/*!
 * insta-vue v1.0.0
 * (c) Red Squirrel Studio
 * Released under the MIT License.
 */
'use strict';

var InstaVue = require('InstaVue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var InstaVue__default = /*#__PURE__*/_interopDefaultLegacy(InstaVue);

var index = {
  install: function install(Vue, options) {
    Vue.component(InstaVue__default['default'].name, InstaVue__default['default']);
  }
};

module.exports = index;
