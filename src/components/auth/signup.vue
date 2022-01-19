<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-form ref="form" @submit.prevent="onSubmit()">
              <v-toolbar color="teal darken-4" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  ref="username"
                  v-model="username"
                  label="Login"
                  name="login"
                  type="text"
                  :rules="[() => !!username || '*']"
                  :error-messages="errorMessages"
                ></v-text-field>

                <v-text-field
                  ref="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  type="password"
                  :rules="[() => !!password || '*']"
                  :error-messages="errorMessages"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    username: "",
    password: "",
    errorMessages: "",
    formHasErrors: false,
  }),
  methods: {
    async onSubmit() {
      const formData = {
        username: this.username,
        password: this.password,
      };
      await this.login(formData).then((_) => {
        this.loadpermission(_.LoginId);
      });
    },
    ...mapActions("auth", ["login", "loadpermission"]),
  },
};
</script>

<style></style>
