<template>
  <div class="vh-100">
    <div
      class="w-100 h-100 position-relative"
      v-if="$store.getters.getUser.userType === 1"
    >
      <v-app-bar clipped-left v-if="$route.name !== 'RequestLocation'">
          <my-beans-logo style="height: 24px" />
        <v-spacer></v-spacer>
        <v-tabs align-with-title>
          <v-tab to="/home">Home</v-tab>
          <v-tab to="/account">My account</v-tab>
          <v-tab class="ml-auto" disabled><span class="black--text font-weight-semibold">{{$store.getters.getUser.firstName + " " + $store.getters.getUser.lastName}}</span> </v-tab>
          <v-tab @click="signOut" class=""><span class="error--text">Sign out</span></v-tab>
        </v-tabs>
      </v-app-bar>
      <router-view class="main-view" />
    </div>

    <div
      id="vendor-view"
      class="w-100 h-100 position-relative d-flex"
      v-else-if="$store.getters.getUser.userType === 2"
    >
      <Nav />
      <router-view class="flex-grow-1 main-view" />
    </div>

    <router-view v-else class="main-view" />

    <auth-setup />
  </div>
</template>

<script>
import MyBeansLogo from "@/components/SVG/MyBeansLogo";
import Nav from "@/views/Shop/Nav";
import AuthSetup from "./AuthSetup";
export default {
  components: { AuthSetup, Nav, MyBeansLogo },
  name: "ViewContainer",
  methods:{
    signOut(){
      this.$store.dispatch("signOut");
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="stylus" scoped>
.main-view {
  height: 100vh;
  overflow-y: auto;
}
</style>