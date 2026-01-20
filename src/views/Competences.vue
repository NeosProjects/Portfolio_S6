<template>
  <div class="competences-page">
    <div class="page-header">
      <div class="container">
        <h1>Mes Compétences</h1>
        <p>Les compétences acquises durant mes études et projets personnels</p>
      </div>
    </div>

    <section class="competences-section section">
      <div class="container">
        <!-- Filtres par catégorie -->
        <div class="competences-filters">
          <button 
            class="filter-btn" 
            :class="{ active: activeCategory === 'all' }"
            @click="activeCategory = 'all'"
          >
            Toutes
          </button>
          <button 
            v-for="category in categories" 
            :key="category"
            class="filter-btn"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <!-- Grille des compétences -->
        <div class="competences-grid">
          <TransitionGroup name="competence-list">
            <CompetenceCard 
              v-for="competence in filteredCompetences" 
              :key="competence.id" 
              :competence="competence"
            />
          </TransitionGroup>
        </div>
      </div>
    </section>

    <!-- Section résumé -->
    <section class="skills-summary section section-alt">
      <div class="container">
        <div class="section-title">
          <h2>Vue d'ensemble</h2>
          <p>Un aperçu global de mes domaines d'expertise</p>
        </div>
        <div class="summary-grid">
          <div v-for="comp in competences" :key="comp.id" class="summary-item">
            <div class="summary-header">
              <span class="summary-icon">{{ comp.icon }}</span>
              <h4>{{ comp.title }}</h4>
            </div>
            <div class="summary-skills">
              <div 
                v-for="skill in comp.skills" 
                :key="skill.name" 
                class="skill-bar-item"
              >
                <div class="skill-bar-header">
                  <span>{{ skill.name }}</span>
                  <span>{{ skill.level }}%</span>
                </div>
                <div class="progress">
                  <div 
                    class="progress-bar" 
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CompetenceCard from '../components/CompetenceCard.vue'
import competences from '../data/competences.json'

const activeCategory = ref('all')

const categories = computed(() => {
  const cats = new Set()
  competences.forEach(comp => cats.add(comp.category))
  return Array.from(cats)
})

const filteredCompetences = computed(() => {
  if (activeCategory.value === 'all') {
    return competences
  }
  return competences.filter(comp => comp.category === activeCategory.value)
})
</script>

<style scoped>
.competences-filters {
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

.competences-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

/* Transitions */
.competence-list-enter-active,
.competence-list-leave-active {
  transition: all 0.3s ease;
}

.competence-list-enter-from,
.competence-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.competence-list-move {
  transition: transform 0.3s ease;
}

/* Summary section */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.summary-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.summary-icon {
  font-size: var(--font-size-2xl);
}

.summary-header h4 {
  font-size: var(--font-size-lg);
}

.summary-skills {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.skill-bar-item {
  width: 100%;
}

.skill-bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .competences-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .competences-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
