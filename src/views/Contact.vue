<template>
  <div class="contact-page">
    <div class="page-header">
      <div class="container">
        <h1>Me Contacter</h1>
        <p>N'hésitez pas à me contacter pour toute question ou opportunité</p>
      </div>
    </div>

    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <!-- Informations de contact -->
          <div class="contact-info">
            <h2>Restons en contact</h2>
            <p>
              Je suis toujours ouvert aux nouvelles opportunités, collaborations 
              ou simplement pour échanger autour de projets intéressants.
            </p>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div class="method-info">
                  <h4>Email</h4>
                  <a :href="`mailto:${profile.personal.email}`">{{ profile.personal.email }}</a>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div class="method-info">
                  <h4>Localisation</h4>
                  <span>{{ profile.personal.location }}</span>
                </div>
              </div>

              <div v-if="profile.social.linkedin" class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div class="method-info">
                  <h4>LinkedIn</h4>
                  <a :href="profile.social.linkedin" target="_blank" rel="noopener noreferrer">
                    Voir mon profil
                  </a>
                </div>
              </div>

              <div v-if="profile.social.github" class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div class="method-info">
                  <h4>GitHub</h4>
                  <a :href="profile.social.github" target="_blank" rel="noopener noreferrer">
                    Voir mes projets
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire de contact -->
          <div class="contact-form-container">
            <form @submit.prevent="handleSubmit" class="contact-form card">
              <div class="card-body">
                <h3>Envoyez-moi un message</h3>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName" class="form-label">Prénom *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="form.firstName"
                      class="form-input"
                      :class="{ error: errors.firstName }"
                      placeholder="Votre prénom"
                      required
                    >
                    <span v-if="errors.firstName" class="form-error">{{ errors.firstName }}</span>
                  </div>
                  <div class="form-group">
                    <label for="lastName" class="form-label">Nom *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="form.lastName"
                      class="form-input"
                      :class="{ error: errors.lastName }"
                      placeholder="Votre nom"
                      required
                    >
                    <span v-if="errors.lastName" class="form-error">{{ errors.lastName }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email"
                    class="form-input"
                    :class="{ error: errors.email }"
                    placeholder="votre@email.com"
                    required
                  >
                  <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
                </div>

                <div class="form-group">
                  <label for="subject" class="form-label">Sujet *</label>
                  <select 
                    id="subject" 
                    v-model="form.subject"
                    class="form-input"
                    :class="{ error: errors.subject }"
                    required
                  >
                    <option value="" disabled>Sélectionnez un sujet</option>
                    <option value="job">Opportunité d'emploi</option>
                    <option value="collaboration">Proposition de collaboration</option>
                    <option value="project">Question sur un projet</option>
                    <option value="other">Autre</option>
                  </select>
                  <span v-if="errors.subject" class="form-error">{{ errors.subject }}</span>
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">Message *</label>
                  <textarea 
                    id="message" 
                    v-model="form.message"
                    class="form-textarea"
                    :class="{ error: errors.message }"
                    placeholder="Votre message..."
                    rows="5"
                    required
                  ></textarea>
                  <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg submit-btn"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Envoi en cours...</span>
                  <span v-else>
                    Envoyer le message
                  </span>
                </button>

                <!-- Message de succès -->
                <div v-if="submitSuccess" class="success-message">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Votre message a été envoyé avec succès !</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import profile from '../data/profile.json'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!form.firstName.trim()) {
    errors.firstName = 'Le prénom est requis'
    isValid = false
  }
  
  if (!form.lastName.trim()) {
    errors.lastName = 'Le nom est requis'
    isValid = false
  }
  
  if (!form.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'L\'email n\'est pas valide'
    isValid = false
  }
  
  if (!form.subject) {
    errors.subject = 'Veuillez sélectionner un sujet'
    isValid = false
  }
  
  if (!form.message.trim()) {
    errors.message = 'Le message est requis'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  // Simulation d'envoi (à remplacer par un vrai appel API)
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  submitSuccess.value = true
  
  // Reset form
  Object.keys(form).forEach(key => form[key] = '')
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    submitSuccess.value = false
  }, 5000)
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--spacing-3xl);
  align-items: start;
}

/* Contact info */
.contact-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-info h2 {
  margin-bottom: var(--spacing-md);
}

.contact-info > p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2xl);
}

.contact-methods {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: all var(--transition-normal);
}

.contact-method:hover {
  border-color: var(--color-primary);
  transform: translateX(5px);
}

.method-icon {
  width: 48px;
  height: 48px;
  background: var(--color-primary-transparent);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.method-info h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xs);
}

.method-info a,
.method-info span {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.method-info a:hover {
  color: var(--color-primary);
}

/* Contact form */
.contact-form h3 {
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-xl);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.form-input.error,
.form-textarea.error {
  border-color: var(--color-error);
}

select.form-input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--spacing-md) center;
  background-size: 16px;
  padding-right: var(--spacing-2xl);
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--color-success);
  border-radius: var(--radius-lg);
  color: var(--color-success);
  margin-top: var(--spacing-lg);
  animation: fadeIn 0.3s ease-out;
}

@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
