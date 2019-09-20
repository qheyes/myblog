<template>
  <div class="recommend">
    <Navbar title="音乐精选" />
    <van-search 
      placeholder="请输入搜索关键词" 
      v-model="value" 
      @search="onSearch" 
    />
    <ul class="music-list" v-if="!searchList.length">
      <li class="list-tit">热门榜单</li>
      <li 
        class="music-item"
        v-for="(item, i) in hots" 
        :key="i" 
        @click="fetchMusicInfo(item.id)"
      >
        <p class="tit">{{item.name}}</p>
        <p class="con">
          <span v-for="(ar,i) in item.ar" :key="i">{{ar.name}} / </span>
        </p>
        
      </li>
    </ul>

    <ul class="music-list" v-if="searchList.length">
      <li class="list-tit">搜索结果</li>
      <li 
        class="music-item"
        v-for="(item, i) in searchList" 
        :key="i" 
        @click="fetchMusicInfo(item.id)"
      >
        <p class="tit">{{item.name}}</p>
        <p class="con">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Recommend',
  data(){
    return {
      value: '',
      hots: [],
      searchList: []
    }
  },
  methods: {
    ...mapActions('music', ['fetchMusicInfo']),
    async onSearch(){
      const keyword = this.value;
      const res = await this.$http.get(`http://music.qianheye.cn/search?keywords=${keyword}`)
      // console.log(res)
      this.searchList = res.data.result.songs
     
    },
  },
  mounted () {

    this.$http.get('http://music.qianheye.cn/top/list?idx=1').then(res => {
      this.hots = res.data.playlist.tracks.slice(0,30)
      // console.log(this.hots)
    })
  }
}


</script>

<style lang="scss" scoped>

.recommend{
  padding-top: 100px;
  background-color: #fff;
  color: #000;
  font-size: 24px;
  .music-list{
    padding: 30px 30px;
    .list-tit{
      font-size: 40px;
      margin-bottom: 10px;
    }
    .music-item{
      height: 100px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      .tit{
        font-size: 30px;
        color: #7d7e80;
      }
      .con{
        color:#bbb;
      }
    }
  }
}

</style>
