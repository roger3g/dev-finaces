const selectElement = element => {
  return document.querySelector(element)
}

const elements = () => {
  return {
    newTransaction: selectElement('#new-transaction'),
    buttonCancel: selectElement('.cancel'),
    modalOverlay: selectElement('.modal-overlay'),
    form: selectElement('form'),
    transactionsContainer: selectElement('#data-table tbody'),
    incomeDisplay: selectElement('#income-display'),
    expenseDisplay: selectElement('#expense-display'),
    totalDisplay: selectElement('#total-display'),
    totalCard: selectElement('#totalCard'),
    description: selectElement('input#description'),
    amount: selectElement('input#amount'),
    date: selectElement('input#date')
  }
}

const {
  newTransaction, buttonCancel, modalOverlay, 
  form, transactionsContainer, incomeDisplay, 
  expenseDisplay, totalDisplay, totalCard, 
  description, amount, date
} = elements()

newTransaction.addEventListener('click', () => {
  modalOverlay.classList.add('active')
})

buttonCancel.addEventListener('click', () => {
  modalOverlay.classList.remove('active')
})

form.addEventListener('submit', () => {
  submit(event)
})

const formatCurrency = value => {
  const signal = Number(value) < 0 ? '-' : ''
  value = String(value).replace(/\D/g, '')
  value = Number(value) / 100
  value = value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
  return signal + value
}

const formatDate = date => {
  const splittedDate = date.split('-')
  return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
}

const clearField = element => {
  return element.value = ''
}

const storageGet = () => {
  return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
}

const storageSet = transactions => {
  return localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
}

const add = transaction => {
  Transaction.all.push(transaction)
  reload()
}

const remove = index => {
  Transaction.all.splice(index, 1)
  reload()
}

const incomes = () => {
  let income = 0

  Transaction.all.forEach(transaction => {
    if (transaction.amount > 0) {
      income += transaction.amount
    }
  })

  return income
}

const expenses = () => {
  let expense = 0

  Transaction.all.forEach(transaction => {
    if (transaction.amount < 0) {
      expense += transaction.amount
    }
  })

  return expense
}

const total = () => {
  const value = incomes() + expenses()

  value < 0 
  ? totalCard.classList.add('total-expense') 
  : totalCard.classList.remove('total-expense')

  return value
}

const Transaction = {
  all: storageGet()
}

const addTransactions = (transaction, index) => {
  const tr = document.createElement('tr')
  tr.innerHTML = innerHTMLTransactions(transaction, index)
  tr.dataset.index = index
  transactionsContainer.appendChild(tr)
}

const innerHTMLTransactions = (transaction, index) => {
  const CssClass = transaction.amount > 0 ? 'income' : 'expense'
  const amount = formatCurrency(transaction.amount)

  const html = `
  <td class="descritpion">${transaction.description}</td>
  <td class="${CssClass}">${amount}</td>
  <td class="date">${transaction.date}</td>
  <td><img onclick="remove(${index})" src="/../assets/minus.svg"></td>
  `

  return html
}

const updateBalance = () => {
  incomeDisplay.innerHTML = formatCurrency(incomes())
  expenseDisplay.innerHTML = formatCurrency(expenses())
  totalDisplay.innerHTML = formatCurrency(total())
}

const formatAmount = value => {
  value = Number(value) * 100
  return Math.round(value)
}

const getValues = () => {
  return {
    description: description.value,
    amount: amount.value,
    date: date.value
  }
}

const validateFields = () => {
  const { description, amount, date } = getValues()

  if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
    throw new Error('Por favor preencha todos os campos')
  }
}

const formatValues = () => {
  let { description, amount, date } = getValues()

  amount = formatAmount(amount)
  date = formatDate(date)

  return {
    description,
    amount,
    date
  }
}

const submit = event => {
  event.preventDefault()

  try {
    validateFields()
    
    const transaction = formatValues()
    add(transaction)

    clearField(description)
    clearField(amount)
    clearField(date)

    modalOverlay.classList.remove('active')
  } catch (error) {
    alert(error.message)
  }
}

const start = () => {
  Transaction.all.forEach(addTransactions)

  updateBalance()
  storageSet(Transaction.all)
}

const reload = () => {
  transactionsContainer.innerHTML = ''
  start()
}

start()