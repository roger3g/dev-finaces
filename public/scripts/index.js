window.addEventListener('load', () => {
  const newTransaction = document.querySelector('#new-transaction')
  const modalOverlay = document.querySelector('.modal-overlay')
  const buttonCancel = document.querySelector('.cancel')

  const incomeCard = document.querySelector('#incomeCard p')
  const expenseCard = document.querySelector('#expenseCard p')
  const totalCard = document.querySelector('#totalCard p')
  
  newTransaction.addEventListener('click', () => {
    modalOverlay.classList.add('active')
  })

  buttonCancel.addEventListener('click', () => {
    modalOverlay.classList.remove('active')
  })

  const inputDescription = document.querySelector('#description')
  const inputAmount = document.querySelector('#amount')
  const inputDate = document.querySelector('#date')
  const buttonSave = document.querySelector('#save')
  const tbody = document.querySelector('#data-table tbody')

  buttonSave.addEventListener('click', () => {
    const description = String(inputDescription.value)
    const amount = Number(inputAmount.value)
    const date = String(inputDate.value)

    const className = amount < 0 ? "expense" : "income"
    createRow(description, formatCurrency(amount), className, formatDate(date))

    modalOverlay.classList.remove('active')
  })

  const formatCurrency = currencyValue => { // Formatar moeda
    return currencyValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
  }

  const formatDate = dateValue => { // Formatar data
    return new Date(dateValue).toLocaleDateString('pt-br')
  }

  const createRow = (descritpionContent, currencyContent, currencyCalass, dateContent) => {
    const row = document.createElement('tr')

    const tdDescritpion = document.createElement('td')
    tdDescritpion.classList.add('descritpion')
    const textDescritpion = document.createTextNode(descritpionContent)
    tdDescritpion.appendChild(textDescritpion)
    row.appendChild(tdDescritpion)

    const tdCurrency = document.createElement('td')
    const textIncome = document.createTextNode(currencyContent)
    tdCurrency.classList.add(currencyCalass)

    tdCurrency.appendChild(textIncome)
    row.appendChild(tdCurrency)

    const tdDate = document.createElement('td')
    tdDate.classList.add('date')
    const textDate = document.createTextNode(dateContent)
    tdDate.appendChild(textDate)
    row.appendChild(tdDate)

    const tdImage = document.createElement('td')
    const image = document.createElement('img')
    image.src = '../assets/minus.svg'
    tdImage.appendChild(image)
    row.appendChild(tdImage)
    image.addEventListener('click', () => {
      tbody.removeChild(row)
    })

    tbody.appendChild(row)
  }
})