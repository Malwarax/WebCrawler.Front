import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import TestsTable from './components/Tests/TestsTable.vue'
import ResponseTimeTable from './components/Test/TableWithResponseTime.vue'
import UrlsTable from './components/Test/TableWithUrls.vue'
import Form from './components/Tests/Form.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)


Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(require('vue-moment'))
Vue.http.options.root = 'http://webcrawler.local/api/'

Vue.component('app-form',Form)
Vue.component('app-tests-table',TestsTable)
Vue.component('app-response-table',ResponseTimeTable)
Vue.component('app-urls-table',UrlsTable)

export const eventEmitter = new Vue()

new Vue({
  el: '#app',
  render: h => h(App),
  router
})


