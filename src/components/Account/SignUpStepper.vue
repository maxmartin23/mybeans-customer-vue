<template>
  <div>
    <v-stepper v-model="e1" class="elevation-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="e1 > 1" step="1">
          <span class="font-weight-semibold">Basic info</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">
          <span class="font-weight-semibold">Personal info</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">
          <span class="font-weight-semibold">Shipping info</span>
        </v-stepper-step>
      </v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-items>
        <v-stepper-content step="1">
          <h2 class="mb-4">Basic information</h2>
          <label for="email"> Email address </label>
          <v-text-field
            v-model="email"
            hide-details="auto"
            :error-messages="
              email.length > 0 && !isValidEmail
                ? ['Please enter a valid email.']
                : null
            "
            id="email"
            outlined
            dense
            class="mb-2"
          />
          <label for="password"> Password </label>
          <v-text-field
            v-model="password"
            hide-details="auto"
            :error-messages="
              password.length > 0 && password.length < 6
                ? ['Password must be at least 6 characters long.']
                : null
            "
            id="password"
            type="password"
            outlined
            dense
            class="mb-2"
          />
        </v-stepper-content>

        <v-stepper-content step="2">
          <h2 class="mb-4">Personal information</h2>
          <label for="firstName"> First name </label>
          <v-text-field
            v-model="firstName"
            hide-details
            id="firstName"
            outlined
            dense
            class="mb-2"
          />
          <label for="lastName"> Last name </label>
          <v-text-field
            v-model="lastName"
            hide-details
            id="lastName"
            outlined
            dense
            class="mb-2"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <h2 class="mb-4">Shipping information</h2>
          <label for="street"> Street </label>
          <v-text-field
            v-model="street"
            hide-details
            id="street"
            outlined
            dense
            class="mb-2"
          />
          <label for="city"> City </label>
          <v-text-field
            v-model="city"
            hide-details
            id="city"
            outlined
            dense
            class="mb-2"
          />
          <label for="province"> Province </label>
          <v-text-field
            v-model="province"
            hide-details
            id="province"
            outlined
            dense
            class="mb-2"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <div class="px-6">
      <v-btn
        type="submit"
        color="primary"
        rounded
        class="px-12 mr-4"
        large
        elevation="0"
        @click="e1 < 3 ? e1++ : finishSignUp()"
        :disabled="!canGoNext"
      >
        <span v-if="e1 < 3">Continue</span>
        <span v-else>Create account</span>
      </v-btn>
      <v-btn plain @click="e1--" v-if="e1 > 1" rounded>Go back</v-btn>
    </div>
  </div>
</template>

<script>
const validator = require("email-validator");
export default {
  name: "SignUpStepper",
  data() {
    return {
      e1: 1,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      province: "",
      isLoading: false,
    };
  },
  computed: {
    isValidEmail() {
      return validator.validate(this.email);
    },
    canGoNext() {
      const {
        e1,
        email,
        password,
        firstName,
        lastName,
        street,
        city,
        province,
      } = this;

      if (e1 === 1) return validator.validate(email) && password.length > 6;
      if (e1 === 2) return firstName.length > 0 && lastName.length > 0;
      if (e1 === 3)
        return street.length > 0 && city.length > 0 && province.length > 0;
      return true;
    },
  },
  methods: {
    finishSignUp() {
      if (this.isLoading) return;
      this.isLoading = true;
      const { email, password, firstName, lastName, street, city, province } =
        this;
      const user = {
        userType: 1,
        email,
        password,
        firstName,
        lastName,
        address: {
          street,
          city,
          province,
        },
      };
      this.$http
        .post("/auth/signup", user)
        .then((res) => {
          const {user, token} = res.data
          user.token = token
          this.$store.dispatch("setUser", user);
          this.$router.push("/home");
        })
        .catch((err) => {
          this.$emit("error", err.response?.data?.error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

