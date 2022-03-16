<template>
  <v-sheet
    class="pt-8 pa-lg-16 pa-6 rounded-xl"
    id="main-content"
    elevation="6"
  >
    <div class="pa-lg-16">
      <div class="text-center mb-4">
        <my-beans-logo aria-label="MyBeans" style="width: 16rem" />
      </div>
      <h1 class="mb-4 text-center">Get started</h1>
      <transition name="fade-shrink">
        <v-alert dense type="error" color="error darken-2" v-if="errorMessage">
          {{ errorMessage }}
        </v-alert>
      </transition>
      <sign-up-stepper />
      <div class="text-center mt-4">
        <p class="font-weight-medium grey--text text--darken-2 mb-6">
          Already have an account? click
          <router-link to="/">here</router-link> to sign in.
        </p>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import MyBeansLogo from "../SVG/MyBeansLogo";
import SignUpStepper from "./SignUpStepper.vue";
const validator = require("email-validator");
export default {
  name: "SignUp",
  components: {
    MyBeansLogo,
    SignUpStepper,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    isValidEmail() {
      return validator.validate(this.email);
    },
  },
  methods: {},
};
</script>