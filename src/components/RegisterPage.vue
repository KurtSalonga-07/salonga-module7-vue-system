<script setup>
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['register', 'login'])

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const darkMode = ref(false)

/* =========================================================
   PASSWORD REQUIREMENTS
========================================================= */

const passwordRequirements = computed(() => [
  {
    label: 'At least 6 characters',
    valid: password.value.length >= 6
  },
  {
    label: 'One uppercase letter',
    valid: /[A-Z]/.test(password.value)
  },
  {
    label: 'One lowercase letter',
    valid: /[a-z]/.test(password.value)
  },
  {
    label: 'One number',
    valid: /[0-9]/.test(password.value)
  },
  {
    label: 'One special character',
    valid: /[^A-Za-z0-9]/.test(password.value)
  }
])

const passwordScore = computed(() => {
  return passwordRequirements.value.filter(
    requirement => requirement.valid
  ).length
})

const passwordStrength = computed(() => {
  if (!password.value) return ''

  if (passwordScore.value <= 2) {
    return 'Weak'
  }

  if (passwordScore.value <= 4) {
    return 'Medium'
  }

  return 'Strong'
})

const passwordStrengthClass = computed(() => {
  if (passwordStrength.value === 'Weak') {
    return 'weak'
  }

  if (passwordStrength.value === 'Medium') {
    return 'medium'
  }

  if (passwordStrength.value === 'Strong') {
    return 'strong'
  }

  return ''
})

const passwordIsValid = computed(() => {
  return passwordRequirements.value.every(
    requirement => requirement.valid
  )
})

/* =========================================================
   LOAD SAVED THEME
========================================================= */

onMounted(() => {
  const savedTheme = localStorage.getItem('module7-theme')

  darkMode.value = savedTheme === 'dark'

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
   REGISTER + CREATE SESSION
========================================================= */

function register() {
  error.value = ''

  const nameValue = name.value.trim()
  const emailValue = email.value.trim().toLowerCase()
  const passwordValue = password.value

  if (!nameValue) {
    error.value = 'Please enter your full name.'
    return
  }

  if (!emailValue) {
    error.value = 'Please enter your email address.'
    return
  }

  if (!passwordIsValid.value) {
    error.value = 'Please meet all password requirements.'
    return
  }

  if (passwordValue !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  const users = JSON.parse(
    localStorage.getItem('module7-users') || '[]'
  )

  const existingUser = users.some(
    item =>
      item.email.toLowerCase() === emailValue
  )

  if (existingUser) {
    error.value =
      'An account with this email already exists.'
    return
  }

  const user = {
    id: Date.now(),
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    role: 'Librarian'
  }

  users.push(user)

  localStorage.setItem(
    'module7-users',
    JSON.stringify(users)
  )

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

  emit('register', user)
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

    <!-- REGISTER CARD -->
    <section class="auth-card">

      <!-- BRAND -->
      <div class="auth-brand-mark">
        📖
      </div>

      <p class="auth-eyebrow">
        LIBRARY MANAGEMENT SYSTEM
      </p>

      <h1>
        Create account
      </h1>

      <p class="auth-subtitle">
        Register a librarian account to get started.
      </p>

      <!-- REGISTER FORM -->
      <form
        class="auth-form"
        @submit.prevent="register"
      >

        <!-- FULL NAME -->
        <label>
          Full name
        </label>

        <input
          v-model="name"
          type="text"
          placeholder="Your NickName"
          autocomplete="name"
          required
        />

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
            placeholder="Create a strong password"
            autocomplete="new-password"
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

        <!-- PASSWORD STRENGTH -->
        <div
          v-if="password"
          class="password-feedback"
        >

          <div class="strength-header">

            <span>
              Password strength
            </span>

            <strong
              :class="passwordStrengthClass"
            >
              {{ passwordStrength }}
            </strong>

          </div>

          <div class="strength-bar">

            <span
              :class="passwordStrengthClass"
              :style="{
                width: `${(passwordScore / 5) * 100}%`
              }"
            ></span>

          </div>

          <!-- PASSWORD REQUIREMENTS -->
          <div class="password-requirements">

            <div
              v-for="requirement in passwordRequirements"
              :key="requirement.label"
              class="password-requirement"
              :class="{
                valid: requirement.valid
              }"
            >

              <span class="requirement-icon">
                {{ requirement.valid ? '✓' : '×' }}
              </span>

              <span>
                {{ requirement.label }}
              </span>

            </div>

          </div>

        </div>

        <!-- CONFIRM PASSWORD -->
        <label>
          Confirm password
        </label>

        <div class="password-wrapper">

          <input
            v-model="confirmPassword"
            :type="
              showConfirmPassword
                ? 'text'
                : 'password'
            "
            placeholder="Repeat your password"
            autocomplete="new-password"
            required
          />

          <button
            type="button"
            class="show-password"
            @click="
              showConfirmPassword =
                !showConfirmPassword
            "
          >
            {{
              showConfirmPassword
                ? 'Hide'
                : 'Show'
            }}
          </button>

        </div>

        <!-- PASSWORD MATCH -->
        <p
          v-if="
            confirmPassword &&
            password !== confirmPassword
          "
          class="password-match-error"
        >
          Passwords do not match.
        </p>

        <p
          v-if="
            confirmPassword &&
            password === confirmPassword
          "
          class="password-match-success"
        >
          ✓ Passwords match.
        </p>

        <!-- ERROR -->
        <p
          v-if="error"
          class="auth-error"
        >
          {{ error }}
        </p>

        <!-- REGISTER BUTTON -->
        <button
          class="auth-submit"
          type="submit"
        >
          Create Account
        </button>

      </form>

      <!-- LOGIN -->
      <p class="auth-switch">
        Already have an account?

        <button
          type="button"
          @click="emit('login')"
        >
          Sign in
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
   PASSWORD FEEDBACK
========================================================= */

.password-feedback {
  margin-top: 8px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.15);
}

:global(html:not(.dark)) .password-feedback {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.strength-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
  font-size: 12px;
  color: #94a3b8;
}

.strength-header strong {
  font-size: 12px;
}

.strength-header strong.weak {
  color: #f87171;
}

.strength-header strong.medium {
  color: #fbbf24;
}

.strength-header strong.strong {
  color: #34d399;
}

.strength-bar {
  width: 100%;
  height: 5px;
  overflow: hidden;
  border-radius: 999px;
  background: #334155;
  margin-bottom: 10px;
}

.strength-bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  transition:
    width 0.25s ease,
    background 0.25s ease;
}

.strength-bar span.weak {
  background: #ef4444;
}

.strength-bar span.medium {
  background: #f59e0b;
}

.strength-bar span.strong {
  background: #10b981;
}

.password-requirements {
  display: grid;
  gap: 5px;
}

.password-requirement {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #94a3b8;
  font-size: 12px;
  transition: color 0.2s ease;
}

.password-requirement.valid {
  color: #34d399;
}

.requirement-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  color: #f87171;
  background: rgba(239, 68, 68, 0.12);
}

.password-requirement.valid .requirement-icon {
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
}

/* =========================================================
   PASSWORD MATCH
========================================================= */

.password-match-error {
  margin: 5px 0 0;
  color: #f87171;
  font-size: 12px;
}

.password-match-success {
  margin: 5px 0 0;
  color: #34d399;
  font-size: 12px;
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