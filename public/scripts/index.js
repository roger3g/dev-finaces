window.addEventListener('load', () => {
  const newTransaction = document.querySelector('#new-transaction')
  const modalOverlay = document.querySelector('.modal-overlay')
  const buttonCancel = document.querySelector('.cancel')

  newTransaction.addEventListener('click', () => {
    modalOverlay.classList.add('active')
  })

  buttonCancel.addEventListener('click', () => {
    modalOverlay.classList.remove('active')
  })
})