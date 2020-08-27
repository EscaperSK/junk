const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")

const server = express()

let user = {
  name: "EscaperSK",
  pass: "ifhiehSK1"
}

server.use(express.static(__dirname + "/public"))
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {

  res.sendFile(__dirname + "/public/home.html")
})

server.get('/about', (req, res) => {

  res.sendFile(__dirname + "/public/about.html")
})

server.get('/contact', (req, res) => {

  res.sendFile(__dirname + "/public/contact.html")
})

server.get('/user', (req, res) => {

  res.sendFile(__dirname + "/public/user.html")
})

server.post('/register', (req, res, next) => {

  console.log(req.body)

  if (req.body.userName === user.name && req.body.userPass === user.pass)
  return res.send("Добро пожаловать")
  else
  res.end("")
})

server.listen(3000, "127.0.0.1", () => {
  console.log("Сервер начал прослушивать запросы на порут 3000")
})
