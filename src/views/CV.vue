<template>
  <div class="cv-page">
    <div class="page-header">
      <div class="container">
        <h1>Mon CV</h1>
        <p>Parcours académique et professionnel</p>
      </div>
    </div>

    <section class="cv-content section">
      <div class="container">
        <div class="cv-grid">
          <!-- Sidebar -->
          <aside class="cv-sidebar">
            <div class="cv-profile">
              <div class="cv-avatar">
                <span>👨‍💻</span>
              </div>
              <h2>{{ profile.personal.fullName }}</h2>
              <p class="cv-title">{{ profile.personal.title }}</p>
            </div>

            <div class="cv-section">
              <h3>Contact</h3>
              <ul class="cv-contact-list">
                <li>
                  <span class="contact-icon">📧</span>
                  <span>{{ profile.personal.email }}</span>
                </li>
                <li>
                  <span class="contact-icon">📱</span>
                  <span>{{ profile.personal.phone }}</span>
                </li>
                <li>
                  <span class="contact-icon">📍</span>
                  <span>{{ profile.personal.location }}</span>
                </li>
                <li v-if="profile.social.linkedin">
                  <span class="contact-icon">🔗</span>
                  <a :href="profile.social.linkedin" target="_blank">LinkedIn</a>
                </li>
                <li v-if="profile.social.github">
                  <span class="contact-icon">💻</span>
                  <a :href="profile.social.github" target="_blank">GitHub</a>
                </li>
              </ul>
            </div>

            <div class="cv-section">
              <h3>Langues</h3>
              <ul class="cv-languages">
                <li v-for="lang in profile.languages" :key="lang.code">
                  <span>{{ lang.language }}</span>
                  <span class="language-level">{{ lang.level }}</span>
                </li>
              </ul>
            </div>

            <div class="cv-section">
              <h3>Centres d'intérêt</h3>
              <div class="cv-interests">
                <span 
                  v-for="interest in profile.interests" 
                  :key="interest.name" 
                  class="interest-tag"
                >
                  {{ interest.icon }} {{ interest.name }}
                </span>
              </div>
            </div>

            <div class="cv-download">
              <a :href="profile.meta.cvDownloadUrl" class="btn btn-primary" download>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Télécharger le CV
              </a>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="cv-main">
            <!-- Profile -->
            <section class="cv-section">
              <h3 class="cv-section-title">
                <span class="section-icon">👤</span>
                Profil
              </h3>
              <p class="cv-profile-text">
                {{ profile.personal.shortBio }}
              </p>
            </section>

            <!-- Formation -->
            <section class="cv-section">
              <h3 class="cv-section-title">
                <span class="section-icon">🎓</span>
                Formation
              </h3>
              <div class="timeline">
                <div 
                  v-for="edu in profile.education" 
                  :key="edu.id" 
                  class="timeline-item"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <h4>{{ edu.degree }}</h4>
                      <span class="timeline-date">
                        {{ edu.startDate }} - {{ edu.current ? 'Présent' : edu.endDate }}
                      </span>
                    </div>
                    <p class="timeline-place">{{ edu.school }}</p>
                    <p class="timeline-description">{{ edu.description }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Expérience -->
            <section class="cv-section">
              <h3 class="cv-section-title">
                <span class="section-icon">💼</span>
                Expérience professionnelle
              </h3>
              <div class="timeline">
                <div 
                  v-for="exp in profile.experience" 
                  :key="exp.id" 
                  class="timeline-item"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <h4>{{ exp.position }}</h4>
                      <span class="timeline-date">
                        {{ formatDate(exp.startDate) }} - {{ exp.current ? 'Présent' : formatDate(exp.endDate) }}
                      </span>
                    </div>
                    <p class="timeline-place">{{ exp.company }}</p>
                    <p class="timeline-description">{{ exp.description }}</p>
                    <div v-if="exp.technologies" class="timeline-skills">
                      <span v-for="tech in exp.technologies" :key="tech" class="badge">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Compétences techniques -->
            <section class="cv-section">
              <h3 class="cv-section-title">
                <span class="section-icon">🛠️</span>
                Compétences techniques
              </h3>
              <div class="skills-grid">
                <div 
                  v-for="(category, key) in profile.technicalSkills" 
                  :key="key" 
                  class="skill-category"
                >
                  <h4>{{ category.title }}</h4>
                  <div class="skill-tags">
                    <span v-for="skill in category.skills" :key="skill">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import profile from '../data/profile.json'

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  if (!month) return year
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
  return `${months[parseInt(month) - 1]} ${year}`
}
</script>

<style scoped>
.cv-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--spacing-2xl);
}

/* Sidebar */
.cv-sidebar {
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: var(--spacing-xl);
  height: fit-content;
  position: sticky;
  top: calc(var(--header-height) + var(--spacing-lg));
}

.cv-profile {
  text-align: center;
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-xl);
}

.cv-avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto var(--spacing-md);
}

.cv-profile h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
}

.cv-title {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.cv-sidebar .cv-section {
  margin-bottom: var(--spacing-xl);
}

.cv-sidebar .cv-section h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.cv-contact-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.cv-contact-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.contact-icon {
  width: 24px;
  text-align: center;
}

.cv-contact-list a {
  color: var(--color-primary);
}

.cv-languages li {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.cv-languages li:last-child {
  border-bottom: none;
}

.language-level {
  background: var(--color-primary-transparent);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.cv-interests {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.interest-tag {
  background: var(--color-bg-tertiary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.cv-download {
  margin-top: var(--spacing-xl);
}

.cv-download .btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.cv-main {
  padding-top: 0 !important;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Main Content */
.cv-main .cv-section {
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  padding: var(--spacing-xl);
  /* margin-bottom: var(--spacing-lg); */
}

.cv-section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-primary);
}

.section-icon {
  font-size: var(--font-size-2xl);
}

.cv-profile-text {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: var(--spacing-xl);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-bottom: var(--spacing-xl);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: calc(-1 * var(--spacing-xl) + 2px);
  top: 5px;
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  border: 2px solid var(--color-bg-card);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xs);
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.timeline-header h4 {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}

.timeline-date {
  background: var(--color-primary-transparent);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.timeline-place {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.timeline-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-sm);
}

.timeline-skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.skill-category h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.skill-tags span {
  background: var(--color-bg-tertiary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 968px) {
  .cv-grid {
    grid-template-columns: 1fr;
  }
  
  .cv-sidebar {
    position: static;
  }
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-header {
    flex-direction: column;
  }
}
</style>
