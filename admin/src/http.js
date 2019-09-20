import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api'
})

//添加请求头token
http.interceptors.request.use( res => {
  if(localStorage.token){
    res.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return res
}, err => {
  return Promise.reject(err)
})

//全局错误拦截提示
http.interceptors.response.use(res => {
  return res
}, err => {
  // console.log(err.response.data.message)
  if(err.response.data.message){
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })

    if(err.response.status === 401){
      router.push('/login')
    }
  } 
  return Promise.reject(err)
})

export default http