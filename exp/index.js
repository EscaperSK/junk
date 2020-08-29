const express = require("express")
const fs = require("fs")
const { isBoolean } = require("util")

const server = express()

let user = {
  name: "EscaperSK",
  pass: "ifhiehSK1"
}

server.set("view engine", "hbs")

server.use(express.static(__dirname + "/public"))
server.use(express.urlencoded({ extended: true }))

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
  else res.end("")
})

server.get('/websites', (req, res) => {

  res.render('websites.hbs', {
    title: "Список сайтов",
    visible: req.query.vs === "false" ? false : true,
    arr: [{
      name: "YouTube",
      ref: "https://www.youtube.com/"
    }, {
      name: "VK",
      ref: "https://vk.com/"
    }]
  })
})

server.listen(3000, "127.0.0.1", () => {
  console.log("Сервер начал прослушивать запросы на порут 3000")
})
