<template>
  <div class="vh-100">
    <router-view class="main-view" />
  </div>
</template>

<script>
export default {
  name: "ViewContainer",
};
</script>

<style lang="stylus" scoped>
.main-view {
  height: 100vh;
  overflow-y: auto;
}
</style>