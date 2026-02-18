import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/telkom_school_lms/", // <--- GANTI INI dengan nama repository kamu!
})