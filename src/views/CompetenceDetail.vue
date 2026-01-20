<template>
  <div class="competence-detail-page" v-if="competence">
    <div class="page-header">
      <div class="container">
        <router-link to="/competences" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Retour aux compétences
        </router-link>
        <div class="competence-header-info">
          <span class="competence-icon-large">{{ competence.icon }}</span>
          <div>
            <span class="badge">{{ competence.category }}</span>
            <h1>{{ competence.title }}</h1>
            <p>{{ competence.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="competence-content section">
      <div class="container">
        <div class="competence-layout">
          <!-- Description détaillée -->
          <div class="competence-details card">
            <div class="card-body">
              <h2>À propos de cette compétence</h2>
              <p class="details-text">{{ competence.details }}</p>
            </div>
          </div>

          <!-- Niveaux de compétences -->
          <div class="competence-skills-detail card">
            <div class="card-body">
              <h2>Détail des compétences</h2>
              <div class="skills-list">
                <div 
                  v-for="skill in competence.skills" 
                  :key="skill.name" 
                  class="skill-item"
                >
                  <div class="skill-header">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-percentage">{{ skill.level }}%</span>
                  </div>
                  <div class="progress">
                    <div 
                      class="progress-bar" 
                      :style="{ width: skill.level + '%' }"
                    ></div>
                  </div>
                  <div class="skill-level-label">
                    {{ getSkillLevelLabel(skill.level) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Projets associés -->
          <div class="related-projects" v-if="relatedProjects.length > 0">
            <h2>Projets utilisant cette compétence</h2>
            <p class="related-intro">
              Découvrez les projets dans lesquels j'ai mis en pratique cette compétence :
            </p>
            <div class="projects-grid">
              <router-link 
                v-for="project in relatedProjects" 
                :key="project.id"
                :to="`/projets/${project.id}`"
                class="project-link card"
              >
                <div class="project-link-image">
                  <span>🖼️</span>
                </div>
                <div class="project-link-info">
                  <h4>{{ project.title }}</h4>
                  <p>{{ project.shortDescription }}</p>
                  <div class="project-link-techs">
                    <span 
                      v-for="tech in project.technologies.slice(0, 3)" 
                      :key="tech" 
                      class="badge"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="competence-navigation section section-alt">
      <div class="container">
        <div class="nav-competences">
          <router-link 
            v-if="previousCompetence" 
            :to="`/competences/${previousCompetence.id}`"
            class="nav-competence prev"
          >
            <span class="nav-icon">{{ previousCompetence.icon }}</span>
            <div class="nav-info">
              <span class="nav-label">Compétence précédente</span>
              <span class="nav-title">{{ previousCompetence.title }}</span>
            </div>
          </router-link>
          <router-link 
            v-if="nextCompetence" 
            :to="`/competences/${nextCompetence.id}`"
            class="nav-competence next"
          >
            <div class="nav-info">
              <span class="nav-label">Compétence suivante</span>
              <span class="nav-title">{{ nextCompetence.title }}</span>
            </div>
            <span class="nav-icon">{{ nextCompetence.icon }}</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="not-found section">
    <div class="container text-center">
      <h1>Compétence non trouvée</h1>
      <p>La compétence que vous recherchez n'existe pas.</p>
      <router-link to="/competences" class="btn btn-primary">
        Voir toutes les compétences
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import competences from '../data/competences.json'
import projects from '../data/projects.json'

const route = useRoute()

const competence = computed(() => {
  const id = parseInt(route.params.id)
  return competences.find(c => c.id === id)
})

const relatedProjects = computed(() => {
  if (!competence.value) return []
  return projects.filter(p => p.competenceIds.includes(competence.value.id))
})

const currentIndex = computed(() => {
  if (!competence.value) return -1
  return competences.findIndex(c => c.id === competence.value.id)
})

const previousCompetence = computed(() => {
  if (currentIndex.value <= 0) return null
  return competences[currentIndex.value - 1]
})

const nextCompetence = computed(() => {
  if (currentIndex.value >= competences.length - 1) return null
  return competences[currentIndex.value + 1]
})

const getSkillLevelLabel = (level) => {
  if (level >= 90) return 'Expert'
  if (level >= 75) return 'Avancé'
  if (level >= 60) return 'Intermédiaire'
  if (level >= 40) return 'Débutant avancé'
  return 'Débutant'
}
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
}

.competence-header-info {
  display: flex;
  gap: var(--spacing-xl);
  align-items: flex-start;
}

.competence-icon-large {
  font-size: 5rem;
  flex-shrink: 0;
}

.competence-header-info .badge {
  margin-bottom: var(--spacing-sm);
}

.competence-header-info h1 {
  margin-bottom: var(--spacing-sm);
}

.competence-layout {
  display: grid;
  gap: var(--spacing-2xl);
}

.competence-details h2,
.competence-skills-detail h2,
.related-projects h2 {
  margin-bottom: var(--spacing-lg);
}

.details-text {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Skills list */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.skill-item {
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.skill-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.skill-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.skill-percentage {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.skill-level-label {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* Related projects */
.related-intro {
  margin-bottom: var(--spacing-xl);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.project-link {
  display: flex;
  text-decoration: none;
  overflow: hidden;
}

.project-link-image {
  width: 120px;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.project-link-info {
  padding: var(--spacing-lg);
  flex: 1;
}

.project-link-info h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.project-link-info p {
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-link-techs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

/* Navigation */
.nav-competences {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.nav-competence {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.nav-competence:hover {
  border-color: var(--color-primary);
  transform: translateY(-3px);
}

.nav-competence.next {
  justify-content: flex-end;
  text-align: right;
}

.nav-icon {
  font-size: var(--font-size-3xl);
}

.nav-label {
  display: block;
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
  .competence-header-info {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-link {
    flex-direction: column;
  }
  
  .project-link-image {
    width: 100%;
    height: 120px;
  }
  
  .nav-competences {
    grid-template-columns: 1fr;
  }
  
  .nav-competence.next {
    justify-content: flex-start;
    text-align: left;
    flex-direction: row-reverse;
  }
}
</style>
