import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotesView from '../views/NotesView.vue'
import NoteView from '../views/NoteView.vue'
import CreateNoteView from '../views/CreateNoteView.vue'


const routes = [
  {
    path: '/',
    name: 'notes',
    component: NotesView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/notes/:note',
    name: 'note',
    component: NoteView
  },
  {
    path: '/new',
    name: 'new',
    component: CreateNoteView
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const publicPages = ["/register", "/login"];
  const token = localStorage.getItem("token");
  if (!publicPages.includes(to.path) && !token) {
    return "/login";
  } /*если массив не включает тот маршрут и токен не записан в браузере, значит мы переходим на регистрацию либо на вход */
});

export default router
