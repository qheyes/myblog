<template>
  <div 
    class="hot-item border-top"
    @click="updateClick(item._id, item.clicks)"
  >
    <span
      class="num"
      :class="[{'red': index === 0},{'yellow': index === 1}, {'green': index ===2}]"
      v-text="index + 1"
    >
    </span>

    <p class="title text-ellipsis">{{item.title}}</p>
    <div class="clicks text-primary">
      <span v-text="item.clicks"></span>
      <i class="iconfont icon-guanzhu"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hots",
  props: ["item", "index"],
  data() {
    return {};
  },
  methods: {
    //点击更新并跳转
    async updateClick(id, clicks){
      let click = clicks 
      click++
      const res = await this.$http.put(`/articles/${id}`, {clicks: click})
      this.$router.push(`/article/${id}`)
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/scss/variables";

.hot-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  .num{
    width: 20px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    background: #999;
  }
  .red{
    background: map-get($colors, 'red');
  }
  .yellow{
    background: map-get($colors, 'primary');
  }
  .green{
    background: map-get($colors, 'glight');
  }
  .title{
    width: 200px;
    transition: .3s;
    &:hover {
      text-indent: 20px;
      color: hsl(30, 87%, 79%);  
    } 
  }
  .clicks{
    span{
      margin-right: 5px;
    }
  }
}

</style>
