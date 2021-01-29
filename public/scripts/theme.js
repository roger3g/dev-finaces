const button = document.querySelector('#change-theme')

button.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark')
})