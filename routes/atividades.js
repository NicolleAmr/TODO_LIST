module.exports =(app)=>{
    app.post('/atividades', async(req,res)=>{
        //recuperando as info digitadas
        var dados = req.body
        //exibindo no terminal
        //console.log(dados)
        //conectar c database
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulário no database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            usuario:dados.id
        }).save()
    })
}
