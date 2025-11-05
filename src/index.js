console.log(2);

import express from 'express'
import { products } from './products.js';
const app = express()
const port = 8080

const API_KEY=process.env.lecture5313;

app.get('/', (req, res) => {
  res.send('Hello seerhii')
})


app.get('/products',(req,res)=>{
    if(req.header('authorization') == API_KEY){
        res.json(products);
    }else{
        res.status(401).send('no auth');
    }   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})