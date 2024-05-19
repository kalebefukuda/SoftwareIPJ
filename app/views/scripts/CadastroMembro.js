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