<template>
  <article class="project-card card">
    <div class="project-image">
      <div class="project-image-placeholder">
        <span>🖼️</span>
      </div>
      <div class="project-overlay">
        <router-link :to="`/projets/${project.id}`" class="btn btn-primary">
          Voir le projet
        </router-link>
      </div>
    </div>
    <div class="card-body">
      <div class="project-meta">
        <span class="project-date">{{ project.date }}</span>
      </div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.shortDescription }}</p>
      <div class="project-technologies">
        <span 
          v-for="tech in project.technologies.slice(0, 3)" 
          :key="tech" 
          class="badge"
        >
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 3" class="badge">
          +{{ project.technologies.length - 3 }}
        </span>
      </div>
      <div class="project-links">
        <a 
          v-if="project.github" 
          :href="project.github" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link"
          aria-label="Voir sur GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a 
          v-if="project.demo" 
          :href="project.demo" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link"
          aria-label="Voir la démo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <router-link :to="`/projets/${project.id}`" class="project-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.project-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.project-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.project-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.project-links {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: auto;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.project-link:hover {
  background: var(--color-primary);
  color: var(--color-text-primary);
}
</style>
