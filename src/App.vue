<template>
  <v-app id="inspire">
    <template v-if="!$route.path.includes('Login')">
      <v-navigation-drawer v-model="drawer" app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 back--text">
              ระบบการจัดการหน้าหีบ
            </v-list-item-title>

            <v-list-item-subtitle class="text-h7 mt-1">
              รหัสพนักงาน:
              <span class="blue--text font-weight-black">
                {{ user.LoginEmpId }}
              </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-h7 mt-1">
              ชื่อ:
              <span class="blue--text font-weight-black">
                {{ user.LoginName }}
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in items"
            v-if="canpermission(item.can)"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="blue-grey darken-4" app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <!-- <v-toolbar-title>Application</v-toolbar-title> -->
        <v-spacer></v-spacer>

        <v-btn class="ma-2 red accent-4" dark @click.prevent="logout()">
          <v-icon dark left>mdi-exit-to-app</v-icon>Logout
        </v-btn>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </template>

    <signup v-if="user == null"></signup>
    <v-snackbar
      v-for="snackbar in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :bottom="true"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="snackbar.showing = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <Loader></Loader>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import signup from "./components/auth/signup";
import Loader from "./components/loader/_loader";

export default {
  components: {
    signup,
    Loader,
  },
  data: () => ({
    drawer: null,
    items: [
      {
        can: "home",
        title: "หน้าหลัก",
        icon: "mdi-view-dashboard",
        to: "/Home",
      },
      // {
      //   can: "Q-Register-Car",
      //   title: "ลงทะเบียนบัตรประจำรถ",
      //   icon: "mdi-view-dashboard",
      //   to: "/carregister",
      // },
      {
        can: "Q-Register-Print",
        title: "ปริ้นบัตรประจำรถ",
        icon: "mdi-view-dashboard",
        to: "/stickercar",
      },
      {
        can: "Q-Register",
        title: "ลงทะเบียนคิว",
        icon: "mdi-view-dashboard",
        to: "/truckqregister",
      },
      {
        can: "Q-ParkingLot",
        title: "คิวลานจอดรถ",
        icon: "mdi-view-dashboard",
        to: "/parkinglot",
      },
      {
        can: "Q-ParkingLotTransction",
        title: "คิวที่ปล่อยออกจากลาน",
        icon: "mdi-view-dashboard",
        to: "/parkinglottransction",
      },
      {
        can: "Q-PrintCaneFar",
        title: "ปริ้นบัตรขาจรทางไกล",
        icon: "mdi-view-dashboard",
        to: "/truckcanefarprint",
      },
      {
        can: "Q-Register-Car",
        title: "ลงทะเบียนบัตรประจำรถป้อมประสานงาน",
        icon: "mdi-view-dashboard",
        to: "/carregister_new",
      },
    ],
  }),

  computed: {
    ...mapState({
      snackbars: (state) => state.snackbar.snackbars,
      user: (users) => users.auth.user,
    }),
    ...mapGetters("auth", ["permission"]),
  },
  created() {
    document.title = this.$route.meta.title;
  },
  methods: {
    async logout() {
      this.logout();
    },
    canpermission(val) {
      try {
        if (val == "home") {
          return true;
        }
        if (this.permission.length === 0) {
          return false;
        }
        var findpermission = this.permission.filter((item) => {
          return item.LgGroup == val;
        });
        if (findpermission.length > 0 || val == "home") {
          return true;
        } else {
          return false;
        }
      } catch (_) {
        console.log(_);
      }
    },
    ...mapActions("auth", ["logout"]),
  },
};
</script>
