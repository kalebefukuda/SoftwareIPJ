
function prepararDadosMembros() {
    const dadosMembro = {
        nome: document.getElementById("campo1").value,
        comungante: converteComungante(document.getElementById("campo2").value),
        data_nascimento: document.getElementById("campo3").value,
        numero_de_rol: document.getElementById("campo5").value,
        nome_pai: document.getElementById("campo6").value,
        nome_mae: document.getElementById("campo7").value,
        sexo: document.getElementById("campo8").value,
        escolaridade: document.getElementById("campo9").value,
        profissao: document.getElementById("campo10").value,
        email: document.getElementById("campo11").value,
        telefone: document.getElementById("campo12").value,
        celular: document.getElementById("campo13").value,
        campoFoto: document.getElementById("upload-file").value,
        estado_civil: document.getElementById("campo21").value,
    };
    return dadosMembro;
}

function prepararDadosEndereco(id_membro) {
    const dadosEndereco = {
        id_membro: id_membro,
        cep: document.getElementById("campo14").value,
        endereco: document.getElementById("campo15").value,
        bairro: document.getElementById("campo16").value,
        complemento: document.getElementById("campo17").value,
        cidade: document.getElementById("campo18").value,
        estado: document.getElementById("campo18_1").value,
        local_residencia: document.getElementById("campo20").value,
        local_nascimento: document.getElementById("campo4").value,
        estado_nascimento: document.getElementById("campo4_1").value,
    };
    return dadosEndereco;
}

function prepararDadosBatismo(id_membro) {
    const dadosBatismo = {
        id_membro: id_membro,
        data_batismo: document.getElementById("campo23").value,
        nome_oficiante: document.getElementById("campo24").value
    };
    return dadosBatismo;
}

function prepararDadosProfissaodeFé(id_membro) {
    const dadosProfissaodeFe = {
        data_profissao_de_fe: document.getElementById("campo25").value,
        nome_oficiante: document.getElementById("campo26").value,
        id_membro: id_membro
    };
    return dadosProfissaodeFe;
}

function prepararDadosAdmissão(id_membro) {
    const dadosAdmissao = {
        data_admissao: document.getElementById("campo27").value,
        forma_admissao: document.getElementById("campo28").value,
        numero_ata: document.getElementById("campo29").value,
        id_membro: id_membro
    };
    return dadosAdmissao;
}

function prepararDadosDemissão(id_membro) {
    const dadosDemissao = {
        data_demissao: document.getElementById("campo30").value,
        forma_demissao: document.getElementById("campo31").value,
        numero_ata: document.getElementById("campo32").value,
        id_membro: id_membro
    };
    return dadosDemissao;
}

function prepararDadosRolSeparado(id_membro) {
    const dadosRolSeparado = {
        data_rol_separado: document.getElementById("campo42").value,
        ata_rol_separado: document.getElementById("campo43").value,
        casamento: document.getElementById("campo44").value,
        disciplina: document.getElementById("campo45").value,
        data_disciplina: document.getElementById("campo46").value,
        ata_disciplina: document.getElementById("campo47").value,
        id_membro: id_membro
    };
    return dadosRolSeparado;
}

function prepararDadosEleiçãoDiacono(id_membro) {
    const dadosEleiçãoDiacono = {
        data_eleicao: document.getElementById("campo33").value,
        reeleicao_1: document.getElementById("campo34").value,
        reeleicao_2: document.getElementById("campo35").value,
        reeleicao_3: document.getElementById("campo36").value,
        reeleicao_4: document.getElementById("campo37").value,
        id_membro: id_membro,
    };
    return dadosEleiçãoDiacono;
}

function prepararDadosEleiçãoPresbitero(id_membro) {
    const dadosEleiçãoDiacono = {
        data_eleicao_presbiterio_1: document.getElementById("campo38").value,
        data_eleicao_presbiterio_2: document.getElementById("campo39").value,
        data_eleicao_presbiterio_3: document.getElementById("campo40").value,
        data_eleicao_presbiterio_4: document.getElementById("campo41").value,
        id_membro: id_membro,
    };
    return dadosEleiçãoDiacono;
}

async function enviarDadosParaRota(dados, rota) {
    try {
        const response = await fetch(`/${rota}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar dados para a rota');
        }

        const data = await response.json();
        console.log('Sucesso:', data);
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

async function sequenciaAPI() {
    try {
        // Primeira Parte - Enviar dados do membro
        const dadosMembro = prepararDadosMembros();
        const respostaMembro = await enviarDadosParaRota(dadosMembro, 'membro');
        const id_membro = respostaMembro.memberId;
        console.log(id_membro);

        if (!id_membro) {
            throw new Error('ID do membro não foi retornado pela API');
        }

        // Segunda Parte - Preparar dados para outras rotas
        const dadosEndereco = prepararDadosEndereco(id_membro);
        const dadosBatismo = prepararDadosBatismo(id_membro);
        const dadosProfissaodeFe = prepararDadosProfissaodeFé(id_membro);
        const dadosAdmissao = prepararDadosAdmissão(id_membro);
        const dadosDemissao = prepararDadosDemissão(id_membro);
        const dadosRolSeparado = prepararDadosRolSeparado(id_membro);
        const dadosEleicaoDiacono = prepararDadosEleiçãoDiacono(id_membro);
        const dadosEleicaoPresbitero = prepararDadosEleiçãoPresbitero(id_membro);

        // Lista de promessas para enviar os dados em paralelo
        const promessas = [
            enviarDadosParaRota(dadosEndereco, 'endereco'),
            enviarDadosParaRota(dadosBatismo, 'batismo'),
            enviarDadosParaRota(dadosProfissaodeFe, 'profissao-de-fe'),
            enviarDadosParaRota(dadosAdmissao, 'admissao'),
            enviarDadosParaRota(dadosDemissao, 'demissao'),
            enviarDadosParaRota(dadosRolSeparado, 'rol-separado'),
            enviarDadosParaRota(dadosEleicaoDiacono, 'eleicao-diacono'),
            enviarDadosParaRota(dadosEleicaoPresbitero, 'eleicao-presbitero')
        ];

        // Executar todas as promessas em paralelo e aguardar sua conclusão
        const respostas = await Promise.all(promessas);
        respostas.forEach(resposta => console.log(resposta));

        alert('Rotas testadas com sucesso!');
    } catch (error) {
        console.error('Erro ao testar rotas:', error);
        alert('Ocorreu um erro ao testar as rotas. Verifique o console para mais detalhes.');
    }
}







document.getElementById('button-salvar').addEventListener('click', async () => {
    try {
        await sequenciaAPI();
        alert('Dados salvos com sucesso!');
        // Aqui você pode adicionar mais ações após o salvamento, se necessário
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        alert('Ocorreu um erro ao salvar os dados. Verifique o console para mais detalhes.');
        // Tratamento de erro, se necessário
    }
});


// Função que converte a escolha em "S" ou "N"
function converteComungante(escolha) {
    if (escolha.toLowerCase() === 'sim') {
        return true;
    } else if (escolha.toLowerCase() === 'não' || escolha.toLowerCase() === 'nao') {
        return false;
    } else {
        return '';
    }
}













document.addEventListener('DOMContentLoaded', function () {

    // Função para capitalizar a primeira letra de cada palavra
    function capitalizeWords(str) {
        // Divide a string em uma matriz de palavras
        let words = str.split(' ');

        // Itera sobre cada palavra na matriz
        for (let i = 0; i < words.length; i++) {
            // Converte a primeira letra de cada palavra para maiúscula e o restante para minúscula
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }

        // Junta as palavras novamente em uma única string e retorna
        return words.join(' ');
    }

    // Função para aplicar classes de estilo
    function applyInitialSelectedClass(field) {
        if (field.value) {
            field.classList.remove('initial');
            field.classList.add('selected');
        } else {
            field.classList.remove('selected');
            field.classList.add('initial');
        }
    }

    //Numero de ROL
    document.getElementById('campo5').addEventListener('input', function () {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); // Limita a 3 caracteres
        }
    });

    //Nome completo
    document.getElementById("campo1").addEventListener("input", function (event) {
        // Obtém o valor atual do campo
        let valor = event.target.value;

        // Substitui todos os números e símbolos por uma string vazia
        valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        // Define o novo valor no campo
        event.target.value = valor;

    });

    //Data de nascimento
    const campoDataNascimento = document.getElementById('campo3');
    if (campoDataNascimento) {
        campoDataNascimento.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoDataNascimento);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campoDataNascimento.value) {
            campoDataNascimento.classList.add('initial');
        }
    }

    //Local nascimento
    const campo4 = document.getElementById('campo4');
    if (campo4) {
        campo4.addEventListener('input', function (event) {
            let valor = event.target.value;
            valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');
            valor = capitalizeWords(valor);
            event.target.value = valor;
        });
    }
    const campo4_1 = document.getElementById('campo4_1');
    if (campo4_1) {
        campo4_1.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo4_1);
    }

    //Nome do pai
    document.getElementById("campo6").addEventListener("input", function (event) {

        let valor = event.target.value;

        valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    //Nome da mãe
    document.getElementById("campo7").addEventListener("input", function (event) {

        let valor = event.target.value;

        valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    //Sexo
    const campoSexo = document.getElementById('campo8');
    if (campoSexo) {
        campoSexo.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoSexo);
    }

    //Escolaridade
    const campo9 = document.getElementById('campo9');
    if (campo9) {
        campo9.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo9);
    }

    //Profissão
    document.getElementById("campo10").addEventListener("input", function (event) {
        let valor = event.target.value;

        valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    // Captura o elemento input file para visualizar a foto
    const inputFile = document.getElementById('upload-file');

    inputFile.addEventListener('change', function () {
        // Verifica se um arquivo foi selecionado
        if (inputFile.files && inputFile.files[0]) {
            // Cria um objeto URL para o arquivo selecionado
            const reader = new FileReader();

            // Define o evento onload para carregar a imagem selecionada
            reader.onload = function (e) {
                // Remove a imagem atual, se houver
                const currentImage = document.querySelector('.image-icon');
                if (currentImage) {
                    currentImage.remove();
                }

                // Cria um elemento de imagem
                const imgElement = document.createElement('img');

                // Define o src da imagem como o URL do arquivo selecionado
                imgElement.src = e.target.result;

                // Define as classes da imagem
                imgElement.classList.add('image-icon');
                imgElement.classList.add('selected-image');

                // Adiciona a imagem como filho da div icon-container
                const iconContainer = document.querySelector('.photo');
                iconContainer.innerHTML = ''; // Limpa qualquer conteúdo existente na div
                iconContainer.appendChild(imgElement);
            };

            // Lê o arquivo como uma URL de dados
            reader.readAsDataURL(inputFile.files[0]);
        }
    });

    // Criação do "*" vermelho



    const requiredFields = document.querySelectorAll('input[required], select[required]');

    requiredFields.forEach(field => {
        // Obtém o ID do campo
        const fieldId = field.id;

        // Obtém a label associada ao campo pelo atributo "for"
        const label = document.querySelector(`label[for="${fieldId}"]`);

        // Adiciona uma classe ou atributo customizado à label
        if (label) {
            label.classList.add('required');
        }
    })


    // Formatação do campo para inserção de caracteres no campo12
    const inputTel = document.getElementById('campo12');

    inputTel.addEventListener('input', function (event) {
        let tel = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
        let formattedTel = '';

        // Verifica o comprimento do número de telefone e formata de acordo
        if (tel.length < 2) {
            formattedTel = '(' + tel; // Adiciona o parêntese inicial
        } else if (tel.length < 6) {
            formattedTel = '(' + tel.substring(0, 2) + ')' + tel.substring(2); // Adiciona o parêntese inicial e o traço após o segundo dígito
        } else if (tel.length < 11) {
            formattedTel = '(' + tel.substring(0, 2) + ')' + tel.substring(2, 6) + '-' + tel.substring(6); // Adiciona o parêntese inicial, o traço após o segundo dígito e o hífen após o quinto dígito
        } else {
            formattedTel = '(' + tel.substring(0, 2) + ')' + tel.substring(2, 7) + '-' + tel.substring(7, 11); // Adiciona o parêntese inicial, o traço após o segundo dígito e o hífen após o sexto dígito
        }

        // Define o valor formatado no campo de entrada
        event.target.value = formattedTel;
    });

    inputTel.addEventListener('keydown', function (event) {
        // Se a tecla pressionada for backspace e o campo não estiver vazio
        if (event.key === 'Backspace' && inputTel.value.length > 0) {
            // Obtém a posição do cursor no campo
            const cursorPosition = inputTel.selectionStart;

            // Se o caractere anterior ao cursor for um caractere especial (parênteses ou traço), remove também esse caractere
            if (inputTel.value[cursorPosition - 1] === ')' || inputTel.value[cursorPosition - 1] === '-' || inputTel.value[cursorPosition - 1] === '(') {
                event.preventDefault(); // Impede o comportamento padrão (deletar o caractere anterior)
                inputTel.value = inputTel.value.substring(0, cursorPosition - 1) + inputTel.value.substring(cursorPosition); // Remove o caractere especial
            }
        }
    });

    // Formatação do campo para inserção de caracteres no campo13
    const inputTel2 = document.getElementById('campo13');

    inputTel2.addEventListener('input', function (event) {
        let tel = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
        let formattedTel = '';

        // Verifica o comprimento do número de telefone e formata de acordo
        if (tel.length < 2) {
            formattedTel = '(' + tel; // Adiciona o parêntese inicial
        } else if (tel.length < 6) {
            formattedTel = '(' + tel.substring(0, 2) + ')' + tel.substring(2); // Adiciona o parêntese inicial e o traço após o segundo dígito
        } else if (tel.length < 11) {
            formattedTel = '(' + tel.substring(0, 2) + ')' + tel.substring(2, 6) + '-' + tel.substring(6); // Adiciona o parêntese inicial, o traço após o segundo dígito e o hífen após o quinto dígito
        } else {
            formattedTel = '(' + tel.substring(0, 2) + ')' + tel.substring(2, 7) + '-' + tel.substring(7, 11); // Adiciona o parêntese inicial, o traço após o segundo dígito e o hífen após o sexto dígito
        }

        // Define o valor formatado no campo de entrada
        event.target.value = formattedTel;
    });

    inputTel2.addEventListener('keydown', function (event) {
        // Se a tecla pressionada for backspace e o campo não estiver vazio
        if (event.key === 'Backspace' && inputTel2.value.length > 0) {
            // Obtém a posição do cursor no campo
            const cursorPosition = inputTel2.selectionStart;

            // Se o caractere anterior ao cursor for um caractere especial (parênteses ou traço), remove também esse caractere
            if (inputTel2.value[cursorPosition - 1] === ')' || inputTel2.value[cursorPosition - 1] === '-' || inputTel2.value[cursorPosition - 1] === '(') {
                event.preventDefault(); // Impede o comportamento padrão (deletar o caractere anterior)
                inputTel2.value = inputTel2.value.substring(0, cursorPosition - 1) + inputTel2.value.substring(cursorPosition); // Remove o caractere especial
            }
        }
    });

    //Numero de CEP
    document.getElementById('campo14').addEventListener('input', function () {
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9); // Limita a 9 caracteres
        }
    });

    const inputCep = document.getElementById('campo14');

    inputCep.addEventListener('input', function (event) {
        let cep = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
        let formattedCep = '';

        // Verifica o comprimento do número de CEP e formata de acordo
        if (cep.length <= 5) {
            formattedCep = cep; // Adiciona apenas os dígitos digitados
        } else {
            formattedCep = cep.substring(0, 5) + '-' + cep.substring(5, 8); // Adiciona o hífen após o quinto dígito
        }

        // Define o valor formatado no campo de entrada
        event.target.value = formattedCep;
    });

    inputCep.addEventListener('keydown', function (event) {
        // Se a tecla pressionada for backspace e o campo não estiver vazio
        if (event.key === 'Backspace' && inputCep.value.length > 0) {
            // Obtém a posição do cursor no campo
            const cursorPosition = inputCep.selectionStart;

            // Se o caractere anterior ao cursor for um hífen, remove também esse caractere
            if (inputCep.value[cursorPosition - 1] === '-') {
                event.preventDefault(); // Impede o comportamento padrão (deletar o caractere anterior)
                inputCep.value = inputCep.value.substring(0, cursorPosition - 1) + inputCep.value.substring(cursorPosition); // Remove o caractere especial
                inputCep.setSelectionRange(cursorPosition - 1, cursorPosition - 1); // Ajusta a posição do cursor
            }
        }
    });

    //Endereço
    document.getElementById("campo15").addEventListener("input", function (event) {

        let valor = event.target.value;

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    //Bairro
    document.getElementById("campo16").addEventListener("input", function (event) {

        let valor = event.target.value;

        valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    //Complemento
    document.getElementById("campo17").addEventListener("input", function (event) {

        let valor = event.target.value;

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    //Cidade
    const campo18 = document.getElementById('campo18');
    if (campo18) {
        campo18.addEventListener('input', function (event) {
            let valor = event.target.value;
            valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');
            valor = capitalizeWords(valor);
            event.target.value = valor;
        });
    }
    //Estado
    const campo18_1 = document.getElementById('campo18_1');
    if (campo18_1) {
        campo18_1.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo18_1);
    }

    //Estado Civil
    const campo21 = document.getElementById('campo21');
    if (campo21) {
        campo21.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo21);
    }

    //Religião Precedente
    const campo22 = document.getElementById('campo22');
    if (campo22) {
        campo22.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo22);
    }

    //Data
    const campoData = document.getElementById('campo23');
    if (campoData) {
        campoData.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoData);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campoData.value) {
            campoData.classList.add('initial');
        }
    }

    //Oficiante
    document.getElementById("campo24").addEventListener("input", function (event) {

        let valor = event.target.value;

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    //Data
    const campoData2 = document.getElementById('campo25');
    if (campoData2) {
        campoData2.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoData2);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campoData2.value) {
            campoData2.classList.add('initial');
        }
    }

    //Oficiante
    document.getElementById("campo26").addEventListener("input", function (event) {

        let valor = event.target.value;

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });

    //Data
    const campoData3 = document.getElementById('campo27');
    if (campoData3) {
        campoData3.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoData3);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campoData3.value) {
            campoData3.classList.add('initial');
        }
    }

    //Forma
    const campo28 = document.getElementById('campo28');
    if (campo28) {
        campo28.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo28);
    }

    //Ata
    document.getElementById('campo29').addEventListener('input', function () {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); // Limita a 3 caracteres
        }
    });

    //Data
    const campoData4 = document.getElementById('campo30');
    if (campoData4) {
        campoData4.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campoData4);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campoData4.value) {
            campoData4.classList.add('initial');
        }
    }

    //Forma
    const campo31 = document.getElementById('campo31');
    if (campo31) {
        campo31.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo31);
    }

    //Ata
    document.getElementById('campo32').addEventListener('input', function () {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); // Limita a 3 caracteres
        }
    });
    /* Datas da section 6 */
    const campo33 = document.getElementById('campo33');
    if (campo33) {
        campo33.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo33);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo33.value) {
            campo33.classList.add('initial');
        }
    }

    const campo34 = document.getElementById('campo34');
    if (campo34) {
        campo34.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo34);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo34.value) {
            campo34.classList.add('initial');
        }
    }

    const campo35 = document.getElementById('campo35');
    if (campo35) {
        campo35.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo35);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo35.value) {
            campo35.classList.add('initial');
        }
    }

    const campo36 = document.getElementById('campo36');
    if (campo36) {
        campo36.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo36);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo36.value) {
            campo36.classList.add('initial');
        }
    }

    const campo37 = document.getElementById('campo37');
    if (campo37) {
        campo37.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo37);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo37.value) {
            campo37.classList.add('initial');
        }
    }

    const campo38 = document.getElementById('campo38');
    if (campo38) {
        campo38.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo38);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo38.value) {
            campo38.classList.add('initial');
        }
    }

    const campo39 = document.getElementById('campo39');
    if (campo39) {
        campo39.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo39);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo39.value) {
            campo39.classList.add('initial');
        }
    }

    const campo40 = document.getElementById('campo40');
    if (campo40) {
        campo40.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo40);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo40.value) {
            campo40.classList.add('initial');
        }
    }

    const campo41 = document.getElementById('campo41');
    if (campo41) {
        campo41.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo41);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo41.value) {
            campo41.classList.add('initial');
        }
    }

    //Data
    const campo42 = document.getElementById('campo42');
    if (campo42) {
        campo42.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo42);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo42.value) {
            campo42.classList.add('initial');
        }
    }
    //Ata
    document.getElementById('campo43').addEventListener('input', function () {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); // Limita a 3 caracteres
        }
    });

    //Disciplina
    document.getElementById("campo45").addEventListener("input", function (event) {
        // Obtém o valor atual do campo
        let valor = event.target.value;

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        // Define o novo valor no campo
        event.target.value = valor;

    });

    //Data
    const campo46 = document.getElementById('campo46');
    if (campo46) {
        campo46.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo46);

        // Verifique se o campo de data está vazio ao carregar a página
        if (!campo46.value) {
            campo46.classList.add('initial');
        }
    }
    //Ata
    document.getElementById('campo47').addEventListener('input', function () {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); // Limita a 3 caracteres
        }
    });
});