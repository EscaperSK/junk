const http = require('http')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'home.html' : (req.url + (path.extname(req.url) ? '' : '.html')))

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, errData) => {
        if (err) {
          res.writeHead(500)
          res.end('Error')
        } else res.end(errData)
      })
    } else res.end(data)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, '127.0.0.1', () => console.log(chalk.yellow(`Сервер начал прослушивание запроса на порту ${PORT}`)))
