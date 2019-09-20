<template>
  <div class="index">
    <Banner :banner="banner" />

    <Card title="最新文章" icon="description">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul>
          <li v-for="(item, index) in itemInfo" :key="index">
            <ItemArticle :item="item" />
          </li>
        </ul>
      </van-list>
    </Card>

  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import Card from '@/components/Card.vue'
export default {
  name: "Index",
  components: {
    Banner,
    Card
  },
  data() {
    return {
      banner: [],
      itemInfo: [],
      page: 0,
      loading: false,
      finished: false
    };
  },
  methods: {
    async fetchBanner(){
      const res = await this.$http.get('banners/list')
      this.banner = res.data
    },
    async fetchArticle(page){
      const res = await this.$http.get('articles/list?page='+ page)
      // console.log(res.data)
      let list = res.data
      list.forEach(item => {
        this.itemInfo.push(item)
      })
      
    },
    onLoad() {
      let page = this.page
      this.$http.get('articles/list?page='+ page).then(res => {
        let list = res.data
        // 数据全部加载完成
        if (list.length < 10) {
          this.finished = true;
        }

        list.forEach(item => {
          this.itemInfo.push(item)
        })
        this.page +=1
        // 加载状态结束
        this.loading = false;
      })
      
    }
  },
  activated () {
    this.fetchBanner()
  },
  // created () {
  //   this.fetchBanner()
  // }
}
</script>

<style scoped>

.index{
  padding-bottom: 20px;
}

</style>
