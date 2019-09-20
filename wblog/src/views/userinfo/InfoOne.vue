<template>
  <div class="info-one">
    <div class="pic">
      <img  v-if="userInfo.headicon" :src="userInfo.headicon" width="100%" height="100%">
    </div>
    <div class="content">
      <div class="name">{{userInfo.username}}</div>
      <div class="con">{{userInfo.content}}</div>
    </div>
    <div class="msg">
      投稿:<span>{{userInfo.articles.length}}</span>
      评论:<span>{{userInfo.chat.length}}</span>
    </div>
    <div class="btn">
      <el-button @click="userlogin" type="warning">切换账号</el-button>
      <el-button @click="userquit" type="danger">退出账号</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoOne",
  data() {
    return {
      userInfo: {
        articles: [],
        chat: []
      }
    };
  },
  methods: {
    fetch(){
      const id = this.Cookies.get('userID')
      if(!id)return
      Promise.all([
        new Promise((resolve, reject) => {
          this.$http.get(`/users/articles/${id}`).then(res => {
            resolve(res.data)
          })
        }),
        new Promise((resolve, reject) => {
          this.$http.get(`/users/comments/${id}`).then(res => {
            resolve(res.data.comments)
          })
        })
      ]).then(res => {
        this.userInfo = res[0]
        this.userInfo.chat = res[1]
      })
    },
    userlogin(){
      this.Cookies.remove('token')
      this.Cookies.remove('userID')
       this.$message({
          type: "success",
          message: "退出成功!"
        });
      this.$router.replace('/login')
    },
    userquit(){
      this.Cookies.remove('token')
      this.Cookies.remove('userID')
       this.$message({
          type: "success",
          message: "退出成功!"
        });
      this.$router.push('/')
    }
  },
  mounted () {
    this.fetch()
  },
};
</script>

<style lang="scss" scoped>

.info-one{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .pic{
    margin-bottom: 20px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .content{
    text-align: center;
    line-height: 26px;
    .name{
      font-size: 20px;
    }
  }
  .msg{
    padding: 20px 0;
    text-align: center;
    span{
      margin-right: 20px;
    }
  }
  .btn{
    text-align: center;
  }
}

</style>
