const path = require('path')
const express = require('express')
const expHbs = require('express-handlebars')
const router = require('./routes/router')

const server = express()

server.engine('hbs', expHbs({
  defaultLayout: 'layout',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }))
server.use(router)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}...`)
})
