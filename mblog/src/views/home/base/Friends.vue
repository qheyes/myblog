<template>
  <div class="friends">
    <p class="title">我的朋友</p>
    <ul class="list">
      <li v-for="friend in friends" :key="friend._id">
        <a class="friend-item d-flex" :href="friend.url" target="_blank">
          <div class="pic">
            <img v-lazy="friend.friendicon" width="100%" height="100%">
          </div>
          <div class="info">
            <h3 class="info-name">{{friend.name}}</h3>
            <p class="info-content">{{friend.content}}</p>
          </div>
        </a>       
      </li>
    </ul>
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
    async fetch(){
      const res = await this.$http.get('friends/list')
      this.friends = res.data
    }
  },
  created () {
    this.fetch()
  }
};
</script>

<style lang="scss" scoped>

.friends{
  padding: 30px 0;
  min-height: calc(100vh - 300px);
  background-color: #fff;
  color: #7d7e80;
  .title{
    font-size: 40px;
    text-align: center;
  }
  .list{
    padding: 40px 20px;
    li{
      padding: 20px;
      margin-bottom: 40px;
      font-size: 30px;
      border: 1px solid #ddd;
      border-radius: 10px;
      .friend-item{
        .pic{
          width: 140px;
          height: 140px;
          border-radius: 10px;
          background-color: #ccc;
        }
        .info{
          padding-left: 20px;
          color:#7d7e80;
        }
      }
    }
    
  }
}

</style>
