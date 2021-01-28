const button = document.querySelector('#change-theme')
const img = document.querySelector('#change-theme img')

button.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark')
})