import Vue from 'vue'
import App from './App.vue'
import VueOffline from 'vue-offline'
// Register the service worker. It's important to keep the sw.js file in the root of your app since it can control only the directory that it's inside (and below)
import './swRegister'

// https://github.com/filrak/vue-offline
Vue.use(VueOffline)

new Vue({
  el: '#app',
  render: h => h(App)
})
