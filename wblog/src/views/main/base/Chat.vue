<template>
  <div class="chat">
    <Bread title="留言板" />
    <div class="body">
      <div class="ipt-box d-flex ai-center">
        <div class="pic">
          <el-avatar icon="el-icon-user-solid" :size="60" v-if="!isShow"></el-avatar>
          <el-avatar :size="60" :src="headUrl" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </div>
        <div class="ipt-area">
          <textarea class="ipt-txt" cols="45" rows="10" placeholder="可以留言哦~~~" v-model="content"></textarea>
        </div>
        <div class="post bg-primary" @click="postMessage">发送</div>
      </div>
      
      <div class="chat-list" v-if="message.length">
        <div class="chat-item d-flex border-top" v-for="(item, i) in message" 
        :key="i">
          <div class="head-pic" >
            <img 
              v-if="item.user && item.user.headicon"
              :src="item.user.headicon" alt="" 
              width="100%" height="100%"
            >
          </div>
          <div class="chat-info">
            <p 
              class="username" 
              v-if="item.user && item.user.username"
            >
              {{item.user.username}}
            </p>
            <p class="time">{{item.createdAt | date}}</p>
            <p class="content">{{item.body}}</p>
          </div>
          <div class="click-box">
            <div :class="{'disable': !isClass[i].comTime}" @click="dianzan(i)">
              <i
                class="iconfont icon-guanzhu"
                :class="{'text-grey': !isClass[i].primary, 'text-primary' : isClass[i].primary}"
              ></i>
              <span class="px-2">{{item.clicks}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: "Chat",
  data() {
    return {
      isShow: false,
      content: '',
      message: [],
      isClass: []
    };
  },
  computed: {
    ...mapState('userInfo', ["userID", "headUrl"])
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
        this.isShow = true
        this.fetchUser(userID)
        return
      }
    },
    async postMessage() {
      const token = this.Cookies.get('token');
      const userID = this.Cookies.get('userID')
      if(!token || !userID){
        this.$router.push('/login') 
        return      
      }
      if(!this.content){
        this.$message({
          type: 'error',
          message: '内容不能为空'
        })
        return
      }
      const res = await this.$http.post("comments", {
        user: this.userID,
        body: this.content
      });
      this.content = "";
      this.fetchComment();
    },
    //获取留言
    async fetchComment() {
      const res = await this.$http.get("comments/list");
      
      let isClass = []
      let message = []
      res.data.forEach((item, i) => {
        isClass.push({
          primary: false,
          comTime: true
        });
        message.push({
          _id: item._id,
          body: item.body,
          createdAt: item.createdAt,
          clicks: item.clicks,
          user: item.user         
        })
      })
      this.isClass = isClass
      this.message = message

    },
    //更新留言
    async updateComent(id, model) {
      const res = await this.$http.put(`comments/${id}`, model);
    },
    //点赞
    dianzan(index) {
      const that = this;
      this.isClass[index].comTime = !this.isClass[index].comTime;
      this.isClass[index].primary = !this.isClass[index].primary;
      if (this.isClass[index].primary === true) {
        this.message[index].clicks++;
      } else {
        this.message[index].clicks === 0
          ? (this.message[index].clicks = 0)
          : this.message[index].clicks--;
      }
      this.updateComent(this.message[index]._id, this.message[index]);
      setTimeout(() => {
        that.isClass[index].comTime = true;
      }, 2000);
    }
  },
  activated () {
    this.setUser();
    this.fetchComment();
    this.$loading.close();
  }

};
</script>

<style lang="scss" scoped>
.chat {
  padding: 10px;
  min-height: calc(100vh - 200px);
  background-color: #fff;
}
.ipt-box{
  padding: 10px 0;
  .pic{
    margin-right: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .ipt-area{
    padding-right: 10px;
    flex: 1;
    .ipt-txt {
      outline: none;
      resize: none;
      font-size: 14px;
      display: inline-block;
      box-sizing: border-box;
      background-color: #f4f5f7;
      border: 1px solid #e5e9ef;
      overflow: auto;
      border-radius: 5px;
      color: #555;
      width: 100%;
      height: 100px;
      transition: 0s;
      padding: 5px 10px;
      line-height: normal;
    }
  }
  .post {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 16px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
}
.chat-list{
  .chat-item{
    padding: 10px 0;
    .head-pic{
      margin-right: 10px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
    .chat-info{
      flex: 1;
      padding-right: 10px;
      line-height: 20px;
    }
  }
}



.disable {
  pointer-events: none;
}
</style>
