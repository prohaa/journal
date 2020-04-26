'use strict'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './routes.js'
import resource from 'vue-resource'
import Notifications from 'vue-notification'

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(resource)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
