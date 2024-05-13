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

//Local nascimento
document.getElementById("campo4").addEventListener("input", function (event) {

    let valor = event.target.value;

    valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');

    // Capitaliza a primeira letra de cada palavra
    valor = capitalizeWords(valor);

    event.target.value = valor;
});

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

//Escolaridade
document.getElementById("campo9").addEventListener("input", function (event) {

    let valor = event.target.value;

    valor = valor.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, '');

    // Capitaliza a primeira letra de cada palavra
    valor = capitalizeWords(valor);

    event.target.value = valor;
});

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
    label.classList.add('required');
});

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