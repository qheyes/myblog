<template>
  <div class="user calc">
    <UserLogin v-if="!isShow" />

    <div class="user-item" v-if="isShow">
      <div class="head d-flex ai-center jc-center border-bottom">
        <div class="d-flex flex-column ai-center">
          <div class="head-icon">
            <img v-lazy="headUrl" width="100%" height="100%">
          </div>
          <p class="username">{{username}}</p>
          <p class="content">{{content}}</p>
        </div>
      </div>
      <div class="user-body">
        <ul class="modules">
          <li 
            class="border-bottom d-flex ai-center" 
            v-for="item in modules"
            :key="item.id"
          >
            <van-cell :title="item.title" is-link to="/" />
          </li>
        </ul>
      </div>
      <van-button 
        color="rgb(237,206,159)" 
        size="large"
        @click="tabLogin"
      >
        切换账号
      </van-button>
      <van-button 
        type="default" 
        size="large"
        @click="quite"
      >
        退出
      </van-button>
    </div>


  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UserLogin from '../../components/UserLogin'
export default {
  name: "User",
  components: {
    UserLogin
  },
  data() {
    return {
      isShow: false,
      modules: [
        { id: 0, title: '我的文章', linkTo: 'articles'},
        { id: 1, title: '我的留言', linkTo: 'chat'},
        { id: 2, title: '个人设置', linkTo: 'person'},
        { id: 3, title: '更多功能', linkTo: ''},
      ]
    };
  },
  computed: {
    ...mapState('userInfo',["headUrl", "username", "content"])
  },
  methods: {
    ...mapActions('userInfo',["fetchUser"]),
    setUser(){
      const token = this.Cookies.get('token')
      const userID = this.Cookies.get('userID')
      if(token && userID){
        this.isShow = true
        this.fetchUser(userID)
        return
      }
      this.isShow = false
    },
    tabLogin(){
      this.Cookies.remove('token')
      this.Cookies.remove('userID')
      this.isShow = false
    },
    quite(){
      this.Cookies.remove('token')
      this.Cookies.remove('userID')
      this.isShow = false
      this.$notify({ type: 'success', message: '退出成功' });
      this.$router.replace('/')
    }
  },
  activated () {
    this.setUser()
  }
};
</script>

<style lang="scss" scoped>

.user{
  background-color: #fff;
  position: relative;
}

.user-item{
  .head{
    height: 500px;
    background:rgba(219,158,63,.5);
    font-size: 24px;
    .head-icon{
      overflow: hidden;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 6px solid #fff;
    }
    p{
      line-height: 80px;
      color: #fff;
    }
    .username{
      font-size: 40px;
    }
  }
  .user-body{
    color: #7d7e80;
  }
  .van-button{
    margin-top: 30px;
  }
}


</style>
