<template>
  <div class="bread border-bottom">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Bread",
  props: {
    title: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">

.bread{
  padding: 10px 0 20px 0;
  
  .el-breadcrumb__inner{
    font-size: 16px;
    color: #999;
  }
}

</style>
