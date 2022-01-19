import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/auth/signup.vue";
import store from '../store'


Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.auth.user) {
      next();
      return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.user) {
      next();
      return;
  }
  next("/Login");
};

const routes = [
  {
    path: "/Home",
    name: "Home",
    meta: {
      title: 'หน้าหลัก'
    },
    beforeEnter: ifAuthenticated,
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      title: 'ล็อคอิน'
    },
    beforeEnter: ifNotAuthenticated,
    component: Login,
  },
  {
    path: "/carregister",
    name: "Carregister",
    meta: {
      title: 'หน้าลงทะเบียนประจำรถ'
    },
    beforeEnter: ifAuthenticated,
    component: () => import("../views/Carregister/Carregister.vue"),
  },
  {
    path: "/stickercar",
    name: "Strickercar",
    meta: {
      title: 'ปริ้นบัตรประจำรถ'
    },
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Printsticker/Strickercar.vue"),
  },
  {
    path: "/truckqregister",
    name: "Truckqregister",
    meta: {
      title: 'ลงทะเบียนคิว'
    },
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Truckqregister/Truckqregister.vue"),
  },
  {
    path: "/carregister_new",
    name: "Carregister_new",
    meta: {
      title: 'หน้าลงทะเบียนประจำรถห้องประสานงาน'
    },
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Carregister/Carregister_new.vue"),
  },
  {
    path: "/parkinglot",
    name: "Parkinglot",
    meta: {
      title: 'คิวลานจอดรถ'
    },
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Parkinglot/Parkinglot.vue"),
  },
  {
    path: "/parkinglottransction",
    name: "Parkinglottransction",
    meta: {
      title: 'คิวที่ปล่อยออกจากลาน'
    },
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Parkinglot/parkinglottransction.vue"),
  },
  {
    path: "/truckcanefarprint",
    name: "Truckcanefarprint",
    meta: {
      title: 'ทดสอบทางไกล'
    },
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/CanFar/canefar.vue"),
  },
  
];

const router = new VueRouter({
  routes,
});



router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    router.replace({ path: "Login", redirect: "/Login" });
  }
  else {
    next();
  }
});

export default router;
