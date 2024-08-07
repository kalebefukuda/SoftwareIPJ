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


relatorioGeral.getListaAssembleia = async function(req,res){
    try {
        let relatorio = await con.query('SELECT M.NOME FROM MEMBRO M JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO WHERE\
        E.LOCAL_RESIDENCIA = "SEDE" AND M.COMUNGANTE = 1 ORDER BY M.NOME ASC;')

        return relatorio[0]; 

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
        let relatorio = await con.query(" SELECT DATE_FORMAT(r.CASAMENTO, '%d/%m/%Y') AS DATA_CASAMENTO, \
            CONCAT_WS(' e ', m1.NOME, m2.NOME) AS CASAL,TIMESTAMPDIFF(YEAR, r.CASAMENTO, CURDATE()) AS ANOS_CASAMENTO \
            FROM ROL_SEPARADO r JOIN MEMBRO m1 ON r.ID_MEMBRO = m1.ID_MEMBRO AND m1.SEXO = 'M' \
            JOIN ROL_SEPARADO r2 ON r.CASAMENTO = r2.CASAMENTO JOIN MEMBRO m2 ON r2.ID_MEMBRO = m2.ID_MEMBRO AND m2.SEXO = 'F'\
            WHERE r.CASAMENTO IS NOT NULL GROUP BY r.CASAMENTO, m1.ID_MEMBRO, m2.ID_MEMBRO ORDER BY DATE_FORMAT(r.CASAMENTO, '%m-%d');");

        return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista de Nao Comungantes Masculino',e)
    }
}


relatorioGeral.getListaAssembleiaAdm= async function(req,res){
    try {
        let relatorio = await con.query("SELECT M.NOME FROM MEMBRO M JOIN ENDERECO E ON M.ID_MEMBRO = E.ID_MEMBRO WHERE\
             E.LOCAL_RESIDENCIA = 'SEDE' AND M.COMUNGANTE = 1 AND TIMESTAMPDIFF (YEAR, M.DATA_NASCIMENTO, CURDATE()) >= 18\
             ORDER BY M.NOME ASC;");

        return relatorio[0];

    } catch (e) {
        console.log('Erro ao mostrar Lista de Chamada Assembleia Admistrativa',e)
    }
}


export {relatorioGeral}