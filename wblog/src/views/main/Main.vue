<template>
  <div class="main">
    <Header />
    <div class="container">

      <keep-alive>
        <router-view />    
      </keep-alive>

    </div>
    
    <Footer />
  </div>
</template>

<script>

import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
export default {
  name: "Main",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>

.main{
  position: relative;
  padding-top: 60px;
  padding-bottom: 120px;
  .container{
    margin: 10px auto;
    width: 980px;
  }
}

</style>
