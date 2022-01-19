import decode from "jwt-decode";
import router from "../../router";
import {NodeTruckQAPI} from "../../service/axios";

export default {
  async loadtruckcartype ({ commit, dispatch }, carid) {
    return  new Promise((resolve, reject) => {
      NodeTruckQAPI
      .get(`/TruckGroupQCartype`)
        .then(({ data, status }) => {
         if (!data) {
           reject(data.error);
           return
         }
        commit("SET_TRUCKCARTYPE", data);
        resolve(data);
      })
       .catch(error => {
        reject(error)
      });
    });
  },
};
