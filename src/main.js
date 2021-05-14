import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router/router'
import { store } from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Importing the global css file
import 'primevue/resources/themes/saga-blue/theme.css';
// Importing the base PrimeVue component styles
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Loading from 'vue-loading-overlay';
import i18n from './i18n'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import "@/assets/styles/main.scss"
import VueFilterDateFormat from 'vue-filter-date-format';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToastService);
Vue.use(Loading, {
  color: 'green'
});
Vue.use(VueFilterDateFormat);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
