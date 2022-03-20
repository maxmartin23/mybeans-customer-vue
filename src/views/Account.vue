<template>
  <div class="pa-6">
    <h1 class="mb-6">My account</h1>
    <div v-if="profile">
      <v-text-field
        outlined
        dense
        label="First name"
        v-model="profile.firstName"
      />
      <v-text-field
        outlined
        dense
        label="Last name"
        v-model="profile.lastName"
      />
      <v-text-field
        outlined
        dense
        readonly
        disabled
        filled
        label="Email"
        v-model="profile.email"
      />

      <h3 class="mb-4">Address</h3>
      <v-text-field
        outlined
        dense
        label="Street"
        v-model="profile.address.street"
      />
      <v-text-field
        outlined
        dense
        label="City"
        v-model="profile.address.city"
      />
      <v-text-field
        outlined
        dense
        label="Province"
        v-model="profile.address.province"
      />

      <v-btn rounded color="primary" class="py-6" elevation="0" @click="saveChanges()"> Save changes </v-btn>
      <v-btn plain to="/">Go back</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      profile: null,
    };
  },
  mounted() {
    this.$http.get("/account/me").then((res) => {
      this.profile = res.data;
    });
  },
  methods: {
    saveChanges() {
      this.$http
        .post("account/update", this.profile)
        .then((res) => {
          console.log(res.data);
          alert("Profile updated successfully");
        })
        .catch((err) => console.log(err?.response?.data?.error));
    },
  },
};
</script>