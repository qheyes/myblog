<template>
  <div class="user-chat">
    <div>
      <el-table :data="message" :default-sort = "{prop: 'time', order: 'descending'}">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="body" label="留言"></el-table-column>
        <el-table-column prop="time" label="时间" sortable></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
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
  name: "UserChat",
  data() {
    return {
      message: []
    };
  },
  methods: {
    async fetch() {
      const id = this.Cookies.get('userID')
      if(!id)return
      const res = await this.$http.get(`users/comments/${id}`);
      let that = this;
      res.data.comments.map(v => {
        v.time = dayjs(v.createdAt).format("YYYY/MM/DD HH:mm:ss");
        that.message.push(v);
      });
    },
    async remove(row) {
      this.$confirm(`是否确定删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`comments/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.message = [];
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
