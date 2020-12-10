import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {},
    sortingType: ['id_ves', true]
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
      headers.sort((a, b) => a.order - b.order)
      return headers.filter(item => item.show !== 0)
    },
    GET_TABLE_FIELDS: ({data, sortingType}) => {
      function reducePointing(val) {
        if(val == null)
          return ''
        return val.toString().replace(/[=\-:\s]/g, '')
      }
  
      if (sortingType[1] === true) {
        return data.Data.sort((a, b) => reducePointing(a[sortingType[0]]) - reducePointing(b[sortingType[0]]))
      } else {
        return data.Data.sort((a, b) => reducePointing(b[sortingType[0]]) - reducePointing(a[sortingType[0]]))
      }
    }
  },
  mutations: {
    SET_DATA: (state, data) => state.data = data,
    SET_SORTING_TYPE: (state, sortingType) => {
      let sortingDirection = state.sortingType[0] === sortingType ? !state.sortingType[1] : true
      state.sortingType = [sortingType, sortingDirection]
    },
    CHANGE_DATA_ORDERS: (state, orders) => state.data.ColsOrder = orders
  },
  actions: {
    FETCH_DATA: async ({commit}) => {
      await axios.get('/example.json')
      .then(({data}) => {
        commit('SET_DATA', data)
      })
    },
    CHANGE_ORDER: ({commit, state}, {name, nn}) => {
      let orders = state.data.ColsOrder
      let targetNameOrder = orders[name]
      
      for(let key in orders) {  //ищем поле с ордером на один больше/меньше
        if(orders[key] === targetNameOrder + nn) {
          orders[key] = targetNameOrder    //
          orders[name] = targetNameOrder + nn
        }
      }
      commit('CHANGE_DATA_ORDERS', orders)
    }
  }
})
