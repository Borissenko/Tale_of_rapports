import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {}
  },
  getters: {
    GET_DATA: state => state.data
  },
  mutations: {
    SET_DATA: (state, data) => state.data = data
  },
  actions: {
    FETCH_DATA: async ({commit}) => {
      await axios.get('/example.json')
      .then(({data}) => {
        commit('SET_DATA', data)
      })
    }
  },
  modules: {}
})
