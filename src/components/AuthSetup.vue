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
    const deez = this;
    this.$http.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        const errorMessage = error?.response?.data?.error;
        if (errorMessage === "Token is expired or invalid.") {
          deez.$store.dispatch("signOut");
          deez.$router.replace("/");
        }
        return Promise.reject(error);
      }
    );
  },
  methods: {
    setToken() {
      this.$http.defaults.headers.common["Authorization"] = `${
        this.token ? "Bearer " : ""
      }${this.token ?? ""}`;
    },
  },
};
</script>