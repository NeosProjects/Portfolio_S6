import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CV from '../views/CV.vue'
import Projects from '../views/Projects.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Competences from '../views/Competences.vue'
import CompetenceDetail from '../views/CompetenceDetail.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Accueil' }
  },
  {
    path: '/cv',
    name: 'CV',
    component: CV,
    meta: { title: 'CV' }
  },
  {
    path: '/projets',
    name: 'Projects',
    component: Projects,
    meta: { title: 'Projets' }
  },
  {
    path: '/projets/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    meta: { title: 'Détail du projet' }
  },
  {
    path: '/competences',
    name: 'Competences',
    component: Competences,
    meta: { title: 'Compétences' }
  },
  {
    path: '/competences/:id',
    name: 'CompetenceDetail',
    component: CompetenceDetail,
    meta: { title: 'Détail de la compétence' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Portfolio` || 'Portfolio'
  next()
})

export default router
