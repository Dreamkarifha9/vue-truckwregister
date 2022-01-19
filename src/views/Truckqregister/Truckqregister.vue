<template>
  <div>
    <v-banner single-line>
      <v-icon slot="icon" color="warning" size="36">
        mdi-checkbox-marked-circle-outline
      </v-icon>
      <span class="font-weight-black"> ลงทะเบียนคิว </span>

      <template v-slot:actions>
        <v-btn text-h1 font-weight-black class="ma-2 red accent-4" dark>
          สถานะการบันทึก : {{ formTitle }}
        </v-btn>
      </template>
    </v-banner>
    <div class="mt-5">
      <v-card class="ma-5 mt-8" elevation="7" outlined>
        <v-system-bar height="5" color="red accent-4" dark>
          <v-spacer></v-spacer>
        </v-system-bar>
        <v-container class="grey lighten-5">
          <v-list-item-title class="text-h5 mb-1 font-weight-black">
            ข้อมูลคิว1
          </v-list-item-title>
          <v-form ref="form">
            <v-row no-gutters>
              <v-flex xs12 sm6 md2 pa-1>
                <v-select
                  v-model="editedItem.groupcartypeid"
                  :items="truckcartypelist"
                  item-text="CartypeName"
                  item-value="CarTypeId"
                  label="ประเภทรถ"
                  :rules="[
                    () => !!editedItem.groupcartypeid || '*กรุณาเลือกประเภทรถ',
                  ]"
                  persistent-hint
                  return-object
                  single-line
                  outlined
                  @change="SerachLastRfidbycartype()"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  ref="qrfid"
                  v-model="editedItem.qrfid"
                  label="RFID"
                  :rules="[() => !!editedItem.qrfid || '*กรอก RFID']"
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  v-model="editedItem.groupq"
                  label="ลำดับคิวที่"
                  :rules="[() => !!editedItem.groupq || '*กรอก ลำดับคิวที่']"
                  outlined
                  disabled
                ></v-text-field>
              </v-flex>
            </v-row>
          </v-form>
          <v-card-actions>
            <v-btn
              class="green accent-4"
              color="success"
              @click.prevent="TruckQRegisterHandlerSubmit()"
            >
              <v-icon>mdi mdi-content-save</v-icon>
              <span class="pl-2"> บันทึก </span>
            </v-btn>

            <!-- <div class="my-2 ml-2">
              <v-btn color="warning" dark @click.prevent="Print()">
                <v-icon>mdi-printer</v-icon>
              </v-btn>
            </div> -->
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LocalStorageService from "../../service/localStorageService";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew Bold.ttf",
    italics: "THSarabunNew Italic.ttf",
    bolditalics: "THSarabunNew BoldItalic.ttf",
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

export default {
  data: () => ({
    errorMessages: null,
    statusform: "เพิ่ม",
    editedIndex: -1,
    editedItem: {
      groupid: null,
      groupcartypeid: null,
      groupq: null,
      qrfid: null,
      caneyear: null,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่ม" : "แก้ไข";
    },
    ...mapGetters("carregister", ["carregister", "cotalist"]),
    ...mapGetters("truckcartype", ["truckcartypelist"]),
  },
  created() {
    document.title = this.$route.meta.title;

    this.loadtruckcartype(this.editedItem.carid).catch((error) => {
      this.editedIndex = -1;
      this.setSnackbar({
        color: "error",
        showing: true,
        timeout: 2000,
        text: `${error}`,
      });
    });
  },
  methods: {
    async SerachLastRfidbycartype() {
      // Return today's date and time
      var currentTime = new Date();
      var startcaneyear = currentTime.getFullYear() + 543;
      var endcaneyear = currentTime.getFullYear() + 544;
      var data = {
        cartypeid: this.editedItem.groupcartypeid.CarTypeId,
        startcaneyear: startcaneyear,
        endcaneyear: endcaneyear,
      };
      console.log("datasearge", data);
      this.loadtruckqlastrfidbycartype(data)
        .then((_) => {
          console.log("data", _);
          this.editedItem.groupid = _.GroupId;
          this.editedItem.groupq = _.GroupQ;
          this.editedItem.caneyear = startcaneyear + "/" + endcaneyear;
          this.$refs.qrfid.focus();
        })
        .catch((error) => {
          this.clearItem();
          this.setSnackbar({
            color: "error",
            showing: true,
            timeout: 2000,
            text: `${error}`,
          });
        });
    },
    async TruckQRegisterHandlerSubmit() {
      const isvalid = this.$refs.form.validate();

      if (!isvalid) {
        return;
      }
      // this.$refs.form.validate();
      // addd
      const current = new Date();
      if (this.editedIndex == -1) {
        const formData = {
          qrfid: this.editedItem.qrfid,
          groupid: this.editedItem.groupid,
        };
        await this.updatetruckqgroup(formData)
          .then((_) => {
            this.clearItem();
            this.setSnackbar({
              color: "dark",
              showing: true,
              timeout: 2000,
              text: `บันทึกข้อมูลสำเร็จ`,
            });
            // this.Print(formData);
          })
          .catch((error) => {
            this.setSnackbar({
              color: "error",
              showing: true,
              timeout: 2000,
              text: `${error}`,
            });
          });
      }
    },
    async clearItem() {
      this.editedItem.groupq = "";
      this.editedItem.qrfid = "";
      this.editedItem.groupcartypeid = "";
      this.$refs.form.resetValidation();
    },

    async Print(valprint) {
      const filtercartype_ = this.cartype.filter((cartype) => {
        return cartype.id == valprint.typecar;
      });
      const docDefinition = {
        content: [
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: "auto",
                text: "ทะเบียนรถ:",
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                text: `${valprint.carid}`,
              },
            ],
            // optional space between columns
            columnGap: 10,
          },
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: "auto",
                text: "ชนิดรถ:",
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                text: `${filtercartype_[0].value}`,
              },
            ],
            // optional space between columns
            columnGap: 10,
          },
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: "auto",
                text: "ชื่อ:",
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                text: `${valprint.perfix} ${valprint.firstname} ${valprint.lastname}`,
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                qr: "text in QR",
                fit: "50",
                alignment: "left",
                margin: [-150, 0, 0, 0],
              },
            ],
            // optional space between columns
            columnGap: 10,
          },
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: "auto",
                text: "เบอร์โทร:",
                margin: [0, -25, 0, 0],
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                text: `${valprint.tel}`,
                margin: [0, -25, 0, 0],
              },
            ],
            // optional space between columns
            columnGap: 10,
          },
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: "auto",
                text: "เลขกาด:",
                margin: [0, -10, 0, 0],
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                text: `${valprint.rfid}`,
                margin: [0, -10, 0, 0],
              },
            ],
            // optional space between columns
            columnGap: 10,
          },
        ],
        info: {
          title: "พิมบัตรประจำรถ",
        },
        pageSize: "A4",
        // by default we use portrait, you can change it to landscape if you wish

        pageOrientation: "portrait",
        defaultStyle: {
          font: "THSarabunNew",
          fontSize: 14,
          bold: true,
        },
      };
      pdfMake.createPdf(docDefinition).print();
    },
    ...mapActions("snackbar", ["setSnackbar"]),
    ...mapActions("truckcartype", ["loadtruckcartype"]),
    ...mapActions("truckqgroup", [
      "loadtruckqlastrfidbycartype",
      "updatetruckqgroup",
    ]),
  },
};
</script>

<style></style>
