import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../src/App.vue'

describe('Library Management System', () => {
  beforeEach(() => {
    localStorage.clear()

    window.confirm = vi.fn(() => true)

    global.requestAnimationFrame = (callback) => {
      callback()
      return 1
    }
  })

  function createWrapper() {
    return mount(App)
  }

  function fillBookForm(wrapper, {
    bookId = 'BK001',
    title = 'Introduction to Programming',
    author = 'John Smith',
    category = 'Programming',
    status = 'Available'
  } = {}) {
    const inputs = wrapper.findAll('input')

    const bookIdInput = inputs.find(
      input => input.attributes('id') === 'bookId'
    )

    const titleInput = inputs.find(
      input => input.attributes('id') === 'title'
    )

    const authorInput = inputs.find(
      input => input.attributes('id') === 'author'
    )

    const categoryInput = inputs.find(
      input => input.attributes('id') === 'category'
    )

    return Promise.all([
      bookIdInput.setValue(bookId),
      titleInput.setValue(title),
      authorInput.setValue(author),
      categoryInput.setValue(category)
    ])
  }

  async function addBook(wrapper, book = {}) {
    await fillBookForm(wrapper, book)

    const form = wrapper.find('form')

    await form.trigger('submit.prevent')

    await wrapper.vm.$nextTick()
  }

  // TEST 1 — ADD BOOK
  it('adds a new book successfully', async () => {
    const wrapper = createWrapper()

    await addBook(wrapper)

    expect(wrapper.vm.books).toHaveLength(1)
    expect(wrapper.vm.books[0].bookId).toBe('BK001')
    expect(wrapper.vm.books[0].title)
      .toBe('Introduction to Programming')

    expect(wrapper.vm.message)
      .toBe('Book successfully added!')
  })

  // TEST 2 — DISPLAY RECORDS
  it('displays added book records in the collection', async () => {
    const wrapper = createWrapper()

    await addBook(wrapper, {
      bookId: 'BK002',
      title: 'Database Systems',
      author: 'Jane Doe',
      category: 'Database'
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Database Systems')
    expect(wrapper.text()).toContain('Jane Doe')
    expect(wrapper.text()).toContain('BK002')
  })

  // TEST 3 — EDIT BOOK
  it('updates an existing book successfully', async () => {
    const wrapper = createWrapper()

    await addBook(wrapper, {
      bookId: 'BK003',
      title: 'Old Book Title',
      author: 'Original Author',
      category: 'Programming'
    })

    const book = wrapper.vm.books[0]

    wrapper.vm.editBook(book)

    await wrapper.vm.$nextTick()

    await fillBookForm(wrapper, {
      bookId: 'BK003',
      title: 'Updated Book Title',
      author: 'Updated Author',
      category: 'Programming'
    })

    await wrapper.find('form').trigger('submit.prevent')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.books[0].title)
      .toBe('Updated Book Title')

    expect(wrapper.vm.books[0].author)
      .toBe('Updated Author')

    expect(wrapper.vm.message)
      .toBe('Book successfully updated!')
  })

  // TEST 4 — DELETE BOOK
  it('deletes a book after confirmation', async () => {
    const wrapper = createWrapper()

    await addBook(wrapper, {
      bookId: 'BK004',
      title: 'Book to Delete',
      author: 'Test Author',
      category: 'Testing'
    })

    expect(wrapper.vm.books).toHaveLength(1)

    const book = wrapper.vm.books[0]

    wrapper.vm.deleteBook(book)

    await wrapper.vm.$nextTick()

    expect(window.confirm).toHaveBeenCalled()
    expect(wrapper.vm.books).toHaveLength(0)

    expect(wrapper.vm.message)
      .toBe('Book successfully deleted!')
  })

  // TEST 5 — SEARCH
 it('adds a new book successfully', async () => {
  const wrapper = createWrapper()

  await addBook(wrapper, {
    bookId: 'BK999',
    title: 'First Book',
    author: 'Author One',
    category: 'Programming'
  })

  await addBook(wrapper, {
    bookId: 'BK999',
    title: 'Second Book',
    author: 'Author Two',
    category: 'Database'
  })

  expect(wrapper.vm.books).toHaveLength(1)
})
})