<template>
  <div class="pa-6">
    <h3 class="mb-4">Bean details</h3>

    <v-text-field
      dense
      outlined
      v-model.trim="bean.name"
      label="Name"
      hide-details
      class="mb-2"
    />
    <v-textarea
      dense
      outlined
      v-model.trim="bean.description"
      label="Description"
      hide-details
      rows="2"
      class="mb-2"
    />
    <v-text-field
      dense
      outlined
      v-model.trim="bean.origin"
      label="Origin"
      hide-details
      class="mb-2"
    />
    <label class="font-weight-semibold mb-n2 d-block">Species</label>
    <v-radio-group v-model.trim="bean.specie">
      <v-radio
        v-for="specie in ['Arabica', 'Robusta', 'Liberica']"
        :key="specie"
        :label="specie"
        :value="specie"
      />
    </v-radio-group>
    <label class="font-weight-semibold">Roasting level</label>
    <v-slider
      hint="Im a hint"
      min="1"
      max="10"
      v-model="bean.roastingLevel"
    />
    <v-text-field
      dense
      outlined
      type="number"
      v-model="bean.price"
      min="0"
      label="Price"
      hide-details
      class="mb-4"
      prefix="CAD"
    />
    <v-btn
      @click="updateBean()"
      :disabled="!canUpdateBean"
      block
      color="primary"
      elevation="0"
      rounded
      class="py-6"
    >
      Update details
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "Bean",
  data() {
    return {
      bean: JSON.parse(this.$route.query.bean ?? "null"),
    };
  },
  computed:{
    canUpdateBean(){
      return true
    }
  },
  mounted() {
    console.log(this.bean);
    if (!this.bean) return this.$router.replace("/shop-home");
  },
  methods:{
    updateBean(){
      const {coffeeBeanId, name, description, specie, origin, roastingLevel, price} = this.bean
      this.$http.post("/coffeebeans/update", {coffeeBeanId, name, description, specie, origin, roastingLevel, price}).then(()=>{
        alert("Bean updated successfully")
        this.$router.replace("/shop-home")
      })
      .catch(err=>alert(err?.response?.data?.error ?? "Sorry, something went wrong."))
    }
  }
};
</script>