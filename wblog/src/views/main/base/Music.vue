<template>
  <div class="music d-flex">
    <div class="player-box">
      <Player />
    </div>
    <div class="search-box">
      <Search />
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import Player from '@/components/music/Player.vue'
import Search from '@/components/music/Search.vue'
export default {
  name: "Music",
  components: {
    Player,
    Search
  },
  data() {
    return {
      music: [
        {  
          id: 1369798757 //芒种
        },
        {
          id: 224331,  //雕花笼
        },
        {
          id: 1324873177 //夜宴风波
        }
      ]
    };
  },
  computed: {
    ...mapState('music', ["history"])
  },
  methods: {
    ...mapMutations('music', ['initHis', 'pauseMusic']),
    ...mapActions('music', ['InitMusic', 'shaxin'])
  },
  // created () {
    
  //   const len = this.music.length
  //   this.music.map(item => {
  //     this.InitMusic({id: item.id, len: len})
  //   })
  //   this.$loading.close();
  // },
  activated () {
    this.initHis()
    const len = this.music.length
    this.music.map(item => {
      this.InitMusic({id: item.id, len: len})
    })
    this.$loading.close();
    // this.shaxin()
  },
  deactivated(){
    this.pauseMusic()
  }
};
</script>

<style lang="scss" scoped>

.music{
  height: calc(100vh - 200px);
  .search-box{
    width: 610px;
    overflow-y: scroll;
    height: calc(100vh - 200px);
  }
}


</style>
