<template>
  <div class='main'>
    <el-container style="height: 100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/creat">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/creat">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/users/creat">新建用户</el-menu-item>
              <el-menu-item index="/users/list">用户列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">留言</template>
              <el-menu-item index="/comments/creat">新建留言</el-menu-item>
              <el-menu-item index="/comments/list">留言列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">轮播</template>
              <el-menu-item index="/banners/creat">新建轮播</el-menu-item>
              <el-menu-item index="/banners/list">轮播列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">简历</template>
              <el-menu-item index="/abouts/creat">新建简历</el-menu-item>
              <el-menu-item index="/abouts/list">简历列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">友链</template>
              <el-menu-item index="/friends/creat">新建友链</el-menu-item>
              <el-menu-item index="/friends/list">友链列表</el-menu-item>
            </el-menu-item-group>
        
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button @click="clear">退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{username}}</span>
        </el-header>
        
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Main',
    data () {
      return {
        username: localStorage.getItem('username') || ''
      }
    },
    methods: {
      clear(){
        // localStorage.removeItem('token')
        localStorage.clear()
        this.$router.push('/login')
      }
    }
 }
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
 
</style>
