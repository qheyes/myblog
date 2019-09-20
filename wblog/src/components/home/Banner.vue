<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, i) in banners" :key="i">
        <div class="pic">
          <el-image :src="item.bannerimg" width="100%" height="100%">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <!-- <img :src="item.bannerimg" alt="" width="100%" height="100%"> -->
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      banners: []
    };
  },
  methods: {
    //轮播图数据
    async fetchBanner(){
      const res = await this.$http.get('banners/list')
      this.banners = res.data
    },
  },
  mounted () {
    this.fetchBanner()
  }
};
</script>

<style lang="scss" scoped>

.banner{
  margin-bottom: 10px;
  background-color: #fff;
  .pic{
    width: 330px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    .el-image{
      height: 200px;
    }
  }
}

</style>
