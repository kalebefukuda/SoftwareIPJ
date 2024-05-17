import connect from '../../config/Connection.js'

const con = await connect()
let relatorioGeral = {}

//Lista aniversariante
relatorioGeral.getAniverario = async function(req,res){
    try {
        let relatorio = await con.query('SELECT nome, data_nascimento,\
         TIMESTAMPDIFF(YEAR, DATA_NASCIMENTO, CURDATE()) AS idade FROM membro;')

        res.send(relatorio)

    } catch (e) {
        console.log('Erro ao mostrar sociedades',e)
    }
}

export {relatorioGeral}

