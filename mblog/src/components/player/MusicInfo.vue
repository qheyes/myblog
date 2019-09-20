<template>
  <div class="musicInfo" v-if="detail.songs">
    <div class="background" :style="'background-image:url('+ detail.songs[0].al.picUrl +');'">
    </div>
    <!-- 头部 -->
    <div class="head">
      <div class="back" @click="back">
        <van-icon name="arrow-down" />
      </div>
      <div class="title">
        <p v-text="detail.songs[0].name"></p>
        <p>
          <span 
            v-for="(item, i) in detail.songs[0].ar" 
            :key="i" 
          >{{item.name}} </span>
        </p>
      </div>

    </div>
    <!-- 歌词封面 -->
    <div class="cover-lrc" @click.stop="toggleShow">
      <div class="cover" v-show="!isLrc">
        <img v-lazy="detail.songs[0].al.picUrl" alt="" width="100%" height="100%">
      </div>
      <div class="lrc" v-show="isLrc">
        <ul 
          class="lrc-list" 
          :style="'margin-top: -' + 27*index+'px;'" 
        >
          <li 
            v-for="(item, i) in lrcList" 
            :key="i"
            :style="index === i && 'color:red;'"
          >
            {{item.lrc}}
          </li>
        </ul>
      </div>
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <div class="time start" v-text="start"></div> 
      <div class="slider">
        <van-slider     
          v-model="value"
          active-color="#ee0a24"
          @change="changeSlider"
        />
      </div>
      <div class="time end" v-text="total"></div>       
    </div>
    <!-- 按钮 -->
    <div class="btn-box">
      <div class="mode" @click.stop="changeMode">
        
        <van-icon v-show="mode === 1" name="music-o" />
        <van-icon v-show="mode === 2" name="replay" />
        <van-icon v-show="mode === 3" name="exchange" />
      </div>
      <div class="prev">
        <van-icon name="arrow-left" @click.stop="prev" />
      </div>
      <div class="player">
        <van-icon v-show="paused" name="play-circle-o" slot="default" @click.stop="playMusic" />
        <van-icon v-show="!paused" name="pause-circle-o" slot="default" @click.stop="pauseMusic" />
      </div>
      <div class="next">
        <van-icon name="arrow" @click.stop="next" />
      </div>
      <div class="download">
        <van-icon name="like-o" />     
      </div>
      
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "musicInfo",
  props: ["start", "total", "value", "lrcList", "index"],
  data() {
    return {
      isLrc: false,
    };
  },
  computed: {
    ...mapState('music', ["detail","history", "paused", "musicIndex", "mode"])
  },
  methods: {
    ...mapMutations('music', ["playMusic", "pauseMusic", "setSrc", "setDetail", "setLyric", "addMusicIndex", "setprev", "changeMode"]),
    back(){
      this.$emit('miniShow')
    },
    toggleShow(){
      this.isLrc = !this.isLrc
    },
    changeSlider(value){
      this.$emit('changeProgress', value)
    }, 
    prev(){
      this.setprev()
      this.setSrc(this.history[this.musicIndex].src)
      this.setDetail(this.history[this.musicIndex].detail)
      this.setLyric(this.history[this.musicIndex].lrc)
    },
    next(){
      this.addMusicIndex()
      this.setSrc(this.history[this.musicIndex].src)
      this.setDetail(this.history[this.musicIndex].detail)
      this.setLyric(this.history[this.musicIndex].lrc)
    }
  },
};
</script>

<style lang="scss" scoped>

.musicInfo{
  position: absolute;
  left: 0;
  bottom: -150px;
  width: 750px;
  height: 100vh;
  z-index: 1000;
  color: #fff;
  background-color: #aaa;
  .background{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(20px);
    filter: blur(20px);
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
  }
  .head{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    width: 100%;
    box-sizing: border-box;
    .title{
      width: 600px;
      text-align: center;
      font-size: 30px;
      line-height: 40px;
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .cover-lrc{
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 950px;
    .cover{
      overflow: hidden;
      position: absolute;
      top: 100px;
      left: 50%;
      margin-left: -250px;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #fff;
      animation: circling 20s linear infinite;
      text-align: center;
      line-height: 500px;
    }
    .lrc{
      padding-top: 600px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-size: 24px;
      color: #fff;
      text-align: center;
      box-sizing: border-box;
      .lrc-list{
        transition: margin 1.5s;
      }
    }
  }
  .progress{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 100px;
    box-sizing: border-box;
    .slider{
      padding: 20px 0;
      width: 500px;
    }
    .time{
      width: 80px;
      height: 50px;
      font-size: 24px;
      color: #fff;
    }
    .start{
      margin-right: 10px;
    }
  }
  .btn-box{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    width: 100%;
    height: 120px;
    font-size: 60px;
    div{
      width: 100px;
      height: 120px;
      text-align: center;
      line-height: 120px;
    }
  }
}

@keyframes circling{
  0%{
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg)
  }
  to{
    -webkit-transform:rotate(1turn);
    transform:rotate(1turn)
  }
}


</style>
