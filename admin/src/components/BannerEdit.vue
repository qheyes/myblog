<template>
  <div class='banner-edit'>
    <h1>{{id ? '编辑' : '新建'}}轮播</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="轮播名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="model.bannerimg"></el-input>
      </el-form-item>
      <el-form-item label="轮播图">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :action="uploadUrl('bannerimg')"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.bannerimg" :src="model.bannerimg" class="avatar">
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
          res = await this.$http.put(`rest/banners/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/banners', this.model);
        }     
        this.$router.push('/banners/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/banners/${this.id}`);
        this.model = res.data;
      },
       //图片上传后返回值
      afterUpload(res){
        this.$set(this.model, 'bannerimg', res.url)     
        this.$message({
          type: 'success',
          message: '轮播图保存成功'
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
