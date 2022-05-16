//importar o mongoose
const mongoose = require('mongoose')

//criar a estrutura para o armazenamento das informações do usuário
const modelo = mongoose.Schema({
    nome:String,
    email:String, 
    senha:String
})