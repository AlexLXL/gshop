import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from "../mutation-types.js"
import { reqAddress, reqCategory, reqShops } from '../../api'

const state = {
  longitude: '121.4762',
  latitude: '31.22967',
  address: {},
  categorys: [],
  shops: [],
}
const mutations = {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  }
}
const actions = {
  // 请求地址
  async getAddress({ commit, state }) {
    const { longitude, latitude } = state
    const result = await reqAddress(latitude, longitude)
    commit(RECEIVE_ADDRESS, result)
  },

  // 请求食品分类
  async getCategorys({ commit }, callback) {
    const result = await reqCategory()
    commit(RECEIVE_CATEGORYS, result)
    typeof(callback) === 'function' && callback()
  },

  // 请求商店
  async getShops({ commit, state }) {
    const { longitude, latitude } = state
    const result = await reqShops(latitude, longitude)
    commit(RECEIVE_SHOPS, result)
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}