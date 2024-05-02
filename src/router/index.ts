import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Formulario from '@/views/Projetos/Formulario.vue'
import Projetos from '@/views/Projetos.vue'
import Lista from '@/views/Projetos/Lista.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'tarefas',
    component: () => import('../views/Tarefas.vue')
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: Lista
      },
      {
        path: '/projetos/novo',
        name: 'Novo Projeto',
        component: Formulario
      },
      {
        path: '/projetos/:id',
        name: 'Editar projetos',
        component: Formulario,
        props:true
      }
    ]
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
