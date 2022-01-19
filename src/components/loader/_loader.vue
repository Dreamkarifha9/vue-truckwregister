<template>
  <v-dialog v-model="$store.state.loader" persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        โปรรอสักครู่ ...........
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
      <h1>sadas</h1>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style></style>
