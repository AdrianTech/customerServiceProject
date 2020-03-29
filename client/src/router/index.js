import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ClientList from "../views/ShowClientList.vue";
// import CreateAccount from "../views/CreateClientAccount.vue";
import Settings from "../views/Settings.vue";
import ClientDetails from "../views/ClientDetails.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/show-client-list",
    name: "Client-List",
    component: ClientList,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    beforeEnter(to, from, next) {
      const { userLoginState } = store.getters;
      if (userLoginState) next();
      else {
        next({
          name: "Home"
        });
      }
    }
  },
  // {
  //   path: "/create-client",
  //   name: "Create Client Account",
  //   component: CreateAccount,

  // },
  {
    path: "/settings",
    name: "Setting Area",
    component: Settings,
    beforeEnter(to, from, next) {
      const { userLoginState } = store.getters;
      if (userLoginState) next();
      else {
        next({
          name: "Home"
        });
      }
    }
  },
  {
    path: "/client-details/:id",
    name: "ClientDetails",
    props: { default: true },
    component: ClientDetails,
    beforeEnter(to, from, next) {
      const { userLoginState } = store.getters;
      if (userLoginState) next();
      else {
        next({
          name: "Home"
        });
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
