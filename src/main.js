import Vue from 'vue';
import Notifications from 'vue-notification'
import 'url-search-params-polyfill';
import App from './App.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Autocomplete from '@trevoreyre/autocomplete-vue';
import VueLoading from 'vue-loading-template'
import VueLazyLoad from 'vue-lazyload'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'font-awesome/css/font-awesome.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import '@trevoreyre/autocomplete-vue/dist/style.css';
// For Each FA Icon
import { 
    faExclamationCircle, 
    faUserTie, 
    faUsers, 
    faBook, 
    faChartPie ,
    faCog,
    faCommentDollar,
    faIdBadge,
    faFolderPlus,
    faUserPlus,
    faMailBulk,
    faUserFriends,
    faMap,
    faLightbulb,
    faAngleLeft,
    faSearch,
    faBell,
    faArrowsAltH,
    faImage,
    faPaperclip,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

import accounting from 'accounting';

import IdleVue from "idle-vue";

const eventsHub = new Vue();

library.add(
    faExclamationCircle, 
    faChartPie, 
    faBook,
    faUserTie,
    faUsers,
    faCog,
    faCommentDollar,
    faIdBadge,
    faFolderPlus,
    faUserPlus,
    faMailBulk,
    faUserFriends,
    faMap,
    faLightbulb,
    faAngleLeft,
    faSearch,
    faBell,
    faArrowsAltH,
    faImage,
    faPaperclip,
    faTimesCircle
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Autocomplete);
Vue.use(VueLoading);
Vue.use(VueLazyLoad);
Vue.use(Notifications)

Vue.filter('formatMoney', accounting.formatMoney);

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 */

import './plugins/vuex';
import './plugins/axios';
import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';
import './plugins/register-service-worker';

//Ag grid
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";


import store from './store';
// store.dispatch('auth/check');

//Set the user's interation with 300 seconds
Vue.use(IdleVue, {
    eventEmitter: eventsHub,
    store,
    idleTime: 1800000, // 30 minutes
    startAtIdle: false
});

new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
}).$mount('#app');
