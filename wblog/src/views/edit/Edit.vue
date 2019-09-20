<template>
  <div class="publish">
    <form class="form" @submit.prevent="save">
      <div class="head border-bottom d-flex ai-center">
        <!-- 文本框 -->
        <div class="ipt">
          <input type="text" class="title" placeholder="输入文章标题..." v-model="model.title" />
        </div>
        <!-- 封面上传 -->
        <div class="cover">
          <div class="cover-btn">
            <i class="iconfont icon-tupian"></i>
          </div>
          <div class="upload-cover bg-white text-center">
            <span>添加封面大图</span>
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action="uploadUrl('articleicon')"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="afterUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <!-- 多选框 -->
        <el-select class="select" v-model="model.categories" multiple placeholder="请选择分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
        <!-- 提交 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </div>
      <!-- 富文本编辑器 -->
      <div class="body-box">
        <vue-editor ref="editor" v-model="model.body"></vue-editor>
      </div>
    </form>

  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import { VueEditor } from "vue2-editor";
export default {
  name: "Edit",
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        author: ""
      },
      categories: []
    };
  },
  computed: {
    ...mapState('userInfo', ["userID"])
  },
  methods: {
    ...mapMutations('userInfo', ["getUserID"]),
    setAuthor(){
      this.getUserID()
      this.model.author = this.userID
    },
    //保存,编辑
    async save() {
      let res = "";
      const id = this.id
      if (id) {
        console.log(this.model)
        res = await this.$http.put(`articles/edit/${id}`, this.model);
      } else {
        res = await this.$http.post("articles", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.$router.push("/");
    },
    //获取详情
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
    //获取分类
    async fetchCategories() {
      const res = await this.$http.get("categories/list");
      this.categories = res.data;
    },
    //上传前验证
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt500kb = file.size / 1024 < 500;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/png 格式!");
      }
      if (!isLt500kb) {
        this.$message.error("上传图片大小不能超过 500kb!");
      }
      return isJPG && isLt500kb;
    },
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
      this.$message({
        type: "success",
        message: "封面保存成功"
      });
    },
    //文章内图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload/articleimg", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created() {
    this.setAuthor();
    this.fetchCategories();
    this.id && this.fetch();
    this.$loading.close();
  },
};
</script>

<style lang="scss">
.form {
  height: 100vh;
  background-color: #fff;
  .head {
    height: 70px;
    .ipt {
      width: 65%;
      height: 100%;
      margin-right: 70px;
      .title{  
        padding-left: 20px;  
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        color: #666;
        font-size: 20px;
        font-weight: 700;
        input::-ms-input-placeholder {
          color: #666;
          font-size: 20px;
          font-weight: 700;
        }
        input::-webkit-input-placeholder {
          color: #666;
          font-size: 20px;
          font-weight: 700;
        }
      }  
    }
    .cover {
      position: relative;
      margin-right: 70px;
      width: 80px;
      height: 100%;
      line-height: 50px;
      .cover-btn {
        width: 100%;
        height: 100%;
        line-height: 70px;
        text-align: center;
        i{
          font-size: 40px;
        }     
      }
      &:hover {
        .upload-cover {
          display: block;
        }
      }
      .upload-cover {
        display: none;
        position: absolute;
        left: 50%;
        top: 70px;
        z-index: 1000;
        margin-left: -130px;
        padding: 5px 20px;
        width: 260px;
        border: 1px solid #ddd;
        border-radius: 0 0 5px 5px;
        &::before {
          content: "";
          position: absolute;
          margin-left: -5px;
          top: -6px;
          left: 50%;
          width: 10px;
          height: 10px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-right: none;
          border-bottom: none;
          transform: rotate(45deg);
        }
      }
    }
    .select{
      margin-right: 70px;
    }
  }
  .body-box {
    height: calc(100vh - 70px);
    .quillWrapper {
      height: calc(100vh - 70px);
      .ql-container {
        height: 90%;
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 100px;
  max-width: 160px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  min-width: 100px;
  max-width: 160px;
  height: 100px;
  display: block;
}
</style>
