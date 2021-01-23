// Modules and dependencies
require('dotenv').config()
const nunjucks = require('nunjucks')
const path = require('path')
const express = require('express')
const app = express()

// Port
const PORT = process.env.PORT || 8080

// Nunjucks configuration
nunjucks.configure(path.join(__dirname, '/../public/pages'), {
  express: app,
  noCache: true
})

// Static files
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/../public/')))

// Routes
app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('*', (req, res) => {
  res.render('page-not-found.html')
})

app.listen(PORT, (err) => {
  if (err) { console.log('erro') }
  console.log(`Server running on localhost:${PORT}`)
})