import Vue from 'vue';
import Vuex, {Store} from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import msite from './modules/msite.js'
import shop from './modules/shop.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Store({
  mutations,
  actions,
  getters,
  modules:{
    msite,
    shop,
    user
  }
})