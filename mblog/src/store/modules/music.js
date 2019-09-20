import axios from 'axios'
const state = {
  src: '',
  detail : {},
  lrc: '',
  history: [],
  paused: true, //true代表暂停, false代表播放
  mode: 2, //歌曲模式  1：单曲 2：顺序 3：随机
  musicIndex: 0, //当前第几首歌
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
  // 改变模式
  changeMode(state){
    state.mode++
    if(state.mode === 4){
      state.mode = 1
    }  
  },

  // 播放暂停状态设置
  playMusic(state){
    state.paused = false
  },
  pauseMusic(state){
    state.paused = true
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
    })
  }
}

export default {
  namespaced: true,
  state,mutations,actions
}