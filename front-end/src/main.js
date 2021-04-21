import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let data = {
  user: null
}

new Vue({
  data,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
