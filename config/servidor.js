//importar o express
const express = require('express')

//executar o express
const app = express()

//definir a porta do servidor local
const porta = 3535

//exportar o app e a porta
module.exports={app,porta}



//conteúdo aleatório inicial
//app.get('/',(req,res)=>{
//    res.send("qualquer coisa")
//})

//ligar o servidor sem definir a porta
//app.listen()