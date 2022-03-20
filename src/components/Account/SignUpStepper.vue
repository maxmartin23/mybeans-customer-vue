<template>
  <div>
    <v-stepper v-model="currentStep" class="elevation-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="currentStep > 1" step="1">
          <span class="font-weight-semibold">Account type</span>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="currentStep > 2" step="2">
          <span class="font-weight-semibold">Basic info</span>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="currentStep > 3" step="3">
          <span class="font-weight-semibold">Personal info</span>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step step="3">
          <span class="font-weight-semibold">
            <span v-if="accountType !== 2">Shipping info</span>
            <span v-else>Vendor info</span>
          </span>
        </v-stepper-step>
      </v-stepper-header>
      <v-divider />
      <v-stepper-items>
        <v-stepper-content step="1">
          <h2 class="mb-4">Account type</h2>

          <h3 class="mb-n2">I am a...</h3>
          <v-radio-group v-model="accountType">
            <v-radio label="Customer" :value="1" />
            <v-radio label="Coffee vendor" :value="2" />
          </v-radio-group>
        </v-stepper-content>
        <v-stepper-content step="2">
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

        <v-stepper-content step="3">
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
        <v-stepper-content step="4">
          <div v-if="accountType === 1">
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
          </div>
          <div v-else>
            <h2 class="mb-4">Vendor information</h2>
            <label for="shopName"> Shop name </label>
            <v-text-field
              v-model="shop.name"
              hide-details
              id="shopName"
              outlined
              dense
              class="mb-2"
            />
            <label for="description">Shop description</label>
            <v-textarea
              rows="2"
              v-model="shop.description"
              hide-details
              id="shopName"
              outlined
              dense
              class="mb-2"
            />

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
          </div>
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
        @click="currentStep < 4 ? currentStep++ : finishSignUp()"
        :disabled="!canGoNext"
      >
        <span v-if="currentStep < 4">Continue</span>
        <span v-else>Create account</span>
      </v-btn>
      <v-btn plain @click="currentStep--" v-if="currentStep > 1" rounded
        >Go back</v-btn
      >
    </div>
  </div>
</template>

<script>
const validator = require("email-validator");
export default {
  name: "SignUpStepper",
  data() {
    return {
      currentStep: 1,
      accountType: null,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      province: "",
      shop: {
        name: "",
        description: "",
        coords: { lat: 43.6532, lng: 79.3832 },
      },
      isLoading: false,
    };
  },
  computed: {
    isValidEmail() {
      return validator.validate(this.email);
    },
    canGoNext() {
      const {
        currentStep,
        email,
        password,
        firstName,
        lastName,
        street,
        city,
        accountType,
        province,
      } = this;

      if (currentStep === 1) return !!accountType;
      if (currentStep === 2)
        return validator.validate(email) && password.length >= 6;
      if (currentStep === 3) return firstName.length > 0 && lastName.length > 0;
      if (currentStep === 4)
        return street.length > 0 && city.length > 0 && province.length > 0;
      return true;
    },
  },
  methods: {
    finishSignUp() {
      if (this.isLoading) return;
      this.isLoading = true;
      const {
        email,
        password,
        firstName,
        lastName,
        street,
        city,
        province,
        shop,
      } = this;
      const { name, description, coords } = shop;
      const user = {
        userType: this.accountType,
        email,
        password,
        firstName,
        lastName,
        address: {
          street,
          city,
          province,
        },
        shop: {
          name,
          description,
          coords,
          address: `${street}, ${city}, ${province}`,
        },
      };
      this.$http
        .post("/auth/signup", user)
        .then((res) => {
          const { user, token } = res.data;
          user.token = token;
          this.$store.dispatch("setUser", user);
          this.$router.push(user.userType === 1 ? "/home" : "/shop-home");
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

