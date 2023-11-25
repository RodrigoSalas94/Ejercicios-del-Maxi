const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234

app.get ('/saludar', (req, res) =>{
    res.json({message:'Hello World'
    })
})
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
  