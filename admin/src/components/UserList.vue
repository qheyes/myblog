<template>
  <div class='user-list'>
    <h1>用户列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="isAdmin" label="管理员权限"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作"  width="240">
      <template slot-scope="scope">
        <el-button type="primary" size="small" 
        @click="$router.push(`/users/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    name: 'UserList',
    data () {
      return {
        items: []
      }
    },
    methods: {
      async fetch(){
        const res = await this.$http.get('rest/users')
        let that = this
        res.data.map(v => {    
          v.isAdmin = String(v.isAdmin)   
          v.time = dayjs(v.updatedAt).format('YYYY/MM/DD HH:mm:ss')   
          that.items.push(v)           
        })
      },
      async remove(row){
        this.$confirm(`是否确定删除用户"${row.username}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/users/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.items = [];
          this.fetch();
        })      
      }
    },
    created(){
      this.fetch()
    }
 }
</script>

<style scoped>

 
</style>
