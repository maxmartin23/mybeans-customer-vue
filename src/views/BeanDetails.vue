<template>
  <div>
    <div class="container px-16">
        <div
          class="bean-container"
          :style="`background-image: url(${$route.query.beanImage}); aspect-ratio: 21/9; background-size: cover; background-position: center; width: 100%`"
        ></div>
        <div v-if="bean" class="mt-8 pb-16">
          <h1>
            {{bean.name}}
          </h1>
          <h3 class="font-weight-medium grey--text text--darken-1">
            {{bean.price}} CAD
          </h3>
          <p class="body-1">
            {{bean.description}}
          </p>
          <p>
            Origin: {{bean.origin}}
            <br>
            Roast level: {{['', "Light", "Medium", 'Medium dark', "Dark"][bean.roastingLevel]}}
          </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeanDetails",
  data() {
    return {
      bean: null,
    };
  },
  methods: {},
  created() {
    const beanId = this.$route.params.id;
    this.$http
      .get(`/coffeebeans/details?id=${beanId}`)
      .then(({ data }) => {this.bean = data; this.bean.roastingLevel = parseInt(this.bean.roastingLevel);})
      .catch(() => {
        alert("Error loading bean details. Please try again.");
        this.$router.replace("/home");
      });
  },
};
</script>