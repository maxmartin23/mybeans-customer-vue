<template>
  <div style="display: none"></div>
</template>

<script>
export default {
  name: "AuthSetup",
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  watch: {
    token() {
      this.setToken();
    },
  },
  created() {
    if (this.$store.getters.getToken) this.setToken();
  },
  methods: {
    setToken() {
      console.log(this.token)
      this.$http.defaults.headers.common["Authorization"] = `${
        this.token ? "Bearer " : ""
      }${this.token ?? ""}`;
    },
  },
};
</script>