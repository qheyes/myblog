<template>
  <div class="user-atc">
    <div>
      <el-table :data="articles" :default-sort = "{prop: 'time', order: 'descending'}">
        <el-table-column prop="_id" label="id"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="clicks" label="点击"></el-table-column>
        <el-table-column prop="time" label="时间" sortable></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/publish/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: "UserAtc",
  data() {
    return {
      articles: []
    };
  },
  methods: {
    async fetch() {
      const id = this.Cookies.get('userID')
      if(!id)return
      const res = await this.$http.get(`users/articles/${id}`);
      let that = this;
      res.data.articles.map(v => {
        v.time = dayjs(v.createdAt).format("YYYY/MM/DD HH:mm:ss");
        that.articles.push(v);
      });
    },
    async remove(row) {
      this.$confirm(`是否确定删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`articles/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.articles = [];
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
</style>
