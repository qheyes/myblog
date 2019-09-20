<template>
  <div class="search">
    <div class="ipt">
      <el-input
        placeholder="请输入内容"
        v-model="value">
      </el-input>
      <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
    </div>
    <!-- 热门推荐 -->
    <ul class="music-list" v-if="!searchList.length">
      <li class="list-tit">热门榜单</li>
      <li 
        class="music-item border-top d-flex"
        v-for="(item, i) in hots" 
        :key="i" 
        @click="fetchMusicInfo(item.id)"
      >
        <p class="num" v-text="i+1"></p>
        <div class="txt">
          <p class="tit">{{item.name}}</p>
          <p class="con">
            <span v-for="(ar,i) in item.ar" :key="i">{{ar.name}} / </span>
          </p>
        </div>
      </li>
    </ul>
    <!-- 搜索结果 -->
    <ul class="music-list" v-if="searchList.length">
      <li class="list-tit">搜索结果</li>
      <li 
        class="music-item  border-top d-flex"
        v-for="(item, i) in searchList" 
        :key="i" 
        @click="fetchMusicInfo(item.id)"
      >
        <p class="num" v-text="i+1"></p>
        <div class="txt">
          <p class="tit">{{item.name}}</p>
          <p class="con">
            <span v-for="(art,i) in item.artists" :key="i">{{art.name}} /</span>
          </p>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Search",
  components: {},
  data() {
    return {
      value: '',
      hots: [],
      searchList: []
    };
  },
  methods: {
    ...mapActions('music', ['fetchMusicInfo']),
    async onSearch(){
      const keyword = this.value;
      const res = await this.$http.get(`http://music.qianheye.cn/search?keywords=${keyword}`)

      // console.log(res.data.result.songs)
      this.searchList = res.data.result.songs
     
    },
    wordkey(key){
      this.value = key
      this.onSearch()
    }
  },
  mounted () {
    this.$http.get('http://music.qianheye.cn/top/list?idx=1').then(res => {
      this.hots = res.data.playlist.tracks.slice(0,30)
    })
  }
};
</script>

<style lang="scss" scoped>

.search{
  flex: 1;
  margin-left: 20px;
  width: 570px;
  background-color: #fff;
  .ipt{
    display: flex;
  }
  .music-list{
    margin-top: 20px;
    .list-tit{
      font-size: 18px;
    }
    li{
      padding: 10px;
      .num{
        padding: 10px;
        margin-right: 10px
      }
      .txt{
        line-height: 20px;
        .tit{
          font-size: 16px;
        }
        .con{
          color: #ccc;
        }
      }
    }
  }
}

</style>
