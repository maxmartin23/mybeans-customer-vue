<template>
  <div class="pa-6">
    <v-dialog v-model="addBeanDialog" width="36rem">
      <v-sheet class="rounded-lg pa-6">
        <h2 class="mb-4">Add a coffee bean</h2>
        <v-text-field
          dense
          outlined
          v-model.trim="newBean.name"
          label="Name"
          hide-details
          class="mb-2"
        />
        <v-textarea
          dense
          outlined
          v-model.trim="newBean.description"
          label="Description"
          hide-details
          rows="2"
          class="mb-2"
        />
        <v-text-field
          dense
          outlined
          v-model.trim="newBean.origin"
          label="Origin"
          hide-details
          class="mb-2"
        />
        <label class="font-weight-semibold mb-n2 d-block">Species</label>
        <v-radio-group v-model.trim="newBean.specie">
          <v-radio
            v-for="specie in newBean.allSpecies"
            :key="specie"
            :label="specie"
            :value="specie"
          />
        </v-radio-group>
        <div>
          <label class="font-weight-semibold">Roasting level</label>
          <div class="d-flex mt-2">
            <div class="font-weight-semibold" style="width: 120px">
              {{['','Light roast', 'Medium roast', 'Medium dark', 'Dark roast'][newBean.roastingLevel]}}
            </div>
            <div class="flex-grow-1">
              <v-slider
                min="1"
                max="4"
                v-model="newBean.roastingLevel"
              />
            </div>
          </div>
        </div>
        <v-text-field
          dense
          outlined
          type="number"
          v-model="newBean.price"
          min="0"
          label="Price"
          hide-details
          class="mb-4"
          prefix="CAD"
        />
        <v-btn
          @click="addNewBean()"
          :disabled="!canAddNewBean"
          block
          color="primary"
          elevation="0"
          rounded
          class="py-6"
        >
          Add new bean
        </v-btn>
      </v-sheet>
    </v-dialog>
    <h1 class="mb-8">My shop</h1>
    <div v-if="beans">
      <h3 class="mb-4">My coffee beans</h3>
      <div>
        <div v-if="beans.length === 0" class="pa-4 grey lighten-4 rounded-lg">
          <h4>Your shop has no coffee beans at the moment.</h4>
        </div>
        <div v-else>
          <div
            v-for="(bean, i) in beans"
            :key="i"
            class="rounded-lg grey lighten-3 pa-4 mb-4"
          >
            <router-link :to="`bean?bean=${serialize(bean)}`">
              <p class="text-h6">{{ bean.name }}</p>
              <p v-if="!!bean.description">
                {{ bean.description }}
              </p>
            </router-link>
          </div>
        </div>
      </div>
      <v-btn
        color="primary"
        elevation="0"
        class="py-6 px-4 mt-4"
        rounded
        @click="addBeanDialog = true"
      >
        Add a coffee bean
      </v-btn>
    </div>
    <v-btn color="error" @click="signOut()">Sign out</v-btn>
  </div>
</template>

<script>
export default {
  name: "ShopHome",
  data() {
    return {
      beans: null,
      addBeanDialog: false,
      newBean: {
        name: "",
        allSpecies: ["Arabica", "Robusta", "Liberica"],
        specie: "",
        description: "",
        origin: "",
        roastingLevel: 0,
        price: 0,
      },
    };
  },
  mounted() {
    setTimeout(this.getBeans, 500);
  },
  computed: {
    canAddNewBean() {
      const { name, description, specie, origin, roastingLevel, price } =
        this.newBean;
      return (
        name.length > 0 &&
          description.length > 0 &&
          specie.length > 0 &&
          origin.length > 0 &&
          roastingLevel > 0,
        price > 0
      );
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      this.$store.commit("clearLocation")
      this.$router.replace("/");
    },
    getBeans() {
      this.$http.get("/coffeebeans").then((res) => {
        this.beans = res.data;
      });
    },
    serialize(bean) {
      return JSON.stringify(bean);
    },
    addNewBean() {
      const { name, description, specie, origin, roastingLevel, price } =
        this.newBean;
      this.$http
        .post("/coffeebeans/create", {
          name,
          description,
          specie,
          origin,
          roastingLevel,
          price,
        })
        .then((res) => {
          this.beans.push(res.data);
          alert("Coffee bean added successfully!");
          this.newBean.name = "";
          this.newBean.description = "";
          this.newBean.specie = "";
          this.newBean.origin = "";
          this.newBean.roastingLevel = 0;
          this.newBean.price = 0;

          this.addBeanDialog = false;
        });
    },
  },
};
</script>