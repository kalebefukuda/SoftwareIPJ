import { connectDatabase } from '../../config/database.js';

let relatorioGeral = {};

relatorioGeral.getAniverario = async function(req, res) {
    try {
        connectDatabase(async (err, con) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                res.status(500).send({ status: 'error', message: 'Erro ao conectar ao banco de dados' });
                return;
            }

            try {
                const relatorio = await con.promise().query('SELECT nome, data_nascimento, \
                    TIMESTAMPDIFF(YEAR, DATA_NASCIMENTO, CURDATE()) AS idade FROM membro;');
                res.send(relatorio[0]); 
            } catch (e) {
                console.log('Erro ao mostrar Lista de Aniversario', e);
                res.status(500).send({ status: 'error', message: 'Erro ao mostrar Lista de Aniversario' });
            } finally {
                con.release();
            }
        });
    } catch (e) {
        console.log('Erro ao mostrar Lista de Aniversario', e);
        res.status(500).send({ status: 'error', message: 'Erro ao mostrar Lista de Aniversario' });
    }
};

relatorioGeral.getListaAssembleia = async function(req,res){
    try {
        connectDatabase(async (err, con) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                res.status(500).send({ status: 'error', message: 'Erro ao conectar ao banco de dados' });
                return;
            }

            try {
                const relatorio = await con.promise().query(''); // Adicione sua consulta aqui
                res.send(relatorio[0]);
            } catch (e) {
                console.log('Erro ao mostrar Lista Assembleia',e);
                res.status(500).send({ status: 'error', message: 'Erro ao mostrar Lista Assembleia' });
            } finally {
                con.release();
            }
        });
    } catch (e) {
        console.log('Erro ao mostrar Lista Assembleia',e);
        res.status(500).send({ status: 'error', message: 'Erro ao mostrar Lista Assembleia' });
    }
}

// Repita o mesmo padrão para as outras funções...

export { relatorioGeral };
