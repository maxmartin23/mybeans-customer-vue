<template>
  <div class="vh-100 vw-100 position-absolute top left">
    <v-dialog v-model="dialog" style="z-index: 100" width="32rem">
      <v-sheet class="rounded-xl pa-6">
        <h3>Set your location</h3>
        <p>Do you want to set this as your location?</p>
        <v-btn
          color="primary"
          rounded
          elevation="0"
          class="pa-6"
          @click="setLocation"
        >
          Submit my location
        </v-btn>
      </v-sheet>
    </v-dialog>
    <l-map
      id="map"
      ref="map"
      :zoom="zoom"
      :center="center"
      @click="clickHandler"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
export default {
  name: "PinLocation",
  data() {
    return {
      dialog: false,
      moving: false,
      isDebounced: false,
      zoom: 15,
      center: L.latLng(this.$route.query.lat, this.$route.query.lng),
      clickedLocation: {
        latitude: null,
        longitude: null,
      },
      url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVkcnNtIiwiYSI6ImNrMzhhbzFwNTAzc3EzY3RlZjV4bGVrZGYifQ.cu8dC9cP-I15VNH-JZYKGQ",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  methods: {
    clickHandler(e) {
      const { lat, lng } = e.latlng;

      this.clickedLocation = {
        latitude: lat,
        longitude: lng,
      };
      this.dialog = true;
    },
    setLocation(){
      this.$store.commit("setLatLng", this.clickedLocation);
      this.$router.replace("/home");
    }
  },
};
</script>

<style lang="stylus" scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: 1
}
</style>