import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vantui' // 引入 Vant UI
import 'reset-css' // 清除默认样式

Vue.filter('RMBformat', val => {
  return '￥' + Number(val).toFixed(2) + '元'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
