//importar o mongoose
const mongoose = require('mongoose')

//criar a estrutura para o armazenamento das informações do usuário
const modelo = mongoose.Schema({
    data:Date,
    tipo:String,
    entrega:String, 
    disciplina:String,
    intrucoes:String,
    usuario:String
})

//gravar as estrutura no model usuários
const usuarios = mongoose.model('atividades', modelo)

//exportar os dados para acesso externo
module.exports = atividades