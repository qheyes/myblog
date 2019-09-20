import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../views/home/Home.vue')
// home内部路由
const Index = () => import('../views/home/base/Index.vue')
const Search = () => import('../views/home/base/Search.vue')
const About = () => import('../views/home/base/About.vue')
const Friends = () => import('../views/home/base/Friends.vue')
// Tab外层路由
const Recommend = () => import('../views/recommend/Recommend.vue')
const Chat = () => import('../views/chat/Chat.vue')
const User = () => import('../views/user/User.vue')
const ArticleInfo = () => import('../views/articleInfo/ArticleInfo.vue')
const Login = () => import('../components/UserLogin.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { index: 0},
      redirect: { name: 'index'},
      children: [
        {
          path: '/home/index',
          name: 'index',
          meta: { index: 0},
          component: Index
        },
        {
          path: '/home/search',
          name: 'search',
          meta: { index: 0},
          component: Search
        },
        {
          path: '/home/about',
          name: 'about',
          meta: { index: 0},
          component: About
        },
        {
          path: '/home/friends',
          name: 'friends',
          meta: { index: 0},
          component: Friends
        },
      ]
    },
    {
      path: '/recommend',
      name: 'recommend',
      meta: { index: 1},
      component: Recommend
    },
    {
      path: '/chat',
      name: 'chat',
      meta: { index: 2},
      component: Chat
    },
    {
      path: '/user',
      name: 'user',
      meta: { index: 3},
      component: User
    },
    {
      path: '/articleInfo/:id',
      name: 'articleInfo',
      meta: { index: 4},
      component: ArticleInfo,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      meta: { index: 5},
      component: Login
    }
  ]
})
