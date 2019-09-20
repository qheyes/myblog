<template>
  <div class='category-list'>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="clicks" label="点击数"></el-table-column>
      <el-table-column prop="categories[0].name" label="文章分类"></el-table-column>
      <el-table-column prop="author.username" label="文章作者"></el-table-column>
      <el-table-column prop="time" label="发表时间"></el-table-column>
      <el-table-column fixed="right" label="操作"  width="150">
      <template slot-scope="scope">
        <el-button type="primary" size="small" 
        @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    name: 'CategoryList',
    filters: {
      date(val){
        return dayjs(val).format('MM/DD')
      }
    },
    data () {
      return {
        items: [],
      }
    },
    methods: {
      async fetch(){
        const res = await this.$http.get('rest/articles')
        let that = this
        res.data.map(v => {      
          // v.clicks = String(v.clicks) 
          v.time = dayjs(v.updatedAt).format('YYYY/MM/DD HH:mm:ss')   
          that.items.push(v)           
        })
      },
      async remove(row){
        this.$confirm(`是否确定删除分类"${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.items = []
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
