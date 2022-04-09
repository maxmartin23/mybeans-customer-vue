<template>
  <nav>
    <div class="w-100">
      <v-list>
        <v-list-item to="/shop-home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/shop-details">
          <v-list-item-icon>
            <v-icon>mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shop details</v-list-item-title>
        </v-list-item>
        <v-list-item @click="signOut()">
          <v-list-item-icon>
            <v-icon>mdi-door</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </nav>
</template>

<script>
export default {
  name: "ShopNav",
  methods:{
     signOut() {
      this.$store.dispatch("signOut");
      this.$store.commit("clearLocation")
      this.$router.replace("/");
    },
  }
};
</script>

<style lang=stylus scoped>
nav {
  background var(--v-secondary-base);
  position: relative;
  width: 320px;
  display: flex;
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