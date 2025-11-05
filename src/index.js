console.log(2);

import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello seerhii')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})