<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo">
          <span class="logo-text">{{ profile.meta.siteName }}</span>
        </router-link>

        <button 
          class="mobile-menu-btn" 
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Menu de navigation"
        >
          <span class="hamburger" :class="{ 'is-active': isMobileMenuOpen }"></span>
        </button>

        <ul class="nav-links" :class="{ 'is-open': isMobileMenuOpen }">
          <li v-for="link in navLinks" :key="link.path">
            <router-link 
              :to="link.path" 
              class="nav-link"
              @click="closeMobileMenu"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import profile from '../../data/profile.json'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'CV', path: '/cv' },
  { name: 'Projets', path: '/projets' },
  { name: 'Compétences', path: '/competences' },
  { name: 'Contact', path: '/contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  display: flex;
  align-items: center;
  z-index: var(--z-fixed);
  transition: all var(--transition-normal);
}

.header-scrolled {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-md);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
}

.logo-text {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-link {
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-hover);
}

.nav-link.router-link-active {
  color: var(--color-primary);
  background: var(--color-primary-transparent);
}

.mobile-menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger {
  display: block;
  position: relative;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: background var(--transition-fast);
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  left: 0;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

.hamburger.is-active {
  background: transparent;
}

.hamburger.is-active::before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger.is-active::after {
  bottom: 0;
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-lg);
    background: var(--color-bg-primary);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
  }

  .nav-links.is-open {
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    font-size: var(--font-size-xl);
    padding: var(--spacing-md) var(--spacing-xl);
  }
}
</style>
