import Main from "./views/Main.vue";
import Checkin from "./views/Checkin.vue";
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", name: "Sign In", component: Main, meta: { title: "Sign In" } },
  {
    path: "/checkin",
    name: "Checkin",
    component: Checkin,
    meta: { title: "Checkin" },
  },
  { path: "/:path(.*)", component: NotFound },
];
