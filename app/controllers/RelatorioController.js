import connect from '../../config/Connection.js'

const con = await connect()
let relatorioGeral = {}

relatorioGeral.getAniverario = async function(req, res) {
    try {
        let relatorio = await con.query('SELECT nome, data_nascimento, \
            TIMESTAMPDIFF(YEAR, DATA_NASCIMENTO, CURDATE()) AS idade FROM membro;');
        return relatorio[0]; 
    } catch (e) {
        console.log('Erro ao mostrar Lista de Aniversario', e);
        throw e; 
    }
};

// fazer consulta
relatorioGeral.getListaAssembleia = async function(req,res){
    try {
        let relatorio = await con.query('')

        res.send(relatorio)

    } catch (e) {
        console.log('Erro ao mostrar Lista Assembleia',e)
    } 
}

relatorioGeral.getListaComunFem = async function(req,res){
    try {
        let relatorio = await con.query("SELECT M.NOME, M.NUMERO_DE_ROL, M.DATA_NASCIMENTO, E.LOCAL_RESIDENCIA\
        FROM MEMBRO M\
        JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO\
        WHERE M.COMUNGANTE = TRUE\
          AND M.SEXO = 'F';")
        return relatorio[0];

        

    } catch (e) {
        console.log('Erro ao mostrar Lista Comungantes Feminino',e)
    }
}

relatorioGeral.getListaComunMas = async function(req,res){
    try {
        let relatorio = await con.query("SELECT M.NOME, M.NUMERO_DE_ROL, M.DATA_NASCIMENTO, E.LOCAL_RESIDENCIA\
        FROM MEMBRO M\
        JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO\
        WHERE M.COMUNGANTE = TRUE\
          AND M.SEXO = 'M';")

        res.send(relatorio)

    } catch (e) {
        console.log('Erro ao mostrar Lista Comungantes Masculino',e)
    }
}

export {relatorioGeral}

