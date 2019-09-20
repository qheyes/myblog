<template>
  <footer class="footer">
    <div class="container d-flex flex-column jc-around ai-center">
      <p>本博客已公开访问,欢迎带小伙伴来玩(●'◡'●)ﾉ♥</p>
      <p>@qianheye ———— 前端开发、vue组件封装、小程序开发...(⊙o⊙)…什么都学的程序员~</p>
      <p>本站点采用 知识共享 署名-非商业性使用-禁止演绎 4.0 国际 许可协议</p>
      <p>本站由 @qianheye 创建 - © 2018. 浙ICP备19030849号</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: 20px;
  padding: 20px 0;
  width: 100%;
  height: 120px;
  font-size: 12px;
  background-color: #262a30;
  .container {
    margin: auto;
    width: 980px;
    height: 100%;
    color: #999;
  }
}
</style>
