<template>
  <div class='category-edit'>
    <h1>{{id ? '编辑' : '新建'}}简历</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item>
        <vue-editor
          useCustomImageHandler 
          @imageAdded="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data () {
      return {
        model: {}
      }
    },
    methods: {
      //保存,编辑
      async save(){ 
        let res = '';
              
        if(this.id){
          res = await this.$http.put(`rest/abouts/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/abouts', this.model);
        }     
        this.$router.push('/abouts/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      //获取详情
      async fetch(){
        const res = await this.$http.get(`rest/abouts/${this.id}`);
        this.model = res.data;
      },

      //文章内图片上传
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload/articleimg', formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
      }
    },
    created(){
      //当存在 id时,则获取详情
      this.id && this.fetch()
    }
 }
</script>

<style scoped>

.el-upload__tip{
  height: 20px;
  line-height: 20px;
}
.el-form-item__content{
  height: 20px;
  line-height: 20px;
}
 
</style>
