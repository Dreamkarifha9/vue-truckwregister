<template>
  <div>
    <v-banner single-line>
      <v-icon slot="icon" color="warning" size="36">
        mdi-checkbox-marked-circle-outline
      </v-icon>
      <span class="font-weight-black"> ลงทะเบียนบัตรประจำรถ </span>

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
            ข้อมูลประจำรถ
          </v-list-item-title>
          <v-form ref="form">
            <v-row no-gutters>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  ref="carofid"
                  v-model="editedItem.carid"
                  v-mask="maskcarid"
                  label="ทะเบียนรถ"
                  :rules="[() => !!editedItem.carid || '*กรอกทะเบียนรถ']"
                  outlined
                  @keydown.enter="SerachCarid()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  ref="rfid"
                  v-model="editedItem.rfid"
                  label="RFID"
                  :rules="[() => !!editedItem.rfid || '*กรอก RFID']"
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  v-model="editedItem.cota"
                  label="รหัสโควต้า"
                  :rules="[() => !!editedItem.cota || '*กรอก รหัสโควต้า']"
                  outlined
                  @keydown.enter="SerachCotaid()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-select
                  v-model="editedItem.perfix"
                  :items="perfix"
                  item-text="value"
                  item-value="value"
                  label="คำนำหน้า"
                  persistent-hint
                  return-object
                  single-line
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  v-model="editedItem.firstname"
                  label="ชื่อ"
                  :rules="[() => !!editedItem.firstname || '*กรอกชื่อ']"
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  v-model="editedItem.lastname"
                  label="นามสกุล"
                  :rules="[() => !!editedItem.lastname || '*กรอกนามสกุล']"
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 pa-1>
                <v-text-field
                  v-model="editedItem.taxidcard"
                  label="รหัสประชาชน"
                  :rules="[() => !!editedItem.taxidcard || '*กรอกรหัสประชาชน']"
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md2 pa-1>
                <v-select
                  v-model="editedItem.typecar"
                  :items="cartype"
                  item-text="value"
                  item-value="id"
                  label="ประเภทรถ"
                  :rules="[() => !!editedItem.typecar || '*กรุณาเลือกประเภทรถ']"
                  persistent-hint
                  return-object
                  single-line
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md2 pa-1>
                <v-select
                  v-model="editedItem.truckzone"
                  :items="zonetype"
                  item-text="value"
                  item-value="id"
                  label="โซนใน-นอก"
                  :rules="[() => !!editedItem.truckzone || '*กรุณาเลือกโซน']"
                  persistent-hint
                  return-object
                  single-line
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md2 pa-1>
                <v-text-field
                  v-model="editedItem.tel"
                  v-mask="masktel"
                  label="เบอร์โทร"
                  :rules="[() => !!editedItem.tel || '*กรอก เบอร์โทร']"
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md2 pa-1>
                <v-text-field
                  v-model="editedItem.tel2"
                  v-mask="masktel"
                  label="เบอร์โทร2"
                  outlined
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4 class="flex row ml-2">
                <v-checkbox
                  v-model="statuscard"
                  :rules="[() => !!statuscard || '*']"
                  :label="`สถานะการใช้งาน`"
                ></v-checkbox>
              </v-flex>
            </v-row>
          </v-form>
          <v-card-actions>
            <v-btn
              class="green accent-4"
              color="success"
              @click.prevent="CarRegisterHandlerSubmit()"
            >
              <v-icon>mdi mdi-content-save</v-icon>
              <span class="pl-2"> บันทึก </span>
            </v-btn>

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
import moment from "moment-timezone";

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
    maskcarid: ["XX.XX-XX##"],
    masktel: [
      "",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    myInputModel: "",
    textcaridRules: [
      (v) => !!v || "กรุณากรอกข้อมูล",
      (v) => (v && v.length >= 1) || "ต้องมีค่ามากกว่า1ตัวอักษร",
    ],
    textrfidRules: [
      (v) => !!v || "กรุณากรอกข้อมูล",
      (v) => (v && v.length >= 1) || "ต้องมีค่ามากกว่า1ตัวอักษร",
    ],
    perfix: [
      { value: "นาย" },
      { value: "นาง" },
      { value: "นางสาว" },
      { value: "น.ส." },
    ],
    cartype: [
      { id: 4, value: "รถ อีแต๋น" },
      { id: 6, value: "รถ 6 ล้อ" },
      { id: 8, value: "พ่วงลูก" },
      { id: 10, value: "รถ 10 ล้อ" },
      { id: 12, value: "รถ 12 ล้อ" },
      { id: 18, value: "รถ 18 ล้อ" },
      { id: 22, value: "รถ 22 ล้อ" },
    ],
    zonetype: [
      { id: 1, value: "โซนใน" },
      { id: 2, value: "ทางไกล" },
      { id: 3, value: "รถตัดอ้อย" },
      { id: 4, value: "บัตรพิเศษ" },
      { id: 5, value: "รถร่วม" },
    ],
    perfixselected: "",
    cartypeselected: "",
    errorMessages: null,
    statusform: "เพิ่ม",
    editedIndex: -1,
    editedItem: {
      rfid: null,
      cota: null,
      carid: null,
      perfix: null,
      firstname: null,
      lastname: null,
      taxidcard: null,
      typecar: null,
      truckzone: null,
      tel: null,
      tel2: null,
      branchode: null,
    },
    statuscard: true,
    Str: "",
    findstatusform_: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่ม" : "แก้ไข";
    },
    ...mapGetters("carregister", ["carregister", "cotalist"]),
  },
  watch: {
    "editedItem.rfid": function (val, oldval) {
      if (val == null || val == undefined || val.length == 0) {
        this.Str = "";
      } else {
        switch (val.substr(-1, 1)) {
          case "ๅ":
            this.Str = this.Str + "1";
            break;
          case "/":
            this.Str = this.Str + "2";
            break;
          case "-":
            this.Str = this.Str + "3";
            break;
          case "ภ":
            this.Str = this.Str + "4";
            break;
          case "ถ":
            this.Str = this.Str + "5";
            break;
          case "ุ":
            this.Str = this.Str + "6";
            break;
          case "ึ":
            this.Str = this.Str + "7";
            break;
          case "ค":
            this.Str = this.Str + "8";
            break;
          case "ต":
            this.Str = this.Str + "9";
            break;
          case "จ":
            this.Str = this.Str + "0";
            break;
          default:
        }
        this.Str.length == 0
          ? this.editedItem.rfid
          : (this.editedItem.rfid = this.Str);
      }
    },
    cartypeselected(val) {
      if (val != null) {
        this.editedItem.typecar = val.id;
      }
    },
    perfixselected(val) {
      if (val != null) {
        this.editedItem.perfix = val.value;
      }
    },
  },
  mounted() {
    this.$refs.carofid.focus();
  },
  created() {
    document.title = this.$route.meta.title;
  },
  methods: {
    async SerachCotaid() {
      console.log("this.editedItem.cota.length", this.editedItem.cota.length);
      if (this.editedItem.cota.length == 5) {
        this.loadcarregisterCarjoinid(this.editedItem.cota)
          .then((value) => {
            this.editedItem.taxidcard = "";
            this.editedItem.tel = "";

            console.log("valuecarjoin", value);

            const pattrent = "นาง";
            const pattrent1 = "นาย";
            const pattrent2 = "น.ส.";
            const pattrent3 = "นางสาว";
            const result = value.CarJoinName.includes(pattrent);
            const result1 = value.CarJoinName.includes(pattrent1);
            const result2 = value.CarJoinName.includes(pattrent2);
            const result3 = value.CarJoinName.includes(pattrent3);

            console.log("result", result);
            console.log("result1", result1);
            console.log("result2", result2);
            console.log("result3", result3);
            let re_;
            if (result) {
              re_ = value.CarJoinName.substring(
                3,
                value.CarJoinName.length
              ).split(" ");
              console.log("re_", re_);
              this.editedItem.perfix = pattrent;
              this.editedItem.firstname = re_[0] === "" ? re_[1] : re_[0];
              this.editedItem.lastname = re_.length === 3 ? re_[2] : re_[1];
              this.editedItem.taxidcard = value.TaxID;
            }

            if (result1) {
              re_ = value.CarJoinName.substring(
                3,
                value.CarJoinName.length
              ).split(" ");
              this.editedItem.perfix = pattrent1;
              this.editedItem.firstname = re_[0] === "" ? re_[1] : re_[0];
              this.editedItem.lastname = re_.length === 3 ? re_[2] : re_[1];
              this.editedItem.taxidcard = value.TaxID;
            }

            if (result2) {
              console.log("Inn", value.CarJoinName);
              re_ = value.CarJoinName.substring(
                4,
                value.CarJoinName.length
              ).split(" ");

              console.log("re_", re_);
              this.editedItem.perfix = pattrent2;
              this.editedItem.firstname = re_[0] === "" ? re_[1] : re_[0];
              this.editedItem.lastname = re_.length === 3 ? re_[2] : re_[1];
              this.editedItem.taxidcard = value.TaxID;
            }

            if (result3) {
              re_ = value.CarJoinName.substring(
                3,
                value.CarJoinName.length
              ).split(" ");
              this.editedItem.perfix = pattrent3;
              this.editedItem.firstname = re_[0] === "" ? re_[1] : re_[0];
              this.editedItem.lastname = re_.length === 3 ? re_[2] : re_[1];
              this.editedItem.taxidcard = value.TaxID;
            }
          })
          .catch((error) => {
            console.log("error carjoin");
            this.clearItem();
            this.setSnackbar({
              color: "error",
              showing: true,
              timeout: 2000,
              text: `${error} รหัสรถร่วมกรุณาติดต่อบัญชีเกษตร`,
            });
          });
      } else {
        this.loadcotabyid(this.editedItem.cota)
          .then((_) => {
            console.log("_", _);
            this.editedItem.perfix = this.cotalist[0].Prefix;
            // this.editedItem.tel = this.cotalist[0].MobileNo;
            this.editedItem.firstname = this.cotalist[0].FName;
            this.editedItem.lastname = this.cotalist[0].LName;
            this.editedItem.taxidcard = this.cotalist[0].NationalId;
          })
          .catch((error) => {
            this.clearItem();
            this.setSnackbar({
              color: "error",
              showing: true,
              timeout: 2000,
              text: `${error} โควต้าในระบบ`,
            });
          });
      }
    },
    async SerachCarid() {
      // ค้นหาก่อนว่ามีทะเบียนรถอยู่ในระบบหรือไม่ถ้ามีแสดงว่าเป็นการแก้ไข
      this.loadcarregister(this.editedItem.carid)
        .then((_) => {
          // แก้ไขข้อมูล
          this.editedIndex = this.carregister
            .map((e) => {
              return e.carid;
            })
            .indexOf(this.editedItem.carid);
          console.log("edit");

          this.editedItem = Object.assign({}, this.carregister[0]);
          console.log("this.editedIndex", this.editedIndex);
          console.log("findstatusform_", this.findstatusform_);
        })
        .catch((error) => {
          // กรณี หาไม่เจอ ให้ค้นหาด้วยเลขทะเบียน
          if (this.editedIndex == -1) {
            console.log("adasd");
            const data = {
              carid: this.editedItem.carid,
            };
            this.loadtruckregistertempcarid(data)
              .then(async (result) => {
                console.log("result", result);
                this.editedItem.cota = result.cota;
                this.editedItem.typecar = Number(result.cartype);
                this.editedItem.truckzone = Number(result.truckzone);
                this.editedItem.tel = result.tel;
                // / ค้นหาด้วยโควต้าต่อเลย
                await this.SerachCotaid();
                this.$refs.rfid.focus();
              })
              .catch((error) => {
                console.log("error");
                this.editedIndex = -1;
                this.clearItem();
                this.setSnackbar({
                  color: "error",
                  showing: true,
                  timeout: 2000,
                  text: `${error} ฐานตั่งต้นที่รวบรวมใหบัญชีเกษตร`,
                });
              });
          }
        });
    },

    async CarRegisterHandlerSubmit() {
      const isvalid = this.$refs.form.validate();

      if (!isvalid) {
        return;
      }
      // this.$refs.form.validate();
      // addd
      const current = new Date();
      if (this.editedIndex == -1) {
        const formData = {
          rfid: this.editedItem.rfid,
          cota: this.editedItem.cota,
          carid: this.editedItem.carid,
          perfix:
            this.editedItem.perfix.value == null || undefined
              ? this.editedItem.perfix
              : this.editedItem.perfix.value,
          firstname: this.editedItem.firstname,
          lastname: this.editedItem.lastname,
          taxidcard: this.editedItem.taxidcard,
          typecar:
            this.editedItem.typecar.id == null || undefined
              ? this.editedItem.typecar
              : this.editedItem.typecar.id,
          truckzone:
            this.editedItem.truckzone.id == null || undefined
              ? this.editedItem.truckzone
              : this.editedItem.truckzone.id,
          tel: this.editedItem.tel,
          tel2: this.editedItem.tel2,
          statuscard: this.statuscard,
          branchcode: LocalStorageService.getUsernames().LoginBranchCode,
          createby: LocalStorageService.getUsernames().LoginEmpId,
          dateregister: new Date().toISOString(),
          lastusedate: new Date().toISOString(),
        };
        await this.createcarregister(formData)
          .then((_) => {
            this.clearItem();
            this.setSnackbar({
              color: "dark",
              showing: true,
              timeout: 2000,
              text: `บันทึกข้อมูลสำเร็จ`,
            });
          })
          .catch((error) => {
            this.setSnackbar({
              color: "error",
              showing: true,
              timeout: 2000,
              text: `${error}`,
            });
          });
        await this.Print(formData);
      } else {
        //edit
        const formData = {
          rfid: this.editedItem.rfid,
          cota: this.editedItem.cota,
          carid: this.editedItem.carid,
          perfix:
            this.editedItem.perfix.value == null || undefined
              ? this.editedItem.perfix
              : this.editedItem.perfix.value,
          firstname: this.editedItem.firstname,
          lastname: this.editedItem.lastname,
          taxidcard: this.editedItem.taxidcard,
          typecar:
            this.editedItem.typecar.id == undefined
              ? this.editedItem.typecar
              : this.editedItem.typecar.id,
          truckzone:
            this.editedItem.truckzone.id == undefined
              ? this.editedItem.truckzone
              : this.editedItem.truckzone.id,
          tel: this.editedItem.tel,
          tel2: this.editedItem.tel2,
          statuscard: this.statuscard,
          branchcode: LocalStorageService.getUsernames().LoginBranchCode,
          updateby: LocalStorageService.getUsernames().LoginEmpId,

          dateregister: new Date().toISOString(),
          lastusedate: new Date().toISOString(),
        };

        await this.updatecarregister(formData)
          .then((_) => {
            this.clearItem();
            this.setSnackbar({
              color: "dark",
              showing: true,
              timeout: 2000,
              text: `บันทึกข้อมูลสำเร็จ`,
            });
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
      this.cartypeselected = "";
      this.perfixselected = "";
      this.editedItem = Object.assign({});
      this.editedItem.tel = null;
      this.editedItem.tel2 = null;
      this.Str = "";
      this.editedIndex = -1;
      this.$refs.form.resetValidation();
      this.statuscard = true;
      this.$refs.carofid.focus();
    },
    async Print(valprint) {
      console.log("valprint", valprint);
      console.log("this.editedIndex", this.editedIndex);
      if (this.editedIndex == 0) {
        const filtercartype_ = this.cartype.filter((cartype) => {
          return cartype.id == this.carregister[0].typecar;
        });

        const filterzonetype_ = this.zonetype.filter((zonetype) => {
          return zonetype.id == this.carregister[0].truckzone;
        });

        console.log("filtercartype_", filtercartype_);
        console.log("filterzonetype_", filterzonetype_);

        let marginInPoints = (5.41 / 2.54) * 72;
        let marginInPoints1 = (8.59 / 2.54) * 72;

        let dd = {
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
                  fit: "60",
                  alignment: "right",
                  margin: [10, 48, 7, 0],
                },
                {
                  stack: [
                    {
                      text: `${data.carid} ${cartype}  QRCODE`,
                      margin: [20, -70, 0, 0],
                      fontSize: 22,
                    },
                    {
                      text: `${data.perfix} ${data.firstname} ${data.lastname}`,
                      margin: [20, -3, 0, 0],
                    },
                    {
                      text: `โทร ${data.tel}`,
                      margin: [20, -3, 0, 0],
                    },
                    {
                      text: `เลขการ์ด ${data.rfid}`,
                      margin: [20, -3, 0, 0],
                      // pageBreak: "after",
                    },
                    {
                      text: `บัตรประจำรถ    บริษัทอุตสาหกรรมโคราช`,
                      margin: [20, 17, 0, 0],
                      // pageBreak: "after",
                    },
                  ],
                },
              ],
            ],
          };
        };
        console.log("this.carregister.length", this.carregister.length);
        let paso;
        for (paso = 0; paso < this.carregister.length; paso++) {
          dd.content.push(
            arris(
              this.carregister[0],
              filtercartype_[0].value,
              filterzonetype_[0].value
            )
          );
        }
        pdfMake.createPdf(dd).print();
      } else {
        const filtercartype_ = this.cartype.filter((cartype) => {
          return cartype.id == valprint.typecar;
        });

        const filterzonetype_ = this.zonetype.filter((zonetype) => {
          return zonetype.id == valprint.truckzone;
        });

        console.log("filtercartype_", filtercartype_);
        console.log("filterzonetype_", filterzonetype_);

        let marginInPoints = (5.41 / 2.54) * 72;
        let marginInPoints1 = (8.59 / 2.54) * 72;

        let dd = {
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
                  fit: "60",
                  alignment: "right",
                  margin: [10, 48, 7, 0],
                },
                {
                  stack: [
                    {
                      text: `${data.carid} ${cartype}  QRCODE`,
                      margin: [20, -70, 0, 0],
                      fontSize: 22,
                    },
                    {
                      text: `${data.perfix} ${data.firstname} ${data.lastname}`,
                      margin: [20, -3, 0, 0],
                    },
                    {
                      text: `โทร ${data.tel}`,
                      margin: [20, -3, 0, 0],
                    },
                    {
                      text: `เลขการ์ด ${data.rfid}`,
                      margin: [20, -3, 0, 0],
                      // pageBreak: "after",
                    },
                    {
                      text: `บัตรประจำรถ    บริษัทอุตสาหกรรมโคราช`,
                      margin: [20, 17, 0, 0],
                      // pageBreak: "after",
                    },
                  ],
                },
              ],
            ],
          };
        };

        dd.content.push(
          arris(valprint, filtercartype_[0].value, filterzonetype_[0].value)
        );

        pdfMake.createPdf(dd).print();
      }
    },
    ...mapActions("carregister", [
      "loadcarregister",
      "loadcarregisterCarjoinid",
      "loadcotabyid",
      "createcarregister",
      "updatecarregister",
    ]),
    ...mapActions("snackbar", ["setSnackbar"]),
    ...mapActions("registertemp", ["loadtruckregistertempcarid"]),
  },
};
</script>

<style></style>
