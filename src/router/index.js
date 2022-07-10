import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import GlossaryView from "@/views/GlossaryView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LogoutView from "@/views/LogoutView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { needAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { needAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { needAuth: false },
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogoutView,
    meta: { needAuth: true },
  },
  {
    path: "/glossary",
    name: "Glossary",
    component: GlossaryView,
    meta: { needAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, from, next) {
  const isAuthorized = Object.prototype.hasOwnProperty.call(
    localStorage,
    "token"
  );
  if (to.meta.needAuth && !isAuthorized) next({ name: "Login" });
  else if (to.name == "Register" && isAuthorized) next({ name: "Glossary" });
  else if (to.name == "Login" && isAuthorized) next({ name: "Glossary" });
  else next();
});

export default router;
