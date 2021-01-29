const newTransaction = selectElement('#new-transaction')
const buttonCancel = selectElement('.cancel')
const modalOverlay = selectElement('.modal-overlay')
const form = selectElement('form')
const transactionsContainer = selectElement('#data-table tbody')

const incomeDisplay = selectElement('#income-display')
const expenseDisplay = selectElement('#expense-display')
const totalDisplay = selectElement('#total-display')

const description = selectElement('input#description')
const amount = selectElement('input#amount')
const date = selectElement('input#date')

newTransaction.addEventListener('click', () => {
  modalOverlay.classList.add('active')
})

buttonCancel.addEventListener('click', () => {
  modalOverlay.classList.remove('active')
})

form.addEventListener('submit', () => {
  submit(event)
})

function selectElement(element) {
  return document.querySelector(element)
}

function storageGet () {
  return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
}

function storageSet (transactions) {
  return localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
}

function add(transaction) {
  Transaction.all.push(transaction)
  reload()
}

function remove(index) {
  Transaction.all.splice(index, 1)
  reload()
}

function incomes() {
  let income = 0

  Transaction.all.forEach(transaction => {
    if (transaction.amount > 0) {
      income += transaction.amount
    }
  })

  return income
}

function expenses() {
  let expense = 0

  Transaction.all.forEach(transaction => {
    if (transaction.amount < 0) {
      expense += transaction.amount
    }
  })

  return expense
}

function total() {
  return incomes() + expenses()
}

const Transaction = {
  all: storageGet()
}

function addTransactions(transaction, index) {
  const tr = document.createElement('tr')
  tr.innerHTML = innerHTMLTransactions(transaction, index)
  tr.dataset.index = index
  transactionsContainer.appendChild(tr)
}

function innerHTMLTransactions(transaction, index) {
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

function updateBalance() {
  incomeDisplay.innerHTML = formatCurrency(incomes())
  expenseDisplay.innerHTML = formatCurrency(expenses())
  totalDisplay.innerHTML = formatCurrency(total())
}

function clearTransactions() {
  transactionsContainer.innerHTML = ''
}

function formatAmount(value) {
  value = Number(value) * 100
  return Math.round(value)
}

function formatCurrency(value) {
  const signal = Number(value) < 0 ? '-' : ''
  value = String(value).replace(/\D/g, '')
  value = Number(value) / 100
  value = value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
  return signal + value
}

function formatDate(date) {
  const splittedDate = date.split('-')
  return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
}

function getValues() {
  return {
    description: description.value,
    amount: amount.value,
    date: date.value
  }
}

function validateFields() {
  const { description, amount, date } = getValues()


  if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
    throw new Error('Por favor preencha todos os campos')
  }
}

function formatValues() {
  let { description, amount, date } = getValues()

  amount = formatAmount(amount)
  date = formatDate(date)

  return {
    description,
    amount,
    date
  }
}

function clearFields() {
  description.value = ''
  amount.value = ''
  date.value = ''
}

function submit(event) {
  event.preventDefault()
  try {
    validateFields()
    const transaction = formatValues()
    add(transaction)
    clearFields()
    modalOverlay.classList.remove('active')
  } catch (error) {
    alert(error.message)
  }
}

function start() {
  Transaction.all.forEach(addTransactions)

  updateBalance()
  storageSet(Transaction.all)
}

function reload() {
  clearTransactions()
  start()
}

start()