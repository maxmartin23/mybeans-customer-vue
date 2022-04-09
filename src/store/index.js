import Vue from "vue";
import Vuex from "vuex";
import windowSize from "./modules/windowsize";
import user from "./modules/user";
import location from "./modules/location";
Vue.use(Vuex);
Vue.prototype.$base = process.env.VUE_APP_BASE_URL;
const store = new Vuex.Store({
  modules: {
    windowSize,
    user,
    location,
  },
});

window.addEventListener("resize", () => {
  store.commit("setWindowSize", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
});

export default store;
