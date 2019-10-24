import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, COUNT_ADD, COUNT_REDUCE } from "../mutation-types.js"
import { reqGoods, reqRatings, reqInfo } from '../../api'
import Vue from 'vue'

const state = {
  goods: [],
  ratings: [],
  info: {},
  cartFood: [] //存储食物对象的数组
}
const mutations = {
  // goods/ratings/info
  [RECEIVE_GOODS](state, goods) {
    state.goods = goods
  },
  [RECEIVE_RATINGS](state, ratings) {
    state.ratings = ratings
  },
  [RECEIVE_INFO](state, { result }) {
    state.info = result
  },
  [COUNT_ADD](state, {food}){
    if(!food.count){
      Vue.set(food, 'count', 1)
      state.cartFood.push(food) // 在这里只会添加一次，第一次点加号的时候，而且里面的数据会自动更新
    }else{
      food.count++
    }
  },
  [COUNT_REDUCE](state, {food}){
    food.count--
    if (food.count === 0) {
      state.cartFood.splice(state.cartFood.indexOf(food), 1)
    }
  },
}
const actions = {
  // goods/ratings/info
  async getGoods({ commit }) {
    const result = await reqGoods();
    // console.log(result);
    commit(RECEIVE_GOODS, result)
  },
  async getRatings({ commit }) {
    const result = await reqRatings();
    // console.log(result);
    commit(RECEIVE_RATINGS, result)
  },
  async getInfo({ commit }) {
    const result = await reqInfo();
    // console.log(result);
    /* {name: "嘉禾一品（温都水城）", description: "硅谷专送", deliveryTime: 28,} */
    commit(RECEIVE_INFO, { result })
  },
  updateCount({commit}, {isAdd, food}){
    if(isAdd){
      commit(COUNT_ADD, {food})
    }else {
      commit(COUNT_REDUCE, {food})
    }
    
  }
}
const getters = {
  // 总数量
  totalCount(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count, 0)
  },
  // 总价格
  totalPrice(state) {
    return state.cartFood.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}