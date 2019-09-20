<template>
  <div class="friends">
    <Bread title="友链" />
    <ul class="list d-flex">
      <li class="" v-for="friend in friends" :key="friend._id">
        <a class="friend-item d-flex border" :href="friend.url" target="_blank">
          <div class="pic">
            <img :src="friend.friendicon" width="100%" height="100%" />
          </div>
          <div class="txt">
            <h3 class="tit">{{friend.name}}</h3>
            <p class="con">{{friend.content}}</p>
          </div>
        </a>
      </li>
    </ul>
    <p class="text-center text-primary">快来加入我们吧~~~~~~~</p>
  </div>
</template>

<script>
export default {
  name: "Friends",
  data() {
    return {
      friends: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("friends/list");
      this.friends = res.data;
    }
  },
  mounted () {
    this.fetch();
    this.$loading.close();
  },
  activated () {
    this.$loading.close();
  }
};
</script>

<style lang="scss" scoped>
.friends {
  padding: 10px;
  min-height: calc(100vh - 200px);
  background-color: #fff;
  .list{
    margin: 20px 0;
    flex-wrap: wrap;
    li{
      width: 30%;
      margin-right: 20px;
      .friend-item{
        padding: 5px;
        .pic{
          width:70px;
          height:70px;
          border-radius:5px;
          overflow: hidden;
        }
        .txt{
          margin-left: 10px;
          line-height: 20px;
          .tit{
            font-size: 16px;
          }
        }
      }
    }
  }
}



</style>
