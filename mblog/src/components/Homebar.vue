<template>
  <div class="homebar border-bottom">
    <div class="hometitle bg-white d-flex ai-center jc-between">
      <div class="logo-pic">
        <img src="../assets/images/logo.jpg" />
      </div>
      <h1 class="title text-primary">鵺鵺の奇妙小屋</h1>
      <div class="headicon">
        <img v-if="!isLogin" src="../assets/images/usericon.jpeg" />
        <img v-if="isLogin" v-lazy="headUrl" alt="" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "Homebar",
  data() {
    return {};
  },
  computed: {
    ...mapState('userInfo', ["userID", "headUrl"]),
    isLogin(){
      return Boolean(this.userID) 
    }
  },
  methods: {
    ...mapActions('userInfo', ["fetchUser"]),
    setUser(){
      const token = this.Cookies.get('token')
      const userID = this.Cookies.get('userID')
      if(token && userID){
        this.fetchUser(userID)
        return
      }
    }
  },
  activated () {
    this.setUser()
  }
};
</script>

<style lang="scss" scoped>

.homebar{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0 20px;
  width: 100%;
  height: 100px;
  background-color: #fff;
  .hometitle{
    height: 100%;
    .logo-pic{
      width: 80px;
      height: 80px;
    }
    .title{
      font-size: 30px;
    }
    .headicon{
      width: 80px;
      height: 80px;
    }
  }
}
img{
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #eee;
}

</style>
