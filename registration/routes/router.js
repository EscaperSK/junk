const { Router, request } = require('express')
const router = Router()
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'myusersdb',
  password: 'ifhiehSK1'
}).promise()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Main'
  })
})
router.get('/registration', (req, res) => {
  res.render('registration', {
    title: 'Registration'
  })
})
router.get('/authorization', (req, res) => {
  res.render('authorization', {
    title: 'Authorization'
  })
})
router.get('/:username', (req, res) => {
  
  res.render('clientpage', {
    title: req.params['username'],
    layout: 'clientlayout'
  })
})

router.post('/authorize', async (req, res) => {
  let ok = false
  if (req.body.userName.length > 8) {
    await connection.query(`select * from (select name from users where binary name = '${req.body.userName}') as u1 left join (select pass from users where binary name = '${req.body.userName}' and binary pass = '${req.body.userPass}') as u2 on true`)
      .then(result => {
        if (result[0][0]) {
          if (result[0][0].pass) {
            console.log('Авторизация успешна')
            ok = true
          } else {
            console.log('Неверный пароль')
          }
        } else {
          console.log('Нет пользователя с таким именем')
        }
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    console.log('Нет пользователя с таким именем')
  }
  if (ok) res.redirect(`/${req.body.userName}`)
  else res.redirect('/authorization')
})

router.post('/register', async (req, res) => {
  let ok = false
  if (req.body.userName.length > 8) {
    if (req.body.userPass.length > 8) {
      await connection.query(`select count(*)as'num' from users where name = '${req.body.userName}'`)
        .then(async result => {
          if (!result[0][0].num) {
            await connection.query('insert into users (name, pass) values (?, ?)', [req.body.userName, req.body.userPass])
              .then(result => {
                console.log('Пользователь зарегистрирован')
                ok = true
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            console.log('Пользователь с таким именем уже существует')
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log('Пароль слишком короткий')
    }
  } else {
    console.log('Имя слишком короткое')
  }
  if (ok) res.redirect(`/${req.body.userName}`)
  else res.redirect('/registration')
})

module.exports = router
