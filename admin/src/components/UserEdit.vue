<template>
  <div class='user-edit'>
    <h1>{{id ? '编辑' : '新建'}}用户</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="手机号">
        <el-input v-model="model.phone"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="管理员权限">
        <el-select v-model="model.isAdmin">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :action="uploadUrl('headicon')"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.headicon" :src="model.headicon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>          
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'UserEdit',
    props: {
      id: {}
    },
    data () {
      return {
        model: {},
      }
    },
    methods: {
      async save(){ 
        let res = '';
        if(this.id){
          res = await this.$http.put(`rest/users/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/users', this.model);
        }     
        this.$router.push('/users/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/users/${this.id}`);
        this.model = res.data;
      },
       //图片上传后返回值
      afterUpload(res){
        this.$set(this.model, 'headicon', res.url)     
        this.$message({
          type: 'success',
          message: '封面保存成功'
        })
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
