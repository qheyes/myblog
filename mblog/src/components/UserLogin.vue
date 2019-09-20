<template>
  <div class="userLogin">
    <van-tabs v-model="active">
      <van-tab title="登录">

        <van-cell-group>
          <van-field
            v-model.trim="username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
          />

          <van-field
            v-model.trim="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
        </van-cell-group>
        <van-button 
          type="primary" 
          size="large" 
          :disabled="!isVaild"
          @click="login"
        >
          登录
        </van-button>
      </van-tab>
      <van-tab title="注册">

        <van-cell-group>
          <van-field
            v-model.trim="username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="用户名不能小于4位"
          />

          <van-field
            v-model.trim="password"
            type="password"
            label="密码"
            placeholder="密码不能小于4位"
            required
          />
        </van-cell-group>
        <van-button 
          type="primary" 
          size="large" 
          :disabled="!isVaild"
          @click="register"
        >
          注册
        </van-button>
      </van-tab>
    </van-tabs>

    <p class="toast">只有输入正确格式才能点击哟~</p>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data() {
    return {
      active: 0,
      username: '',
      password: ''
    };
  },
  computed: {
    isVaild(){
      return String(this.username).length > 4 && String(this.password).length > 4
    }
  },
  methods: {
    async login(){
      const username = this.username
      const password = this.password
      const res = await this.$http.post('login', {
        username, password
      })
      // console.log(res.data)
      this.Cookies.set('token', res.data.token, { expires: 7 })
      this.Cookies.set('userID', res.data._id, { expires: 7 })
      this.username = '' 
      this.password = ''
      this.$notify({ type: 'success', message: '登录成功' });
      this.$router.replace('/')
    },
    async register(){
      const username = this.username
      const password = this.password
      const res = await this.$http.post('register', {
        username, password
      })

      this.username = '' 
      this.password = ''

      if(res.data.error){
        this.$toast('用户名已存在');
        return
      }else{
        this.$toast('注册成功,请登录');
      }
      
      this.active = 0;
    }
  }
};
</script>

<style lang="scss" scoped>

.userLogin{
  position: absolute;
  top: 200px;
  left: 0;
  padding: 20px;
  width: 100%;
  border: 1px solid #ddd;
  background-color: #fff;
  .toast{
    padding: 20px 0;
    font-size: 24px;
    color: #ddd;
    text-align: center;
  }
}

</style>
