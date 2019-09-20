import axios from 'axios'
import { Indicator,Toast } from 'mint-ui';
import 'mint-ui/lib/style.css'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})

//请求拦截
http.interceptors.request.use(function (config) {
  //引入mintUI加载拦截
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });

  return config;
}, function (error) {
  
  return Promise.reject(error);
});


http.interceptors.response.use(function (response) {
  //关闭拦截
  Indicator.close();
  
  return response;
}, function (error) {

  // console.log(error.response.data.message)
  //关闭拦截
  Indicator.close();
  if(error.response.data.message){
    Toast({
      message: error.response.data.message,
      position: 'middle',
      duration: 3000
    });
  }

  

  // Vue.prototype.$message({
  //   type: 'error',
  //   message: err.response.data.message
  // })

  // if(err.response.status === 401){
  //   router.push('/login')
  // }


  return Promise.reject(error);
});


export default http