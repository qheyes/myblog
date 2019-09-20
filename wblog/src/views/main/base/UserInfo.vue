<template>
  <div class="user-info">
    <Bread title="用户中心" />

    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" router :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>用户中心
            </template>
            <el-menu-item-group>
              <template slot="title">个人</template>
              <el-menu-item index="/infoone">个人详情</el-menu-item>
              <el-menu-item index="/userone">个人编辑</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理</template>
              <el-menu-item index="/useratc">文章管理</el-menu-item>
              <el-menu-item index="/userchat">留言管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">留下痕迹</template>
              <el-menu-item index="/edit">发表文章</el-menu-item>
              <el-menu-item index="/chat">留下意见</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>      
        </el-menu>
      </el-aside>

      <el-container> 
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.user-info {
  padding: 10px;
  min-height: calc(100vh - 200px);
  background-color: #fff;
}
</style>
