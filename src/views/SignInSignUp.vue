<template>
  <div id="sign-in-page">
    <main class="h-100 w-100 d-flex">
      <sign-in v-if="isSignIn" />
      <sign-up v-else />
    </main>
  </div>
</template>

<script>
import SignIn from "@/components/Account/SignIn";
import SignUp from "@/components/Account/SignUp";
export default {
  components: { SignIn, SignUp },
  name: "SignInSignUp",
  computed: {
    isSignIn() {
      return this.$route.name === "SignIn";
    },
    transition() {
      return this.isMobile ? null : "fade-shrink";
    },
  },
};
</script>

<style lang="stylus" scoped>
#sign-in-page {
  background: url('../assets/bg.svg');
  background-size: 50vmin;
  background-position: center;

  #main-content {
    height: 100vh;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    width: 64rem;
    max-width: calc(100vw - 280px);
  }
}

@media (max-width: 768px) {
  #main-content {
    max-width: unset !important;
    height: 100vh !important;
    width: 100vw !important;
    border-radius: 0 !important;
  }
}
</style>