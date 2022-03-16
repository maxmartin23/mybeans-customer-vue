<template>
  <div>
    <v-app>
      <view-container />
    </v-app>
  </div>
</template>

<script>
import ViewContainer from "@/components/ViewContainer";
export default {
  name: "App",
  components: {
    ViewContainer,
  },
};
</script>