<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "Shops",
  data() {
    return {
      shops: JSON.parse(this.$route.query.shops),
    };
  },
  created() {
    if (!this.shops) {
      this.$router.replace("/");
    }
  },
  computed:{
    
  }
};
</script>