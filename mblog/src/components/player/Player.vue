<template>
  <div class='player'>
    <!-- 全屏播放 -->
    <MusicInfo 
      :start="start" 
      :total="total"
      :value="value"
      :lrcList="lrcList"
      :index="index"
      v-show="fullScreen" 
      @changeProgress="progress" 
      @miniShow="isMini" 
    />

    <transition name="mini">
      <!-- 迷你播放 -->
      <mini 
        v-show="!fullScreen"
        @fullShow="isFull"
       />
    </transition>

    <audio 
      ref="audio" 
      :src="src" 
      @canplay="ready" 
      @error="error" 
      @timeupdate="updateTime"  
      @ended="end"
    ></audio>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import MusicInfo from './MusicInfo'
  import Mini from './Mini'
  export default {
    name: 'player',
    components: {
      Mini,
      MusicInfo
    },
    data () {
      return {
        audio: '',
        fullScreen: true,  //是否全屏
        songReady:false,  //是否准备完毕
        start: '', //开始时间
        total: '', //结束时间
        value: 0, //当前百分比进度
        currentTime: '', //当前时间进度
        lrcList: [], //歌词列表
        index: -1 //当前歌词进度
      }
    },
    watch: {
      paused(newPaused){
        console.log(newPaused)
        let audio = this.$refs.audio;
        this.$nextTick(() => {
            newPaused ? audio.pause() : audio.play();
        })
      },
      src(){
        let audio = this.$refs.audio;
        this.$nextTick(() => {
          audio.play();
          this.playMusic();
          this.initLrc();
        })
      }
    },
    mounted () {
      this.audio = this.$refs.audio;    
    },
    computed: {
      ...mapState('music', ["src", "lrc", "paused", "mode", "musicIndex", "history"]),
    },
    methods: {
      ...mapMutations('music', ["playMusic", "pauseMusic", "addMusicIndex","setSrc", "setDetail", "setLyric"]),
      // 格式化歌词
      initLrc(){
        this.index = -1
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
      // 时间初始化
      slider(){
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
      // 拖动进度条
      progress(value){
        // console.log(value)
        this.audio.currentTime = value * this.audio.duration / 100
        this.value = value

        let currentTime = this.currentTime
        // 当前分钟
				let min = Math.floor(currentTime / 60);
				min = min.toString().length === 1 ? ("0" + min) : min;
				// 当前秒钟
				let sec = Math.floor(currentTime % 60);
				sec = sec.toString().length === 1 ? ("0" + sec) : sec;
        let start = `${min}:${sec}`;

        const that = this;
				this.index = 0;
				if(!this.lrcList.length)return
				function d(){
					if(start > that.lrcList[that.index + 1].time){
						that.index++
						d()
          }
          this.index = 0;
				}
				d()
      },
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
					this.setSrc(this.history[index].src)
					this.setDetail(this.history[index].detail)
					this.setLyric(this.history[index].lrc)
        }

        // 歌词复位
        this.lrcList = []      
				this.initLrc()
      }
    },
  }
</script>

<style lang="scss" scoped>

.player{
  position: fixed;
  left: 0;
  bottom: 150px; 
  z-index: 1000;
}

</style>
