<template>
  <div class="home d-flex jc-between">
    <div class="left-box">
      <Banner />
      <Card icon="tubiao103" title="最新文章" :items="news">
        <template v-slot="{item}">
          <ItemCard :item="item" />
        </template>
      </Card>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="8"
        :total="count"
        @current-change="handleCurrent"
      ></el-pagination>
    </div>

    <div class="right-box">
      <!-- 公告 -->
      <Card icon="weibiaoti9" title="公告" :items="notice">
        <template v-slot="{item}">
          <div :item="item" class="notice d-flex jc-between border-top">
            <span>{{item.title}}</span>
            <span>{{item.time}}</span>
          </div>
        </template>
      </Card>
      <!-- 热门文章 -->
      <Card icon="hot" title="热门文章" :items="hots">
        <template v-slot="{item, index}">
          <Hots :item="item" :index="index" />
        </template>
      </Card>
      <!-- 最新留言 -->
      <Card icon="liuyan" title="最新留言" :items="chat">
        <template v-slot="{item}">
          <div class="chat border-top">
            <div class="d-flex jc-between">
              <span 
              class="username text-primary" 
              v-if="item.user && item.user.username"
              >{{item.user.username}}</span>
              <span class="text-grey">{{item.updatedAt | date}}</span>
            </div>
            <p class="chat-txt text-ellipsis text-grey">{{item.body}}</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/home/Banner.vue";
import Hots from "@/components/home/Hots.vue";
import ItemCard from "@/components/common/ItemCard.vue";
import { mapMutations } from 'vuex';
export default {
  name: "Home",
  components: {
    Banner,
    Hots,
    ItemCard
  },
  data() {
    return {
      page: 0,
      count: 0,
      news: [],
      notice: new Array(5).fill(1).map(v => ({
        title: "6月2日全服不停机更新公告",
        time: "6-10"
      })),
      hots: [],
      chat: []
    };
  },
  methods: {
    ...mapMutations('userInfo', ["init"]),
    //userInfo是否初始化
    isInit(){
      const token = this.Cookies.get('token')
      const userID = this.Cookies.get('userID')
      if(token && userID)return
      this.init() 
    },
    //最新文章
    async fetchNews() {
      let page = this.page;
      const res = await this.$http.get("articles/news?page=" + page);
      // console.log(res)
      this.news = res.data.news;
      this.count = res.data.count;
    },
    // 分页加载
    async handleCurrent(val) {
      let page = val - 1;
      const res = await this.$http.get("articles/news?page=" + page);
      // console.log(res)
      this.news = res.data.news;
    },
    // 热门文章
    async fetchHots() {
      const res = await this.$http.get("/articles/hots");
      this.hots = res.data;
    },
    // 最新留言
    async fetchChat(){     
      const res = await this.$http.get('/comments/list')
      let message = []
      res.data.forEach((item, i) => {
        if(i < 6){
          message.push({
            body: item.body,
            createdAt: item.createdAt,
            user: item.user
          })
        }   
      });    
      this.chat = message;
    },
  },
  activated () {
    const loading = this.$loading;
    this.isInit();
    this.fetchNews();
    this.fetchHots();
    this.fetchChat();
    loading.close();
  }
};
</script>

<style lang="scss" scoped>
.left-box {
  width: 660px;
  .el-pagination {
    padding: 10px 0;
    text-align: center;
  }
}
.right-box {
  width: 300px;
  min-height: calc(100vh - 200px);
  .notice{
    padding: 10px 0;
  }
  .chat{
    padding: 10px 0;
    .chat-txt{
      padding-top: 5px;
      width: 100%;
    }
  }
}
</style>
