const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

server.get('/', (req, res) => {
  res.send(`
    <h1>Welcome To Lambda Blog API</h1>
    `)
})
server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

server.listen(4003, () => {
  console.log('Api Ready')
})
