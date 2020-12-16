import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/dayjs'

//动态设置rem基准值
import 'amfe-flexible'

//加载vant核心组件库
import Vant from 'vant'
//加载vant全局样式
import 'vant/lib/index.css'

//注册使用vant组件库
Vue.use(Vant)

if(module.hot) {
  module.hot.accept()
}

import './styles/index.less'

Vue.config.productionTip = false

// while(true) {}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
