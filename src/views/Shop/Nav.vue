<template>
  <nav></nav>
</template>

<script>
export default {
  name: "ShopNav",
};
</script>

<style lang=stylus scoped>
nav {
  background var(--v-primary-base);
  position: relative;
  width: 320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
}

@media(max-width: 767px){
  nav {
    height: 64px;
    width: 100%;
    position absolute;
    bottom 0
    left 0
  }
}
</style>