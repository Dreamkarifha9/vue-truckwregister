<template>
  <signup></signup>
</template>

<script>
import signup from "../components/auth/signup";
export default {
  components: {
    signup,
  },

  created() {
    document.title = this.$route.meta.title;
    // this.$store.dispatch("user/logout");
  },
};
</script>

<style></style>
