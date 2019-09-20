<template>
  <div class="chat calc">
    <Navbar title="留言板" />

    <div class="message">
      <div class="msg-num border-bottom">
        当前留言(
        <span>{{messages.length || 0}}</span> )
      </div>
      <div class="user-chat d-flex jc-between ai-center">
        <div class="pic">
          <img width="100%" height="100%" src="../../assets/images/usericon.jpeg" v-if="!isShow" />
          <img width="100%" height="100%" v-lazy="headUrl" v-if="isShow" />
        </div>

        <div class="content">
          <textarea class="ipt-txt" placeholder="可以留言哦~~~" cols="40" rows="4" v-model="model.body"></textarea>
        </div>

        <div class="btn">
          <span @click="postMessage">发送</span>
        </div>
      </div>

      <ul class="messgae-list" >

        <li 
          class="item d-flex border-top"
          v-for="item in messages"
          :key="item._id"
        >
          <div class="pic">
            <img v-if="item.user && item.user.headicon" width="100%" height="100%" v-lazy="item.user.headicon" />
          </div>
          <div class="info">
            <div class="username d-flex jc-between">
              <span v-if="item.user && item.user.username">{{item.user.username}}</span>
              <div class="clicks">
                <van-icon name="good-job-o" color="rgb(237,206,159)" />
                <span class="click-num">({{item.clicks}})</span>
              </div>             
            </div>
            <p class="time">{{ item.createdAt | date }}</p>
            <p class="body">{{item.body}}</p>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "Chat",
  data() {
    return {
      isShow: false,
      model: {
        body: ''
      },
      messages: [],
    };
  },
  computed: {
    ...mapState('userInfo', ["userID", "headUrl"]),
  },
  methods: {
    ...mapActions('userInfo',["fetchUser"]),
    setUser(){
      const token = this.Cookies.get('token')
      const userID = this.Cookies.get('userID')
      if(token && userID){
        this.isShow = true
        this.fetchUser(userID)
        this.$set(this.model, 'user', userID)   
        return
      }
      this.isShow = false
    },
    async fetchMessages(){
      const res = await this.$http.get('comments/list')
      this.messages = res.data;
    },
    async postMessage(){
      if(!this.isShow){  
        this.$notify({ type: 'warning', message: '请先登录' });  
        return this.$router.push({ name: 'login'})
      }
      const res = await this.$http.post('comments', this.model) 
      this.fetchMessages()   
      this.$set(this.model, 'body', '')  
    },
  },
  activated () {
    this.setUser()
    this.fetchMessages()
  }
};
</script>

<style lang="scss" scoped>
.chat {
  padding-top: 100px;
  background-color: #fff;
  .message {
    padding: 20px;
    .msg-num {
      padding-bottom: 20px;
      font-size: 30px;
    }
    .user-chat {
      margin-top: 20px;
      .pic {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
      }
      .content {
        width: 450px;
        height: 130px;
        .ipt-txt {
          outline: none;
          resize: none;
          font-size: 24px;
          display: inline-block;
          box-sizing: border-box;
          background-color: #f4f5f7;
          border: 1px solid #e5e9ef;
          overflow: auto;
          border-radius: 5px;
          color: #555;
          width: 100%;
          height: 130px;
          transition: 0s;
          padding: 10px 10px;
          line-height: normal;
        }
      }
      .btn {
        width: 130px;
        height: 130px;
        font-size: 24px;
        text-align: center;
        line-height: 130px;
        background: rgba(219, 158, 63, 0.5);
        color: #fff;
        border-radius: 10px;
      }
    }
    .messgae-list{
      padding: 40px 0;
      .item{
        padding: 20px 0;
        .pic{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        .info{
          margin-left: 20px;
          font-size: 24px;
          color: #7d7e80;
          .username{
            font-size: 30px;
            .clicks{
              font-size: 24px;
              .click-num{
                margin-left: 10px;
              }
            }
          }
          .body{
            width: 580px;
          }
          
        }
      }
    }
  }
}
</style>
