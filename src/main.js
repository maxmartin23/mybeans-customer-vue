import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "./plugins/axios"
import "./plugins/leaflet"
import "./sass/main.sass"
import "./assets/overrides.sass"
import "./assets/transitions.sass"
import "./mixins/windowsize"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
