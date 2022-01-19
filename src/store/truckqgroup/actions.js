import decode from "jwt-decode";
import router from "../../router";
import {NodeTruckQAPI} from "../../service/axios";

export default {
  async loadtruckqlastrfidbycartype ({ commit, dispatch }, data) {
    return  new Promise((resolve, reject) => {
      NodeTruckQAPI
      .get(`/TruckGroupQ/LastRFIDbyCartype/${data.cartypeid}/${data.startcaneyear}/${data.endcaneyear}`)
        .then(({data,status}) => {
         if (!data) {

           reject(data.error);
           return
         }
        commit("SET_TRUCKQGROUPLASTRFID", data);
        resolve(data);
      })
        .catch(error => {
        reject(error.response.data)
      });
    });
  },
  async updatetruckqgroup ({ commit, dispatch }, data) {

    return new Promise((resolve, reject) => {
      NodeTruckQAPI
        .put(`/TruckGroupQ/${data.groupid}`, data)
        .then(({ data,status }) => {
          console.log(data)
          if (status == 200) {
            resolve(data);
          } else {
            reject(data.error)
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};


