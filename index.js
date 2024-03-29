const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://heropy:mJGPt8KyOl694OQ8@cluster0.kehet.mongodb.net/KDT-TEST?retryWrites=true&w=majority')
const db = mongoose.connection
db.once('open', () => {
  console.log('MongoDB connected!')
})

global.appRoot = __dirname

const app = express({})
app.use(express.json())
app.use(cors())
app.use('/api/todos', require('./routes/api/todos.js'))
// app.use('/', (req, res) => {
//   res.status(200).json({
//     name: 'Heropy!!!'
//   })
// })

//HEROCU에서는 내부적으로 3000번포트만 오픈되어 있습니다.
//또한 처리하는 방법이 정해져있습니다

const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log('서버 동작~')
})