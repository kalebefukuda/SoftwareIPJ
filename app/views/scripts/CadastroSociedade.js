document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const inputName = document.querySelector(".input-name-sociedade");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeSociedade = inputName.value.trim();
        if (!nomeSociedade) {
            alert("Por favor, insira um nome para a sociedade.");
            return;
        }

        const data = {
            nome_sociedade: nomeSociedade
        };

        fetch('/api/cadastro-sociedade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(result => {
            if (result.ok) {
                console.log('Sociedade cadastrada com sucesso:', result);
                alert('Sociedade cadastrada com sucesso');
                window.location.href = "/sociedade-interna"; // Redireciona para a página de sociedades internas
            } else {
                console.error('Erro ao cadastrar sociedade:', result.error);
                alert('Erro ao cadastrar sociedade: ' + result.error);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados: ' + error.message);
        });
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
});
