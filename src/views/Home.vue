<template>
  <div>
    <v-dialog v-model="searchDialog" width="24rem">
      <v-sheet class="pa-4 rounded-lg overflow-x-hidden">
        <h3 class="mb-4">Search coffee beans</h3>
        <v-text-field
          hide-details
          label="Keyword"
          class="mb-6"
          outlined
          dense
          v-model="searchForm.keyword"
        />
        <label class="mb-n4 d-block"> Species </label>
        <v-checkbox
          v-for="specie in ['Arabica', 'Robusta', 'Liberica']"
          :key="specie"
          hide-details
          v-model="searchForm.species"
          :label="specie"
          :value="specie"
        />
        <label class="mb-n4 d-block mt-4"> Roasting level </label>
        <v-checkbox
          v-for="level in ['1', '2', '3', '4']"
          :key="level"
          hide-details
          v-model="searchForm.roastingLevel"
          :label="['', 'Light', 'Medium', 'Medium dark', 'Dark'][level]"
          :value="level"
        />
        <label class="d-block mt-4">Price range</label>
        <v-range-slider
          persistent-hint
          v-model="searchForm.range"
          :hint="sliderLabel"
          min="0"
          max="100"
        ></v-range-slider>
        <v-btn
          block
          color="primary"
          elevation="0"
          class="py-6 mt-6"
          rounded
          @click="searchBeans()"
        >
          Filter coffee beans
        </v-btn>
      </v-sheet>
    </v-dialog>
    <div class="pa-6 pb-16">
      <v-container>
        <h2 class="mb-4">Discover coffee beans</h2>
        <p>
          <v-btn color="secondary" rounded elevation="0" @click="goToShops()"
            >Browse shops</v-btn
          >
        </p>
        <v-btn
          large
          elevation="0"
          color="grey lighten-2"
          class="mb-4 px-8"
          rounded
          @click="searchDialog = true"
        >
          <v-icon left>mdi-magnify</v-icon> <span class="ml-n1">Search</span>
        </v-btn>
        <div v-if="!allBeans" class="pa-6 rounded-lg grey lighten-4">
          <h4>Loading beans...</h4>
        </div>
        <div v-if="!!filteredBeans" class="mb-4">
          <v-btn plain rounded class="py-6" @click="clearFilters()">
            <v-icon left>mdi-close</v-icon> Clear filters
          </v-btn>
          <span v-if="filteredBeans?.length > 0"
            >{{ filteredBeans?.length }} bean{{
              filteredBeans?.length === 1 ? "" : "s"
            }}
            found</span
          >
        </div>
        <div
          v-if="!!filteredBeans && !filteredBeans?.length"
          class="grey pa-4 rounded-lg lighten-3"
        >
          <h3>No beans found matching your criteria.</h3>
        </div>
        <div class="row mt-4" v-else>
          <div v-if="allBeans?.length === 0" class="col-12 pa-4 grey lighten-4 rounded-lg">
            <h3>There are no beans yet.</h3>
          </div>
          <div
            class="col-12 col-md-6 col-lg-4 col-xl-2"
            v-for="(bean, i) in !!filteredBeans ? filteredBeans : allBeans"
            :key="i"
          >
            <div class="grey lighten-4 rounded-lg elevation-4 overflow-hidden">
              <div
                class="bean-image"
                aria-hidden="true"
                :style="`background-image: url(${beanImages[i]})`"
              ></div>
              <div class="pa-4 position-relative">
                <div class="price">
                  <div class="font-weight-semibold white--text">
                    ${{ bean.price }}
                  </div>
                </div>
                <div style="width: calc(100% - 64px)">
                  <router-link
                    :to="`bean-details/${bean.coffeeBeanId}?beanImage=${beanImages[i]}`"
                  >
                    <span class="text-h5 font-weight-semibold">
                      {{ bean.name }}
                    </span>
                  </router-link>
                </div>
                <p class="mb-1">
                  Sold by
                  <router-link
                    :to="`/shop?shop=${stringify(
                      shops.find((shop) => shop.shopId === bean.shopId)
                    )}`"
                    >{{
                      shops.find((shop) => shop.shopId === bean.shopId).name
                    }}</router-link
                  >
                </p>
                <p class="grey--text text--darken-2">
                  <small>
                    {{
                      formatDistance(
                        shops.find((shop) => shop.shopId === bean.shopId)
                          .distance
                      )
                    }}
                    away</small
                  >
                </p>
                <v-btn
                  color="primary"
                  elevation="0"
                  rounded
                  block
                  class="py-6"
                  :to="`bean-details/${bean.coffeeBeanId}?beanImage=${beanImages[i]}`"
                  >View details</v-btn
                >
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    location() {
      return this.$store.getters.getLocation;
    },
    allBeans() {
      if (!this.shops) return null;
      if (this.shops.length === 0) return [];
      return this.shops.reduce((acc, shop) => {
        return acc.concat(shop.beans);
      }, []);
    },
    beanImages() {
      if (!this.allBeans?.length) return null;
      return this.allBeans.map(() => this.getRandomBeanImage());
    },
    sliderLabel() {
      const [min, max] = this.searchForm.range;
      if (min === 0 && max === 100) return "Any price";
      if (min === 0 && max !== 100) return `Less than ${max * 5} CAD`;
      if (min !== 0 && max === 100) return `More than ${min * 5} CAD`;
      return `${min * 5} CAD to ${max * 5} CAD`;
    },
  },
  data() {
    return {
      searchDialog: false,
      shops: null,
      searchForm: {
        keyword: "",
        species: [],
        roastingLevel: [],
        range: [0, 100],
        priceMin: 0,
        priceMax: 0,
      },
      filteredBeans: null,
    };
  },
  methods: {
    getShops() {
      this.$http
        .get(`/shops`, {
          params: {
            lat: this.location.latitude,
            lng: this.location.longitude,
          },
        })
        .then((res) => {
          this.shops = res.data;
          sessionStorage.setItem("shops", JSON.stringify(res.data));
        })
        .catch((err) => {
          alert(err?.response?.data?.error ?? "Error loading shops");
        });
    },
    stringify(obj) {
      return JSON.stringify(obj);
    },
    signOut() {
      this.$store.dispatch("signOut");
      this.$store.commit("clearLocation");
      this.$router.replace("/");
    },
    goToShops() {
      if (!this.shops) return null;
      return this.$router.push(`/shops`);
    },
    clearFilters() {
      this.searchForm = {
        keyword: "",
        species: [],
        roastingLevel: [],
        range: [0, 100],
        priceMin: 0,
        priceMax: 0,
      };
      this.filteredBeans = null;
    },

    searchBeans() {
      const { keyword, species, roastingLevel, range } = this.searchForm;
      const [min, max] = range;
      const priceMin = min * 5;
      const priceMax = max === 100 ? null : max * 5;

      let beans = [...this.allBeans];
      if (keyword)
        beans = beans.filter((bean) =>
          bean.name.toLowerCase().includes(keyword.toLowerCase())
        );
      if (species.length)
        beans = beans.filter((bean) => species.includes(bean.specie));
      if (roastingLevel.length)
        beans = beans.filter((bean) =>
          roastingLevel.includes(bean.roastingLevel)
        );
      if (priceMin) beans = beans.filter((bean) => bean.price >= priceMin);
      if (priceMax) beans = beans.filter((bean) => bean.price <= priceMax);
      this.searchDialog = false;
      return (this.filteredBeans = [...beans]);
    },
    getRandomBeanImage() {
      const urls = [
        "https://images.pexels.com/photos/942736/pexels-photo-942736.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/977878/pexels-photo-977878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/5214207/pexels-photo-5214207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/2131905/pexels-photo-2131905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/606545/pexels-photo-606545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/7125590/pexels-photo-7125590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ];
      return urls[Math.floor(Math.random() * urls.length)];
    },
    formatDistance(distance) {
      if (distance < 1000) {
        return `${distance.toFixed(0)}m`;
      }
      return `${(distance / 1000).toFixed(1)}km`;
    },
  },
  created() {
    if (!this.location) return this.$router.replace(`/requestlocation`);
    setTimeout(this.getShops, 1000)
  },
};
</script>

<style lang="stylus" scoped>
.bean-image {
  aspect-ratio: 1 / 1;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.price {
  position: absolute;
  top: 0;
  right: 8px;
  height: 64px;
  width: 64px;
  background: var(--v-primary-lighten2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 75%;
  border-radius: 1000px;
  transform: translateY(-50%);
}
</style>