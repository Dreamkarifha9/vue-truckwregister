import axios from "axios";
import store from "../store";
import LocalStorageService from "../service/localStorageService";


//ประกาศ const รอไปใช้งาน
const localStorageService = LocalStorageService.getService();

axios.defaults.baseURL = process.env.VUE_APP_URL;
console.log('Inaxios')
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

//Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    store.commit("LOADER", true);
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    store.commit("LOADER", false);
    Promise.reject(error);
  }
);

// function onAccessTokenFetched(access_token) {
//   subscribers = subscribers.filter((callback) => callback(access_token));
// }

// function addSubscriber(callback) {
//   subscribers.push(callback);
// }

axios.interceptors.response.use(
  function (response) {
    store.commit("LOADER", false);
    return response;
  },
  function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 403) {
      store.commit("LOADER", false);
      Promise.reject(error.response); //ส่ง reponse object ออกไปเพื่อนำไปใช้งานต่อ
    }

    store.commit("LOADER", false);
    return Promise.reject(error);
  }
);

// MainAxios-----------------------------------------------------------------------
const mainAxios = axios.create({
  baseURL: process.env.VUE_APP_URL
});

//Add a request interceptor
mainAxios.interceptors.request.use(
  (config) => {
    store.commit("LOADER", true);
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    store.commit("LOADER", false);
    Promise.reject(error);
  }
);

// function onAccessTokenFetched(access_token) {
//   subscribers = subscribers.filter((callback) => callback(access_token));
// }

// function addSubscriber(callback) {
//   subscribers.push(callback);
// }

mainAxios.interceptors.response.use(
  function (response) {
    store.commit("LOADER", false);
    return response;
  },
  function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 403) {
      store.commit("LOADER", false);
      Promise.reject(error.response); //ส่ง reponse object ออกไปเพื่อนำไปใช้งานต่อ
    }

    store.commit("LOADER", false);
    return Promise.reject(error);
  }
);
//------------------------------------------------------------------------------------------------------------



//  -----------------------------------   NodeTruckQAPI  --------------------------------------------------------
const NodeTruckQAPI = axios.create({
    baseURL: 'http://110.164.149.110:4002/'
  //  baseURL: 'http://localhost:4002/'
  
});

//Add a request interceptor
NodeTruckQAPI.interceptors.request.use(
  (config) => {
    store.commit("LOADER", true);
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    store.commit("LOADER", false);
    Promise.reject(error);
  }
);

// function onAccessTokenFetched(access_token) {
//   subscribers = subscribers.filter((callback) => callback(access_token));
// }

// function addSubscriber(callback) {
//   subscribers.push(callback);
// }

NodeTruckQAPI.interceptors.response.use(
  function (response) {
    store.commit("LOADER", false);
    return response;
  },
  function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 403) {
      store.commit("LOADER", false);
      Promise.reject(error.response); //ส่ง reponse object ออกไปเพื่อนำไปใช้งานต่อ
    }

    store.commit("LOADER", false);
    return Promise.reject(error);
  }
);
//------------------------------------------------------------------------------------------------------------



//-----------------------------------------       NestJSAPI -----------------------------------------------------
const NestJSAPI = axios.create({
  baseURL: 'http://localhost:3000/'
});


//Add a request interceptor
NestJSAPI.interceptors.request.use(
  (config) => {
    store.commit("LOADER", true);
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    store.commit("LOADER", false);
    Promise.reject(error);
  }
);

// function onAccessTokenFetched(access_token) {
//   subscribers = subscribers.filter((callback) => callback(access_token));
// }

// function addSubscriber(callback) {
//   subscribers.push(callback);
// }

NestJSAPI.interceptors.response.use(
  function (response) {
    store.commit("LOADER", false);
    return response;
  },
  function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 403) {
      store.commit("LOADER", false);
      Promise.reject(error.response); //ส่ง reponse object ออกไปเพื่อนำไปใช้งานต่อ
    }

    store.commit("LOADER", false);
    return Promise.reject(error);
  }
);
//------------------------------------------------------------------------------------------------------------



export { mainAxios, NodeTruckQAPI,NestJSAPI };
