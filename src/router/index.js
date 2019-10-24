import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',    // 去除地址中的 #/  ( 创建VueRouter实例时 )
    routes
})