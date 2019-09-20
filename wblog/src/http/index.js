import axios from 'axios'
import Vue from 'vue'

let loadingInstance

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/blog/api'
})

//请求拦截
http.interceptors.request.use(function (config) {
  //引入mintUI加载拦截
  // loadingInstance  = Vue.prototype.$loading

  return config;
}, function (error) {
  
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  //关闭拦截
  // loadingInstance.close()

  return response;
}, err => {

  //关闭拦截
  // loadingInstance.close()

  if(err.response.data.message){
    
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  } 
  return Promise.reject(err)
});


export default http