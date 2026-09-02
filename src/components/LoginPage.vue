<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['login', 'register'])

const email = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)
const darkMode = ref(false)

/* =========================================================
   LOAD SAVED THEME
========================================================= */

onMounted(() => {
  darkMode.value =
    localStorage.getItem('module7-theme') === 'dark'

  document.documentElement.classList.toggle(
    'dark',
    darkMode.value
  )
})

/* =========================================================
   TOGGLE LIGHT / DARK MODE
========================================================= */

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

/* =========================================================
   LOGIN + CREATE SESSION
========================================================= */

function login() {
  error.value = ''

  const emailValue = email.value.trim().toLowerCase()

  if (!emailValue || !password.value) {
    error.value =
      'Please enter your email and password.'
    return
  }

  const users = JSON.parse(
    localStorage.getItem('module7-users') || '[]'
  )

  const user = users.find(
    item =>
      item.email.toLowerCase() === emailValue &&
      item.password === password.value
  )

  if (!user) {
    error.value = 'Invalid email or password.'
    return
  }

  /* =======================================================
     CREATE SESSION
  ======================================================= */

  const session = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    loggedInAt: new Date().toISOString()
  }

  localStorage.setItem(
    'module7-session',
    JSON.stringify(session)
  )

  localStorage.setItem(
    'module7-current-user',
    JSON.stringify(user)
  )

  emit('login', user)
}
</script>

<template>
  <main class="auth-page">

    <!-- THEME BUTTON -->
    <button
      class="auth-theme-toggle"
      type="button"
      @click="toggleTheme"
      :aria-label="
        darkMode
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      "
    >
      <span>
        {{ darkMode ? '☀' : '☾' }}
      </span>

      <span>
        {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
      </span>
    </button>

    <!-- LOGIN CARD -->
    <section class="auth-card">

      <!-- BRAND -->
      <div class="auth-brand-mark">
        📖
      </div>

      <p class="auth-eyebrow">
        LIBRARY MANAGEMENT SYSTEM
      </p>

      <h1>
        Welcome
      </h1>

      <p class="auth-subtitle">
        Sign in to continue managing your library.
      </p>

      <!-- LOGIN FORM -->
      <form
        class="auth-form"
        @submit.prevent="login"
      >

        <!-- EMAIL -->
        <label>
          Email address
        </label>

        <input
          v-model="email"
          type="email"
          placeholder="Email@gmail.com"
          autocomplete="email"
          required
        />

        <!-- PASSWORD -->
        <label>
          Password
        </label>

        <div class="password-wrapper">

          <input
            v-model="password"
            :type="
              showPassword
                ? 'text'
                : 'password'
            "
            placeholder="Enter your password"
            autocomplete="current-password"
            required
          />

          <button
            type="button"
            class="show-password"
            @click="
              showPassword = !showPassword
            "
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>

        </div>

        <!-- ERROR -->
        <p
          v-if="error"
          class="auth-error"
        >
          {{ error }}
        </p>

        <!-- LOGIN BUTTON -->
        <button
          class="auth-submit"
          type="submit"
        >
          Sign In
        </button>

      </form>

      <!-- REGISTER -->
      <p class="auth-switch">
        Don't have an account?

        <button
          type="button"
          @click="emit('register')"
        >
          Create one
        </button>
      </p>

    </section>

  </main>
</template>

<style scoped>
/* =========================================================
   THEME BUTTON
========================================================= */

.auth-theme-toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 1px solid #334155;
  border-radius: 10px;
  background: #1e293b;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.auth-theme-toggle:hover {
  background: #273449;
  color: #ffffff;
}

.auth-theme-toggle span:first-child {
  font-size: 17px;
}

/* =========================================================
   LIGHT MODE
========================================================= */

:global(html:not(.dark)) .auth-theme-toggle {
  background: #ffffff;
  border-color: #dbe2ea;
  color: #334155;
}

:global(html:not(.dark)) .auth-theme-toggle:hover {
  background: #f8fafc;
  color: #0f172a;
}

/* =========================================================
   PASSWORD
========================================================= */

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 75px;
}

.show-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 5px;
}

.show-password:hover {
  color: #ffffff;
}

:global(html:not(.dark)) .show-password:hover {
  color: #0f172a;
}

/* =========================================================
   ERROR
========================================================= */

.auth-error {
  margin: 4px 0 0;
  color: #f87171;
  font-size: 13px;
  line-height: 1.5;
}
</style>