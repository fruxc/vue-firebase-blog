import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import firebase from "firebase";

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
    alias: '/login',
  }, {
    path: '/signup',
    name: 'Singup',
    component: Signup
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authenticatedUser) {
    alert("You are not authorized to access this area.");
    next("login");
  } else {
    next();
  }
});

export default router