<template>
  <div class="vh-100 vw-100 d-flex justify-center align-center">
    <div class="text-center pa-6">
      <h1>Where are you?</h1>
      <p>
        MyBeans needs to know your location to find the nearest beans to you.
      </p>
      <v-btn
        color="primary"
        @click="getLocation()"
        rounded
        elevation="0"
        class="pa-6"
        >Submit my location</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "RequestLocation",
  methods: {
    getLocation() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.$router.replace(`/pinlocation?lat=${latitude}&lng=${longitude}`);
      });
    },
  },
};
</script>