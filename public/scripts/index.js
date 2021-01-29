const selectElement = element => {
  return document.querySelector(element)
}

const newTransaction = selectElement('#new-transaction')
const buttonCancel = selectElement('.cancel')
const modalOverlay = selectElement('.modal-overlay')
const form = selectElement('form')

newTransaction.addEventListener('click', () => {
  modalOverlay.classList.add('active')
})

buttonCancel.addEventListener('click', () => {
  modalOverlay.classList.remove('active')
})

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
  },

  set(transactions) {
    localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
  }
}

const Transaction = {
  all: Storage.get(),
  add(transaction) {
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)
    App.reload()
  },

  incomes() {
    let income = 0

    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })

    return income
  },
  
  expenses() {
    let expense = 0

    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })

    return expense
  },
  
  total() {
    return Transaction.incomes() + Transaction.expenses()
  }
}

const DOM = {
  transactionsContainer: selectElement('#data-table tbody'),

  addTransactions(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransactions(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransactions(transaction, index) {
    const CssClass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
    <td class="descritpion">${transaction.description}</td>
    <td class="${CssClass}">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td><img onclick="Transaction.remove(${index})" src="/../assets/minus.svg"></td>
    `

    return html
  },

  updateBalance() {
    selectElement('#income-display').innerHTML = Utils.formatCurrency(Transaction.incomes())
    selectElement('#expense-display').innerHTML = Utils.formatCurrency(Transaction.expenses())
    selectElement('#total-display').innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100
    return value
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''
    value = String(value).replace(/\D/g, '')
    value = Number(value) / 100
    value = value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    return signal + value
  },

  formatDate(date) {
    const splittedDate = date.split('-')
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
}

const Form = {
  description: selectElement('input#description'),
  amount: selectElement('input#amount'),
  date: selectElement('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },  

  validateFields() {
    const { description, amount, date } = Form.getValues()
    

    if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
      throw new Error('Por favor preencha todos os campos')
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = ''
    Form.amount.value = ''
    Form.date.value = ''
  },

  submit(event) {
    event.preventDefault()
    try {
      Form.validateFields()
      const transaction = Form.formatValues()
      Transaction.add(transaction)
      Form.clearFields()
      modalOverlay.classList.remove('active')
    } catch (error) {
      alert(error.message)
    }
  }
}

form.addEventListener('submit', () => {
  Form.submit(event)
})

const App = {
  start() {
    Transaction.all.forEach(DOM.addTransactions)

    DOM.updateBalance()
    Storage.set(Transaction.all)
  },
  
  reload() {
    DOM.clearTransactions()
    App.start()
  }
}

App.start()