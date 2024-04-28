import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'tarefas',
    component: () => import('../views/Tarefas.vue')
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: () => import('../views/Projetos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
