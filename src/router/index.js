import Vue from "vue";
import VueRouter from "vue-router";
import SignInSignUp from "../views/SignInSignUp";
import Home from "../views/Home";
import PinLocation from "../components/Home/PinLocation";
import RequestLocation from "../components/Home/RequestLocation";
import Account from "../views/Account";
import ShopHome from "../views/Shop/Home";
import Bean from "../views/Shop/Bean";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SignIn",
    component: SignInSignUp,
    meta: {
      title: "Sign In",
      requiresGuest: true,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignInSignUp,
    meta: {
      title: "Create an account",
      requiresGuest: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: true,
      userType: 1,
    },
  },
  {
    path: "/requestlocation",
    name: "RequestLocation",
    component: RequestLocation,
    meta: {
      title: "Request Location",
      requiresAuth: true,
      userType: 1,
    },
  },
  {
    path: "/pinlocation",
    name: "PinLocation",
    component: PinLocation,
    meta: {
      title: "Set Location",
      requiresAuth: true,
      userType: 1,
    },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      title: "My Account",
      requiresAuth: true,
    },
  },
  {
    path: "/shop-home",
    name: "ShopHome",
    component: ShopHome,
    meta: {
      title: "My Shop",
      requiresAuth: true,
      userType: 2,
    },
  },
  {
    path: "/bean",
    name: "Bean",
    component: Bean,
    meta: {
      title: "Bean Details",
      requiresAuth: true,
      userType: 2,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !localStorage.getItem("token")
  )
    return next("/");
  if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    localStorage.getItem("token")
  )
    return next(
      parseInt(localStorage.getItem("userType")) === 1 ? "/home" : "/shop-home"
    );
  if (
    to.matched.some(
      (record) =>
        record.meta.userType && record.meta.userType !== parseInt(localStorage.getItem("userType"))
    )
  )
    return next(
      parseInt(localStorage.getItem("userType")) === 1 ? "/home" : "/shop-home"
    );

  return next();
});

router.afterEach((to, from) => {
  from;
  document.title = `${to.meta.title ?? ""}${to.meta.title ? " | " : ""}${
    process.env.VUE_APP_NAME
  }`;
});

export default router;
