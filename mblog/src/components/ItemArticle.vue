<template>
  <div class="item d-flex jc-between border-bottom" 
    @click="handleInfo(iteminfo.id, iteminfo.clicks)"
  >
    <div class="cover-pic">
      <img v-lazy="iteminfo.cover" width="100%" height="100%">
    </div>

    <div class="item-content d-flex flex-column jc-between">
      <p class="item-title text-ellipsis">{{iteminfo.title}}</p>

      <div class="tags">
        <van-tag 
          plain 
          type="warning" 
          v-for="(tag, index) in iteminfo.tags"
          :key="index"
        >
          {{tag.name}}
        </van-tag>
      </div>

      <ul class="item-info d-flex">
        <li>
          <span>作者:{{iteminfo.author}}</span>
        </li>
        <li>
          <span>点击:{{iteminfo.clicks}}</span>
        </li>
      </ul>

      <p class="time d-flex jc-between">
        <span>时间:2019-10-11 11:11:19</span>
        <button class="btn">点击阅读</button>
      </p>

    </div>

  </div>
</template>

<script>
export default {
  name: "ItemArticle",
  props: ["item"],
  data() {
    return {};
  },
  computed: {
    iteminfo(){
      
      const iteminfo = {}
      iteminfo.id = this.item._id;
      iteminfo.title = this.item.title;
      iteminfo.cover = this.item.icon;
      iteminfo.tags = this.item.categories;
      iteminfo.author = this.item.author.username;
      iteminfo.clicks = this.item.clicks;
      iteminfo.time = this.item.createdAt;

      return iteminfo
    }
  },
  methods: {
    async handleInfo(id, clicks){
      let click = clicks
      click++
      const res = await this.$http.put(`/articles/${id}`, {clicks: click})
      this.$router.push(`/articleInfo/${id}`)
    }
  }

};
</script>

<style lang="scss" scoped>

.item{
  margin-top: 20px;
  padding:0 20px 20px 20px;
  height: 260px;
  font-size: 24px;
  .cover-pic{
    overflow: hidden;
    position: relative;
    width: 260px;
    height: 240px;
    border-radius: 10px;
    background-color: red;
  }
  .item-content{
    width: 430px;
    color: #7d7e80;
    .item-title{
      font-size: 36px;
    }
    .tags{
      span{
        margin-right: 10px;
      }
    }
    .item-info{
      li{
        margin-right: 10px;
      }
    }
    .time{
      position: relative;
      .btn{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 5px 10px;
        color: #db9e3f;
        border-radius: 10px;
        border: 1px solid #db9e3f;
        background-color: #fff;
      }
    }

  }
}

</style>
