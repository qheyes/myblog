import axios from 'axios'
import { Loading } from 'element-ui';
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/blog/api'
})

const state = {
  userID: '',
  headUrl: '',
  username: '',
  content: ''
}
const mutations = {
  getUserID(state, id){
    state.userID = id
  },
  saveHeadUrl(state, model){
    state.headUrl = model.headicon
    state.username = model.username
    state.content = model.content
  },
  init(state){
    state.userID = ''
    state.headUrl = ''
    state.username = ''
    state.content = ''
  }
}
const actions = {
  async fetchUser({commit}, id){
    
    commit('getUserID', id)
    const res = await http.get(`users/${id}`)
    
    commit('saveHeadUrl', {
      username: res.data.username,
      headicon: res.data.headicon,
      content: res.data.content
    })

    Loading.service().close()   
  }
}

export default {
  namespaced: true,
  state, mutations, actions
}