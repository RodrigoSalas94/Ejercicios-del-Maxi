const express = require('express')
const usuarios = require('./usuarios.json')
const app = express()
const PORT = process.env.PORT ?? 1234

app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
  let body = ''
  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    res.status(201).json(data)
  })
})
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const usuarioIndex = usuarios.findIndex(movie => movie.id === id)

  if (usuarioIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  usuarios.splice(usuarioIndex, 1)

  return res.json({ message: 'Movie deleted' })
})
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
