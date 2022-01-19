<template>
  <div>
    <div class="mt-5">
      <v-card class="ma-5 mt-8" elevation="7" outlined>
        <v-system-bar height="5" color="red accent-4" dark>
          <v-spacer></v-spacer>
        </v-system-bar>
        <v-container class="grey lighten-5">
          <v-list-item-title class="text-h5 mb-4 font-weight-black">
            คิวลานจอดรถ
          </v-list-item-title>

          <v-card-actions class="mb-n10 ml-n5">
            <!-- <v-col cols="2" sm="6">
              <v-select :items="items" label="ลานที่" dense solo></v-select>
            </v-col>
            <v-col cols="6" sm="4" md="4">
              <v-text-field
                v-model="search"
                label="ค้นหาตามแถว"
                placeholder="Placeholder"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <div class="mb-7 ml-n2">
              <v-btn color="deep-red accent-4" dark @click.prevent="Search()">
                <v-icon>mdi-card-search-outline</v-icon>
              </v-btn>
            </div> -->

            <div class="mb-2">
              <v-row
                class="d-flex flex-row pb-10"
                :color="
                  $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'
                "
                flat
                tile
              >
                <v-select
                  v-model="pomq"
                  :items="items"
                  label="ลานที่"
                  class="ml-lg-6 ml-6 mb-n4"
                  dense
                  solo
                ></v-select>
                <v-text-field
                  v-model="search"
                  class="ml-lg-2 ml-6 mb-n5"
                  label="ค้นหาตามแถว"
                  placeholder="ค้นหาตามแถว"
                  outlined
                  dense
                ></v-text-field>
                <v-btn
                  class="ml-lg-3 ml-6 mb-6"
                  color="deep-red accent-4"
                  dense
                  dark
                  @click.prevent="Search()"
                >
                  <v-icon>mdi-card-search-outline</v-icon>
                </v-btn>
              </v-row>
            </div>
          </v-card-actions>
          <v-data-table
            :headers="headers"
            :items="itemsWithIndex"
            :hide-default-header="false"
            :hide-default-footer="true"
            :disable-sort="true"
            absolute
            class="elevation-1 mt-n16"
          >
            <template v-slot:[`item.createdate`]="{ item }">
              {{ getConvertDate(item.createdate) }}
            </template>
            <template v-slot:[`item.carin`]="{ item }">
              <v-icon :color="'green'">{{ getCarinstatus(item.carin) }}</v-icon>
            </template>
            <template v-slot:no-data>
              <v-alert class="mt-2" :value="true" color="error">
                ไม่พบข้อมูล
              </v-alert>
            </template>
          </v-data-table>
          <div>
            <v-row justify="end" class="ml-2 mt-1 mb-1">
              <v-pagination
                v-model="page"
                :length="this.parkingtotalpage"
                :total-visible="10"
                @input="next"
              ></v-pagination>
            </v-row>
          </div>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LocalStorageService from "../../service/localStorageService";
import moment from "moment-timezone";

export default {
  data: () => ({
    pomq: "",
    items: ["2", "3", "4", "5"],
    search: "",
    page: 1,
    totalpage: 0,
    headers: [
      {
        text: "ทะเบียนรถ",
        align: "start",
        value: "carid",
      },
      { text: "สถานะจอดรถ", align: "center", value: "carin" },
      { text: "วันเวลาที่ออกจากลาน", align: "center", value: "createdate" },
      { text: "แถวที่จอด", align: "center", value: "rowsnum" },
    ],
  }),
  computed: {
    ...mapGetters("parkinglot", [
      "parkinglotlist",
      "parkingtotalpage",
      "parkingtotallist",
    ]),
    itemsWithIndex() {
      return this.parkinglotlist.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  watch: {
    pomq: function (val, oldval) {
      console.log(val);
      let data = {
        page: 1,
        size: 5,
        search: this.search == "" ? "''" : this.search,
        searchbypom: val == "" ? "''" : val,
        orderby: "createdate",
        orderdir: "ASC",
      };
      console.log(data);
      this.loadparkinglottransction(data)
        .then((res) => {})
        .catch((error) => {
          this.setSnackbar({
            color: "error",
            showing: true,
            timeout: 2000,
            text: `${error}`,
          });
        });
    },
  },
  created() {
    this.cleardata();
  },
  methods: {
    async Search() {
      console.log("this.search", this.search);
      let data = {
        page: 1,
        size: 5,
        search: this.search == "" ? "''" : this.search,
        searchbypom: this.pomq == "" ? "''" : this.pomq,
        orderby: "createdate",
        orderdir: "ASC",
      };
      this.loadparkinglottransction(data)
        .then((res) => {})
        .catch((error) => {
          this.setSnackbar({
            color: "error",
            showing: true,
            timeout: 2000,
            text: `${error}`,
          });
        });
    },
    getCarinstatus() {
      return "mdi-shield-check";
    },
    getConvertDate: function (date) {
      if (date) {
        return moment(date).utc().format("DD-MM-YYYY HH:mm:ss");
      }
    },
    async next(page) {
      console.log(page);
      let data = {
        page: page,
        size: 5,
        search: this.search == "" ? "''" : this.search,
        searchbypom: this.pomq == "" ? "''" : this.pomq,
        orderby: "createdate",
        orderdir: "ASC",
      };
      this.loadparkinglottransction(data)
        .then((res) => {})
        .catch((error) => {
          this.setSnackbar({
            color: "error",
            showing: true,
            timeout: 2000,
            text: `${error}`,
          });
        });
    },
    ...mapActions("carregister", ["loadbranchbyid"]),
    ...mapActions("snackbar", ["setSnackbar"]),
    ...mapActions("test", ["loadpaginationtest"]),
    ...mapActions("parkinglot", ["loadparkinglottransction", "cleardata"]),
  },
};
</script>

<style>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-weight: bold;
  font-size: 19px;
}
</style>
