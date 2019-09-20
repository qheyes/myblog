import axios from 'axios'
const state = {
  src: '',
  detail : {},
  lrc: '',
  history: [],
  paused: true, //true代表暂停, false代表播放
  mode: 2, //歌曲模式  2：顺序 3：随机
  musicIndex: 0, //当前第几首歌
  num:0
}
const getters = {
  musicInfo(state){
    let musicInfo = {
      src: state.src,
      detail: state.detail,
      lrc: state.lrc
    }
    return musicInfo
  }
}
const mutations = {
  // 设置基础信息
  setSrc(state, src){
    state.src = src
  },
  setDetail(state, detail){
    state.detail = detail
  },
  setLyric(state, lrc){
    state.lrc = lrc
  },
  // 设置历史记录
  setHistory(state, data){
    // 查询数组内的元素是否符合,返回索引,不存在则返回-1
    let num = state.history.findIndex(item => {
      return item.id === data[3]
    })
    // 为 -1 表示该id的音乐未被添加
    if(num === -1){
      state.history.unshift({
        src: data[0],
        detail: data[1],
        lrc: data[2],
        id: data[3]
      })
    }			
  },
  // 下一首
  addMusicIndex(state){		
    state.musicIndex++
    if(state.musicIndex === state.history.length){
      state.musicIndex = 0
    }	
  },
  // 前一首
  setprev(state){
    if(state.musicIndex === 0){
      state.musicIndex = state.history.length
    }else if(state.musicIndex === -1){
      state.musicIndex = state.history.length - 1
    }
    state.musicIndex--
  },
  // 设置当前播放第几首
  setIndex(state, num){
    state.musicIndex = num
  },
  // 改变播放模式
  changeMode(state, val){
    state.mode = val 
  },
  // 播放暂停状态设置
  playMusic(state){
    state.paused = false
  },
  pauseMusic(state){
    state.paused = true
  },
  addNum(state){
    state.num++
  },
  initHis(state){
    state.num = 0
    state.history = []
  }
}
const actions = {
  fetchMusicInfo({commit}, id){
    Promise.all([
      // 获取音乐url
      new Promise((resolve, reject) => {
        axios.get(`http://music.qianheye.cn/song/url?id=${id}`).then(res => {
          commit('setSrc', res.data.data[0].url)
          resolve(res.data.data[0].url)
        })
      }),
      // 获取音乐详情
      new Promise((resolve, reject) => {
        axios.get(`http://music.qianheye.cn/song/detail?ids=${id}`).then(res => {
          commit('setDetail', res.data)
          resolve(res.data)
        })
      }),
      // 获取歌词
      new Promise((resolve, reject) => {
        // 获取歌词
        axios.get(`http://music.qianheye.cn/lyric?id=${id}`).then(res => {
          commit('setLyric', res.data.lrc)
          resolve(res.data.lrc)
        })
      })
    ]).then(res => {
      res[3] = id
      commit('setHistory', res)
      commit('setIndex', 0)
      
    })
  },
  // 初始化列表歌曲
  InitMusic({commit,state}, {id, len}){
    Promise.all([
      // 获取音乐url
      new Promise((resolve, reject) => {
        axios.get(`http://music.qianheye.cn/song/url?id=${id}`).then(res => {
          resolve(res.data.data[0].url)
        })
      }),
      // 获取音乐详情
      new Promise((resolve, reject) => {
        axios.get(`http://music.qianheye.cn/song/detail?ids=${id}`).then(res => {
          resolve(res.data)
        })
      }),
      // 获取歌词
      new Promise((resolve, reject) => {
        // 获取歌词
        axios.get(`http://music.qianheye.cn/lyric?id=${id}`).then(res => {
          resolve(res.data.lrc)
        })
      })
    ]).then(res => {
      res[3] = id
      commit('setHistory', res)
      commit('addNum')
      if(state.num === len){
        commit('setSrc', res[0])
        commit('setDetail', res[1])
        commit('setLyric', res[2])
      }
    })
  }
}

export default {
  namespaced: true,
  state,getters,mutations,actions
}