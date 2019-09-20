<template>
  <div class="login">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="user"
          label-width="60px"
          class="demo-ruleForm"
          @submit.native.prevent="login('user')"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="medium" type="primary" native-type="submit">登录</el-button>
            <el-button size="medium" @click="clear">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册" name="register">
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="register"
          label-width="70px"
          class="demo-ruleForm"
          @submit.native.prevent="register('register')"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="medium" type="primary" native-type="submit">注册</el-button>
            <el-button size="medium" @click="clear">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));

        }else if(value.length < 3) {
            callback(new Error('昵称不得小于3位'));
        }else{
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(value.length < 6){
          callback(new Error('密码不能小于6位'));         
        }else{
          if(this.user.checkPass !== ''){
            this.$refs.user.validateField('checkPass');         
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      activeName: 'login',
      user: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    login(formName) {
      
      this.$refs[formName].validate(async valid => {
        if (valid) {
          
          const res = await this.$http.post("login", this.user);
          //禁止复数登录设置
          this.Cookies.remove('token')
          this.Cookies.remove('userID')

          this.Cookies.set('token', res.data.token, { expires: 7 })
          this.Cookies.set('userID', res.data._id, { expires: 7 })
          this.user.username = ''
          this.user.password = ''

          this.$message({
            showClose: true,
            message: "欢迎登录鵺鵺の小屋",
            type: "success"
          });

          this.$router.replace('/')

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {

          this.$http.post("register", this.user).then(res => {

            this.user.username = ''
            this.user.password = ''
            this.user.checkPass = ''

            if(res.data.error){
              this.$message({
                showClose: true,
                message: '用户名已存在',
                type: 'error'
              });
              return 
            }
            this.$message({
              showClose: true,
              message: '注册成功,请登录',
              type: 'success'
            });
            
            this.activeName = 'login'

          });

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clear(){
      this.user.username = ''
      this.user.password = ''
      this.user.checkPass = ''
    }
  }
};
</script>

<style lang="scss">
.login {
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 500px;
  height: 400px;
  .demo-ruleForm{
    padding-top: 20px; 
  }
}
.el-tabs__item {
  text-align: center;
  width: 250px;
}
.el-button--medium{
  width: 190px;
}
</style>
