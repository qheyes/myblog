<template>
  <div class="about">
    <p class="about-title">欢迎来到我的博客小屋~</p>
    <div class="body" 
      v-if="aboutInfo" 
      style="line-height: 2;" 
      v-highlight 
      v-html="aboutInfo.body"
    ></div>
  </div>
  
</template>

<script>
export default {
  name: "About",
  components: {},
  data() {
    return {
      aboutInfo: ''
    };
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('abouts')
      this.aboutInfo = res.data[0]
    }
  },
  created(){
    this.fetch()
  }
};
</script>

<style lang="scss">

.about{
  padding: 40px 0;
  background-color: #fff;
  color: #7d7e80;
  .about-title{
    text-align: center;
    font-size: 40px;
  }
  .body{
    padding-top: 20px; 
    font-size: 26px;
  }
  p{
    padding-left: 20px; 
  }
  ul{
    padding-left: 50px; 
    list-style: disc;
  }
}

</style>
