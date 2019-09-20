<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <Tabbar v-show="isShow" />
    <Player v-show="isShow" />
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar";
import Player from "./components/player/Player";
export default {
  components: {
    Tabbar,
    Player
  },
  data() {
    return {
      isShow: true,
      screenHeight: document.documentElement.clientHeight, //此处也可能是其他获取方法
      originHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    let self = this;
    window.onresize = function() {
      return (function() {
        self.screenHeight = document.documentElement.clientHeight;
      })();
    };
  },
  watch: {
    screenHeight(val) {
    if (this.originHeight > val + 100) {
      //加100为了兼容华为的返回键
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
  }
};
</script>

<style lang="scss">
</style>
