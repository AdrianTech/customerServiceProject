import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ClientList from "../views/ShowClientList.vue";
import CreateAccount from "../components/client/CreateClientAccount.vue";
import CreateNewService from "../components/services/CreateNewService.vue";
import Settings from "../views/Settings.vue";
import ClientDetails from "../views/ClientDetails.vue";
import AddNewService from "../components/client/AddNewService.vue";
import ClientNotes from "../components/client/ClientNotes.vue";
import UserSettings from "../components/user/UserSettings.vue";
import Services from "../views/Services.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/client-list",
    name: "Client-List",
    component: ClientList
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/settings",
    name: "Setting Area",
    component: Settings
  },
  {
    path: "/client-details/:id",
    name: "ClientDetails",
    props: { default: true },
    component: ClientDetails
  },
  {
    path: "/add-new-service/:id",
    name: "Add New Service",
    props: { default: true },
    component: AddNewService
  },
  {
    path: "/create-service",
    name: "Create Service",
    props: { default: true },
    component: CreateNewService
  },
  {
    path: "/create-client-account",
    name: "Create Client Account",
    props: { default: true },
    component: CreateAccount
  },
  {
    path: "/client-notes/:id",
    name: "ClientNotes",
    props: { default: true },
    component: ClientNotes
  },
  {
    path: "/your-settings",
    name: "UserSettings",
    props: { default: true },
    component: UserSettings
  },
  {
    path: "/services",
    name: "Services",
    props: { default: true },
    component: Services
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeResolve((to, from, next) => {
  const { isLogged } = store.getters;
  if (to.name !== "Home" && !isLogged) next({ name: "Home" });
  else next();
});

export default router;
