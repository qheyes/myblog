<template>
  <div class='user-edit'>
    <h1>{{id ? '编辑' : '新建'}}友链</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名字">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="model.content"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="model.url"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :action="uploadUrl('friendicon')"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.friendicon" :src="model.friendicon" class="avatar">
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
          res = await this.$http.put(`rest/friends/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/friends', this.model);
        }     
        this.$router.push('/friends/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/friends/${this.id}`);
        this.model = res.data;
      },
       //图片上传后返回值
      afterUpload(res){
        this.$set(this.model, 'friendicon', res.url)     
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
