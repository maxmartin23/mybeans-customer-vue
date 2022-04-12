<template>
  <div>
    <v-container>
      <div class="py-4 d-flex align-center">
        <div
          class="shop-image"
          :style="`background-image: url(${image ?? getRandomShopImage()})`"
        ></div>
        <div class="ml-4">
          <h1>
            {{ shop.name }}
          </h1>
          <p class="body-1 mb-1">
            {{ shop.description }}
          </p>
          <p class="grey--text text--darken-2 mb-0">
            <small>{{ formatDistance(shop.distance) }} away</small>
          </p>
        </div>
      </div>

      <v-divider class="my-4" />
      <h2 class="mb-6">{{ shop.name }}'s products</h2>
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-4 col-xl-2"
          v-for="(bean, i) in shop.beans"
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
              <div class="mb-4" style="width: calc(100% - 64px)">
                <router-link
                  :to="`bean-details/${bean.coffeeBeanId}?beanImage=${beanImages[i]}`"
                >
                  <span class="text-h5 font-weight-semibold">
                    {{ bean.name }}
                  </span>
                </router-link>
              </div>
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
</template>

<script>
export default {
  name: "Shop",
  data() {
    return {
      shop: null,
      image: this.$route.query.image ?? null,
    };
  },
  created() {
    if (!sessionStorage.getItem("shops")) {
      return this.$router.replace("/home");
    }
    const shops = JSON.parse(sessionStorage.getItem("shops") ?? "null");
    const shopId = this.$route.query.shop;
    this.shop = shops.find((shop) => shop.shopId === shopId);
  },
  computed: {
    beanImages() {
      if (!this.shop.beans?.length) return null;
      return this.shop.beans.map(() => this.getRandomBeanImage());
    },
  },
  methods: {
    formatDistance(distance) {
      if (distance < 1000) return `${distance} m`;
      return `${(distance / 1000).toFixed(1)} km`;
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

.shop-image {
  aspect-ratio: 1 / 1;
  width: 8rem;
  border-radius: 1000px;
  background-position: center;
  background-size: cover;
}
</style>