import {  RECEIVE_USER, LOGINOUT_USER } from "../mutation-types.js"

const state = {
  user: {},
}
const mutations = {
  [RECEIVE_USER](state, user){
    state.user = user
  },
  [LOGINOUT_USER](state){
    state.user = {}
  },
}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}