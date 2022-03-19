import Vue from "vue";
import VueRouter from "vue-router";
import SignInSignUp from "../views/SignInSignUp";
import Home from "../views/Home";
import PinLocation from "../components/Home/PinLocation";
import RequestLocation from "../components/Home/RequestLocation";
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
      title: "Create a Student Account",
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
    },
  },
  {
    path: "/requestlocation",
    name: "RequestLocation",
    component: RequestLocation,
    meta: {
      title: "Request Location",
      requiresAuth: true,
    },
  },
  {
    path: "/pinlocation",
    name: "PinLocation",
    component: PinLocation,
    meta: {
      title: "Set Location",
      requiresAuth: true,
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
    next("/");
  if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    localStorage.getItem("token")
  )
    next("/home");
  next();
});

router.afterEach((to, from) => {
  from;
  document.title = `${to.meta.title ?? ""}${to.meta.title ? " | " : ""}${
    process.env.VUE_APP_NAME
  }`;
});

export default router;
