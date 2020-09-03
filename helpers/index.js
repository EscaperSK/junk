const express = require('express')
const hbs = require('express-handlebars')
const { SafeString } = require('handlebars')

const server = express()

server.engine('hbs', hbs({
  helpers: {
    listArray: arr => {
      if (!arr) return
      let res = ''
      for (const el of arr) {
        res += '<li>' + el + '</li>'
      }
      return new SafeString('<ul>' + res + '</ul>')
    }
  },
  extname: 'hbs'
}))

server.set('view engine', 'hbs')

server.get('/', (req, res) => {
  res.render('home.hbs', {
    arr: req.query.arr
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}...`)
})
