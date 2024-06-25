import MembroSociedadeModel from '../models/MembroSociedadeModel.js';
import MembroModel from '../models/MembroModel.js';  
import SociedadeInternaModel from '../models/SociedadeInternaModel.js';  

const MembroSociedadeController = {

    inserirMembroSociedade: async (req, res) => {
        const { id_membro, id_sociedade_interna } = req.body;

        // Verificar se o membro existe
        MembroModel.obterMembroPorId(id_membro, (err, membro) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao verificar membro' });
            } else if (!membro) {
                res.status(404).json({ message: 'Membro não encontrado' });
            } else {
                // Verificar se a sociedade interna existe
                SociedadeInternaModel.obterSociedadePorId(id_sociedade_interna, (err, sociedadeInterna) => {
                    if (err) {
                        res.status(500).json({ error: 'Erro ao verificar sociedade interna' });
                    } else if (!sociedadeInterna) {
                        res.status(404).json({ message: 'Sociedade interna não encontrada' });
                    } else {
                        const novoMembroSociedade = new MembroSociedadeModel(id_membro, id_sociedade_interna);

                        MembroSociedadeModel.adicionarMembroSociedade(novoMembroSociedade, (error, membroSociedadeId) => {
                            if (error) {
                                res.status(500).json({ error: 'Erro ao inserir membro na sociedade' });
                            } else {
                                res.status(201).json({ message: 'Membro inserido na sociedade com sucesso', membroSociedadeId: membroSociedadeId });
                            }
                        });
                    }
                });
            }
        });
    },

    listarTodosMembrosSociedade: async (req, res) => {
        MembroSociedadeModel.listarTodosMembrosSociedade((error, results) => {
            if (error) {
                res.status(500).json({ error: 'Erro na requisição dos membros da sociedade' });
            } else {
                res.status(200).json({ results: results });
            }
        });
    },

    obterMembroSociedadePorId: async (req, res) => {
        const membroSociedadeId = req.params.id;

        MembroSociedadeModel.obterMembroSociedadePorId(membroSociedadeId, (err, membroSociedade) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar membro da sociedade por ID' });
            } else if (!membroSociedade) {
                res.status(404).json({ message: 'Membro da sociedade não encontrado' });
            } else {
                res.status(200).json({ membroSociedade });
            }
        });
    },

    atualizarMembroSociedade: async (req, res) => {
        const membroSociedadeId = req.params.id;
        const novosDadosMembroSociedade = req.body;

        if (novosDadosMembroSociedade.id_membro) {
            MembroModel.obterMembroPorId(novosDadosMembroSociedade.id_membro, (err, membro) => {
                if (err) {
                    res.status(500).json({ error: 'Erro ao verificar membro' });
                } else if (!membro) {
                    res.status(404).json({ message: 'Membro não encontrado' });
                } else {
                    if (novosDadosMembroSociedade.id_sociedade_interna) {
                        SociedadeInternaModel.obterSociedadePorId(novosDadosMembroSociedade.id_sociedade_interna, (err, sociedadeInterna) => {
                            if (err) {
                                res.status(500).json({ error: 'Erro ao verificar sociedade interna' });
                            } else if (!sociedadeInterna) {
                                res.status(404).json({ message: 'Sociedade interna não encontrada' });
                            } else {
                                MembroSociedadeModel.atualizarMembroSociedade(membroSociedadeId, novosDadosMembroSociedade, (err, result) => {
                                    if (err) {
                                        res.status(500).json({ error: 'Erro ao atualizar membro da sociedade' });
                                    } else {
                                        if (result) {
                                            res.status(200).json({ message: 'Membro da sociedade atualizado com sucesso' });
                                        } else {
                                            res.status(404).json({ message: 'Membro da sociedade não encontrado' });
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        MembroSociedadeModel.atualizarMembroSociedade(membroSociedadeId, novosDadosMembroSociedade, (err, result) => {
                            if (err) {
                                res.status(500).json({ error: 'Erro ao atualizar membro da sociedade' });
                            } else {
                                if (result) {
                                    res.status(200).json({ message: 'Membro da sociedade atualizado com sucesso' });
                                } else {
                                    res.status(404).json({ message: 'Membro da sociedade não encontrado' });
                                }
                            }
                        });
                    }
                }
            });
        } else if (novosDadosMembroSociedade.id_sociedade_interna) {
            SociedadeInternaModel.obterSociedadePorId(novosDadosMembroSociedade.id_sociedade_interna, (err, sociedadeInterna) => {
                if (err) {
                    res.status(500).json({ error: 'Erro ao verificar sociedade interna' });
                } else if (!sociedadeInterna) {
                    res.status(404).json({ message: 'Sociedade interna não encontrada' });
                } else {
                    MembroSociedadeModel.atualizarMembroSociedade(membroSociedadeId, novosDadosMembroSociedade, (err, result) => {
                        if (err) {
                            res.status(500).json({ error: 'Erro ao atualizar membro da sociedade' });
                        } else {
                            if (result) {
                                res.status(200).json({ message: 'Membro da sociedade atualizado com sucesso' });
                            } else {
                                res.status(404).json({ message: 'Membro da sociedade não encontrado' });
                            }
                        }
                    });
                }
            });
        } else {
            MembroSociedadeModel.atualizarMembroSociedade(membroSociedadeId, novosDadosMembroSociedade, (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'Erro ao atualizar membro da sociedade' });
                } else {
                    if (result) {
                        res.status(200).json({ message: 'Membro da sociedade atualizado com sucesso' });
                    } else {
                        res.status(404).json({ message: 'Membro da sociedade não encontrado' });
                    }
                }
            });
        }
    },

    excluirMembroSociedade: async (req, res) => {
        const membroSociedadeId = req.params.id;

        MembroSociedadeModel.excluirMembroSociedade(membroSociedadeId, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao excluir membro da sociedade' });
            } else {
                if (result) {
                    res.status(200).json({ message: 'Membro da sociedade excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Membro da sociedade não encontrado' });
                }
            }
        });
    },

};

export default MembroSociedadeController;
