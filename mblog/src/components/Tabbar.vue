<template>
  <div class="tabbar">
    <van-tabbar
      route
      v-model="active"
      active-color="#db9e3f"
      inactive-color="#7d7e80"
    >
      <van-tabbar-item 
        v-for="item in tabbar"
        :key="item.id"
        :icon="item.icon"
        :name="item.linkTo"
        :to="{name: item.linkTo}"  
      >
        {{item.title}}
      </van-tabbar-item>
    
    </van-tabbar>
  </div>
  
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      active: '0',
      tabbar: [
        { id: 0, icon: 'wap-home', title: '首页', linkTo: 'home' },
        { id: 1, icon: 'hot-o', title: '精曲', linkTo: 'recommend' },
        { id: 2, icon: 'chat-o', title: '留言', linkTo: 'chat' },
        { id: 3, icon: 'user-o', title: '用户', linkTo: 'user' },
      ],
      ele: ''
    };
  },
  methods: {
    
  },
  mounted(){
    this.ele = document.querySelectorAll('.van-tabbar-item').item(0)
  },
  watch: {
    $route(to, from){     
      let path = to.path.includes('home')
      if(path){
        this.ele.classList.add('van-tabbar-item--active')
        this.ele.style.color='rgb(219, 158, 63)'
      }else{    
        this.ele.classList.remove('van-tabbar-item--active')
        this.ele.style.color='#7d7e80'
      }     
    }
  },
  
};
</script>

<style scoped>
</style>
