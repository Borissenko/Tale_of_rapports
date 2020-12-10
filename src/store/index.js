import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {}
  },
  getters: {
    GET_DATA: state => state.data,
    GET_TABLE_HEADERS: ({data}) => {
      let ColsTitlesEntries = Object.entries(data.ColsTitles)
      let headers = []
      for (let headerEntries of ColsTitlesEntries) {
        headers.push({
          name: headerEntries[0],
          title: headerEntries[1],
          type: data.ColsTypes[headerEntries[0]],
          order: data.ColsOrder[headerEntries[0]],
          show: data.ColsShow[headerEntries[0]],
        })
      }
      headers.sort((a, b) => a.order - b.order)
      return headers.filter(item => item.show !== 0)
    }
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
