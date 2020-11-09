import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from "./router";
import { VueMasonryPlugin } from 'vue-masonry';
import InfiniteLoading from 'vue-infinite-loading'
import VueDisqus from 'vue-disqus'


Vue.use(VueMasonryPlugin);
Vue.use(InfiniteLoading);
Vue.use(VueDisqus, {
  shortname: 'Pullog'
})

Vue.config.productionTip = false
   
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
