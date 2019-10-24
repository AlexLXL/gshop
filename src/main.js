import Vue from 'vue'
import App from './App'

import router from './router'
import Header from "./components/Header/Header.vue"
import Star from "./components/Star/Star.vue"
import store from './store/store.js'
import './validate.js'
import { Button } from 'mint-ui';
import './mock/mock-server.js'
import CartControl from './pages/Shop/Goods/CartControl.vue'
import Split from './components/Split/Split.vue'

// 注册为全局组件标签
Vue.component('Split', Split)
Vue.component(Button.name, Button);
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
