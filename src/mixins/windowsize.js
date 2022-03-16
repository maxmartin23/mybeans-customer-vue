import Vue from "vue"

Vue.mixin({
  computed: {
    windowSize() {
      return this.$store.getters.getWindowSize
    },
    isMobile() {
      return this.windowSize.width < 768
    }
  }
})
