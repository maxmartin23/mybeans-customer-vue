<template>
  <v-sheet
    class="pt-8 pa-lg-16 pa-6 rounded-xl"
    id="main-content"
    elevation="6"
  >
    <form class="pa-lg-16" @submit.prevent="signIn()">
      <div class="text-center mb-4">
        <my-beans-logo
          aria-label="MyBeans"
          style="width: 16rem; max-width: 100%"
        />
      </div>
      <h1 class="mb-4 text-center">Welcome back!</h1>
      <transition name="fade-shrink">
        <v-alert dense type="error" color="error darken-2" v-if="errorMessage">
          {{ errorMessage }}
        </v-alert>
      </transition>
      <label for="email"> Email address </label>
      <v-text-field
        v-model="email"
        hide-details
        id="email"
        outlined
        dense
        class="mb-2"
      />
      <label for="password">Password</label>
      <v-text-field
        type="password"
        id="password"
        hide-details
        outlined
        dense
        v-model="password"
        class="mb-2"
      />
      <p>
        <router-link to="/"> Lost your password? </router-link>
      </p>
      <v-btn
        type="submit"
        class="mb-4"
        color="primary"
        rounded
        block
        large
        elevation="0"
        :disabled="!email || !password"
      >
        <v-progress-circular
          v-if="isLoading"
          size="24"
          width="2"
          indeterminate
        />
        <span v-else>Sign in</span>
      </v-btn>
      <div class="text-center">
        <p class="font-weight-medium grey--text text--darken-2 mb-6">
          Don't have an account yet?
          <router-link to="/signup">Sign up</router-link> here.
        </p>
      </div>
    </form>
  </v-sheet>
</template>

<script>
import MyBeansLogo from "../SVG/MyBeansLogo";
const validator = require("email-validator");
export default {
  name: "SignIn",
  components: {
    MyBeansLogo,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      email: "",
      password: "",
    };
  },
  computed: {
    isValidEmail() {
      return validator.validate(this.email);
    },
  },
  methods: {
    signIn() {
      if (this.isLoading) return null;
      this.isLoading = true;
      const { email, password } = this;
      this.$http
        .post("/auth/signin", { email, password })
        .then((res) => {
          const { user, token } = res.data;
          user.token = token;
          this.$store.dispatch("setUser", user);
          this.$router.replace(user.userType === 1 ? "/requestlocation" : "/shop-home");
        })
        .catch((err) => {
          this.errorMessage =
            err.response?.data?.error ||
            "Sorry, something went wrong on our end.";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>