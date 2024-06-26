document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const inputName = document.querySelector(".input-name-sociedade");
    const inputFoto = document.querySelector(".input-foto-sociedade");
    const imgPreview = document.querySelector(".select-photo img");

    inputFoto.addEventListener("change", function () {
        const file = inputFoto.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgPreview.src = e.target.result;
                imgPreview.style.width = "200px"; // Adiciona estilo para garantir o tamanho máximo
                imgPreview.style.height = "200px"; // Adiciona estilo para garantir o tamanho máximo
                imgPreview.style.borderRadius = "50%"; // Adiciona estilo para manter a forma redonda
                imgPreview.style.objectFit = "cover";
            };
            reader.readAsDataURL(file);
        } else {
            imgPreview.src = "../assets/ImgCadastroSoci.svg"; // Se nenhum arquivo selecionado, use uma imagem padrão
            imgPreview.style.width = "200px"; // Adiciona estilo para garantir o tamanho máximo
            imgPreview.style.height = "200px"; // Adiciona estilo para garantir o tamanho máximo
            imgPreview.style.borderRadius = "50%"; // Adiciona estilo para manter a forma redonda
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeSociedade = inputName.value.trim();
        const fotoSociedade = inputFoto.files[0];

        if (!nomeSociedade) {
            alert("Por favor, insira um nome para a sociedade.");
            return;
        }

        if (!fotoSociedade) {
            alert("Por favor, selecione uma foto para a sociedade.");
            return;
        }

        const formData = new FormData();
        formData.append("nome_sociedade", nomeSociedade);
        formData.append("foto_sociedade", fotoSociedade);

        fetch('/api/cadastro-sociedade', {
            method: 'POST',
            body: formData
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
