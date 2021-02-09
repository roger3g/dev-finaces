// Modules and dependencies
require('dotenv').config()

const express = require('express')
const server = express()
const router = express.Router()

const nunjucks = require('nunjucks')
const { join } = require('path')

// Port
const PORT = process.env.PORT || 8080

// Nunjucks configuration
nunjucks.configure(join(__dirname, '/../public/pages'), {
  express: server,
  noCache: true
})

// Static files
server.use(express.urlencoded({ extended: true }))
server.use(express.static(join(__dirname, '/../public/')))
server.use(router)

// Routes
router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('*', (req, res) => {
  res.render('page-not-found.html')
})

// Running server
server.listen(PORT, (err) => {
  if (err) { console.log('erro') }
  console.log(`Server running on localhost:${PORT}`)
})