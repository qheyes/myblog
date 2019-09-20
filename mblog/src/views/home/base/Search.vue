<template>
  <div class="search">
    <van-search placeholder="点击标签搜索文章" v-model="value" disabled />
    <div class="categories">
      <van-tag plain type="warning" 
        v-for="(item, index) in tag"
        :key="index"
        @click="handleID(item)"
      >
      {{item.name}}
      </van-tag>
    </div>

    <div class="content border-top">
      <div class="warning" v-if="!isShow">
        <span>请点击标签搜索对应内容</span>
      </div>

      <ul class="articleList" v-if="isShow">
        <li class="item" v-for="(item, index) in articles" :key="index">
          <ItemArticle :item="item" />
        </li>
      </ul>

      

    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  components: {},
  data() {
    return {
      value: '',
      tag: [],
      articles: [],
    };
  },
  computed: {
    isShow(){
      return this.articles.length > 0
    }
  },
  methods: {
    async fetchTag(){
      const res = await this.$http.get('categories/list')
      this.tag = res.data
    },
    async handleID(item){
      this.value = item.name
      const res = await this.$http.get(`categories/${item.id}`)
      this.articles = res.data.articles
    }
  },
  created () {
    this.fetchTag()
  }
};
</script>

<style lang="scss" scoped>

.search{
  padding: 30px 0;
  min-height: calc(100vh - 300px);
  background-color: #fff;
  .categories{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 24px;
    span{
      font-size: 30px;
      margin:0 20px 20px 0;
    }
  }
  .content{
    .warning{
      text-align: center;
      font-size: 26px;
      color: #ddd;
    }
    .articleList{
      padding-top: 20px; 
    }
  }
}
</style>
