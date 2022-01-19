import decode from "jwt-decode";
import router from "../../router";
import {NestJSAPI} from "../../service/axios";

export default {
  async loadpaginationtest ({ commit, dispatch }, data) {
    return  new Promise((resolve, reject) => {
      NestJSAPI
      .get(`/users?page=${data.page}&limit=${data.limit}`)
        .then(({ data, status }) => {
   
          if (!data.data) {
           console.log('inn')
           reject(data.error);
           return
          }
        commit("SET_PAGINATION", data);
        resolve(data);
      })
       .catch(error => {
        reject(error)
      });
    });
  },
};
