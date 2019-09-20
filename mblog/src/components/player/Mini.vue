<template>
  <div class="mini">
    <!-- 内容盒子 -->
    <div class="container" id="container" v-if="detail.songs">
      <div class="mini-box">
        <div class="cover" @click.stop="toggleWidth">
          <img v-lazy="detail.songs[0].al.picUrl" alt="" width="100%" height="100%">
        </div>
        <div class="text" @click.stop="full">
          <p class="tit" v-text="detail.songs[0].name"></p>
          <p class="con">
            <span 
              v-for="(item, i) in detail.songs[0].ar" 
              :key="i" 
            >{{item.name}} </span>
          </p>
        </div>
        <div class="btn">
          <van-icon v-show="paused" name="play-circle-o" slot="default" @click.stop="playMusic" />
          <van-icon v-show="!paused" name="pause-circle-o" slot="default" @click.stop="pauseMusic" />
        </div>
        <div class="list" @click.stop="listShow">
          <van-icon name="bars" />
        </div>
      </div>
    </div>
    <!-- 播放列表 -->
    <div class="list-box" v-show="isShow">
      <div class="top">
        播放列表({{history.length}})
      </div>
      <div class="ul-box">
        <ul>
          <li 
            v-for="(item, i) in history" 
            :key="i" 
            @click.stop="hisPlay(item)"
            v-text="item.detail.songs[0].name"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "mini",
  data() {
    return {
      isShow: false 
    };
  },
  computed: {
    ...mapState('music', ["detail", "paused", "history"])
  },
  methods: {
    ...mapMutations('music', ["playMusic", "pauseMusic", "setSrc", "setDetail", "setLyric"]),
    toggleWidth(){
      const box = document.getElementById('container')
      box.classList.toggle('width100')
      this.isShow = false
    },
    listShow(){
      this.isShow = !this.isShow 
    },
    hisPlay(item){
      this.setSrc(item.src)
      this.setDetail(item.detail)
      this.setLyric(item.lrc)      
    },
    full(){
      this.$emit('fullShow')
    }
  }
};
</script>
<style lang="scss" scoped>
.mini {
  background-color: #fff;
  border: 1px solid #ddd;
  .list-box{
    position: absolute;
    overflow: hidden;
    bottom: 100px;
    left: 0;
    z-index: 1000;
    padding: 20px;
    width: 750px;
    height: 500px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;
    font-size: 30px;
    .top{
      line-height:60px;
    }
    .ul-box{
      height: 400px;
      overflow-y: scroll;
      ul{
        li{
          color: #7d7e80;
          padding: 10px 0;
          border-top: 1px solid #ddd;
        }
      }
    }   
  }
}
.container{
  overflow: hidden;
  width: 100px;
  height: 100px;
  transition: .5s;
  .mini-box{
    width: 750px;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .cover{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }
    .text{
      font-size: 24px;
      width: 450px;
      height: 80px;
      line-height: 44px;
      .tit{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
        color: #db9e3f;
      }
      .con{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #aaa;
      }
    }
    .btn{
      color: #db9e3f;
      font-size: 70px;
      width: 70px;
      height: 70px;
    }
    .list{
      margin-left: 10px;
      font-size: 70px;
      width: 70px;
      height: 70px;
      color: #db9e3f;
    }
  }
}

.width100{
  width: 750px;
}

</style>
