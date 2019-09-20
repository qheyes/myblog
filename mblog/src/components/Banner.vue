<template>
  <div class="banner">
    <van-swipe :autoplay="3000" style="height: 200px;" indicator-color="#db9e3f">
      <van-swipe-item 
        v-for="(item, i) in banner"
        :key="i"
      >
        <img v-lazy="item.bannerimg" alt="" width="100%" height="100%">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: ["banner"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

.banner{
  margin-top: 10px;
  height: 400px;
  .van-swipe{
    .van-swipe-item{
      background-color: #fff;
    }
  }
}

</style>
