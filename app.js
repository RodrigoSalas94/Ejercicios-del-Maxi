const express = require('express')
const usuarios = require('./usuarios.json')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT ?? 1234

app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
  const { nombre, email } = req.body

  const usuarioExistente = usuarios.find(usuario => usuario.email === email)

  if (usuarioExistente) {
    return res.status(400).json({ message: 'El usuario ya existe' })
  }

  usuarios.push({ nombre, email })
  return res.status(201).json({ message: 'Usuario creado correctamente' })
})

app.put('/usuarios/:id', (req, res) => {
  const { nombre, email } = req.body

  const usuarioIndex = usuarios.findIndex(usuario => usuario.id === req.params.id)

  if (usuarioIndex >= 0) {
    usuarios[usuarioIndex].nombre = nombre
    usuarios[usuarioIndex].email = email
    return res.status(200).json({ message: 'Usuario modificado correctamente' })
  }

  return res.status(404).json({ message: 'Usuario no encontrado' })
})

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id)

  if (usuarioIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }

  usuarios.splice(usuarioIndex, 1)

  return res.json({ message: 'Usuario eliminado' })
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
