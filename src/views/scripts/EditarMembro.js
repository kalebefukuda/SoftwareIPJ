function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function handleNullString(value) {
    return value || '';
}

document.addEventListener('DOMContentLoaded', async function () {
    const membroId = window.location.pathname.split('/').pop();

    try {
        const response = await fetch(`/membros/api/membros/${membroId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do membro');
        }
        const membro = await response.json();

        const mainContent = document.getElementById('main-content');

        let fotoSrc = '/assets/Insira sua foto.png';
        if (membro.FOTO_MEMBRO && membro.FOTO_MEMBRO.trim() !== '') {
            fotoSrc = membro.FOTO_MEMBRO.startsWith('uploads/')
                ? `/${membro.FOTO_MEMBRO}`
                : `${membro.FOTO_MEMBRO}`;
        }

        mainContent.innerHTML = `
            <form id="cadastroMembroForm" class="form" enctype="multipart/form-data">
                <div class="div1">
                    <div class="section1">
                        <div class="wrap">
                            <label for="nome">Nome completo</label>
                            <input type="text" id="nome" name="nome" class="input" value="${handleNullString(membro.NOME)}" pattern="[A-Za-zÀ-ú\\s]+" style="width: 400px;" required>
                        </div>

                        <div class="wrap">
                            <label for="comungante">Comungante?</label>
                            <select name="comungante" id="comungante" class="input" required>
                                <option value="1" ${membro.COMUNGANTE ? 'selected' : ''}>Sim</option>
                                <option value="0" ${!membro.COMUNGANTE ? 'selected' : ''}>Não</option>
                            </select>
                        </div>

                        <div class="wrap">
                            <label for="dataNascimento">Data de Nascimento</label>
                            <input type="date" id="dataNascimento" name="dataNascimento" class="input" value="${formatDate(membro.DATA_NASCIMENTO)}" style="width: 160px;" required>
                        </div>

                        <div class="wrap">
                            <div class="labels">
                                <label for="localNascimento">Local de Nascimento</label>
                            </div>
                            <div class="inputs">
                                <input type="text" id="localNascimento" name="localNascimento" class="input" value="${handleNullString(membro.LOCAL_NASCIMENTO)}" pattern="[A-Za-zÀ-ú\\s]+" required>
                                <select name="estadoNascimento" id="estadoNascimento" class="input" style="width: 65px;" required>
                                    <option value="" disabled selected>UF</option>
                                    <option value="AC" ${membro.ESTADO_NASCIMENTO === 'AC' ? 'selected' : ''}>AC</option>
                                    <option value="AL" ${membro.ESTADO_NASCIMENTO === 'AL' ? 'selected' : ''}>AL</option>
                                    <option value="AP" ${membro.ESTADO_NASCIMENTO === 'AP' ? 'selected' : ''}>AP</option>
                                    <option value="AM" ${membro.ESTADO_NASCIMENTO === 'AM' ? 'selected' : ''}>AM</option>
                                    <option value="BA" ${membro.ESTADO_NASCIMENTO === 'BA' ? 'selected' : ''}>BA</option>
                                    <option value="CE" ${membro.ESTADO_NASCIMENTO === 'CE' ? 'selected' : ''}>CE</option>
                                    <option value="DF" ${membro.ESTADO_NASCIMENTO === 'DF' ? 'selected' : ''}>DF</option>
                                    <option value="ES" ${membro.ESTADO_NASCIMENTO === 'ES' ? 'selected' : ''}>ES</option>
                                    <option value="GO" ${membro.ESTADO_NASCIMENTO === 'GO' ? 'selected' : ''}>GO</option>
                                    <option value="MA" ${membro.ESTADO_NASCIMENTO === 'MA' ? 'selected' : ''}>MA</option>
                                    <option value="MT" ${membro.ESTADO_NASCIMENTO === 'MT' ? 'selected' : ''}>MT</option>
                                    <option value="MS" ${membro.ESTADO_NASCIMENTO === 'MS' ? 'selected' : ''}>MS</option>
                                    <option value="MG" ${membro.ESTADO_NASCIMENTO === 'MG' ? 'selected' : ''}>MG</option>
                                    <option value="PA" ${membro.ESTADO_NASCIMENTO === 'PA' ? 'selected' : ''}>PA</option>
                                    <option value="PB" ${membro.ESTADO_NASCIMENTO === 'PB' ? 'selected' : ''}>PB</option>
                                    <option value="PR" ${membro.ESTADO_NASCIMENTO === 'PR' ? 'selected' : ''}>PR</option>
                                    <option value="PE" ${membro.ESTADO_NASCIMENTO === 'PE' ? 'selected' : ''}>PE</option>
                                    <option value="PI" ${membro.ESTADO_NASCIMENTO === 'PI' ? 'selected' : ''}>PI</option>
                                    <option value="RJ" ${membro.ESTADO_NASCIMENTO === 'RJ' ? 'selected' : ''}>RJ</option>
                                    <option value="RN" ${membro.ESTADO_NASCIMENTO === 'RN' ? 'selected' : ''}>RN</option>
                                    <option value="RS" ${membro.ESTADO_NASCIMENTO === 'RS' ? 'selected' : ''}>RS</option>
                                    <option value="RO" ${membro.ESTADO_NASCIMENTO === 'RO' ? 'selected' : ''}>RO</option>
                                    <option value="RR" ${membro.ESTADO_NASCIMENTO === 'RR' ? 'selected' : ''}>RR</option>
                                    <option value="SC" ${membro.ESTADO_NASCIMENTO === 'SC' ? 'selected' : ''}>SC</option>
                                    <option value="SP" ${membro.ESTADO_NASCIMENTO === 'SP' ? 'selected' : ''}>SP</option>
                                    <option value="SE" ${membro.ESTADO_NASCIMENTO === 'SE' ? 'selected' : ''}>SE</option>
                                    <option value="TO" ${membro.ESTADO_NASCIMENTO === 'TO' ? 'selected' : ''}>TO</option>
                                </select>
                            </div>
                        </div>

                        <div class="wrap">
                            <label for="numeroDeRol">Numero de Rol</label>
                            <input type="number" id="numeroDeRol" name="numeroDeRol" class="input" value="${membro.NUMERO_DE_ROL}" style="width: 150px;" required>
                        </div>

                        <div class="wrap">
                            <label for="nomePai">Nome do Pai</label>
                            <input type="text" id="nomePai" name="nomePai" class="input" value="${handleNullString(membro.NOME_PAI)}" style="width: 400px;" pattern="[A-Za-zÀ-ú\\s]+" required>
                        </div>

                        <div class="wrap">
                            <label for="nomeMae">Nome da Mãe</label>
                            <input type="text" id="nomeMae" name="nomeMae" class="input" value="${handleNullString(membro.NOME_MAE)}" style="width: 400px;" pattern="[A-Za-zÀ-ú\\s]+" required>
                        </div>

                        <div class="wrap">
                            <label for="sexo">Sexo</label>
                            <select name="sexo" id="sexo" class="input" style="width: 230px;" required>
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="m" ${membro.SEXO === 'm' ? 'selected' : ''}>M</option>
                                <option value="f" ${membro.SEXO === 'f' ? 'selected' : ''}>F</option>
                            </select>
                        </div>

                        <div class="wrap">
                            <label for="escolaridade">Escolaridade</label>
                            <select name="escolaridade" id="escolaridade" class="input" style="width: 300px;">
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="Analfabeto" ${membro.ESCOLARIDADE === 'Analfabeto' ? 'selected' : ''}>Analfabeto</option>
                                <option value="Alfabetizado" ${membro.ESCOLARIDADE === 'Alfabetizado' ? 'selected' : ''}>Alfabetizado</option>
                                <option value="Ensino Fundamental Incompleto" ${membro.ESCOLARIDADE === 'Ensino Fundamental Incompleto' ? 'selected' : ''}>Ensino Fundamental Incompleto</option>
                                <option value="Ensino Fundamental Completo" ${membro.ESCOLARIDADE === 'Ensino Fundamental Completo' ? 'selected' : ''}>Ensino Fundamental Completo</option>
                                <option value="Ensino Médio Incompleto" ${membro.ESCOLARIDADE === 'Ensino Médio Incompleto' ? 'selected' : ''}>Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo" ${membro.ESCOLARIDADE === 'Ensino Médio Completo' ? 'selected' : ''}>Ensino Médio Completo</option>
                                <option value="Ensino Superior Incompleto" ${membro.ESCOLARIDADE === 'Ensino Superior Incompleto' ? 'selected' : ''}>Ensino Superior Incompleto</option>
                                <option value="Ensino Superior Completo" ${membro.ESCOLARIDADE === 'Ensino Superior Completo' ? 'selected' : ''}>Ensino Superior Completo</option>
                                <option value="Pós-Graduação" ${membro.ESCOLARIDADE === 'Pós-Graduação' ? 'selected' : ''}>Pós-Graduação</option>
                                <option value="Mestrado" ${membro.ESCOLARIDADE === 'Mestrado' ? 'selected' : ''}>Mestrado</option>
                                <option value="Doutorado" ${membro.ESCOLARIDADE === 'Doutorado' ? 'selected' : ''}>Doutorado</option>
                                <option value="Pós-Doutorado" ${membro.ESCOLARIDADE === 'Pós-Doutorado' ? 'selected' : ''}>Pós-Doutorado</option>
                                <option value="Livre Docência" ${membro.ESCOLARIDADE === 'Livre Docência' ? 'selected' : ''}>Livre Docência</option>
                            </select>
                        </div>

                        <div class="wrap">
                            <label for="profissao">Profissão</label>
                            <input type="text" id="profissao" name="profissao" class="input" value="${handleNullString(membro.PROFISSAO)}" style="width: 300px;" pattern="[A-Za-zÀ-ú\\s]+">
                        </div>
                    </div>
                   <div class="select-photo" id="select-photo">
                            <input type="file" id="fotoMembro" name="fotoMembro" style="display: none;" accept="image/*" tabindex="-1" autocomplete="off">
                            <label for="fotoMembro">
                                <div class="icon-container">
                                    <div class="photo">
                                                                                                                <img src="${fotoSrc}"class="image-icon selected-image" alt="Image icon" id="currentFoto">
                                    </div>
                                    <img src="/assets/camera.svg" class="camera-icon" alt="Camera icon">
                                </div>
                            </label>
                        </div>
                </div>

                <div class="div2">
                    <div class="section3">
                        <div class="wrap">
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" class="input" value="${handleNullString(membro.EMAIL)}" style="width: 400px;">
                        </div>

                        <div class="wrap">
                            <label for="telefone">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" value="${handleNullString(membro.TELEFONE)}" style="width: 170px;" class="input">
                        </div>

                        <div class="wrap">
                            <label for="celular">Celular</label>
                            <input type="tel" id="celular" name="celular" value="${handleNullString(membro.CELULAR)}" style="width: 170px;" class="input" required>
                        </div>

                        <div class="wrap">
                            <label for="cep">CEP</label>
                            <input type="text" id="cep" name="cep" value="${handleNullString(membro.CEP)}" class="input" style="width: 150px;" required>
                        </div>

                        <div class="wrap">
                            <label for="endereco">Endereço</label>
                            <input type="text" id="endereco" name="endereco" value="${handleNullString(membro.ENDERECO)}" class="input" style="width: 400px;" required>
                        </div>

                        <div class="wrap">
                            <label for="bairro">Bairro</label>
                            <input type="text" id="bairro" name="bairro" value="${handleNullString(membro.BAIRRO)}" class="input" style="width: 300px;" pattern="[A-Za-zÀ-ú\\s]+" required>
                        </div>

                        <div class="wrap">
                            <label for="complemento">Complemento</label>
                            <input type="text" id="complemento" name="complemento" value="${handleNullString(membro.COMPLEMENTO)}" class="input" style="width: 300px;">
                        </div>

                        <div class="wrap">
                            <div class="labels">
                                <label for="cidade">Cidade e Estado atual</label>
                            </div>
                            <div class="inputs">
                                <input type="text" id="cidade" name="cidade" value="${handleNullString(membro.CIDADE)}" class="input" pattern="[A-Za-zÀ-ú\\s]+" required>
                                <select name="estado" id="estado" class="input" style="width: 65px;" required>
                                    <option value="" disabled selected>UF</option>
                                    <option value="AC" ${membro.ESTADO === 'AC' ? 'selected' : ''}>AC</option>
                                    <option value="AL" ${membro.ESTADO === 'AL' ? 'selected' : ''}>AL</option>
                                    <option value="AP" ${membro.ESTADO === 'AP' ? 'selected' : ''}>AP</option>
                                    <option value="AM" ${membro.ESTADO === 'AM' ? 'selected' : ''}>AM</option>
                                    <option value="BA" ${membro.ESTADO === 'BA' ? 'selected' : ''}>BA</option>
                                    <option value="CE" ${membro.ESTADO === 'CE' ? 'selected' : ''}>CE</option>
                                    <option value="DF" ${membro.ESTADO === 'DF' ? 'selected' : ''}>DF</option>
                                    <option value="ES" ${membro.ESTADO === 'ES' ? 'selected' : ''}>ES</option>
                                    <option value="GO" ${membro.ESTADO === 'GO' ? 'selected' : ''}>GO</option>
                                    <option value="MA" ${membro.ESTADO === 'MA' ? 'selected' : ''}>MA</option>
                                    <option value="MT" ${membro.ESTADO === 'MT' ? 'selected' : ''}>MT</option>
                                    <option value="MS" ${membro.ESTADO === 'MS' ? 'selected' : ''}>MS</option>
                                    <option value="MG" ${membro.ESTADO === 'MG' ? 'selected' : ''}>MG</option>
                                    <option value="PA" ${membro.ESTADO === 'PA' ? 'selected' : ''}>PA</option>
                                    <option value="PB" ${membro.ESTADO === 'PB' ? 'selected' : ''}>PB</option>
                                    <option value="PR" ${membro.ESTADO === 'PR' ? 'selected' : ''}>PR</option>
                                    <option value="PE" ${membro.ESTADO === 'PE' ? 'selected' : ''}>PE</option>
                                    <option value="PI" ${membro.ESTADO === 'PI' ? 'selected' : ''}>PI</option>
                                    <option value="RJ" ${membro.ESTADO === 'RJ' ? 'selected' : ''}>RJ</option>
                                    <option value="RN" ${membro.ESTADO === 'RN' ? 'selected' : ''}>RN</option>
                                    <option value="RS" ${membro.ESTADO === 'RS' ? 'selected' : ''}>RS</option>
                                    <option value="RO" ${membro.ESTADO === 'RO' ? 'selected' : ''}>RO</option>
                                    <option value="RR" ${membro.ESTADO === 'RR' ? 'selected' : ''}>RR</option>
                                    <option value="SC" ${membro.ESTADO === 'SC' ? 'selected' : ''}>SC</option>
                                    <option value="SP" ${membro.ESTADO === 'SP' ? 'selected' : ''}>SP</option>
                                    <option value="SE" ${membro.ESTADO === 'SE' ? 'selected' : ''}>SE</option>
                                    <option value="TO" ${membro.ESTADO === 'TO' ? 'selected' : ''}>TO</option>
                                </select>
                            </div>
                        </div>

                        <div class="wrap">
                            <label for="localResidencia">Local Residência</label>
                            <select name="localResidencia" id="localResidencia" class="input" style="width: 100px;" required>
                                <option value="sede" ${membro.LOCAL_RESIDENCIA === 'sede' ? 'selected' : ''}>SEDE</option>
                                <option value="fora" ${membro.LOCAL_RESIDENCIA === 'fora' ? 'selected' : ''}>FORA</option>
                            </select>
                        </div>

                        <div class="wrap">
                            <label for="estadoCivil">Estado Civil</label>
                            <select name="estadoCivil" id="estadoCivil" class="input" style="width: 250px;">
                                <option value="" disabled selected>Selecione uma opção</option>
                                <option value="Solteiro(a)" ${membro.ESTADO_CIVIL === 'Solteiro(a)' ? 'selected' : ''}>Solteiro(a)</option>
                                <option value="Casado(a)" ${membro.ESTADO_CIVIL === 'Casado(a)' ? 'selected' : ''}>Casado(a)</option>
                                <option value="Víuvo(a)" ${membro.ESTADO_CIVIL === 'Víuvo(a)' ? 'selected' : ''}>Víuvo(a)</option>
                                <option value="Divorciado(a)" ${membro.ESTADO_CIVIL === 'Divorciado(a)' ? 'selected' : ''}>Divorciado(a)</option>
                                <option value="Outros" ${membro.ESTADO_CIVIL === 'Outros' ? 'selected' : ''}>Outros</option>
                            </select>
                        </div>

                        <div class="wrap">
                            <label for="religiaoPrecedente">Religião Precedente</label>
                            <select name="religiaoPrecedente" id="religiaoPrecedente" class="input" style="width: 300px;">
                                <option value="" disabled selected>Nenhum</option>
                                <option value="Reformada" ${membro.RELIGIAO_PRECEDENTE === 'Reformada' ? 'selected' : ''}>Reformada</option>
                                <option value="Pentecostal" ${membro.RELIGIAO_PRECEDENTE === 'Pentecostal' ? 'selected' : ''}>Pentecostal</option>
                                <option value="Neo-Pentecostal" ${membro.RELIGIAO_PRECEDENTE === 'Neo-Pentecostal' ? 'selected' : ''}>Neo-Pentecostal</option>
                                <option value="Católica Romana" ${membro.RELIGIAO_PRECEDENTE === 'Católica Romana' ? 'selected' : ''}>Católica Romana</option>
                                <option value="Espiritismos e Assemelhados" ${membro.RELIGIAO_PRECEDENTE === 'Espiritismos e Assemelhados' ? 'selected' : ''}>Espiritismos e Assemelhados</option>
                                <option value="Outros" ${membro.RELIGIAO_PRECEDENTE === 'Outros' ? 'selected' : ''}>Outros</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="div3">
                    <div class="section4">
                        <div>
                            <h2>Batismo: </h2>
                            <h2 class="tittle">Profissão de Fé: </h2>
                            <h2 class="tittle">Admissão: </h2>
                            <h2>Demissão: </h2>
                        </div>
                    </div>
                    <div class="section5">
                        <div class="wrap">
                            <label for="dataBatismo">Data</label>
                            <input type="date" id="dataBatismo" name="dataBatismo" value="${formatDate(membro.DATA_BATISMO)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="oficianteBatismo">Oficiante</label>
                            <input type="text" id="oficianteBatismo" name="oficianteBatismo" value="${handleNullString(membro.NOME_OFICIANTE_BATISMO)}" class="input" style="width: 500px;">
                        </div>
                        <div class="wrap">
                            <label for="dataProfissaoFe">Data</label>
                            <input type="date" id="dataProfissaoFe" name="dataProfissaoFe" value="${formatDate(membro.DATA_PROFISSAO_DE_FE)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="oficianteProfissaoFe">Oficiante</label>
                            <input type="text" id="oficianteProfissaoFe" name="oficianteProfissaoFe" value="${handleNullString(membro.NOME_OFICIANTE_PROFISSAO_DE_FE)}" class="input" style="width: 500px;">
                        </div>
                        <div class="wrap">
                            <label for="dataAdmissao">Data</label>
                            <input type="date" id="dataAdmissao" name="dataAdmissao" value="${formatDate(membro.DATA_ADMISSAO)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="formaAdmissao">Forma</label>
                            <select name="formaAdmissao" id="formaAdmissao" class="input" style="width: 300px;">
                                <option value="" disabled selected>Nenhum</option>
                                <option value="Transferência" ${membro.FORMA_ADMISSAO === 'Transferência' ? 'selected' : ''}>Transferência</option>
                                <option value="Batismo" ${membro.FORMA_ADMISSAO === 'Batismo' ? 'selected' : ''}>Batismo</option>
                                <option value="Profissão de Fé" ${membro.FORMA_ADMISSAO === 'Profissão de Fé' ? 'selected' : ''}>Profissão de Fé</option>
                                <option value="Batismo e Profissão de Fé" ${membro.FORMA_ADMISSAO === 'Batismo e Profissão de Fé' ? 'selected' : ''}>Batismo e Profissão de Fé</option>
                                <option value="Jurisdição a pedido" ${membro.FORMA_ADMISSAO === 'Jurisdição a pedido' ? 'selected' : ''}>Jurisdição a pedido</option>
                                <option value="Jurisdição ex-officio" ${membro.FORMA_ADMISSAO === 'Jurisdição ex-officio' ? 'selected' : ''}>Jurisdição ex-officio</option>
                                <option value="Restauração" ${membro.FORMA_ADMISSAO === 'Restauração' ? 'selected' : ''}>Restauração</option>
                                <option value="Designação do Presbitério" ${membro.FORMA_ADMISSAO === 'Designação do Presbitério' ? 'selected' : ''}>Designação do Presbitério</option>
                            </select>
                        </div>
                        <div class="wrap">
                            <label for="ataAdmissao">Ata</label>
                            <input type="number" id="ataAdmissao" name="ataAdmissao" value="${membro.NUMERO_ATA_ADMISSAO || ''}" class="input" style="width: 150px;">
                        </div>
                        <div class="wrap">
                            <label for="dataDemissao">Data</label>
                            <input type="date" id="dataDemissao" name="dataDemissao" value="${formatDate(membro.DATA_DEMISSAO)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="formaDemissao">Forma</label>
                            <select name="formaDemissao" id="formaDemissao" class="input" style="width: 300px;">
                                <option value="" disabled selected>Nenhum</option>
                                <option value="Transferência" ${membro.FORMA_DEMISSAO === 'Transferência' ? 'selected' : ''}>Transferência</option>
                                <option value="Batismo" ${membro.FORMA_DEMISSAO === 'Batismo' ? 'selected' : ''}>Batismo</option>
                                <option value="Profissão de Fé" ${membro.FORMA_DEMISSAO === 'Profissão de Fé' ? 'selected' : ''}>Profissão de Fé</option>
                                <option value="Jurisdição a pedido" ${membro.FORMA_DEMISSAO === 'Jurisdição a pedido' ? 'selected' : ''}>Jurisdição a pedido</option>
                                <option value="Jurisdição ex-officio" ${membro.FORMA_DEMISSAO === 'Jurisdição ex-officio' ? 'selected' : ''}>Jurisdição ex-officio</option>
                                <option value="Restauração" ${membro.FORMA_DEMISSAO === 'Restauração' ? 'selected' : ''}>Restauração</option>
                                <option value="Designação do Presbitério" ${membro.FORMA_DEMISSAO === 'Designação do Presbitério' ? 'selected' : ''}>Designação do Presbitério</option>
                            </select>
                        </div>
                        <div class="wrap">
                            <label for="ataDemissao">Ata</label>
                            <input type="number" id="ataDemissao" name="ataDemissao" value="${membro.NUMERO_ATA_DEMISSAO || ''}" class="input" style="width: 150px;">
                        </div>
                    </div>
                    <div class="section6">
                        <div class="wrap">
                            <label for="dataEleicaoDiacono">Eleição de Diácono</label>
                            <input type="date" id="dataEleicaoDiacono" name="dataEleicaoDiacono" value="${formatDate(membro.DATA_ELEICAO_DIACONO)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataReeleicaoDiacono1">Reeleito em</label>
                            <input type="date" id="dataReeleicaoDiacono1" name="dataReeleicaoDiacono1" value="${formatDate(membro.REELEICAO_1)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataReeleicaoDiacono2">Reeleito em</label>
                            <input type="date" id="dataReeleicaoDiacono2" name="dataReeleicaoDiacono2" value="${formatDate(membro.REELEICAO_2)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataReeleicaoDiacono3">Reeleito em</label>
                            <input type="date" id="dataReeleicaoDiacono3" name="dataReeleicaoDiacono3" value="${formatDate(membro.REELEICAO_3)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataReeleicaoDiacono4">Reeleito em</label>
                            <input type="date" id="dataReeleicaoDiacono4" name="dataReeleicaoDiacono4" value="${formatDate(membro.REELEICAO_4)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataEleicaoPresbitero">Eleição de Presbítero</label>
                            <input type="date" id="dataEleicaoPresbitero" name="dataEleicaoPresbitero" value="${formatDate(membro.DATA_ELEICAO_PRESBITERO)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataReeleicaoPresbitero1">Reeleito em</label>
                            <input type="date" id="dataReeleicaoPresbitero1" name="dataReeleicaoPresbitero1" value="${formatDate(membro.DATA_ELEICAO_PRESBITERO_1)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataReeleicaoPresbitero2">Reeleito em</label>
                            <input type="date" id="dataReeleicaoPresbitero2" name="dataReeleicaoPresbitero2" value="${formatDate(membro.DATA_ELEICAO_PRESBITERO_2)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataReeleicaoPresbitero3">Reeleito em</label>
                            <input type="date" id="dataReeleicaoPresbitero3" name="dataReeleicaoPresbitero3" value="${formatDate(membro.DATA_ELEICAO_PRESBITERO_3)}" class="input" style="width: 160px;">
                        </div>
                    </div>
                </div>
                <div class="div4">
                    <div class="section-center">
                        <h2 style="margin-right: 65px;">Rol separado: </h2>
                        <div class="wrap">
                            <label for="dataRolSeparado">Data</label>
                            <input type="date" id="dataRolSeparado" name="dataRolSeparado" value="${formatDate(membro.DATA_ROL_SEPARADO)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="ataRolSeparado">Ata</label>
                            <input type="number" id="ataRolSeparado" name="ataRolSeparado" value="${membro.ATA_ROL_SEPARADO || ''}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataCasamento">Casamento</label>
                            <input type="date" id="dataCasamento" name="dataCasamento" value="${formatDate(membro.CASAMENTO)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="disciplina">Disciplina</label>
                            <input type="text" id="disciplina" name="disciplina" value="${handleNullString(membro.DISCIPLINA)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="dataDisciplina">Data da Disciplina</label>
                            <input type="date" id="dataDisciplina" name="dataDisciplina" value="${formatDate(membro.DATA_DISCIPLINA)}" class="input" style="width: 160px;">
                        </div>
                        <div class="wrap">
                            <label for="ataDisciplina">Ata da Disciplina</label>
                            <input type="number" id="ataDisciplina" name="ataDisciplina" value="${membro.ATA_DISCIPLINA || ''}" class="input" style="width: 160px;">
                        </div>
                    </div>
                </div>
                <button class="button-save" type="submit">Salvar Alterações</button>
            </form>
        `;

        const inputFile = document.getElementById('fotoMembro');
        inputFile.addEventListener('change', function () {
            const file = inputFile.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imgElement = document.getElementById('currentFoto');
                    imgElement.src = e.target.result;
                    imgElement.classList.add('selected-image');  // Adiciona a classe para manter o estilo circular

                };
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('cadastroMembroForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            try {
                const updateResponse = await fetch(`/membros/api/editar-membro/${membroId}`, {
                    method: 'PUT',
                    body: formData
                });

                if (!updateResponse.ok) {
                    throw new Error('Erro ao atualizar o membro');
                }

                const result = await updateResponse.json();
                alert('Membro atualizado com sucesso');
                window.location.href = '/membros';
            } catch (error) {
                console.error('Erro ao atualizar membro:', error);
                alert('Erro ao atualizar membro');
            }
        });
    } catch (error) {
        console.error('Erro ao carregar dados do membro:', error);
    }
});