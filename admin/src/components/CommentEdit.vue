<template>
  <div class='comment-edit'>
    <h1>{{id ? '编辑' : '新建'}}留言</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-row :gutter="20">
        <el-col :span="10" v-if="id">
          <el-form-item label="用户">
            <el-input type="text" :disabled="true" v-model="model.user.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="点击数">
            <el-input type="number" v-model="model.clicks"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="留言">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="model.body">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data () {
      return {
        model: {
          user: localStorage.getItem('id') || '',
          body: '',
        },
      }
    },
    methods: {
      async save(){ 
        let res = '';
        const that = this
        if(this.id){
          res = await this.$http.put(`rest/comments/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/comments', this.model);
        }     
        this.$router.push('/comments/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/comments/${this.id}`);
        this.model = res.data;
      }
    },
    created(){
      //当存在 id时,则获取详情
      this.id && this.fetch()
    }
 }
</script>

<style scoped>

 
</style>
