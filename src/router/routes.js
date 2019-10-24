// import MSite from '../pages/MSite/MSite.vue'           // 静态，全打包到一个js
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

const MSite = () => import('../pages/MSite/MSite.vue')    // 分割打包，动态加载
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')


import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'
import Info from '../pages/Shop/Info/Info.vue'

export default [
    {
      path: '/msite',
      component: MSite,
      meta:{
        isShowFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        isShowFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        isShowFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        isShowFooter:true
      }
    },
    {
      path: '/login',
      component: Login,
      // meta:{         // 这里是自己的footer那里用 v-show="!$route.meta.isShowFooter"
      //   isShowFooter:true
      // }
    },
    {
      path: '/shop',
      component: Shop,
      // meta:{         // 因为没有在/shop路径停下的, 这个meta并没有给上
      //   aaaa:true
      // },
      children: [
        {
          path: '/shop/goods',
          component: Goods,
          // meta:{         // 这里meta可以给上
          //   aaaa:true
          // },
        },
        {
          path: '/shop/ratings',
          component: Ratings,
          // meta:{         
          //   aaaa:true
          // },
        },
        {
          path: '/shop/info',
          component: Info
        },
        {
          path: '/shop',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path: '/',
      redirect: '/msite'
    }
]