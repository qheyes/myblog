<template>
  <div class="home calc">
    <Homebar />
    <Navtab  />   
  </div>
</template>

<script>
import Homebar from "../../components/Homebar";
import Navtab from "../../components/Navtab";
export default {
  name: "Home",
  components: {
    Homebar,
    Navtab
  },  
};
</script>

<style lang="scss" scoped>

.home{
  padding-top: 100px; 
}

</style>