<script setup>
import { computed, onMounted, ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import BookForm from './components/BookForm.vue'
import BookList from './components/BookList.vue'
import AppFooter from './components/AppFooter.vue'

/* =========================================================
   LIBRARY DATA
========================================================= */

const books = ref([])
const searchTerm = ref('')
const editingBook = ref(null)

const message = ref('')
const messageType = ref('success')

const STORAGE_KEY = 'module7-library-books'

/* =========================================================
   LOAD SAVED BOOKS
========================================================= */

onMounted(() => {
  const savedBooks = localStorage.getItem(STORAGE_KEY)

  if (savedBooks) {
    try {
      books.value = JSON.parse(savedBooks)
    } catch {
      books.value = []
    }
  }
})

/* =========================================================
   SAVE BOOKS
========================================================= */

function saveBooks() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(books.value)
  )
}

/* =========================================================
   SUCCESS / ERROR MESSAGE
========================================================= */

let messageTimer = null

function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type

  clearTimeout(messageTimer)

  messageTimer = setTimeout(() => {
    message.value = ''
  }, 3500)
}

/* =========================================================
   ADD BOOK
========================================================= */

function addBook(book) {

  const exists = books.value.some(
    item =>
      item.bookId?.toLowerCase() ===
      book.bookId?.toLowerCase()
  )

  if (exists) {

    showMessage(
      'A book with this Book ID already exists.',
      'error'
    )

    return
  }

  books.value.unshift({
    id: Date.now(),
    ...book
  })

  saveBooks()

  showMessage(
    'Book successfully added!',
    'success'
  )
}

/* =========================================================
   UPDATE BOOK
========================================================= */

function updateBook(book) {

  if (!editingBook.value) return

  const index = books.value.findIndex(
    item =>
      item.id === editingBook.value.id
  )

  if (index === -1) return

  const duplicate = books.value.some(
    item =>
      item.id !== editingBook.value.id &&
      item.bookId?.toLowerCase() ===
      book.bookId?.toLowerCase()
  )

  if (duplicate) {

    showMessage(
      'A book with this Book ID already exists.',
      'error'
    )

    return
  }

  books.value[index] = {
    ...books.value[index],
    ...book
  }

  saveBooks()

  editingBook.value = null

  showMessage(
    'Book successfully updated!',
    'success'
  )
}

/* =========================================================
   SAVE BOOK
========================================================= */

function saveBook(book) {

  if (editingBook.value) {
    updateBook(book)
  } else {
    addBook(book)
  }

}

/* =========================================================
   EDIT BOOK
========================================================= */

function editBook(book) {

  editingBook.value = {
    ...book
  }

  requestAnimationFrame(() => {

    document
      .getElementById('book-form')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

  })

}

/* =========================================================
   CANCEL EDIT
========================================================= */

function cancelEdit() {
  editingBook.value = null
}

/* =========================================================
   DELETE BOOK
========================================================= */

function deleteBook(book) {

  const confirmed = window.confirm(
    `Are you sure you want to delete "${book.title}"?`
  )

  if (!confirmed) return

  books.value = books.value.filter(
    item =>
      item.id !== book.id
  )

  saveBooks()

  if (
    editingBook.value?.id === book.id
  ) {
    editingBook.value = null
  }

  showMessage(
    'Book successfully deleted!',
    'success'
  )
}

/* =========================================================
   NAVIGATION
========================================================= */

function navigate(section) {

  if (section === 'dashboard') {

    searchTerm.value = ''

    scrollToSection('dashboard')

    return
  }

  if (section === 'books') {

    searchTerm.value = ''

    scrollToSection('books')

    return
  }

  if (section === 'add') {

    editingBook.value = null

    scrollToSection('book-form')

    return
  }

  if (section === 'borrowed') {

    searchTerm.value = 'Borrowed'

    scrollToSection('books')

    return
  }

  if (section === 'categories') {

    searchTerm.value = ''

    scrollToSection('overview')

  }

}

/* =========================================================
   SCROLL
========================================================= */

function scrollToSection(id) {

  requestAnimationFrame(() => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

  })

}

/* =========================================================
   SEARCH
========================================================= */

const filteredBooks = computed(() => {

  const keyword =
    searchTerm.value
      .toLowerCase()
      .trim()

  if (!keyword) {
    return books.value
  }

  return books.value.filter(book =>

    [
      book.bookId,
      book.title,
      book.author,
      book.category,
      book.status
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(keyword)

  )

})

/* =========================================================
   STATISTICS
========================================================= */

const availableBooks = computed(() =>

  books.value.filter(
    book =>
      book.status === 'Available'
  ).length

)

const borrowedBooks = computed(() =>

  books.value.filter(
    book =>
      book.status === 'Borrowed'
  ).length

)

const categoryCount = computed(() =>

  new Set(
    books.value
      .map(book => book.category)
      .filter(Boolean)
  ).size

)

const availabilityPercentage = computed(() => {

  if (!books.value.length) {
    return 0
  }

  return Math.round(
    (
      availableBooks.value /
      books.value.length
    ) * 100
  )

})

/* =========================================================
   CATEGORY STATISTICS
========================================================= */

const categoryStats = computed(() => {

  const result = {}

  books.value.forEach(book => {

    const category =
      book.category ||
      'Uncategorized'

    result[category] =
      (result[category] || 0) + 1

  })

  return Object.entries(result)
    .map(([name, count]) => ({

      name,
      count,

      percentage:
        books.value.length
          ? Math.round(
              (
                count /
                books.value.length
              ) * 100
            )
          : 0

    }))
    .sort(
      (a, b) =>
        b.count - a.count
    )
    .slice(0, 4)

})

/* =========================================================
   RECENT BOOKS
========================================================= */

const recentBooks = computed(() =>
  books.value.slice(0, 4)
)

const categoryColors = [
  'violet',
  'green',
  'orange',
  'blue'
]

const bookColors = [
  'purple',
  'green',
  'orange',
  'blue'
]

function getCategoryColor(index) {

  return categoryColors[
    index % categoryColors.length
  ]

}

function getBookColor(index) {

  return bookColors[
    index % bookColors.length
  ]

}
</script>


<template>

  <div class="app-shell min-h-screen">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <AppHeader
      @navigate="navigate"
    />


    <main
      class="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8"
    >

      <!-- ===================================================
           DASHBOARD HERO
      ==================================================== -->

      <section
        id="dashboard"
        class="dashboard-anchor mb-7 grid gap-5 xl:grid-cols-[1.45fr_.55fr]"
      >

        <div class="hero-dashboard redesigned-hero">

          <div class="hero-grid-pattern"></div>

          <div class="hero-orb hero-orb-one"></div>
          <div class="hero-orb hero-orb-two"></div>
          <div class="hero-orb hero-orb-three"></div>


          <div class="hero-content redesigned-hero-content">

            <div class="hero-welcome-badge">

              <span class="hero-status-dot"></span>

              <span>
                Your library at a glance
              </span>

              <span class="hero-badge-arrow">
                ✦
              </span>

            </div>


            <p class="eyebrow hero-eyebrow">
              LIBRARY DASHBOARD
            </p>


            <h1 class="hero-main-title">

              Welcome back,

              <span class="hero-name">
                Kurt
              </span>

              <span class="hero-wave">
                👋
              </span>

            </h1>


            <p class="hero-description hero-description-large">
              Manage your library collection,
              discover your records, and keep
              everything organized in one beautiful
              workspace.
            </p>


            <div class="hero-actions hero-actions-large">

              <button
                class="hero-primary hero-primary-large"
                type="button"
                @click="navigate('add')"
              >

                <span class="button-plus">
                  ＋
                </span>

                <span>
                  Add New Book
                </span>

              </button>


              <button
                class="hero-secondary hero-secondary-large"
                type="button"
                @click="navigate('books')"
              >

                <span>
                  View Collection
                </span>

                <span class="button-arrow">
                  →
                </span>

              </button>

            </div>


            <div class="hero-mini-stats redesigned-mini-stats">

              <div class="hero-stat">

                <div class="hero-stat-icon purple">
                  ▤
                </div>

                <div>

                  <strong>
                    {{ books.length }}
                  </strong>

                  <span>
                    Total books
                  </span>

                </div>

              </div>


              <div class="hero-stat-divider"></div>


              <div class="hero-stat">

                <div class="hero-stat-icon green">
                  ✓
                </div>

                <div>

                  <strong>
                    {{ availableBooks }}
                  </strong>

                  <span>
                    Available
                  </span>

                </div>

              </div>


              <div class="hero-stat-divider"></div>


              <div class="hero-stat">

                <div class="hero-stat-icon blue">
                  ◇
                </div>

                <div>

                  <strong>
                    {{ categoryCount }}
                  </strong>

                  <span>
                    Categories
                  </span>

                </div>

              </div>

            </div>

          </div>


          <!-- LIBRARY ILLUSTRATION -->

          <div
            class="hero-library-art-clean improved-library-art"
            aria-hidden="true"
          >

            <div class="library-glow"></div>

            <div class="library-back-circle"></div>


            <div class="floating-library-card card-one">

              <span class="card-icon">
                📚
              </span>

              <div>

                <strong>
                  Collection
                </strong>

                <small>
                  Organized
                </small>

              </div>

            </div>


            <div class="floating-library-card card-two">

              <span class="card-icon">
                ✓
              </span>

              <div>

                <strong>
                  Available
                </strong>

                <small>
                  Ready to borrow
                </small>

              </div>

            </div>


            <div class="modern-bookshelf">

              <div class="shelf-books">

                <div class="modern-book modern-book-purple">
                  <span></span>
                </div>

                <div class="modern-book modern-book-blue">
                  <span></span>
                </div>

                <div class="modern-book modern-book-green">
                  <span></span>
                </div>

                <div class="modern-book modern-book-orange">
                  <span></span>
                </div>

                <div class="modern-book modern-book-violet">
                  <span></span>
                </div>

              </div>


              <div class="modern-shelf-line"></div>

              <div class="modern-shelf-shadow"></div>

            </div>


            <div class="hero-sparkle sparkle-one">
              ✦
            </div>

            <div class="hero-sparkle sparkle-two">
              •
            </div>

            <div class="hero-sparkle sparkle-three">
              ✦
            </div>

          </div>

        </div>


        <!-- =================================================
             TODAY'S QUOTE
        ================================================== -->

        <div class="dashboard-quote">

          <div class="quote-top">

            <span class="eyebrow">
              TODAY'S QUOTE
            </span>

            <span class="big-quote">
              “
            </span>

          </div>


          <div class="quote-content">

            <div class="quote-icon">
              ✦
            </div>

            <p>
              Books are a uniquely
              portable magic.
            </p>

            <span>
              — Stephen King
            </span>

          </div>


          <div class="quote-decoration">

            <i></i>
            <i></i>
            <i></i>

          </div>

        </div>

      </section>


      <!-- ===================================================
           STATISTICS
      ==================================================== -->

      <section
        class="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >

        <div class="new-stat-card purple-card">

          <div class="new-stat-icon">
            ▤
          </div>

          <div class="new-stat-info">

            <span>
              TOTAL BOOKS
            </span>

            <strong>
              {{ books.length }}
            </strong>

            <small>
              Complete collection
            </small>

          </div>

          <div class="stat-corner"></div>

        </div>


        <div class="new-stat-card green-card">

          <div class="new-stat-icon">
            ✓
          </div>

          <div class="new-stat-info">

            <span>
              AVAILABLE
            </span>

            <strong>
              {{ availableBooks }}
            </strong>

            <small>
              Ready to borrow
            </small>

          </div>

          <div class="stat-corner"></div>

        </div>


        <div class="new-stat-card orange-card">

          <div class="new-stat-icon">
            ♧
          </div>

          <div class="new-stat-info">

            <span>
              BORROWED
            </span>

            <strong>
              {{ borrowedBooks }}
            </strong>

            <small>
              Currently borrowed
            </small>

          </div>

          <div class="stat-corner"></div>

        </div>


        <div class="new-stat-card blue-card">

          <div class="new-stat-icon">
            ◇
          </div>

          <div class="new-stat-info">

            <span>
              CATEGORIES
            </span>

            <strong>
              {{ categoryCount }}
            </strong>

            <small>
              Different categories
            </small>

          </div>

          <div class="stat-corner"></div>

        </div>

      </section>


      <!-- ===================================================
           OVERVIEW
      ==================================================== -->

      <section
        id="overview"
        class="dashboard-grid mb-7"
      >

        <div class="overview-card">

          <div class="overview-header">

            <div>

              <p class="eyebrow">
                COLLECTION INSIGHTS
              </p>

              <h2>
                Library Overview
              </h2>

              <p>
                A quick look at your collection.
              </p>

            </div>

            <div class="overview-icon">
              ✦
            </div>

          </div>


          <div class="overview-body">

            <div class="growth-panel">

              <div class="growth-heading">

                <div>

                  <span>
                    COLLECTION
                  </span>

                  <strong>
                    {{ books.length }}
                  </strong>

                </div>

                <div class="growth-percent">
                  ↑ 12.6%
                </div>

              </div>


              <div class="library-chart">

                <div class="chart-line one"></div>
                <div class="chart-line two"></div>
                <div class="chart-line three"></div>


                <svg
                  viewBox="0 0 600 220"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="libraryArea"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stop-color="#8b5cf6"
                        stop-opacity=".3"
                      />

                      <stop
                        offset="100%"
                        stop-color="#8b5cf6"
                        stop-opacity="0"
                      />

                    </linearGradient>

                  </defs>


                  <path
                    d="
                      M0 185
                      C50 165 75 155 120 168
                      C160 178 185 125 225 145
                      C260 165 285 110 325 130
                      C370 152 390 78 430 103
                      C475 125 500 65 540 80
                      C560 86 580 58 600 42
                      L600 220
                      L0 220 Z
                    "
                    fill="url(#libraryArea)"
                  />


                  <path
                    d="
                      M0 185
                      C50 165 75 155 120 168
                      C160 178 185 125 225 145
                      C260 165 285 110 325 130
                      C370 152 390 78 430 103
                      C475 125 500 65 540 80
                      C560 86 580 58 600 42
                    "
                    fill="none"
                    stroke="#8b5cf6"
                    stroke-width="5"
                    stroke-linecap="round"
                  />


                  <circle
                    cx="600"
                    cy="42"
                    r="7"
                    fill="#8b5cf6"
                  />

                </svg>

              </div>


              <div class="chart-labels">

                <span>
                  Week 1
                </span>

                <span>
                  Week 2
                </span>

                <span>
                  Week 3
                </span>

                <span>
                  Week 4
                </span>

              </div>

            </div>


            <div class="category-panel">

              <div class="category-panel-header">

                <div>

                  <span>
                    CATEGORIES
                  </span>

                  <strong>
                    Top Categories
                  </strong>

                </div>

                <span>
                  {{ categoryCount }}
                </span>

              </div>


              <div
                v-if="categoryStats.length"
                class="category-list"
              >

                <div
                  v-for="(category, index) in categoryStats"
                  :key="category.name"
                  class="category-item"
                >

                  <div class="category-item-top">

                    <div class="category-name">

                      <i
                        :class="
                          `category-dot ${getCategoryColor(index)}`
                        "
                      ></i>

                      {{ category.name }}

                    </div>

                    <strong>
                      {{ category.count }}
                    </strong>

                  </div>


                  <div class="category-progress">

                    <span
                      :class="
                        getCategoryColor(index)
                      "
                      :style="{
                        width:
                          `${category.percentage}%`
                      }"
                    ></span>

                  </div>

                </div>

              </div>


              <div
                v-else
                class="overview-empty"
              >

                <span>
                  ◇
                </span>

                <p>
                  Add books to generate
                  category insights.
                </p>

              </div>

            </div>

          </div>

        </div>


        <!-- =================================================
             STATUS
        ================================================== -->

        <div class="status-dashboard-card">

          <div class="overview-header">

            <div>

              <p class="eyebrow">
                AVAILABILITY
              </p>

              <h2>
                Library Status
              </h2>

              <p>
                Current book availability.
              </p>

            </div>

            <div class="overview-icon green">
              ✓
            </div>

          </div>


          <div
            class="large-status-ring"
            :style="{
              '--status':
                availabilityPercentage
            }"
          >

            <div class="status-ring-inner">

              <strong>
                {{ availabilityPercentage }}%
              </strong>

              <span>
                Available
              </span>

            </div>

          </div>


          <div class="status-summary">

            <div>

              <span>
                <i class="green-dot"></i>
                Available
              </span>

              <strong>
                {{ availableBooks }}
              </strong>

            </div>


            <div>

              <span>
                <i class="orange-dot"></i>
                Borrowed
              </span>

              <strong>
                {{ borrowedBooks }}
              </strong>

            </div>

          </div>

        </div>

      </section>


      <!-- ===================================================
           RECENT BOOKS
      ==================================================== -->

      <section
        class="recent-books-dashboard mb-7"
      >

        <div class="recent-books-header">

          <div>

            <p class="eyebrow">
              YOUR COLLECTION
            </p>

            <h2>
              Recently Added Books
            </h2>

            <p>
              The latest books added to your library.
            </p>

          </div>


          <button
            class="recent-view-button"
            type="button"
            @click="navigate('books')"
          >

            View All

            <span>
              →
            </span>

          </button>

        </div>


        <div
          v-if="recentBooks.length"
          class="recent-books-grid"
        >

          <article
            v-for="(book, index) in recentBooks"
            :key="book.id"
            class="new-book-card"
          >

            <div
              class="new-book-cover"
              :class="
                `book-cover-${getBookColor(index)}`
              "
            >

              <div class="book-cover-shine"></div>

              <span>
                {{
                  book.title
                    ?.charAt(0)
                    ?.toUpperCase()
                }}
              </span>

              <small>
                BOOK
              </small>

            </div>


            <div class="new-book-info">

              <span class="new-book-category">
                {{ book.category || 'General' }}
              </span>

              <h3>
                {{ book.title }}
              </h3>

              <p>
                {{ book.author }}
              </p>


              <div class="new-book-bottom">

                <span
                  class="book-status"
                  :class="
                    book.status === 'Available'
                      ? 'available'
                      : 'borrowed'
                  "
                >

                  <i></i>

                  {{ book.status }}

                </span>


                <span class="book-id-small">
                  {{ book.bookId }}
                </span>

              </div>

            </div>

          </article>

        </div>


        <div
          v-else
          class="recent-empty"
        >

          <div>
            📚
          </div>

          <h3>
            Your collection is empty
          </h3>

          <p>
            Add your first book to see it here.
          </p>

          <button
            type="button"
            @click="navigate('add')"
          >
            ＋ Add First Book
          </button>

        </div>

      </section>


      <!-- ===================================================
           BOOK FORM
      ==================================================== -->

      <section
        id="book-form"
        class="mb-8 scroll-mt-24"
      >

        <div class="section-heading">

          <p class="eyebrow">
            BOOK MANAGEMENT
          </p>

          <h2>
            {{
              editingBook
                ? 'Update Book Record'
                : 'Add a Book'
            }}
          </h2>

          <p>
            {{
              editingBook
                ? 'Update the selected book information.'
                : 'Create a new record for your library collection.'
            }}
          </p>

        </div>


        <!-- ===================================================
             SUCCESS / ERROR MESSAGE
        ==================================================== -->

        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >

          <div
            v-if="message"
            class="mb-4 flex w-full items-center justify-between rounded-xl border px-5 py-3"
            :class="
              messageType === 'success'
                ? 'border-emerald-300/20 bg-emerald-500/10 text-emerald-300'
                : 'border-red-300/20 bg-red-500/10 text-red-300'
            "
          >

            <div class="flex items-center gap-3">

              <span class="text-base font-bold">
                {{ messageType === 'success' ? '✓' : '!' }}
              </span>

              <span class="text-sm font-semibold">
                {{ message }}
              </span>

            </div>

            <button
              type="button"
              class="text-lg opacity-50 transition hover:opacity-100"
              aria-label="Close notification"
              @click="message = ''"
            >
              ×
            </button>

          </div>

        </Transition>


        <BookForm
          :editing-book="editingBook"
          @save="saveBook"
          @cancel="cancelEdit"
        />

      </section>


      <!-- ===================================================
           BOOK COLLECTION
      ==================================================== -->

      <section
        id="books"
        class="scroll-mt-24"
      >

        <BookList
          :books="filteredBooks"
          :search-term="searchTerm"
          @update:search-term="
            searchTerm = $event
          "
          @edit="editBook"
          @delete="deleteBook"
        />

      </section>

    </main>


    <!-- FOOTER -->

    <AppFooter />

  </div>

</template>