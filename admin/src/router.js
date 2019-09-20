import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import CategoryEdit from './components/CategoryEdit.vue'
import CategoryList from './components/CategoryList.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import ArticleList from './components/ArticleList.vue'
import UserEdit from './components/UserEdit.vue'
import UserList from './components/UserList.vue'
import CommentEdit from './components/CommentEdit.vue'
import CommentList from './components/CommentList.vue'
import BannerEdit from './components/BannerEdit.vue'
import BannerList from './components/BannerList.vue'
import AboutEdit from './components/AboutEdit.vue'
import AboutList from './components/AboutList.vue'
import FriendEdit from './components/FriendEdit.vue'
import FriendList from './components/FriendList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    // meta: { isPublic: true} 只有添加过true的页面允许访问
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true} },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/creat', component: CategoryEdit },
        // 将路径内的 id 通过 props 传入 CategoryEdit 组件内
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },

        { path: '/articles/creat', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

        { path: '/users/creat', component: UserEdit },
        { path: '/users/edit/:id', component: UserEdit, props: true },
        { path: '/users/list', component: UserList },

        { path: '/comments/creat', component: CommentEdit },
        { path: '/comments/edit/:id', component: CommentEdit, props: true },
        { path: '/comments/list', component: CommentList },

        { path: '/banners/creat', component: BannerEdit },
        { path: '/banners/edit/:id', component: BannerEdit, props: true },
        { path: '/banners/list', component: BannerList },

        { path: '/abouts/creat', component: AboutEdit },
        { path: '/abouts/edit/:id', component: AboutEdit, props: true },
        { path: '/abouts/list', component: AboutList },

        { path: '/friends/creat', component: FriendEdit },
        { path: '/friends/edit/:id', component: FriendEdit, props: true },
        { path: '/friends/list', component: FriendList },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  //当访问没有公开允许并且没有token时,跳转登录页面
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
}) 

export default router