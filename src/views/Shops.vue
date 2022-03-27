<template>
  <div v-if="center">
    <div class="container">
      <h1>Browse shops</h1>
      <div style="height: 60vmin" class="mb-6">
        <l-map id="map" ref="map" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-marker :lat-lng="centerMarker" />
        </l-map>
      </div>
      <div>
        <div v-for="(shop, i) in shops" :key="i" class="mb-4">
          <div class="pa-4 grey lighten-2 rounded-lg">
            <h3>
              {{ shop.name }}
            </h3>
          </div>
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
      shops: JSON.parse(this.$route.query.shops),
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
    this.center = L.latLng(this.location.latitude, this.location.longitude);
  },
  computed: {
    location() {
      return this.$store.getters.getLocation;
    },
    centerMarker(){
      return L.latLng(this.location.latitude, this.location.longitude);
    }
  },
};
</script>