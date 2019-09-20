<template>
  <div class="userone">
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="昵称">
        <el-input v-model="userName"></el-input>
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
          <img v-if="headIcon" :src="headIcon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :disabled="!isValid">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "UserOne",
  data() {
    return {
      userName: "",
      headIcon: "",
      isValid: false
    };
  },
  watch: {
    "userName": function() {
      this.isValid = true;
    },
    "headIcon": function() {
      this.isValid = true;
    }
  },
  computed: {
    ...mapState('userInfo', ["userID", "headUrl", "username"]),

  },
  methods: {
    ...mapActions('userInfo', ["fetchUser"]),
    setUser(){
      const id = this.Cookies.get('userID')
      if(!id)return
      this.fetchUser(id)
      this.userName = this.username
      this.headIcon = this.headUrl
      this.isValid = false;
    },
    //图片上传后返回值
    afterUpload(res) {
      this.headIcon = res.url;
    },
    save() {
      const id = this.userID
      if(!id)return
      const res = this.$http.put(`users/item/${id}`, {
        username: this.userName,
        headicon: this.headIcon
      });
      this.$message({
        message: "保存成功",
        type: "success"
      });
      this.isValid = false;
    }
  },
  mounted() {
    this.setUser()
  }
};
</script>

<style>
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
  min-width: 200px;
  max-width: 260px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  min-width: 200px;
  max-width: 260px;
  height: 200px;
  display: block;
}
</style>
