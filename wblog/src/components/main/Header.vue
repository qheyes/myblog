<template>
  <div class="header border-bottom">
    <div class="container d-flex jc-between ai-center">
      <!-- logo -->
      <h1 class="logo-pic">
        <img src="../../assets/images/logo.jpg" width="100%" height="100%">
      </h1>
      <!-- nav导航 -->
      <ul class="nav d-flex ai-center">
        <li class="cp" v-for="item in navbar" :key="item.id">
          <router-link :to="{name: item.linkTo}">
            <i class="iconfont" :class="item.icon"></i>
            <span class="tit" v-text="item.title"></span>
          </router-link>      
        </li>
      </ul>
      <!-- user -->
      <div class="user-box d-flex jc-between ai-center">
        <!-- 投稿功能 -->
        <div class="atc">
          <div class="atc-btn cp">
            <router-link :to="{name: 'edit'}">投稿</router-link>
          </div>
        </div>
        <!-- 用户功能 -->
        <div class="user">
          <div class="user-pic" @click="linkLogin">
            <el-avatar icon="el-icon-user-solid" :size="50" v-if="!isLogin"></el-avatar>
            <el-avatar :size="50" :src="headUrl" @error="errorHandler">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
          </div>
          <!-- 下拉列表 -->
          <div class="userinfo" v-if="isLogin">
            <p>{{username}}</p>
            <ul>
              <li class="border-top" v-for="item in infoList" :key="item.id">
                <router-link :to="{name: item.linkTo}">
                  <span v-text="item.title"></span>
                </router-link>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      navbar: [
        { id: 1, title: '首页', icon: 'icon-yemian-copy-copy', linkTo: 'home'},
        { id: 2, title: '音乐时刻', icon: 'icon-yinle', linkTo: 'music'},
        { id: 3, title: '留言板', icon: 'icon-liuyan', linkTo: 'chat'},
        { id: 4, title: '关于我', icon: 'icon-guanyu', linkTo: 'about'},
        { id: 5, title: '友链', icon: 'icon-ziyuan', linkTo: 'friends'},
        { id: 6, title: '待开发', icon: 'icon-caidan', linkTo: 'home'}
      ],
      infoList: [
        { id: 1, title: "个人中心", linkTo: 'userinfo'},
        { id: 2, title: "投稿管理", linkTo: 'useratc'},
        { id: 3, title: "留言管理", linkTo: 'userchat'}
      ]
    };
  },
  computed: {
    ...mapState('userInfo', ["userID", "headUrl", "username"]),
    isLogin(){
      return Boolean(this.userID) 
    }
  },
  methods: {
    ...mapActions('userInfo', ["fetchUser"]),
    errorHandler(){
      return true
    },
    setUser(){
      const token = this.Cookies.get('token')
      const userID = this.Cookies.get('userID')
      if(token && userID){
        this.fetchUser(userID)
        return
      }
    },
    linkLogin(){
      const token = this.Cookies.get('token');
      const userID = this.Cookies.get('userID')
      if(token && userID)return
      this.$router.push('/login')
    }
  },
  mounted () {
    this.setUser()
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/scss/variables';
.header{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.container{
  margin: auto;
  width: 980px;
  height: 100%;
  .logo-pic{
    overflow: hidden;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .nav{
    padding: 0 30px; 
    flex: 1;
    font-size: 13px;
    color: #222;
    li{
      padding: 0 20px;
      a{
        display: block;
        transition: .3s color;   
        color: map-get($colors, 'grey'); 
        &:hover{
          color: map-get($colors, 'primary');
        }
        span{
          margin-left: 5px;
        }
      }   
    }
  }
  .user-box{
    width: 150px;
    .atc{
      position: relative;
      width: 60px;
      height: 60px;
      .atc-btn{
        position: absolute;
        left: 0;
        top: 0;
        width: 60px;
        height: 65px;
        text-align: center;
        line-height: 60px;
        border-radius: 0 0 5px 5px;
        background-color: map-get($colors, 'primary');
        a{
          display: block;
          width: 100%;
          height: 100%;
          color: #fff;
        }
      }
    }
    .user{
      position: relative;
      padding-top: 5px;
      width: 60px;
      height: 60px;
      &:hover .userinfo{
        height: auto;
      }
      .user-pic{
        overflow: hidden;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
      }
      .userinfo{
        overflow: hidden;
        position: absolute;
        top: 60px;
        left: 50%;
        padding: 5px;
        margin-left: -35px; 
        width: 70px;
        height: 0;
        text-align: center;
        background-color: #fff;
        transition: height 1s; 
        box-sizing: border-box;
        ul{
          li{
            padding: 5px 0;
            a{
              display: block;
              border-top: 1px soild #999;
              transition: .3s color;   
              color: map-get($colors, 'grey'); 
              &:hover{
                color: map-get($colors, 'primary');
              }
              span{
                margin-left: 5px;
              }
            }   
          }
        }
        p{
          padding: 5px 0;
        }
      }
    }
  }
}

</style>
