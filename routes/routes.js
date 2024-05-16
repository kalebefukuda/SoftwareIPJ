import express from 'express';
import MembroController from '../app/controllers/MembroController.js';
import EndereçoController from '../app/controllers/EndereçoController.js';
import EleicaoDiaconoController from '../app/controllers/EleiçãoDiaconoController.js'
import EleicaoPresbiteroController from '../app/controllers/EleiçãoPresbiteroController.js'
import BatismoController from '../app/controllers/BatismoController.js'

//TODO- Dar um jeito de saber qual é id do membro que preciso usar de chave estrangeira no endereço

const router = express.Router();




// Padrão restFul
// Dessa forma, quando você envia uma solicitação POST para /membros, o servidor sabe que deve chamar o handler inserirMembro, e quando envia uma solicitação GET para /membros, ele sabe que deve chamar o handler listarTodos.

// Rota para inserir um novo membro
router.post('/membros', (req, res) => {
    MembroController.inserirMembro(req, res);
});


//Rota para inserir endereço
router.post('/endereço', (req,res) =>{
    EndereçoController.inserirEndereço(req,res);
})

//Rota para inserir Diacono
router.post('/EleiçãoDiacono', (req,res) =>{
    EleicaoDiaconoController.inserirEleicaoDiacono(req,res);
})

//Rota para inserir Presbítero
router.post('/EleiçãoPresbitero', (req,res) =>{
    EleicaoPresbiteroController.inserirEleicaoPresbitero(req,res);
})

//Rota para inserir Batismo
router.post('/Batismo', (req,res) =>{
    BatismoController.inserirBatismo(req,res);
})














// Rota para listar todos os membros
router.get('/membros', (req, res) => {
    MembroController.listarTodos(res);
});

export default router;
