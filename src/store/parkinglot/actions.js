import decode from "jwt-decode";
import router from "../../router";
import {NodeTruckQAPI} from "../../service/axios";

export default {
  async loadparkinglotbycarid ({ commit, dispatch }, data) {
    return  new Promise((resolve, reject) => {
      NodeTruckQAPI
      .get(`/TruckQParkinglotbycarid/${data.page}/${data.size}/${data.search}/${data.searchbycarin}/${data.orderby}/${data.orderdir}`)
        .then(({ data, status }) => {
          console.log('loadparkinglot', data.records)
          if (!data) {
            commit("SET_CLEARPARKINGLOT");
           reject(data.error);
           return
         }
        commit("SET_PARKINGLOT", data);
        resolve(data);
      })
        .catch(error => {
          commit("SET_CLEARPARKINGLOT");
        reject(error)
      });
    });
  },
  async loadparkinglot ({ commit, dispatch }, data) {
    return  new Promise((resolve, reject) => {
      NodeTruckQAPI
      .get(`/TruckQParkinglot/${data.page}/${data.size}/${data.search}/${data.searchbypom}/${data.orderby}/${data.orderdir}`)
        .then(({ data, status }) => {
          console.log('loadparkinglot', data.records)
          if (!data) {
            commit("SET_CLEARPARKINGLOT");
           reject(data.error);
           return
         }
        commit("SET_PARKINGLOT", data);
        resolve(data);
      })
        .catch(error => {
          commit("SET_CLEARPARKINGLOT");
        reject(error)
      });
    });
  },
  async loadparkinglottransction ({ commit, dispatch }, data) {
    return  new Promise((resolve, reject) => {
      NodeTruckQAPI
      .get(`/TruckQParkinglottransction/${data.page}/${data.size}/${data.search}/${data.searchbypom}/${data.orderby}/${data.orderdir}`)
        .then(({ data, status }) => {
          console.log('loadparkinglot', data.records)
          if (!data) {
            commit("SET_CLEARPARKINGLOT");
           reject(data.error);
           return
         }
        commit("SET_PARKINGLOT", data);
        resolve(data);
      })
        .catch(error => {
          commit("SET_CLEARPARKINGLOT");
        reject(error)
      });
    });
  },
  async MoveParkinglotToTranscetion ({ commit, dispatch }, data) {
    return  new Promise((resolve, reject) => {
      NodeTruckQAPI
      .get(`/TruckQParkinglotmove/${data.pomq}/${data.rowsnum}`)
        .then(({ data, status }) => {
          console.log('loadparkinglot', data)
          if (!data.status) {
            commit("SET_CLEARPARKINGLOT");
           reject(data.error);
           return
         }
         commit("SET_CLEARPARKINGLOT");
        resolve(data.status);
      })
        .catch(error => {
          commit("SET_CLEARPARKINGLOT");
        reject(error)
      });
    });
  },
  async cleardata ({ commit, dispatch }) {
    commit("SET_CLEARPARKINGLOT");
  }
};
