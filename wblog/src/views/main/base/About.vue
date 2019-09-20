<template>
  <div class="about">
    <h2 class="ab-tit">关于我</h2>
    <p class="ab-con">欢迎来到我的博客小屋~</p>
    <div class="body" v-if="item" v-html="item.body"></div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      item: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("abouts");
      this.item = res.data[0];
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

<style lang="scss">
@import "../../../assets/style/scss/variables";

.about{
  padding: 20px;
  background-color: #fff;
}
.ab-tit{
  font-size: 24px;
  line-height: 30px;
  text-align: center;
}
.ab-con{
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

.body {
  line-height: 2;
  strong {
    font-weight: bold;
  }
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
  ul {
    padding-left: 20px;
    list-style: disc;
  }
}
</style>
