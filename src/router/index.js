import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from "@/views/AboutView.vue"
import LoginView from "@/views/LoginVue.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {needAuth: false}
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {needAuth: false}
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: {needAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to, from, next){
    const isAuthorized = Object.prototype.hasOwnProperty.call(
      localStorage,
      "token"
    );
    if (to.meta.needAuth && !isAuthorized) next({name: "Login"})
    else next()
})


export default router
