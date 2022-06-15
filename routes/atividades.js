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
        var abertas = await atividades.find({usuario:id, status:0}).sort({data:1}) //esse find q gera os dados
        var entregues = await atividades.find({usuario:id, status:0}).sort({data:1})
        var excluidas = await atividades.find({usuario:id, status:0}).sort({data:1})
        //console.log(buscar)
        //res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
        
        //abrir a view accordion
        //res.render('accordion.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})

        //abrir atividades2
        res.render('atividades2.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
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
        var excluir = await atividades.findOneAndUpdate(//pd ser findOneAndDelete tbm, faz same coisa
            {_id:id},
            {status:2}
        )

        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+excluir.usuario)
        //voltar para a página atividades
        //res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
        //res.send("Atividade Excluída!!")
    })

    //entrega atividades
    app.get("/entregue", async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var entregue = await atividades.findOneAndUpdate(//pd ser findOneAndDelete tbm, faz same coisa
            {_id:id},
            {status:1}
        )

        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+entregue.usuario)
    })

    //entrega atividades
    app.get("/desfazer", async(req,res)=>{
        //recuperar o parâmetro id da barra de endereço
        var id = req.query.id
        var desfazer = await atividades.findOneAndUpdate(//pd ser findOneAndDelete tbm, faz same coisa
            {_id:id},
            {status:0}
        )

        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+desfazer.usuario)
    })
}