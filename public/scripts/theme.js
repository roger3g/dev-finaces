const button = document.querySelector('#change-theme *')
let darkMode = localStorage.getItem('darkMode')

const enableDarkMode = () => {
  document.body.classList.add('theme-dark')
  localStorage.setItem('darkMode', 'enabled')
}

const disableDarkMode = () => {
  document.body.classList.remove('theme-dark')
  localStorage.setItem('darkMode', null)
}

darkMode === 'enabled' ? enableDarkMode() : disableDarkMode()

button.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode')
  darkMode !== 'enabled' ? enableDarkMode() : disableDarkMode()
})