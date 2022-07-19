const fs = require('fs')
const {nanoid} = require('nanoid')
const express = require('express')
const router = express.Router() //router 객체가 하나 나옵니다.

const todosDir = `${global.appRoot}/todos`
const todosFile = `${global.appRoot}/todos/index.json`

//Read
router.get('/', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))

  res.status(200).json(todos)
})

//Create
router.post('/', (req, res) => {
  const { title } = req.body

  let todos = {}
  try {
    todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  } catch(err) {
    fs.mkdirSync(todosDir)
    fs.writeFileSync(todosFile, '{}')
  }

  todos[nanoid()] = { title }
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  //fs.readdirSync(`${global.appRoot}/todos`)
  res.status(200).json({title})
})

//update
router.put('/:id', (req, res) => {
  const { id } = req.params
  const {title} = req.body
  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  todos[id].title = title //title속성을 body의 title로 수정

  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json(todos[id])
})

//삭제
router.delete('/:id', (req, res) => {
  const {id} = req.params

  const todos = JSON.parse(fs.readFileSync(todosFile, 'utf8'))
  delete todos[id] //객체속성의 데이터를 지울때 js의 delete를 이용합니다.

  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))

  res.status(200).json(true)
})



module.exports= router //작업이 끝난 내용을 내보냅니다.