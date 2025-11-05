console.log(2);

import express from 'express'
import { products } from './products.js';
import { allUsers } from './users.js';
import jwt from 'jsonwebtoken'; // json web token
import { orders } from './orders.js';
const app = express()
app.use(express.json());
const port = 8080

const API_KEY=process.env.lecture5313;
const JWT_SECRET='secret';

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

app.post('/users/login',(request,response)=>{

  let username = request.body.username;
  let password = request.body.password;

  if(username == undefined){
    response.status(400).send("no username in body");
    return;
  }

  if(password == undefined){
    response.status(400).send("no password in body");
    return;
  }

  let foundUser = allUsers.find(user => user.username == username && user.password == password);
  if(foundUser == undefined){
    response.status(404).send("user not found");
    return;
  }

  let payload = {
    id: foundUser.id,
    username: foundUser.username,
  }
  let key = jwt.sign(payload, JWT_SECRET,{expiresIn: 3600});
  response.json({bearerToken:key})

});

app.get('/orders',(request,response)=>{
  let authorizationHeader = request.header('authorization');
  if(authorizationHeader == undefined){
    response.status(401).send("no auth");
    return;
  }

  let payload = jwt.verify(authorizationHeader, JWT_SECRET);
  if(payload == undefined){
     response.status(401).send("no auth");
     return;
  }

  console.log(`UserId = ${payload.id} ${payload.username}` );

  let userOrders = orders.filter(order=> order.userId == payload.id)
  response.json(userOrders);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})