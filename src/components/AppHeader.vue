<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['navigate', 'logout'])

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      name: 'Kurt E. Salonga',
      email: '',
      role: 'Librarian'
    })
  }
})

const menuOpen = ref(false)
const darkMode = ref(false)
const settingsOpen = ref(false)
const helpOpen = ref(false)
const animationsEnabled = ref(true)

onMounted(() => {
  darkMode.value = localStorage.getItem('module7-theme') === 'dark'

  animationsEnabled.value =
    localStorage.getItem('module7-animations') !== 'off'

  document.documentElement.classList.toggle(
    'dark',
    darkMode.value
  )

  document.documentElement.classList.toggle(
    'no-animations',
    !animationsEnabled.value
  )
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function navigate(section) {
  closeMenu()
  emit('navigate', section)
}

function toggleTheme() {
  darkMode.value = !darkMode.value

  document.documentElement.classList.toggle(
    'dark',
    darkMode.value
  )

  localStorage.setItem(
    'module7-theme',
    darkMode.value ? 'dark' : 'light'
  )
}

function toggleAnimations() {
  animationsEnabled.value = !animationsEnabled.value

  document.documentElement.classList.toggle(
    'no-animations',
    !animationsEnabled.value
  )

  localStorage.setItem(
    'module7-animations',
    animationsEnabled.value ? 'on' : 'off'
  )
}

function openSettings() {
  closeMenu()
  settingsOpen.value = true
}

function openHelp() {
  closeMenu()
  helpOpen.value = true
}

function logout() {
  closeMenu()
  emit('logout')
}

/* USER INITIALS */
function getInitials() {
  const name = props.user?.name || 'User'

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('')
}
</script>

<template>

  <!-- HEADER -->
  <header class="top-header">
    <div class="header-inner">

      <!-- HAMBURGER -->
      <button
        class="menu-button"
        type="button"
        @click="toggleMenu"
        aria-label="Open menu"
      >

        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

      </button>


      <!-- BRAND -->
      <button
        class="brand"
        type="button"
        @click="navigate('dashboard')"
      >

        <div class="brand-icon">
          📖
        </div>

        <div>
          <h1>
            Library Management System
          </h1>

          <p>
            Organize. Manage. Inspire.
          </p>
        </div>

      </button>


      <!-- SEARCH -->
      <div class="header-search">

        <span>⌕</span>

        <input
          type="search"
          placeholder="Search books, authors, categories..."
          @keydown.enter="navigate('books')"
        />

        <kbd>
          Ctrl /
        </kbd>

      </div>


      <!-- RIGHT SIDE -->
      <div class="header-actions">

        <!-- THEME BUTTON -->
        <button
          type="button"
          class="theme-toggle"
          @click="toggleTheme"
        >

          <span>
            {{ darkMode ? '☀' : '☾' }}
          </span>

          <span class="hidden sm:inline">
            {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
          </span>

        </button>


        <!-- PROFILE -->
        <div class="profile">

          <!-- FIXED INITIALS -->
          <div class="profile-avatar">
            {{ getInitials() }}
          </div>

          <div class="hidden lg:block">

            <p>
              {{ props.user.name }}
            </p>

            <span>
              {{ props.user.role || 'Librarian' }}
            </span>

          </div>

          <span class="hidden lg:block">
            ⌄
          </span>

        </div>

      </div>

    </div>
  </header>


  <!-- DARK OVERLAY -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >

    <div
      v-if="menuOpen"
      class="menu-overlay"
      @click="closeMenu"
    ></div>

  </Transition>


  <!-- SIDE MENU -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-250 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >

    <aside
      v-if="menuOpen"
      class="side-menu"
    >

      <!-- MENU HEADER -->
      <div class="side-menu-header">

        <div>
          <p class="eyebrow">
            MENU
          </p>

          <h2>
            Navigation
          </h2>
        </div>

        <button
          class="menu-close"
          type="button"
          @click="closeMenu"
        >
          ×
        </button>

      </div>


      <!-- NAVIGATION -->
      <nav class="side-nav">

        <button
          class="side-nav-item active"
          type="button"
          @click="navigate('dashboard')"
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          class="side-nav-item"
          type="button"
          @click="navigate('books')"
        >
          <span>▤</span>
          Book Collection
        </button>

        <button
          class="side-nav-item"
          type="button"
          @click="navigate('add')"
        >
          <span>＋</span>
          Add New Book
        </button>

        <button
          class="side-nav-item"
          type="button"
          @click="navigate('categories')"
        >
          <span>◇</span>
          Categories
        </button>

        <button
          class="side-nav-item"
          type="button"
          @click="navigate('borrowed')"
        >
          <span>♧</span>
          Borrowed Records
        </button>

      </nav>


      <div class="side-divider"></div>


      <!-- SYSTEM -->
      <p class="side-section-title">
        SYSTEM
      </p>

      <nav class="side-nav">

        <button
          class="side-nav-item"
          type="button"
          @click="openSettings"
        >
          <span>⚙</span>
          Settings
        </button>

        <button
          class="side-nav-item"
          type="button"
          @click="openHelp"
        >
          <span>?</span>
          Help & Support
        </button>

        <!-- LOGOUT -->
        <button
          class="side-nav-item logout-item"
          type="button"
          @click="logout"
        >
          <span>↪</span>
          Logout
        </button>

      </nav>


      <!-- MODULE CARD -->
      <div class="side-menu-bottom">

        <div class="module-card">

          <span>
            MODULE 7
          </span>

          <strong>
            Book Records Management
          </strong>

          <div class="module-progress">
            <span></span>
          </div>

        </div>

      </div>

    </aside>

  </Transition>


  <!-- SETTINGS -->
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >

    <div
      v-if="settingsOpen"
      class="modal-overlay"
      @click.self="settingsOpen = false"
    >

      <div class="settings-modal">

        <div class="modal-header">

          <div>

            <p class="eyebrow">
              SYSTEM
            </p>

            <h2>
              Settings
            </h2>

            <p>
              Customize your library interface.
            </p>

          </div>

          <button
            class="modal-close"
            type="button"
            @click="settingsOpen = false"
          >
            ×
          </button>

        </div>


        <div class="settings-section">

          <p class="settings-label">
            APPEARANCE
          </p>


          <!-- DARK MODE -->
          <div class="setting-row">

            <div class="setting-icon">
              {{ darkMode ? '☾' : '☀' }}
            </div>

            <div class="setting-info">

              <strong>
                {{ darkMode ? 'Dark Mode' : 'Light Mode' }}
              </strong>

              <span>
                Change the appearance of the system.
              </span>

            </div>

            <button
              class="setting-switch"
              :class="{ enabled: darkMode }"
              type="button"
              @click="toggleTheme"
            >
              <span></span>
            </button>

          </div>


          <!-- ANIMATIONS -->
          <div class="setting-row">

            <div class="setting-icon">
              ✦
            </div>

            <div class="setting-info">

              <strong>
                Smooth Animations
              </strong>

              <span>
                Enable smooth transitions and effects.
              </span>

            </div>

            <button
              class="setting-switch"
              :class="{ enabled: animationsEnabled }"
              type="button"
              @click="toggleAnimations"
            >
              <span></span>
            </button>

          </div>

        </div>


        <div class="settings-info-card">

          <span>ℹ</span>

          <p>
            Your appearance preferences are
            automatically saved to this browser.
          </p>

        </div>


        <button
          class="settings-done"
          type="button"
          @click="settingsOpen = false"
        >
          Done
        </button>

      </div>

    </div>

  </Transition>


  <!-- HELP -->
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >

    <div
      v-if="helpOpen"
      class="modal-overlay"
      @click.self="helpOpen = false"
    >

      <div class="help-modal">

        <div class="modal-header">

          <div>

            <p class="eyebrow">
              SUPPORT
            </p>

            <h2>
              Help & Support
            </h2>

            <p>
              Quick guide for using the system.
            </p>

          </div>

          <button
            class="modal-close"
            type="button"
            @click="helpOpen = false"
          >
            ×
          </button>

        </div>


        <div class="help-list">

          <div class="help-item">

            <span>＋</span>

            <div>
              <strong>
                Add a Book
              </strong>

              <p>
                Use Add New Book from the menu
                or dashboard.
              </p>
            </div>

          </div>


          <div class="help-item">

            <span>⌕</span>

            <div>
              <strong>
                Search Books
              </strong>

              <p>
                Search by title, author,
                category, or Book ID.
              </p>
            </div>

          </div>


          <div class="help-item">

            <span>✎</span>

            <div>
              <strong>
                Edit Records
              </strong>

              <p>
                Click Edit on a book to update
                its information.
              </p>
            </div>

          </div>


          <div class="help-item">

            <span>♧</span>

            <div>
              <strong>
                Book Status
              </strong>

              <p>
                Books can be marked Available
                or Borrowed.
              </p>
            </div>

          </div>

        </div>


        <button
          class="settings-done"
          type="button"
          @click="helpOpen = false"
        >
          Got It
        </button>

      </div>

    </div>

  </Transition>

</template>