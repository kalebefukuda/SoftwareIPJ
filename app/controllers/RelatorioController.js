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
        let relatorio = await con.query("SELECT m.nome, m.numero_de_rol, m.data_nascimento, e.local_residencia\
        FROM MEMBRO M\
        JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO\
        WHERE M.COMUNGANTE = 1\
          AND M.SEXO = 'F';")
        return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista Comungantes Feminino',e)
    }
}

relatorioGeral.getListaComunMas = async function(req,res){
    try {
        let relatorio = await con.query("SELECT m.nome, m.numero_de_rol, m.data_nascimento, e.local_residencia\
        FROM MEMBRO M\
        JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO\
        WHERE M.COMUNGANTE = 1\
          AND M.SEXO = 'M';")

          return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista Comungantes Masculino',e)
    }
}

relatorioGeral.getListaNaoComunFem = async function(req,res){
    try {
        let relatorio = await con.query("SELECT m.nome, m.numero_de_rol, m.data_nascimento, e.local_residencia\
        FROM MEMBRO M\
        JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO\
        WHERE M.COMUNGANTE = 0\
          AND M.SEXO = 'F';")

          return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista de Nao Comungantes Feminino',e)
    }
}

relatorioGeral.getListaNaoComunMas = async function(req,res){
    try {
        let relatorio = await con.query("SELECT m.nome, m.numero_de_rol, m.data_nascimento, e.local_residencia\
        FROM MEMBRO M\
        JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO\
        WHERE M.COMUNGANTE = 0\
          AND M.SEXO = 'M';")

          return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista de Nao Comungantes Masculino',e)
    }
}

export {relatorioGeral}