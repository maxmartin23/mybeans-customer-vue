import Vue from "vue"
import Axios from "axios"

Axios.defaults.baseURL = process.env.VUE_APP_API
Vue.prototype.$http = Axios