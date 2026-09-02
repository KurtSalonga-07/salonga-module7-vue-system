import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../src/App.vue'

describe('Library Management System', () => {
  let wrapper

  beforeEach(() => {
    localStorage.clear()

    wrapper = mount(App, {
      global: {
        stubs: {
          AppHeader: true,
          AppFooter: true,
          LoginPage: true,
          RegisterPage: true
        }
      }
    })

    wrapper.vm.currentUser = {
      name: 'Test User'
    }
  })

  it('adds a new book successfully', async () => {
    const book = {
      bookId: 'B001',
      title: 'Introduction to Programming',
      author: 'John Smith',
      category: 'Programming',
      status: 'Available'
    }

    wrapper.vm.addBook(book)

    expect(wrapper.vm.books).toHaveLength(1)
    expect(wrapper.vm.books[0]).toMatchObject(book)
  })

  it('displays added book records in the collection', async () => {
    const book = {
      bookId: 'B002',
      title: 'Web Development',
      author: 'Jane Doe',
      category: 'Technology',
      status: 'Available'
    }

    wrapper.vm.addBook(book)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.books).toHaveLength(1)
    expect(wrapper.vm.books[0].title).toBe('Web Development')
    expect(wrapper.vm.books[0].author).toBe('Jane Doe')
  })

  it('updates an existing book successfully', async () => {
    const originalBook = {
      bookId: 'B003',
      title: 'Old Title',
      author: 'Author One',
      category: 'Programming',
      status: 'Available'
    }

    wrapper.vm.addBook(originalBook)

    wrapper.vm.editingBook = {
      ...wrapper.vm.books[0]
    }

    const updatedBook = {
      bookId: 'B003',
      title: 'Updated Title',
      author: 'Author Two',
      category: 'Technology',
      status: 'Borrowed'
    }

    wrapper.vm.updateBook(updatedBook)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.books[0]).toMatchObject(updatedBook)
    expect(wrapper.vm.editingBook).toBe(null)
  })

  it('deletes a book after confirmation', async () => {
    const book = {
      bookId: 'B004',
      title: 'Book to Delete',
      author: 'Test Author',
      category: 'General',
      status: 'Available'
    }

    wrapper.vm.addBook(book)

    vi.spyOn(window, 'confirm').mockReturnValue(true)

    const bookToDelete = wrapper.vm.books[0]

    wrapper.vm.deleteBook(bookToDelete)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.books).toHaveLength(0)

    window.confirm.mockRestore()
  })

  it('rejects a duplicate Book ID', async () => {
    const firstBook = {
      bookId: 'B005',
      title: 'First Book',
      author: 'Author One',
      category: 'Programming',
      status: 'Available'
    }

    const duplicateBook = {
      bookId: 'B005',
      title: 'Duplicate Book',
      author: 'Author Two',
      category: 'Technology',
      status: 'Available'
    }

    wrapper.vm.addBook(firstBook)
    wrapper.vm.addBook(duplicateBook)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.books).toHaveLength(1)
    expect(wrapper.vm.books[0].title).toBe('First Book')
    expect(wrapper.vm.message).toBe(
      'A book with this Book ID already exists.'
    )
  })
})