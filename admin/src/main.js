import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './assets/style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

//定义全局代码块
Vue.mixin({
  computed: {
    // uploadUrl(val){
    //   return this.$http.defaults.baseURL + val
    // }
  },
  methods: {
    //添加请求头,图片上传使用
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    },
    uploadUrl(val){
      return this.$http.defaults.baseURL + `/upload/${val}`
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
