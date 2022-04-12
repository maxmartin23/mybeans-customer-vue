<template>
  <div v-if="center">
    <div class="container">
      <h1>Browse shops</h1>
      <div style="height: 60vmin" class="mb-6">
        <l-map id="map" ref="map" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-marker :lat-lng="centerMarker" />
          <l-marker
            v-for="(shop, i) in shops"
            :key="i"
            :lat-lng="L.latLng(shop.location.lat, shop.location.lng)"
          >
            <l-popup>
              <h3>{{ shop.name }}</h3>
              <p>{{ shop.description }}</p>
              <router-link :to="`shop?shop=${shop.shopId}`"
                >Visit shop</router-link
              >
            </l-popup>
            <l-icon
              :icon-url="`${$base}/img/svg/shoppin.svg`"
              :icon-size="[48, 48]"
              :icon-anchor="[23.5, 48]"
            >
            </l-icon>
          </l-marker>
        </l-map>
      </div>
      <div class="pb-16">
        <div v-for="(shop, i) in shops" :key="i" class="mb-4">
          <router-link :to="`shop?shop=${shop.shopId}&image=${shopImages[i]}`">
            <div class="pa-4 d-flex grey lighten-2 rounded-lg align-center">
              <div class="shop-image mr-2" :style="`background-image: url(${shopImages[i]})`"></div>
              <h2>
                {{ shop.name }}
              </h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
export default {
  name: "Shops",
  data() {
    return {
      L,
      shops: JSON.parse(sessionStorage.getItem("shops") ?? "null"),
      dialog: false,
      moving: false,
      isDebounced: false,
      zoom: 15,
      center: null,
      clickedLocation: {
        latitude: null,
        longitude: null,
      },
      url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVkcnNtIiwiYSI6ImNrMzhhbzFwNTAzc3EzY3RlZjV4bGVrZGYifQ.cu8dC9cP-I15VNH-JZYKGQ",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  created() {
    if (!this.shops || !this.location) {
      this.$router.replace("/");
    }
    this.center = this.L.latLng(
      this.location.latitude,
      this.location.longitude
    );
  },
  computed: {
    location() {
      return this.$store.getters.getLocation;
    },
    centerMarker() {
      return this.L.latLng(this.location.latitude, this.location.longitude);
    },
    shopImages(){
      if (!this.shops) return null;
      return this.shops.map(()=>this.getRandomShopImage())
    }
  },
  methods: {
    stringify(obj) {
      return JSON.stringify(obj);
    },
    getRandomShopImage() {
      const shopImages = [
        "https://images.pexels.com/photos/3205736/pexels-photo-3205736.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/6151691/pexels-photo-6151691.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/4947417/pexels-photo-4947417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3951751/pexels-photo-3951751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/4906513/pexels-photo-4906513.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      ];
      return shopImages[Math.floor(Math.random() * shopImages.length)];
    },
  },
};
</script>

<style lang="stylus" scoped>
.shop-image{
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
</style>