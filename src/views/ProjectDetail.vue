<template>
  <div class="project-detail-page" v-if="project">
    <div class="page-header">
      <div class="container">
        <router-link to="/projets" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Retour aux projets
        </router-link>
        <h1>{{ project.title }}</h1>
        <p>{{ project.shortDescription }}</p>
      </div>
    </div>

    <section class="project-content section">
      <div class="container">
        <div class="project-layout">
          <!-- Image principale -->
          <div class="project-image-container">
            <div class="project-image-large">
              <span>🖼️</span>
            </div>
          </div>

          <!-- Infos projet -->
          <div class="project-info">
            <div class="info-card">
              <h3>Informations</h3>
              <ul class="info-list">
                <li>
                  <span class="info-label">Date</span>
                  <span class="info-value">{{ project.date }}</span>
                </li>
                <li>
                  <span class="info-label">Technologies</span>
                  <div class="info-value">
                    <span v-for="tech in project.technologies" :key="tech" class="badge">
                      {{ tech }}
                    </span>
                  </div>
                </li>
              </ul>
              <div class="info-links">
                <a 
                  v-if="project.github" 
                  :href="project.github" 
                  target="_blank" 
                  class="btn btn-secondary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  v-if="project.demo" 
                  :href="project.demo" 
                  target="_blank" 
                  class="btn btn-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Voir la démo
                </a>
              </div>
            </div>
          </div>

          <!-- Description complète -->
          <div class="project-description">
            <h2>Description du projet</h2>
            <p>{{ project.fullDescription }}</p>
          </div>

          <!-- Compétences associées -->
          <div class="project-competences" v-if="relatedCompetences.length > 0">
            <h2>Compétences mobilisées</h2>
            <p class="competences-intro">
              Ce projet m'a permis de mettre en pratique et développer les compétences suivantes :
            </p>
            <div class="competences-grid">
              <router-link 
                v-for="comp in relatedCompetences" 
                :key="comp.id"
                :to="`/competences/${comp.id}`"
                class="competence-link card"
              >
                <span class="competence-icon">{{ comp.icon }}</span>
                <div class="competence-info">
                  <h4>{{ comp.title }}</h4>
                  <p>{{ comp.description }}</p>
                </div>
                <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation entre projets -->
    <section class="project-navigation section section-alt">
      <div class="container">
        <div class="nav-projects">
          <router-link 
            v-if="previousProject" 
            :to="`/projets/${previousProject.id}`"
            class="nav-project prev"
          >
            <span class="nav-label">Projet précédent</span>
            <span class="nav-title">{{ previousProject.title }}</span>
          </router-link>
          <router-link 
            v-if="nextProject" 
            :to="`/projets/${nextProject.id}`"
            class="nav-project next"
          >
            <span class="nav-label">Projet suivant</span>
            <span class="nav-title">{{ nextProject.title }}</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="not-found section">
    <div class="container text-center">
      <h1>Projet non trouvé</h1>
      <p>Le projet que vous recherchez n'existe pas.</p>
      <router-link to="/projets" class="btn btn-primary">
        Voir tous les projets
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import projects from '../data/projects.json'
import competences from '../data/competences.json'

const route = useRoute()

const project = computed(() => {
  const id = parseInt(route.params.id)
  return projects.find(p => p.id === id)
})

const relatedCompetences = computed(() => {
  if (!project.value) return []
  return competences.filter(c => project.value.competenceIds.includes(c.id))
})

const currentIndex = computed(() => {
  if (!project.value) return -1
  return projects.findIndex(p => p.id === project.value.id)
})

const previousProject = computed(() => {
  if (currentIndex.value <= 0) return null
  return projects[currentIndex.value - 1]
})

const nextProject = computed(() => {
  if (currentIndex.value >= projects.length - 1) return null
  return projects[currentIndex.value + 1]
})
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
}

.project-layout {
  display: grid;
  gap: var(--spacing-2xl);
}

.project-image-container {
  grid-column: 1 / -1;
}

.project-image-large {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}

.project-info {
  grid-column: 1 / -1;
}

.info-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
}

.info-card h3 {
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
}

.info-list {
  margin-bottom: var(--spacing-lg);
}

.info-list li {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-border);
}

.info-list li:last-child {
  border-bottom: none;
}

.info-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.info-links {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.info-links .btn {
  flex: 1;
  min-width: 140px;
}

.project-description {
  grid-column: 1 / -1;
}

.project-description h2 {
  margin-bottom: var(--spacing-lg);
}

.project-description p {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
}

.project-competences {
  grid-column: 1 / -1;
}

.project-competences h2 {
  margin-bottom: var(--spacing-md);
}

.competences-intro {
  margin-bottom: var(--spacing-xl);
}

.competences-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.competence-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  text-decoration: none;
}

.competence-icon {
  font-size: var(--font-size-3xl);
  flex-shrink: 0;
}

.competence-info {
  flex: 1;
}

.competence-info h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.competence-info p {
  font-size: var(--font-size-sm);
  margin: 0;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.arrow-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}

.competence-link:hover .arrow-icon {
  transform: translateX(5px);
  color: var(--color-primary);
}

/* Navigation */
.nav-projects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.nav-project {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.nav-project:hover {
  border-color: var(--color-primary);
  transform: translateY(-3px);
}

.nav-project.next {
  text-align: right;
}

.nav-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.nav-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .competences-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-projects {
    grid-template-columns: 1fr;
  }
  
  .nav-project.next {
    text-align: left;
  }
}
</style>
