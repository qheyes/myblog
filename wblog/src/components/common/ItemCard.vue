<template>
  <div class="article-item border-top">
    <div class="d-flex">
      <!-- 封面 -->
      <div class="img-box">
        <img class="img-cover" :src="item.icon" />
      </div>
      <!-- 文本 -->
      <div class="content d-flex flex-column jc-between flex-1">
        <!-- 标题 -->
        <p class="tit text-grey">{{item.title}}</p>
        <!-- 分类 -->
        <div class="types d-flex">
          <div
            class="type d-flex ai-center pr-3"
            v-for="(type, index) in item.categories"
            :key="index"
          >
            <i class="iconfont icon-biaoqian"></i>
            <span class="pl-1 text-grey-1">{{type.name}}</span>
          </div>
        </div>
        <!-- 其他 -->
        <div class="text-bt d-flex jc-between">
          <ul class="info d-flex">
            <li>
              <i class="iconfont icon-zuozhe"></i>
              <span v-if="item.author && item.author.username">
                {{item.author.username}}
              </span>
            </li>
            <li>
              <i class="iconfont icon-guanzhu"></i>
              <span>{{item.clicks}}</span>
            </li>
            <li>
              <i class="iconfont icon-piaoliusanicon-shijian"></i>
              <span>{{item.updatedAt | date}}</span>
            </li>
          </ul>

          <div class="btn" @click="updateClick">点击阅读</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ["item"],
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async updateClick() {
      let click = this.item.clicks;
      click++;
      const res = await this.$http.put(`/articles/${this.item._id}`, {
        clicks: click
      });
      this.$router.push({
        name: "article",
        params: {
          id: this.item._id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/scss/variables";

.article-item {
  position: relative;
  padding: 10px 0;
  &:hover {
    &::after {
      width: 100%;
    }
    .img-cover {
      transform: scale(1.1);
    }
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 0;
    height: 1px;
    background: map-get($colors, "primary");
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .img-box {
    overflow: hidden;
    width: 180px;
    height: 120px;
    .img-cover {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      vertical-align: top;
      border: 0;
      transition: 0.5s;
    }
  }
  .content {
    padding: 0 20px;
    .tit {
      padding: 5px;
      font-size: 18px;
    }
    .text-bt {
      .info {
        li {
          margin-right: 10px;
          span {
            padding: 0 5px;
          }
        }
      }
      .btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
        padding: 10px;
        color: #fff;
        border-radius: 5px;
        background: map-get($colors, "primary-1");
        cursor: pointer;
        &:hover {
          background: map-get($colors, "primary");
        }
      }
    }
  }
}
</style>
