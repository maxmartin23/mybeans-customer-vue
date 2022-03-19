<template>
  <div>
    <v-text-field v-model="keyword" label="Enter a keyword" />
    <div v-for="(shop, i) in filteredShops" :key="i">
      {{ shop?.item?.name ?? shop.name }}
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";

export default {
  name: "Home",
  computed: {
    location() {
      return this.$store.getters.getLocation;
    },
    filteredShops() {
      if (!this.keyword) return this.shops;
      return this.fuse.search(this.keyword);
    },
  },
  data() {
    return {
      shops: null,
      keyword: "",
      fuse: null,
    };
  },
  created() {
    if (!this.location) return this.$router.replace(`/requestlocation`);
    this.$http
      .get(`/shops`, {
        params: {
          lat: this.location.latitude,
          lng: this.location.longitude,
        },
      })
      .then((res) => {
        this.shops = res.data;
        this.fuse = new Fuse(this.shops, { keys: ["name", "description"] });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>