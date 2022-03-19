<template>
  <div></div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    location() {
      return this.$store.getters.getLocation;
    },
  },
  data(){
    return {
      shops: null,
    }
  },
  created() {
    if (!this.location) return this.$router.replace(`/requestlocation`);

    this.$http
      .get("/shops", {
        params: {
          lat: this.location.lat,
          lng: this.location.lng,
        },
      })
      .then((res) => {
        this.shops = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>