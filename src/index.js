require('dotenv').config()
const path = require ('path');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))

const { pool } = require('./db/queries');

pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
      ID SERIAL PRIMARY KEY,
      task_name varchar(45) NOT NULL
  )
  `, (err, result) => {
    if (err) {
        throw error
    }
    console.log(result)
    console.log('finish migrating table')
})

app.get('/', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM tasks')
    const taskData = data.rows
    res.render('index', {
      tasks: taskData
    })
  } catch (err) {
    throw err
  }
})

app.get('/logs', async (req, res) => {
  const status = process.env.STATUS || 'development'
  console.log(status)
  if (status === 'development') {
    res.render('logs')
  } else {
    res.redirect('/')
  }
})

app.get('/config', async (req, res) => {
  res.status(200).json({
    'status': process.env.STATUS,
    'version': process.env.VERSION,
    'owner': process.env.OWNER
  })
})

app.post('/task', async (req, res) => {
  const { task } = req.body
  try {
    await pool.query('INSERT INTO tasks (task_name) VALUES ($1)', [task])
    res.redirect('back')
  } catch(err) {
    throw err
  }
})

app.post('/task/:id', async (req, res) => {
  const id = req.params.id
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id])
    res.redirect('back')
  } catch(err) {
    throw err
  }
})

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`)
})
