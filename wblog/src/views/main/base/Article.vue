<template>
  <div class="atc-info radius-1">
    <!-- 导航页 -->
    <Bread title="文章详情" />
    <!-- 标题头 -->
    <div class="info-tit">
      <h1 v-text="item.title"></h1>
      <ul class="d-flex border-bottom">
        <li>
          <i class="iconfont icon-zuozhe"></i>
          <span>{{item.author.username}}</span>
        </li>
        <li>
          <i class="iconfont icon-guanzhu"></i>
          <span>{{item.clicks}}</span>
        </li>
        <li>
          <div class="d-flex" v-for="category in item.categories" :key="category._id">
            <i class="iconfont icon-biaoqian"></i>
            <span>{{category.name}}</span>
          </div>
        </li>
        <li>
          <i class="iconfont icon-piaoliusanicon-shijian"></i>
          <span>{{item.createdAt | date }}</span>
        </li>
      </ul>
    </div>

    <div class="body text-grey" style="line-height: 2" v-highlight v-html="item.body"></div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      item: {
        author: {
          username: ""
        }
      }
    };
  },
  methods: {
    async fetchItem() {
      // console.log(this.$route.params.id);
      const id = this.$route.params.id
      const res = await this.$http.get(`articles/${id}`)
      this.item = res.data
    }
  },
  activated () {
    const loading = this.$loading;
    this.fetchItem()
    loading.close();
  },
};
</script>

<style lang="scss">
@import "../../../assets/style/scss/variables";
.atc-info{
  padding: 10px;
  background-color: #fff;
  .info-tit{
    padding: 10px;
    text-align: center;
    h1{
      padding: 10px 0;
      font-size: 24px;   
    }
    ul{
      padding: 20px 0;
      justify-content: center;
      align-items: center;
      li{
        padding: 0 10px;
        span{
          margin-left: 5px;
        }
      }
    }
  }
}

.body{
  h2{
    margin: 20px 0 10px 0;
    padding: 10px;
    border-left: 5px solid map-get($colors, "primary");
    background: #f0f2f7;
    font-size:16px;
  }
  p{
    font-size: 14px;
  }
  a{
    color: map-get($colors, "primary");
  }
  
}
</style>
