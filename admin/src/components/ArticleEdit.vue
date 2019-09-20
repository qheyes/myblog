<template>
  <div class='category-edit'>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="文章分类">
            <el-select v-model="model.categories" multiple>
              <el-option 
                v-for="item in categories" 
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="作者">
            <el-input type="text" :disabled="true" v-model="author"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="点击数">
            <el-input type="number" v-model="model.clicks"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
         
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="封面" >
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action="uploadUrl('articleicon')"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-change="changeUpload"
              :before-upload="beforeUpload"
              :on-success="afterUpload"
              :auto-upload="false"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>          
          </el-form-item>      
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <div class="el-upload__tip">※：只能上传jpg/png文件，且不超过500kb！！！</div>
            <div class="el-upload__tip">※：请先保存封面在提交文章！！！</div>
          <el-button type="primary" size="small"  @click="submitUpload">保存封面</el-button>
          </el-form-item>
        </el-col>
      
      </el-row>
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
    name: 'CategoryEdit',
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data () {
      return {
        model: {
          icon: '',
          author: localStorage.getItem('id') || ''
        },
        categories: [],
        author: localStorage.getItem('username') || ''
      }
    },
    methods: {
      //保存,编辑
      async save(){ 
        let res = '';
              
        if(this.id){
          res = await this.$http.put(`rest/articles/${this.id}`, this.model);
        }else{
          res = await this.$http.post('rest/articles', this.model);
        }     
        this.$router.push('/articles/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      //获取详情
      async fetch(){
        const res = await this.$http.get(`rest/articles/${this.id}`);
        this.model = res.data;
      },
      //获取分类
      async fetchCategories(){
        const res = await this.$http.get('rest/categories');
        this.categories = res.data;
      },
      //上传前验证
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt500kb = file.size / 1024  < 500;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/png 格式!');
        }
        if (!isLt500kb) {
          this.$message.error('上传图片大小不能超过 500kb!');
        }
        return isJPG && isLt500kb;
      },
      //图片预览
      changeUpload(file){
        let that = this
        var event = event || window.event;
        var file = event.target.files || event.dataTransfer.files;
        
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function(){
          // console.log(reader.result); 
          that.$set(that.model, 'icon', reader.result)
        }      
      },
      //图片上传后返回值
      afterUpload(res){
        //显示赋值 (赋值的主体对象, 添加的属性, 添加属性所赋的值)
        this.$set(this.model, 'icon', res.url)     
        //主体对象内的属性需要提前定义才能直接赋值
        // this.model.icon = res.url
        this.$message({
          type: 'success',
          message: '封面保存成功'
        })
      },
      submitUpload() {    
        this.$refs.upload.submit();      
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
      this.fetchCategories()
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
