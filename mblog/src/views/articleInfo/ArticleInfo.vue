<template>
  <div class="articleinfo calc">
    <Navbar title="文章详情" />

    <div class="item bg-white">
      <h2 class="title text-center">{{item.title}}</h2>

      <ul class="item-info d-flex jc-around ">
        <li class="author">
          <!-- <i class="iconfont icon-wode"></i> -->
          <span v-if="item.author && item.author.username">作者：{{item.author.username}}</span>
        </li>
        <li class="tag">
          <van-tag 
            plain 
            type="warning" 
            v-for="(tag, index) in item.categories"
            :key="index"
          >
            {{tag.name}}
          </van-tag>
        </li>
        <li class="clicks">
          <!-- <i class="iconfont icon-guanzhu"></i> -->
          <span>点击:{{item.clicks}}</span>
        </li>
      </ul>

      <div class="time border-bottom">
        <span>时间：2019-10-11 11:11:19</span>
      </div>
      
      <!-- v-highlight  -->
      <div class="body" style="line-height: 2" v-highlight v-html="item.body">
      </div> 

    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleInfo",
  props: ["id"],
  data() {
    return {
      item: {
        author: {
          username: ''
        }
      }
    };
  },
  methods: {
    async fetchInfo(){
      const res = await this.$http.get(`articleInfo/${this.id}`)
      // console.log(res)
      this.item = res.data
    }
  },
  activated () {
    this.fetchInfo()
  },
  // created () {
  //   this.fetchInfo()
  // }
};
</script>

<style lang="scss" scoped>

.articleinfo{
  padding-top: 100px;
  background-color: #fff;
  .item{
    padding:30px 20px;
    .title{
      font-size: 50px;
      color: #7d7e80;
    }
    .item-info{
      padding: 20px 0 10px;
      font-size: 30px;
      color: #7d7e80;
    }
    .time{
      font-size: 30px;
      color: #7d7e80;
      text-align: center;
    }
    .body{
      padding-top: 20px; 
      font-size: 26px;
    }
  }
}
</style>
