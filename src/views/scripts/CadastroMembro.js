document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cadastroMembroForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch('/api/membros', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Membro cadastrado com sucesso!');
                window.location.href = '/membros';
            } else {
                const errorData = await response.json();
                console.error('Erro ao cadastrar membro:', errorData);
                alert('Erro ao cadastrar membro.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar membro:', error);
            alert('Erro ao cadastrar membro.');
        }
    });
    // Função para capitalizar a primeira letra de cada palavra
    function capitalizeWords(str) {
        let words = str.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
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
    document.getElementById('numeroDeRol').addEventListener('input', function () {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); // Limita a 3 caracteres
        }
    });

    /* Função para aplicar classes de estilo */
    function aplicarClasseInicial(campo) {
        campo.addEventListener('change', function () {
            applyInitialSelectedClass(this);
        });

        // Defina a classe inicial para o estado inicial
        applyInitialSelectedClass(campo);
    }

    // IDs dos campos de seleção que precisam ser estilizados
    const camposSelecao = ["escolaridade", "sexo", "estadoNascimento", "dataNascimento", "localResidencia", "estadoCivil", "religiaoPrecedente", "estado", "dataBatismo", "dataProfissaoFe", "dataAdmissao", "dataDemissao", "dataEleicaoDiacono", "dataReeleicaoDiacono1", "dataReeleicaoDiacono2", "dataReeleicaoDiacono3", "dataReeleicaoDiacono4", "dataEleicaoPresbitero", "dataReeleicaoPresbitero1", "dataReeleicaoPresbitero2", "dataReeleicaoPresbitero3", "dataRolSeparado", "dataCasamento", "dataDisciplina", "formaAdmissao", "formaDemissao"];

    // Aplicar a função de estilização a todos os campos de seleção
    camposSelecao.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            aplicarClasseInicial(campo);
        }
    });

    /* Função para capitalizar palavras e remover caracteres indesejados */
    function formatarCampoTexto(campo) {
        campo.addEventListener("input", function (event) {
            let valor = event.target.value;
            valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');
            valor = capitalizeWords(valor);
            event.target.value = valor;
        });
    }

    // IDs dos campos de texto que precisam ser formatados
    const camposTexto = ["nome", "localNascimento", "bairro", "nomePai", "nomeMae", "profissao", "complemento", "cidade", "oficianteProfissaoFe", "oficianteBatismo", "disciplina"];

    // Aplicar a função de formatação a todos os campos
    camposTexto.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            formatarCampoTexto(campo);
        }
    });


    // Captura o elemento input file para visualizar a foto
    const inputFile = document.getElementById('fotoMembro');
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

    // Formatação do campo para inserção de caracteres no telefone
    const inputTel = document.getElementById('telefone');
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

    // Formatação do campo para inserção de caracteres no celular
    const inputTel2 = document.getElementById('celular');
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
    document.getElementById('cep').addEventListener('input', function () {
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9); // Limita a 9 caracteres
        }
    });
    const inputCep = document.getElementById('cep');
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
    document.getElementById("endereco").addEventListener("input", function (event) {

        let valor = event.target.value;

        // Capitaliza a primeira letra de cada palavra
        valor = capitalizeWords(valor);

        event.target.value = valor;
    });
});