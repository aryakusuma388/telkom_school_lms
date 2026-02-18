/** @type {import('tailwindcss').Config} */
export default {
  // Pastikan path ini mencakup semua file di folder src
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Kita bisa menambahkan font di sini juga
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}