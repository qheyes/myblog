<template>
  <div class="navtab">
    <van-tabs v-model="active" 
      animated 
      swipeable 
      lazy-render
      sticky
      :offset-top="50"
      color="#db9e3f"
      title-active-color="#db9e3f"
      @change="handleLink"
    >
      <van-tab 
        v-for="item in navtab"
        :key="item.id"
        :title="item.title"
        :name="item.linkTo"       
      >
        <keep-alive>
          <router-view />
        </keep-alive>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Navtab",
  data() {
    return {
      active: 'index',
      navtab: [
        { id: 0, title: '资讯', linkTo: 'index' },
        { id: 1, title: '搜索', linkTo: 'search' },
        { id: 2, title: '关于', linkTo: 'about' },
        { id: 3, title: '友链', linkTo: 'friends' }
      ]
    };
  },
  methods: {
    handleLink(name){
      this.$router.push({
        name: name
      })
    }
  },
  watch: {
    $route(to, from){
      let path = to.path.includes('home/index')
      if(path){
        this.active = 'index'
      }
    }
  },
};
</script>

<style scoped>
</style>
