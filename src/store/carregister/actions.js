import decode from "jwt-decode";
import router from "../../router";
import {mainAxios} from "../../service/axios";

export default {
  async loadcarregisterCarjoinid ({ commit, dispatch }, carjoin) {
    return  new Promise((resolve, reject) => {
     mainAxios
      .get(`/TruckCarJoinDetail?id=${carjoin}`)
       .then(({ data }) => {
         if (!data.success) {

           reject(data.message);
           return
         }
        commit("SET_CARJOIN", data.data);
        resolve(data.data[0]);
      })
       .catch(error => {
        let data = [];
        commit("SET_CARJOIN", data);
         reject(error)
      });
    });
  },
  async clearcarjoin ({ commit }) {
    commit("SET_CLEARCARJOIN")
  },
  async loadcarregister ({ commit, dispatch }, carid) {
    return  new Promise((resolve, reject) => {
     mainAxios
      .get(`/truckregister?id=${carid}`)
       .then(({ data }) => {
         if (!data.success) {

           reject(data.message);
           return
         }
        commit("SET_CARREGISTER", data.data);
        resolve(data.data[0]);
      })
       .catch(error => {
        let data = [];
        commit("SET_CARREGISTER", data);
         reject(error)
      });
    });
  },
  async clearcarregister ({commit}) {
    commit("SET_CLEARCARREGISTER");
  },
  async loadcotabyid ({ commit, dispatch }, cotaid) {
    return  new Promise((resolve, reject) => {
      mainAxios
       .get(`/customerdetail?id=${cotaid}`)
        .then(({ data }) => {
          if (!data.success) {
  
            reject(data.message);
            return
          }
         commit("SET_COTALIST", data.data);
         resolve(data.data[0]);
       })
        .catch(error => {
         reject(error)
       });
     });
  },
  async clearcotalist ({ commit }) {
    commit("SET_CLEARCOTALIST")
  },
  async deletecarregister ({ commit, dispatch }, data) {
    console.log('data', data)
    return new Promise((resolve, reject) => {
      mainAxios
       .delete(`/truckregister?carid=${data.carid}`)
        .then(({ data }) => {
          if (!data.success) {
            reject(data.message);
            return
          }
         resolve(data.success);
       })
        .catch(error => {
         reject(error)
       });
     });
  },
  async loadbranchbyid ({ commit, dispatch }, branchid) {
    return  new Promise((resolve, reject) => {
      mainAxios
       .get(`/truckregisterbranch?id=${branchid}`)
        .then(({ data }) => {
          if (!data.success) {
            reject(data.message);
            return
          }
         commit("SET_BRANCHCARREGISTER", data.data);
         resolve(data.data[0]);
       })
        .catch(error => {
         reject(error)
       });
     });
  },
  async createcarregister ({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      mainAxios
        .post(`/truckregister`, data)
        .then(({ data }) => {
    
          if (data.success) {
            resolve(data.message);
          } else {
            reject(data.message)
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async updatecarregister ({ commit, dispatch }, data) {

    return new Promise((resolve, reject) => {
      mainAxios
        .put(`/truckregister`, data)
        .then(({ data }) => {
   
          if (data.success) {
            resolve(data.message);
          } else {
            reject(data.message)
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
