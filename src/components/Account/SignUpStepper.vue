<template>
  <div>
    <v-stepper v-model="e1" class="elevation-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="e1 > 1" step="1">
          Basic info
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">
          Personal info
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3"> Shipping info </v-stepper-step>
      </v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-items>
        <v-stepper-content step="1">
          <h2 class="mb-4">Basic information</h2>
          <label for="email"> Email address </label>
          <v-text-field
            v-model="email"
            hide-details
            id="email"
            outlined
            dense
            class="mb-2"
          />
          <label for="password"> Password </label>
          <v-text-field
            v-model="password"
            hide-details
            id="password"
            type="password"
            outlined
            dense
            class="mb-2"
          />
        </v-stepper-content>

        <v-stepper-content step="2">
          <h2 class="mb-4">Shipping information</h2>
          <label for="street"> First name </label>
          <v-text-field
            v-model="street"
            hide-details
            id="email"
            outlined
            dense
            class="mb-2"
          />
          <label for="lastName"> Last name </label>
          <v-text-field
            v-model="lastName"
            hide-details
            id="email"
            outlined
            dense
            class="mb-2"
          />
          <label for="email"> Email address </label>
          <v-text-field
            v-model="email"
            hide-details
            id="email"
            outlined
            dense
            class="mb-2"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
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
        @click="e1++"
      >
        <span>Continue</span>
      </v-btn>
      <v-btn plain @click="e1--" v-if="e1 > 1">Go back</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpStepper",
  data() {
    return {
      e1: 1,
    };
  },
};
</script>

