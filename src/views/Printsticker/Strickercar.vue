<template>
  <div>
    <div class="mt-5">
      <v-card class="ma-5 mt-8" elevation="7" outlined>
        <v-system-bar height="5" color="red accent-4" dark>
          <v-spacer></v-spacer>
        </v-system-bar>
        <v-container class="grey lighten-5">
          <v-list-item-title class="text-h5 mb-1 font-weight-black">
            พิมพ์บัตรประจำรถ
          </v-list-item-title>
          <v-card-actions>
            <div class="my-2 ml-2">
              <v-btn color="warning" dark @click.prevent="Print()">
                <v-icon>mdi-printer</v-icon>
              </v-btn>
            </div>
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
    cartype: [
      { id: 1, value: "10 ล้อ" },
      { id: 2, value: "6 ล้อ" },
      { id: 3, value: "อีแต๋น" },
      { id: 4, value: "ทางไกล" },
      { id: 5, value: "รถตัดอ้อย" },
      { id: 6, value: "รถเครน" },
    ],
    zonetype: [
      { id: 1, value: "โซนใน" },
      { id: 2, value: "ทางไกล" },
    ],
  }),
  computed: {
    ...mapGetters("carregister", ["branchcarregisterlist"]),
  },
  created() {
    "loadBranchCode";
    let Branchcode_ = LocalStorageService.getUsernames().LoginBranchCode;
    this.loadbranchbyid(Branchcode_).catch((error) => {
      this.setSnackbar({
        color: "error",
        showing: true,
        timeout: 2000,
        text: `${error}`,
      });
    });
  },
  methods: {
    async Print() {
      var marginInPoints = (5.41 / 2.54) * 72;
      var marginInPoints1 = (8.59 / 2.54) * 72;

      var dd = {
        background: function () {
          return {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 120,
                w: 250,
                h: 33,
                color: "red",
              },
            ],
          };
        },
        content: [],
        pageMargins: [0, 0, 0, 0],
        info: {
          title: "พิมบัตรประจำรถ",
        },
        pageSize: {
          width: marginInPoints1,
          height: marginInPoints,
        },
        // by default we use portrait, you can change it to landscape if you wish

        pageOrientation: "landscape",
        defaultStyle: {
          font: "THSarabunNew",
          fontSize: 18,
          bold: true,
        },
      };

      let arris = (data, cartype, zonetype) => {
        return {
          columns: [
            [
              {
                qr: `${data.rfid}`,
                fit: "80",
                alignment: "right",
                margin: [10, 45, 0, 0],
              },
              {
                stack: [
                  {
                    text: `${data.carid} ชนิด ${cartype}  ${zonetype}`,
                    margin: [25, -88, 0, 0],
                    fontSize: 22,
                  },
                  {
                    text: `${data.perfix} ${data.firstname} ${data.lastname}`,
                    margin: [25, -3, 0, 0],
                  },
                  {
                    text: `โทร ${data.tel}`,
                    margin: [25, -3, 0, 0],
                  },
                  {
                    text: `เลขการ์ด ${data.rfid}`,
                    margin: [25, -3, 0, 0],
                    pageBreak: "after",
                  },
                  // {
                  //   // if you specify width, svg will scale proportionally
                  //   svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-11.75 -10.014 126 108.985" enable-background="new -11.75 -10.014 126 108.985" xml:space="preserve"><path d="M5,36.12h14.635c-1.315,1.744-2.096,3.88-2.096,6.236H7.865L5,40.365V36.12z"></path><path d="M27.962,34.727c-4.226,0-7.656,3.425-7.656,7.63c0,4.232,3.431,7.644,7.656,7.644c4.212,0,7.63-3.411,7.63-7.644  C35.592,38.151,32.174,34.727,27.962,34.727z M27.962,46.523c-2.312,0-4.187-1.861-4.187-4.167c0-2.292,1.875-4.153,4.187-4.153  c2.292,0,4.167,1.861,4.167,4.153C32.129,44.662,30.254,46.523,27.962,46.523z"></path><path d="M81.26,34.726c-4.229,0-7.66,3.43-7.66,7.63c0,4.23,3.431,7.64,7.66,7.64c4.21,0,7.641-3.41,7.641-7.64  C88.9,38.156,85.47,34.726,81.26,34.726z M81.26,46.526c-2.3,0-4.18-1.86-4.18-4.17c0-2.29,1.88-4.15,4.18-4.15  c2.29,0,4.16,1.86,4.16,4.15C85.42,44.666,83.55,46.526,81.26,46.526z"></path><path d="M99,20.841L93.461,4.18L84.73,0H67.31v36.12H36.27c1.31,1.75,2.1,3.88,2.1,6.25h32.46c0-5.75,4.67-10.4,10.43-10.4  c4.04,0,7.53,2.31,9.26,5.69c0.62,1.19,1.021,2.54,1.101,3.98c0.01,0.23,0.05,0.47,0.05,0.73H100V25L99,20.841z M72.22,20.841v-12.5  h18.461l4.16,12.5H72.22z"></path><polygon fill="none" points="72.22,20.841 72.22,8.341 90.681,8.341 94.841,20.841 "></polygon><rect x="1.5" y="0" width="63" height="33.652"></rect></svg>',
                  //   width: 50,
                  //   margin: [20, -5, 0, 0],
                  //   pageBreak: "after",
                  // },
                ],
              },
            ],
          ],
        };
      };
      var paso;
      for (paso = 0; paso < this.branchcarregisterlist.length; paso++) {
        const filtercartype_ = this.cartype.filter((cartype) => {
          return cartype.id == this.branchcarregisterlist[paso].typecar;
        });

        const filterzonetype_ = this.zonetype.filter((zonetype) => {
          return zonetype.id == this.branchcarregisterlist[paso].truckzone;
        });

        dd.content.push(
          arris(
            this.branchcarregisterlist[paso],
            filtercartype_[0].value,
            filterzonetype_[0].value
          )
        );
      }
      pdfMake.createPdf(dd).print();
    },
    ...mapActions("carregister", ["loadbranchbyid"]),
    ...mapActions("snackbar", ["setSnackbar"]),
  },
};
</script>

<style></style>
