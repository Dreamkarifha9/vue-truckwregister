<template>
  <v-container> </v-container>
</template>
<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",
  created() {
    document.title = this.$route.meta.title;
  },
};
</script>
