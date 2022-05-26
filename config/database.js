//importar o mongoose
const mongoose = require('mongoose')
//script de conexao
const conn = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://userLR:loginregistro@fiaptecnico.yk90q.mongodb.net/dblr')
}

//exportar as informações para acesso externo
module.exports = conn
