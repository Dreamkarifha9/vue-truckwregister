import decode from "jwt-decode";
import router from "../../router";
import {NodeTruckQAPI} from "../../service/axios";

export default {
  async loadtruckregistertempcarid ({ commit, dispatch }, data) {
    return  new Promise((resolve, reject) => {
      NodeTruckQAPI
      .get(`/RegistertempBycarid/${data.carid}`)
        .then(({data,status}) => {
         if (!data) {
           reject(data.error);
           return
         }
        commit("SET_REGISTERTEMPBYCARID", data);
        resolve(data);
      })
        .catch(error => {
        reject(error.response.data)
      });
    });
  },
  async clearregistertemp ({commit,dispatch}) {
    commit("SET_CLEARTEMP");
  }
};


