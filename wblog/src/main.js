import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//样式初始化,iconfont图标
import './assets/style/reset.css'
import './assets/style/iconfont/iconfont.css'
import './assets/style/scss/style.scss'

// elementUI组件
import {
  Button, //按钮
  Loading, //加载
  Tabs, //标签页
  TabPane, //标签子页
  Card, //卡片
  Form, //表单
  FormItem, //表单子页
  Input, //输入框
  Upload, //上传
  Select, //多选框
  Option, //多选子项
  Carousel, //轮播走马灯
  CarouselItem, //轮播子页
  Pagination, //分页
  Breadcrumb, //面包屑
  BreadcrumbItem, //面包屑子页
  Slider, //滑块
  Image, //图片
  Avatar, //头像 
  Container, //容器
  Main, //中间区域
  Aside, //侧边栏
  Menu, //菜单模块
  Submenu,
  MenuItemGroup,
  MenuItem,
  Table, //表格
  TableColumn,//表格子页
  MessageBox, //弹窗
  Message, //消息提示
  Notification //通知
} from 'element-ui';

Vue.use(Button)
   .use(Tabs)
   .use(TabPane)
   .use(Card)
   .use(Form)
   .use(FormItem)
   .use(Input)
   .use(Upload)
   .use(Select)
   .use(Option)
   .use(Carousel)
   .use(CarouselItem)
   .use(Pagination)
   .use(Breadcrumb)
   .use(BreadcrumbItem)
   .use(Slider)
   .use(Image)
   .use(Avatar)
   .use(Container)
   .use(Main)
   .use(Aside)
   .use(Menu)
   .use(Submenu)
   .use(MenuItemGroup)
   .use(MenuItem)
   .use(Table)
   .use(TableColumn)
   .use(Loading.directive);

Vue.prototype.$loading = Loading.service({
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
  });
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

//请求数据配置
import http from './http'
Vue.prototype.$http = http
import Cookies from 'js-cookie'
Vue.prototype.Cookies = Cookies

// 全局组件
const card = ()=> import('./components/common/Card.vue')
Vue.component('Card', card)
const bread = ()=> import('./components/common/Bread.vue')
Vue.component('Bread', bread)

//全局日期过滤器
import dayjs from 'dayjs'
Vue.filter('date', function (val) {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
})

//vue指令 v-highlight
Vue.directive('highlight', function(el){
  let highlight = el.querySelectorAll('pre');
  let highlight2 = el.querySelectorAll('code');
  
  highlight.forEach(block => {
    hljs.highlightBlock(block)
  });
  highlight2.forEach(block => {
    hljs.highlightBlock(block)
  });
})
//定义全局代码块
Vue.mixin({
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
