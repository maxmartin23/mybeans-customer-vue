<template>
  <div class="vh-100">
    <router-view class="main-view" />
    <auth-setup />
  </div>
</template>

<script>
import AuthSetup from "./AuthSetup";
export default {
  components: { AuthSetup },
  name: "ViewContainer",
};
</script>

<style lang="stylus" scoped>
.main-view {
  height: 100vh;
  overflow-y: auto;
}
</style>