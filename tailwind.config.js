module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,js,jsx}",
    "./src/pages/homepage/**/*.{html,js,jsx}",
    "./src/pages/login/**/*.{html,js,jsx}",
    "./src/pages/marketplace/**/*.{html,js,jsx}",
    "./src/pages/profile/**/*.{html,js,jsx}",
    "./src/nav/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
