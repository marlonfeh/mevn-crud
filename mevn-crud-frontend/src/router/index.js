import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import AddNote from '../views/AddNote.vue'
import EditNote from '../views/EditNote.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '', redirect: '/home' },
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-note',
    name: 'AddNote',
    component: AddNote,
    meta: { requiresAuth: true }
  },
  { path: '/edit-note/:_id', 
    component: EditNote, 
    props: true, 
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'Sign-Up',
    component: SignUp
  },
  
  { path: '/:notFound(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !store.getters['user/isLoggedIn']) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router
