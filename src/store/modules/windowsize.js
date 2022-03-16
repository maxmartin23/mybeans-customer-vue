const store = {
  state: {
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  mutations: {
    setWindowSize: (state, payload) => {
      const { width, height } = payload
      state.windowSize.width = width
      state.windowSize.height = height
    }
  },
  getters: {
    getWindowSize: state => state.windowSize
  }
}

export default store