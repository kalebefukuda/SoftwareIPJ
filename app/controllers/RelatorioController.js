import connect from '../../config/Connection.js'

const con = await connect()
let relatorioGeral = {}

relatorioGeral.getAniverario = async function(req, res) {
    try {
        let relatorio = await con.query('SELECT nome, data_nascimento, \
            TIMESTAMPDIFF(YEAR, DATA_NASCIMENTO, CURDATE()) AS idade FROM membro \
            ORDER BY nome;');
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
          AND M.SEXO = 'F' ORDER BY m.nome;")
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
          AND M.SEXO = 'M' ORDER BY m.nome;")

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
          AND M.SEXO = 'F' ORDER BY m.nome;")

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
          AND M.SEXO = 'M' ORDER BY m.nome;")

          return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista de Nao Comungantes Masculino',e)
    }
}

relatorioGeral.getListaComunSede= async function(req,res){
    try {
        let relatorio = await con.query("SELECT m.nome, m.data_nascimento, m.numero_de_rol, e.local_residencia\
                FROM membro m inner join endereco e on m.id_membro = e.id_membro\
                WHERE m.comungante = 1 AND e.local_residencia = 'Sede' ORDER BY m.nome;");

          return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista de Nao Comungantes Masculino',e)
    }
}

relatorioGeral.getListaDataCasamento= async function(req,res){
    try {
        // fazer query
        let relatorio = await con.query(" ");

          return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista de Nao Comungantes Masculino',e)
    }
}


export {relatorioGeral}