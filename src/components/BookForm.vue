<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  editingBook: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'save',
  'cancel'
])

const form = reactive({
  bookId: '',
  title: '',
  author: '',
  category: '',
  status: 'Available'
})

const errors = reactive({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

function resetForm() {
  form.bookId = ''
  form.title = ''
  form.author = ''
  form.category = ''
  form.status = 'Available'

  clearErrors()
}

function loadBook(book) {
  clearErrors()

  form.bookId = book?.bookId || ''
  form.title = book?.title || ''
  form.author = book?.author || ''
  form.category = book?.category || ''
  form.status = book?.status || 'Available'
}

watch(
  () => props.editingBook,
  (book) => {
    if (book) {
      loadBook(book)
    } else {
      resetForm()
    }
  },
  {
    immediate: true
  }
)

function validateForm() {
  clearErrors()

  if (!form.bookId.trim()) {
    errors.bookId = 'Book ID is required.'
  }

  if (!form.title.trim()) {
    errors.title = 'Book title is required.'
  }

  if (!form.author.trim()) {
    errors.author = 'Author is required.'
  }

  if (!form.category.trim()) {
    errors.category = 'Category is required.'
  }

  return Object.keys(errors).length === 0
}

function submitForm() {
  if (!validateForm()) {
    return
  }

  emit('save', {
    bookId: form.bookId.trim(),
    title: form.title.trim(),
    author: form.author.trim(),
    category: form.category.trim(),
    status: form.status
  })

  if (!props.editingBook) {
    resetForm()
  }
}

function cancelEdit() {
  resetForm()
  emit('cancel')
}
</script>

<template>
  <section class="form-card">

    <!-- FORM HEADER -->
    <div class="form-header">

      <div class="form-icon">
        {{ editingBook ? '✎' : '＋' }}
      </div>

      <div>
        <h2>
          {{ editingBook ? 'Edit Book' : 'Add New Book' }}
        </h2>

        <p>
          {{
            editingBook
              ? 'Update the information for this book.'
              : 'Enter the book information below.'
          }}
        </p>
      </div>

    </div>

    <!-- BOOK FORM -->
    <form
      class="mt-7 space-y-5"
      @submit.prevent="submitForm"
    >

      <div class="grid gap-5 sm:grid-cols-2">

        <!-- BOOK ID -->
        <div class="form-field">

          <label for="bookId">
            Book ID
          </label>

          <input
            id="bookId"
            v-model="form.bookId"
            type="text"
            placeholder="e.g. BK001"
            autocomplete="off"
            :class="{
              'input-error': errors.bookId
            }"
          />

          <small v-if="errors.bookId">
            {{ errors.bookId }}
          </small>

        </div>

        <!-- BOOK TITLE -->
        <div class="form-field">

          <label for="title">
            Book Title
          </label>

          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="Enter book title"
            autocomplete="off"
            :class="{
              'input-error': errors.title
            }"
          />

          <small v-if="errors.title">
            {{ errors.title }}
          </small>

        </div>

        <!-- AUTHOR -->
        <div class="form-field">

          <label for="author">
            Author
          </label>

          <input
            id="author"
            v-model="form.author"
            type="text"
            placeholder="Enter author name"
            autocomplete="off"
            :class="{
              'input-error': errors.author
            }"
          />

          <small v-if="errors.author">
            {{ errors.author }}
          </small>

        </div>

        <!-- CATEGORY -->
        <div class="form-field">

          <label for="category">
            Category
          </label>

          <input
            id="category"
            v-model="form.category"
            type="text"
            placeholder="e.g. Programming"
            autocomplete="off"
            :class="{
              'input-error': errors.category
            }"
          />

          <small v-if="errors.category">
            {{ errors.category }}
          </small>

        </div>

        <!-- STATUS -->
        <div class="form-field sm:col-span-2">

          <label for="status">
            Status
          </label>

          <select
            id="status"
            v-model="form.status"
          >
            <option value="Available">
              Available
            </option>

            <option value="Borrowed">
              Borrowed
            </option>
          </select>

        </div>

      </div>

      <!-- FORM ACTIONS -->
      <div class="form-actions">

        <button
          v-if="editingBook"
          type="button"
          class="cancel-button"
          @click="cancelEdit"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="save-button"
        >
          <span>
            {{ editingBook ? '✓' : '＋' }}
          </span>

          {{
            editingBook
              ? 'Update Book'
              : 'Add Book'
          }}
        </button>

      </div>

    </form>

  </section>
</template>