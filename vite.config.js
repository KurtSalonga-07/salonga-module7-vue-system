import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/salonga-module7-vue-system/',
  plugins: [vue(), tailwindcss()],
})