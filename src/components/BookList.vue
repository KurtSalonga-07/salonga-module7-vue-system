<script setup>
defineProps({
  books: {
    type: Array,
    default: () => []
  },

  searchTerm: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'edit',
  'delete',
  'update:searchTerm'
])

function updateSearch(event) {
  emit(
    'update:searchTerm',
    event.target.value
  )
}
</script>

<template>
  <section class="collection-section">

    <div class="collection-heading">

      <div>
        <p class="eyebrow">
          COLLECTION
        </p>

        <h2>
          Book Collection
        </h2>

        <p>
          Search and manage your library records.
        </p>
      </div>

      <span class="book-count">
        {{ books.length }}
        {{ books.length === 1 ? 'book' : 'books' }}
      </span>

    </div>

    <!-- Search -->
    <div class="collection-search">

      <span>
        ⌕
      </span>

      <input
        :value="searchTerm"
        @input="updateSearch"
        type="search"
        placeholder="Search by title, author, category, or Book ID..."
      />

    </div>

    <!-- Empty -->
    <div
      v-if="books.length === 0"
      class="empty-collection"
    >
      <div class="empty-icon">
        ▤
      </div>

      <h3>
        No books found
      </h3>

      <p>
        {{
          searchTerm
            ? 'Try searching with a different keyword.'
            : 'Add your first book to start building the collection.'
        }}
      </p>
    </div>

    <!-- Desktop -->
    <div
      v-else
      class="book-table-wrapper hidden md:block"
    >

      <table class="book-table">

        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="book in books"
            :key="book.id"
          >

            <td>
              <span class="book-id">
                {{ book.bookId }}
              </span>
            </td>

            <td>
              <strong>
                {{ book.title }}
              </strong>
            </td>

            <td>
              {{ book.author }}
            </td>

            <td>
              <span class="category-pill">
                {{ book.category }}
              </span>
            </td>

            <td>
              <span
                class="status-pill"
                :class="
                  book.status === 'Available'
                    ? 'status-available'
                    : 'status-borrowed'
                "
              >
                {{ book.status }}
              </span>
            </td>

            <td>
              <div class="table-actions">

                <button
                  type="button"
                  @click="emit('edit', book)"
                  class="edit-button"
                >
                  Edit
                </button>

                <button
                  type="button"
                  @click="emit('delete', book)"
                  class="delete-button"
                >
                  Delete
                </button>

              </div>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- Mobile -->
    <div
      v-if="books.length"
      class="mobile-book-list md:hidden"
    >

      <article
        v-for="book in books"
        :key="book.id"
        class="mobile-book-card"
      >

        <div class="flex items-start justify-between gap-3">

          <div>
            <span class="book-id">
              {{ book.bookId }}
            </span>

            <h3>
              {{ book.title }}
            </h3>
          </div>

          <span
            class="status-pill"
            :class="
              book.status === 'Available'
                ? 'status-available'
                : 'status-borrowed'
            "
          >
            {{ book.status }}
          </span>

        </div>

        <div class="mt-4 space-y-2 text-sm">
          <p>
            <strong>Author:</strong>
            {{ book.author }}
          </p>

          <p>
            <strong>Category:</strong>
            {{ book.category }}
          </p>
        </div>

        <div class="mobile-actions">

          <button
            type="button"
            @click="emit('edit', book)"
            class="edit-button flex-1"
          >
            Edit
          </button>

          <button
            type="button"
            @click="emit('delete', book)"
            class="delete-button flex-1"
          >
            Delete
          </button>

        </div>

      </article>

    </div>

  </section>
</template>