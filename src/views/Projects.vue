<template>
  <div class="projects-page">
    <div class="page-header">
      <div class="container">
        <h1>Mes Projets</h1>
        <p>Découvrez l'ensemble de mes réalisations et projets</p>
      </div>
    </div>

    <section class="projects-section section">
      <div class="container">
        <!-- Filtres -->
        <div class="projects-filters">
          <button 
            class="filter-btn" 
            :class="{ active: activeFilter === 'all' }"
            @click="activeFilter = 'all'"
          >
            Tous
          </button>
          <button 
            v-for="tech in uniqueTechnologies" 
            :key="tech"
            class="filter-btn"
            :class="{ active: activeFilter === tech }"
            @click="activeFilter = tech"
          >
            {{ tech }}
          </button>
        </div>

        <!-- Projets -->
        <div class="projects-grid">
          <TransitionGroup name="project-list">
            <ProjectCard 
              v-for="project in filteredProjects" 
              :key="project.id" 
              :project="project"
            />
          </TransitionGroup>
        </div>

        <div v-if="filteredProjects.length === 0" class="no-projects">
          <p>Aucun projet trouvé avec ce filtre.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import projects from '../data/projects.json'

const activeFilter = ref('all')

const uniqueTechnologies = computed(() => {
  const techs = new Set()
  projects.forEach(project => {
    project.technologies.forEach(tech => techs.add(tech))
  })
  return Array.from(techs).slice(0, 6)
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter(project => 
    project.technologies.includes(activeFilter.value)
  )
})
</script>

<style scoped>
.projects-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
}

.filter-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-primary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.no-projects {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--color-text-muted);
}

/* Transitions */
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.3s ease;
}

.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.project-list-move {
  transition: transform 0.3s ease;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
