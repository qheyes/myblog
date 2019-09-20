<template>
  <div class="card bg-white">
    <van-cell :title="title" :icon="icon">
      <van-icon slot="right-icon" name="ellipsis" style="line-height: inherit;" />
    </van-cell>

    <!-- <ul class="card-body">
      <li v-for="(item, index) in itemInfo" :key="index">
        <slot name="item" :item="item"></slot>     
      </li>
    </ul> -->

    <slot></slot>  

  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    icon: String,
    itemInfo: Array
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

.card{
  margin-top: 10px;
  background-color: #fff;
  .van-cell{
    color: #7d7e80;
  }
}

</style>
