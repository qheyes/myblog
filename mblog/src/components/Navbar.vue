<template>
  <div class="navbar">
    <van-nav-bar
      fixed
      :z-index="100"
      :title="title"
      left-arrow
      @click-left="back"
      @click-right="search"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: String
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    search() {
      this.$router.replace('/home/search')
    }
  }
};
</script>

<style scoped>
</style>
