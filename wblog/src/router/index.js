import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

const Main = () => import('../views/main/Main.vue')
const Home = () => import('../views/main/base/Home.vue')
const Article = () => import('../views/main/base/Article.vue')
const Music = () => import('../views/main/base/Music.vue')
const Chat = () => import('../views/main/base/Chat.vue')
const About = () => import('../views/main/base/About.vue')
const Friends = () => import('../views/main/base/Friends.vue')
const UserInfo = () => import('../views/main/base/UserInfo.vue')
const InfoOne = () => import('../views/userinfo/InfoOne.vue')
const UserOne = () => import('../views/userinfo/UserOne.vue')
const UserAtc = () => import('../views/userinfo/UserAtc.vue')
const UserChat = () => import('../views/userinfo/UserChat.vue')

const Login = () => import('../views/login/Login.vue')
const Edit = () => import('../views/edit/Edit.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home },
        { path: '/article/:id', name: 'article', component: Article, porps: true },
        { path: '/music', name: 'music', component: Music },
        { path: '/chat', name: 'chat', component: Chat },
        { path: '/about', name: 'about', component: About },
        { path: '/friends', name: 'friends', component: Friends },
        { 
          path: '/userinfo', 
          name: 'userinfo',
          component: UserInfo,
          meta: { openOff: true },
          redirect: {
            name: 'infoone'
          },
          children: [
            { path: '/infoone', name: 'infoone', component: InfoOne, meta: { openOff: true },},
            { path: '/userone', name: 'userone', component: UserOne, meta: { openOff: true },},
            { path: '/useratc', name: 'useratc', component: UserAtc, meta: { openOff: true },},
            { path: '/userchat', name: 'userchat', component: UserChat, meta: { openOff: true },},
          ] 
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { path: '/edit', name: 'edit', component: Edit, meta: { openOff: true },},
    { path: '/publish/:id', name: 'edit', component: Edit, props: true, meta: { openOff: true }, },
  ]
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if(to.meta.openOff && !token){
    return next('/login')
  }
  next()
})

export default router