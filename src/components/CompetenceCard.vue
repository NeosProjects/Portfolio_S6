<template>
  <router-link :to="`/competences/${competence.id}`" class="competence-card card">
    <div class="card-body">
      <div class="competence-header">
        <span class="competence-icon">{{ competence.icon }}</span>
        <span class="competence-category badge">{{ competence.category }}</span>
      </div>
      <h3 class="competence-title">{{ competence.title }}</h3>
      <p class="competence-description">{{ competence.description }}</p>
      
      <div class="competence-skills">
        <div 
          v-for="skill in competence.skills.slice(0, 3)" 
          :key="skill.name" 
          class="skill-preview"
        >
          <span class="skill-name">{{ skill.name }}</span>
          <div class="skill-level">
            <div class="skill-dots">
              <span 
                v-for="n in 5" 
                :key="n" 
                class="dot"
                :class="{ filled: n <= Math.round(skill.level / 20) }"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div class="competence-footer">
        <span class="see-more">
          Voir les détails
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  competence: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.competence-card {
  display: block;
  text-decoration: none;
}

.competence-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.competence-icon {
  font-size: var(--font-size-3xl);
}

.competence-category {
  font-size: var(--font-size-xs);
}

.competence-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.competence-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.competence-skills {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.skill-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.skill-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-bg-tertiary);
  transition: background var(--transition-fast);
}

.dot.filled {
  background: var(--color-primary);
}

.competence-footer {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.see-more {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  transition: gap var(--transition-fast);
}

.competence-card:hover .see-more {
  gap: var(--spacing-md);
}
</style>
