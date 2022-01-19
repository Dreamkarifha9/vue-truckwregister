import decode from "jwt-decode";
import router from "../../router";
import {mainAxios,NodeTruckQAPI} from "../../service/axios";

export default {
  // getToken({ commit }, token) {

  //     const user = decode(token)

  //     commit('SET_TOKEN', token)
  //     commit('SET_USER', user)

  //     localStorage.setItem('token', token)
  //     localStorage.setItem('user', JSON.stringify(user))
  // },

  login({ commit }, authdata) {
    return new Promise((resolve, reject) => {
      mainAxios
        .get(`/login?id=${authdata.username}&pass=${authdata.password}`)
        .then(({ data, status }) => {
          console.log('datauser', data.data[0])
          if (status === 200) {
            const now = new Date();
            //clear localstorage
            localStorage.removeItem("currentyear");
            localStorage.removeItem("emp");
            localStorage.removeItem("branch");

            var currentyear = now.getFullYear();
            currentyear = currentyear + 543;


            localStorage.setItem("users", JSON.stringify(data.data[0]));

       
            commit("SET_USER", data.data[0]);
            resolve(data.data[0]);
            router.push({ name: "Home" });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  loadpermission ({ commit }, loginid) {
    return new Promise((resolve, reject) => {
      NodeTruckQAPI
        .get(`/permissionlogin/${loginid}`)
        .then(({ data, status }) => {
          console.log(data,status)
          if (status === 200) {

            localStorage.setItem("permission", JSON.stringify(data));
            commit("SET_PERMISSION", data);
            resolve(true);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logout({ commit }) {
    localStorage.removeItem("users");
    localStorage.removeItem("permission");


    commit("SET_CLEARITEM_AUTH", null);
    router.push({ name: "Login" });
  },
};
