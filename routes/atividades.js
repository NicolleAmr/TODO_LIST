const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{
    //criar a rota para renderizar a view atividades
    app.get('/atividades', async(req,res)=>{
        //capturar id da barra de endereço
        var id = req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})
        //buscar todas as atividades desse ususário 
        var buscar = await atividades.find({usuario:id}) //esse find q gera os dados
        //console.log(buscar)
        res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:buscar})
    })

    //gravar as informações do formulário na collection atividades
    app.post('/atividades', async(req,res)=>{
        //recuperando as informações digiadas
        var dados = req.body
        //exibindo no terminal 
        console.log(dados)
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulário no database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            disciplina:dados.disciplina,
            usuario:dados.id
        }).save()
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+dados.id)
    })

    //excluir atividades
    app.get("/excluir", async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({ //pd ser findOneAndDelete tbm, faz same coisa
            _id:id
        })
        //voltar para a página atividades
        //res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
        //res.send("Atividade Excluída!!")

        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+excluir.usuario)
    })
}