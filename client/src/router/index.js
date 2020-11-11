import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ClientList from "../views/ShowClientList.vue";
import CreateAccount from "../components/client/CreateClientAccount.vue";
import CreateNewService from "../components/services/CreateNewService.vue";
import Settings from "../views/Settings.vue";
import ClientDetails from "../components/client/ClientDetails.vue";
import AddNewService from "../components/client/AddNewService.vue";
import ClientNotes from "../components/client/ClientNotes.vue";
import UserSettings from "../components/user/UserSettings.vue";
import AddNewUser from "../components/user/users_mgmt/AddNewUser.vue";
import Services from "../views/Services.vue";
import Search from "../views/Search.vue";
import SetPassword from "../components/user/users_mgmt/SetPassword.vue";
import Analytics from "../components/user/users_mgmt/Analitycs.vue";
import store from "../store";
import { admin, visitor } from "../shared/variables";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/clients-list",
    name: "Client-List",
    component: ClientList,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/settings",
    name: "Setting Area",
    component: Settings,
  },
  {
    path: "/client-details/:id",
    name: "ClientDetails",
    props: { default: true },
    component: ClientDetails,
  },
  {
    path: "/add-new-service/:id",
    name: "Add New Service",
    props: { default: true },
    component: AddNewService,
  },
  {
    path: "/create-service",
    name: "Create Service",
    props: { default: true },
    component: CreateNewService,
  },
  {
    path: "/create-client-account",
    name: "Create Client Account",
    props: { default: true },
    component: CreateAccount,
  },
  {
    path: "/client-notes/:id",
    name: "ClientNotes",
    props: { default: true },
    component: ClientNotes,
  },
  {
    path: "/your-settings",
    name: "UserSettings",
    props: { default: true },
    component: UserSettings,
  },
  {
    path: "/your-settings/create-user",
    name: "AddNewUser",
    props: { default: true },
    component: AddNewUser,
    beforeEnter(to, from, next) {
      const { userData } = store.getters;
      if (userData && userData.role === admin) {
        next();
      } else if (userData && userData.role === visitor) {
        next({ name: "Setting Area" });
      } else next({ name: "Home" });
    },
  },
  {
    path: "/analytics",
    name: "Analytics",
    props: { default: true },
    component: Analytics,
    beforeEnter(to, from, next) {
      const { userData } = store.getters;
      if (userData && userData.role === admin) {
        next();
      } else if (userData && userData.role === visitor) {
        next({ name: "Setting Area" });
      } else next({ name: "Home" });
    },
  },
  {
    path: "/services-list",
    name: "Services",
    props: { default: true },
    component: Services,
  },
  {
    path: "/search-page",
    name: "Search",
    props: { default: true },
    component: Search,
  },
  {
    path: "/your-settings/set-password",
    name: "SetPassword",
    component: SetPassword,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeResolve((to, from, next) => {
  const { isLogged } = store.getters;
  if (to.name !== "Home" && to.name !== "SetPassword" && !isLogged) next({ name: "Home" });
  else next();
});

export default router;
