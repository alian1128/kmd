import Vue from 'vue'
// import App from './App.vue'
import TestApp from './Test.vue'
import  './index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(TestApp),
}).$mount('#app')
