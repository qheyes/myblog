import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入阿里适配方案
import 'amfe-flexible'
//公共样式库
import './assets/style/style.scss'
//引入axios
import http from './http'
Vue.prototype.$http = http
import Cookies from 'js-cookie'
Vue.prototype.Cookies = Cookies

//按需引入vantUI组件
import { 
  Tabbar, TabbarItem, //底部标签栏
  Tab, Tabs, //tab标签页
  NavBar, //导航栏
  Swipe, SwipeItem, //轮播
  Lazyload, //懒加载
  Cell, CellGroup, //单元格,单元组
  Icon, //图标
  Button, //按钮
  Tag, //标记
  Search , //搜索
  Field, //表单输入框
  Toast, //轻提示
  Notify, //消息提示
  Slider, //滑块
  List, //列表
} from 'vant';

Vue.use(Tabbar).use(TabbarItem)
   .use(Tab).use(Tabs)
   .use(NavBar)
   .use(Swipe).use(SwipeItem)
   .use(Lazyload)
   .use(Cell).use(CellGroup)
   .use(Icon)
   .use(Button)
   .use(Tag)
   .use(Search)
   .use(Field)
   .use(Toast)
   .use(Notify)
   .use(Slider)
   .use(List)


//全局组件定义
const Navbar = () => import('./components/Navbar.vue')
const ItemArticle = () => import('./components/ItemArticle.vue')
Vue.component('Navbar', Navbar)
Vue.component('ItemArticle', ItemArticle)


//全局日期过滤器
import dayjs from 'dayjs'
Vue.filter('date', function (val) {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
})

//vue指令 v-highlight
Vue.directive('highlight', function(el){
  let highlight = el.querySelectorAll('pre');
  let highlight2 = el.querySelectorAll('code');
  let h2 = el.querySelectorAll('h2');
  h2.forEach( v => {
    v.style.cssText = "margin: 20px 0 10px 0;padding: 10px;border-left: 5px solid #9466ff;background: #f0f2f7;font-size:16px;"
  })
  highlight.forEach(block => {
    hljs.highlightBlock(block)
  });
  highlight2.forEach(block => {
    hljs.highlightBlock(block)
  });
})




Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
