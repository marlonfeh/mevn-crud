import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddNote from '../views/AddNote.vue'
import EditNote from '../views/EditNote.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '', redirect: '/home' },
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-note',
    name: 'AddNote',
    component: AddNote
  },
  { path: '/edit-note/:_id', component: EditNote, props: true},
  { path: '/:notFound(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
