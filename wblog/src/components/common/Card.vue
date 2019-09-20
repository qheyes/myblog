<template>
  <div class="card radius-1">
    <div class="card-head d-flex text-grey">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="flex-1">{{title}}</div>
      <i class="iconfont icon-gengduo"></i>
    </div>

    <ul class="card-body" v-if="items.length">
      <li v-for="(item, index) in items" :key="index">
        <slot :item="item" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    items: { type: Array, required: true }
  },
  methods: {
    router(link){

      // this.$router.push(`/${link}`)
    }
  }
}
</script>


<style lang="scss" scoped>

@import '../../assets/style/scss/variables';

.card{
  margin-bottom: 10px;
  border: 1px solid map-get($colors, 'light' );
  background-color: #fff;
  padding: 10px;
  .card-head{ 
    padding-bottom: 10px;  
    font-size: 16px;
  }
}

</style>
