<template>
  <div class="player">
    <div v-if="detail.songs" class="background" :style="'background-image:url('+ detail.songs[0].al.picUrl +');'"></div>
    <!-- 头部功能 -->
    <div class="header">  
      <div class="cover-init" v-if="!detail.songs">
        请点击播放音乐
      </div>
      <!-- 封面 -->
      <div class="cover-info" v-if="detail.songs">
        <div class="cover"> 
          <img :src="detail.songs[0].al.picUrl" alt="" width="100%" height="100%">
        </div>
        <div class="info">
          <p class="tit" v-text="detail.songs[0].name"></p>
          <p class="art">
            <span 
              v-for="(item, i) in detail.songs[0].ar" 
              :key="i" 
            >{{item.name}} </span>
          </p>
          <p class="con cp" @click="isShow =!isShow">
            <i class="iconfont icon-wenzhang"></i>
            音乐列表/歌词列表
            
          </p>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn d-flex jc-around">
        <div class="mode" @click="changeMode(3)">
          <i :style="mode === 3 ? 'color: red;' : ''" class="iconfont icon-loop-5"></i>
        </div>
        <div class="prev"  @click.stop="prev">
          <i class="iconfont icon-shangyishou"></i>
        </div>
        <div class="play">
          <i 
            v-show="paused" 
            class="iconfont icon-bofang"
            @click.stop="playMusic"
          ></i>
          <i 
            v-show="!paused" 
            class="iconfont icon-zantingtingzhi"
            @click.stop="pauseMusic"
          ></i>
        </div>
        <div class="next" @click.stop="next">
          <i class="iconfont icon-xiayishou"></i>
        </div>
        <div class="mode" @click="changeMode(2)">
          <i :style="mode === 2 ? 'color: red;' : ''" class="iconfont icon-liebiaoxunhuan"></i>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="slider">
        <div class="time start" v-text="start"></div>
        <div class="progress flex-1">
          <el-slider v-model="value" @change="progress"></el-slider>
        </div>
        <div class="time end" v-text="total"></div>  
      </div>
    </div>
    <!-- 音乐列表 -->
    <div class="list" v-show="!isShow">
      <div class="top">
        播放列表({{history.length}})
      </div>
      <div class="ul-box">
        <ul>
          <li 
            class="cp"
            :style="i === musicIndex ? 'color: red;' : ''"
            v-for="(item, i) in history" 
            :key="i" 
            @click.stop="hisPlay(item, i)"
            v-text="item.detail.songs[0].name"
          ></li>
        </ul>
      </div>
    </div>

    <!-- 歌词列表 -->
    <div class="list" v-show="isShow">
      <div class="top">
        歌词列表
      </div>
      <div class="lrc">
        <ul 
          class="lrc-list" 
          :style="'margin-top: -' + 20*index+'px;'" 
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

    <audio
      :src="src"
      ref="audio"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "Player",
  components: {},
  data() {
    return {
      isShow: false,
      audio: '',
      songReady:false,  //是否准备完毕
      start: '', //开始时间
      total: '', //结束时间
      value: 0, //当前进度
      currentTime: '', //当前时间进度
      lrcList: [], //歌词列表
      index: -1 //当前歌词进度
    };
  },
  watch: {
    paused(newPaused){
      let audio = this.$refs.audio;
      this.$nextTick(() => {
        newPaused ? audio.pause() : audio.play();
      })
    },
    src(){
      let audio = this.$refs.audio;
      this.$nextTick(() => {
        this.playMusic();
        this.initLrc();
        audio.play();
      })
    }
  },
  mounted () {
    this.audio = this.$refs.audio;    
  },
  computed: {
    ...mapState('music', ["src", "detail","lrc", "paused", "mode", "musicIndex", "history"]),
  },
  methods: {
    ...mapMutations('music', ["playMusic", "pauseMusic", "addMusicIndex", "setprev","setSrc", "setDetail", "setLyric", "setIndex", "changeMode"]),
    // 格式化歌词
    initLrc(){
      this.index = -1;
      if(!this.lrc)return
      let lrcArr = this.lrc.lyric.split('\n');
      // console.log(lrcArr)
      let list = [];
      lrcArr.map(item => {
        let arr = item.split("]")
        list.push({
          time: arr[0].slice(1),
          lrc: arr[1]
        })
      })
      this.lrcList = list
    },
    // 滑块
    slider(val){

      let currentTime = this.currentTime
      let duration = this.audio.duration
      // 当前分钟
      let min = Math.floor(currentTime / 60);
      min = min.toString().length === 1 ? ("0" + min) : min;
      // 当前秒钟
      let sec = Math.floor(currentTime % 60);
      sec = sec.toString().length === 1 ? ("0" + sec) : sec;
      // 最大分钟
      let zmin = Math.floor(duration / 60);
      zmin = zmin.toString().length === 1 ? ("0" + zmin) : zmin;
      // 最大秒钟
      let zsec = Math.floor(duration % 60);
      zsec = zsec.toString().length === 1 ? ("0" + zsec) : zsec;
      
      this.start = `${min}:${sec}`;
      this.total = `${zmin}:${zsec}`;
      
      this.value = currentTime / duration * 100	

      if(!this.lrcList.length)return
      let time = this.lrcList[this.index + 1].time
      if( time && this.start > time){
        this.index++
      }
    },
    // 当前进度
    progress(value){
      // console.log(value)
      this.audio.currentTime = value * this.audio.duration / 100
      this.value = value;

      let currentTime = this.currentTime
      let min = Math.floor(currentTime / 60);
      min = min.toString().length === 1 ? ("0" + min) : min;
      let sec = Math.floor(currentTime % 60);
      sec = sec.toString().length === 1 ? ("0" + sec) : sec;
      let start = `${min}:${sec}`;

      this.index = 0;
      const that = this;
      if(!this.lrcList.length)return
      function d(){
        if(start > that.lrcList[that.index + 1].time){
          that.index++
          d()
        }
      }
      d()  
    },
    prev(){   
      this.setprev()
      this.setSrc(this.history[this.musicIndex].src)
      this.setDetail(this.history[this.musicIndex].detail)
      this.setLyric(this.history[this.musicIndex].lrc)
    },
    next(){
      // 顺序播放
      this.addMusicIndex()
      this.setSrc(this.history[this.musicIndex].src)
      this.setDetail(this.history[this.musicIndex].detail)
      this.setLyric(this.history[this.musicIndex].lrc)
    },
    hisPlay(item, i){
      this.setIndex(i)
      this.setSrc(item.src)
      this.setDetail(item.detail)
      this.setLyric(item.lrc)      
    },
    // audio状态函数
    isFull(){
      this.fullScreen = true;
    },
    isMini(){
      this.fullScreen = false;
    },
    ready(){
      this.songReady = true;
    },
    error(){
      this.songReady = true;
    },
    updateTime(e){
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
      this.slider()
    },
    end(){
      if(this.mode === 1){
        // 单曲循环
        this.audio.play()
      }
      else if(this.mode === 2){
        // 顺序播放
        this.addMusicIndex()
        this.setSrc(this.history[this.musicIndex].src)
        this.setDetail(this.history[this.musicIndex].detail)
        this.setLyric(this.history[this.musicIndex].lrc)
        
      }else if(this.mode == 3){
        // 随机
        const index = Math.floor(Math.random() * this.history.length)
        this.setIndex(index)
        this.setSrc(this.history[index].src)
        this.setDetail(this.history[index].detail)
        this.setLyric(this.history[index].lrc)
      }
      // 歌词复位
      this.lrcList = []      
      this.initLrc()
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  overflow: hidden;
  padding: 10px;
  width: 370px;
  color: #222;
  min-height: 600px;
  border-radius: 5px;
  border: 1px solid #ddd;
  .background{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(20px);
    filter: blur(20px);
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
  }
  .header{
    .cover-init{
      font-size: 26px;
      text-align: center;
      line-height: 100px;
      width: 100%;
      height: 100px;
    }
    .cover-info{
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px; 
      .cover{
        width: 100px;
        height: 100px;
        background-color: #aaa;
      }
      .info{
        width: 200px;
        height: 100px;
        .tit{
          font-size: 20px;
          width: 200px;
          padding:0 10px 10px 0;
          line-height: 20px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; 
        }
        .con{
          padding-top:10px;
          line-height: 20px;
          width: 200px;
          height: 50px;
        }
      }
    }
    .btn{
      div{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        i{
          font-size: 18px;
        }
      }
      .play{
        i{
          font-size: 26px;
        }
      }     
    }
    .slider{
      display: flex;
      align-items: center;
      .time{
        width: 40px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      .progress{
        padding: 0 10px;
      }
    }
  }
  .list{
    font-size: 16px;
    width: 100%;
    height: 340px;
    .top{
      line-height: 25px;
    }
    .ul-box{
      overflow: hidden;
      padding: 10px 0;
      width: 100%;
      height: 320px;
      ul{
        li{
          padding: 10px 10px;
          border-top: 1px solid #aaa;
        }
      }
    }
    .lrc{
      padding-top: 200px;
      width: 100%;
      height: 360px;
      overflow: hidden;
      font-size: 12px;
      line-height: 20px;
      color: #fff;
      text-align: center;
      box-sizing: border-box;
      .lrc-list{
        transition: margin 1.5s;
      }
    }
  }
}
</style>
