<template>
  <div>
    <v-container>
      <h1 class="mb-4">Shop Details</h1>
      <div v-if="shop">
        <v-text-field
          class="mb-2"
          dense
          outlined
          label="Name"
          hide-details=""
          v-model="shop.name"
        />
        <v-textarea
          class="mb-2"
          dense
          outlined
          label="Description"
          v-model="shop.description"
        />
        <v-text-field
          class="mb-2"
          dense
          outlined
          label="Address"
          v-model="shop.address"
        />
        <h2>Location</h2>
        <div style="height: 50vh">
          <l-map
            style="height: 100%"
            id="map"
            ref="map"
            :zoom="20"
            :center="L.latLng(shop.location.lat, shop.location.lng)"
            @click="setPin"
          >
            <l-tile-layer
              url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVkcnNtIiwiYSI6ImNrMzhhbzFwNTAzc3EzY3RlZjV4bGVrZGYifQ.cu8dC9cP-I15VNH-JZYKGQ"
            />
            <l-marker :lat-lng="pinCoords" />
          </l-map>
        </div>
        <v-btn
          color="primary"
          rounded
          class="mt-4 py-6 px-6"
          elevation="0"
          @click="updateShop()"
          >Save changes</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import L from "leaflet";
export default {
  name: "ShopDetails",
  data() {
    return {
      shop: null,
      pinCoords: {
        lat: null,
        lng: null,
      },
      L,
    };
  },
  mounted() {
    setTimeout(() => {
      this.$http.get("/shop").then((res) => {
        this.shop = res.data;
        this.pinCoords.lat = this.shop.location.lat;
        this.pinCoords.lng = this.shop.location.lng;
      });
    }, 1000);
  },
  computed: {
    pinLocation() {
      if (!this.shop) return null;
      const { lat, lng } = this.pinCoords;
      return L.latLng(lat, lng);
    },
  },
  methods: {
    setPin(e) {
      const { lat, lng } = e.latlng;
      this.pinCoords.lat = lat;
      this.pinCoords.lng = lng;
    },
    updateShop() {
      const name = this.shop.name ?? null;
      const description = this.shop.description ?? null;
      const address = this.shop.address ?? null;
      const { lat, lng } = this.pinCoords;

      this.$http
        .post("/shop/update", {
          name,
          description,
          address,
          location: { lat, lng },
        })
        .then((res) => {
          this.shop = res.data;
          alert("Shop updated");
        })
        .catch((err) => {
          alert(err?.response?.data?.error ?? "Error updating shop");
        });
    },
  },
};
</script>