/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://localhost:1337',{ format: 'json' })
Vue.config.productionTip = false

// Vue.use(VueNativeSock, 'ws://localhost:1337', { protocol: 'newMsg' })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
