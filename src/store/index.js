import Vue from 'vue'
import Vuex from 'vuex'
import windowSize from "./modules/windowsize"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    windowSize
  }
})

window.addEventListener("resize", () => {
  store.commit("setWindowSize", {
    width: window.innerWidth,
    height: window.innerHeight
  })
})

export default store