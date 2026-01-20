<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <span class="hero-greeting">Bonjour, je suis</span>
            <h1 class="hero-title">
              <span class="text-gradient">{{ profile.personal.fullName }}</span>
            </h1>
            <h2 class="hero-subtitle">{{ profile.personal.title }}</h2>
            <p class="hero-description">
              {{ profile.personal.description }}
            </p>
            <div class="hero-actions">
              <router-link to="/projets" class="btn btn-primary btn-lg">
                Voir mes projets
              </router-link>
              <router-link to="/contact" class="btn btn-secondary btn-lg">
                Me contacter
              </router-link>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-image-wrapper">
              <div class="hero-image-placeholder">
                <span>👨‍💻</span>
              </div>
              <div class="hero-decoration"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-bg-gradient"></div>
    </section>

    <!-- Quick Stats -->
    <section class="stats section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">{{ profile.stats.projectsCompleted }}+</span>
            <span class="stat-label">Projets réalisés</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ profile.stats.competencesCount }}</span>
            <span class="stat-label">Domaines de compétences</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ profile.stats.yearsExperience }}+</span>
            <span class="stat-label">Années d'expérience</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ profile.stats.motivation }}%</span>
            <span class="stat-label">Motivation</span>
          </div>
        </div>
        <div class=""></div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="featured-projects section section-alt">
      <div class="container">
        <div class="section-title">
          <h2>Projets récents</h2>
          <p>Découvrez quelques-unes de mes dernières réalisations</p>
        </div>
        <div class="projects-grid">
          <ProjectCard 
            v-for="project in featuredProjects" 
            :key="project.id" 
            :project="project"
          />
        </div>
        <div class="section-footer">
          <router-link to="/projets" class="btn btn-secondary">
            Voir tous les projets
          </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Preview -->
    <section class="skills-preview section">
      <div class="container">
        <div class="two-columns">
          <div class="skills-text">
            <h2>Mes compétences</h2>
            <p>
              Au cours de mes études et de mes projets personnels, j'ai développé 
              un ensemble varié de compétences techniques et transversales qui me 
              permettent de mener à bien des projets complets.
            </p>
            <ul class="skills-highlights">
              <li v-for="comp in competences.slice(0, 4)" :key="comp.id">
                <span class="skill-icon">{{ comp.icon }}</span>
                <span>{{ comp.title }}</span>
              </li>
            </ul>
            <router-link to="/competences" class="btn btn-primary">
              Découvrir mes compétences
            </router-link>
          </div>
          <div class="skills-visual">
            <div class="skills-cards">
              <div 
                v-for="(comp, index) in competences.slice(0, 3)" 
                :key="comp.id" 
                class="skill-preview-card"
                :style="{ '--delay': index * 0.1 + 's' }"
              >
                <span class="skill-card-icon">{{ comp.icon }}</span>
                <h4>{{ comp.title }}</h4>
                <p>{{ comp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta section section-alt">
      <div class="container">
        <div class="cta-content">
          <h2>Intéressé par mon profil ?</h2>
          <p>N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.</p>
          <div class="cta-actions">
            <router-link to="/contact" class="btn btn-primary btn-lg">
              Me contacter
            </router-link>
            <router-link to="/cv" class="btn btn-secondary btn-lg">
              Voir mon CV
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import projects from '../data/projects.json'
import competences from '../data/competences.json'
import profile from '../data/profile.json'

const featuredProjects = computed(() => projects.slice(0, 3))
</script>

<style scoped>
/* Hero Section */
.hero {
  min-height: calc(60vh - var(--header-height));
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: var(--spacing-4xl) 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-greeting {
  display: block;
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
}

.hero-title {
  font-size: var(--font-size-6xl);
  margin-bottom: var(--spacing-md);
}

.hero-subtitle {
  font-size: var(--font-size-2xl);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-normal);
  margin-bottom: var(--spacing-lg);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 500px;
  margin-bottom: var(--spacing-xl);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-wrapper {
  position: relative;
}

.hero-image-placeholder {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--color-primary-transparent), var(--color-secondary));
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  position: relative;
  z-index: 1;
}

.hero-decoration {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-full);
  opacity: 0.3;
}

.hero-bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 70% 30%, var(--color-primary-transparent) 0%, transparent 50%);
  pointer-events: none;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  transition: all var(--transition-normal);
}

.stat-item:hover {
  border-color: var(--color-primary);
  transform: translateY(-5px);
}

.stat-number {
  display: block;
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* Featured Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.section-footer {
  text-align: center;
  margin-top: var(--spacing-2xl);
}

/* Skills Preview */
.skills-text h2 {
  margin-bottom: var(--spacing-lg);
}

.skills-text p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
}

.skills-highlights {
  margin-bottom: var(--spacing-xl);
}

.skills-highlights li {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.skill-icon {
  font-size: var(--font-size-xl);
}

.skills-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.skill-preview-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  transition: all var(--transition-normal);
  animation: slideInRight 0.5s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
}

.skill-preview-card:hover {
  border-color: var(--color-primary);
  transform: translateX(-10px);
}

.skill-card-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
  display: block;
}

.skill-preview-card h4 {
  margin-bottom: var(--spacing-sm);
}

.skill-preview-card p {
  font-size: var(--font-size-sm);
  margin: 0;
}

/* CTA Section */
.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  margin-bottom: var(--spacing-md);
}

.cta-content p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
}

.cta-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-description {
    margin: 0 auto var(--spacing-xl);
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-visual {
    order: -1;
  }
  
  .hero-image-placeholder {
    width: 200px;
    height: 200px;
    font-size: 5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .two-columns {
    text-align: center;
  }
  
  .skills-highlights {
    display: inline-block;
    text-align: left;
  }
}
</style>
