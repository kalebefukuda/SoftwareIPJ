document.getElementById('newSociedade').addEventListener('click', function() {
    window.location.href = '/sociedade-interna/inserir';
});

// document.addEventListener('DOMContentLoaded', function() {
//     const newSociedadeButton = document.getElementById('newSociedade');
//     if (newSociedadeButton) {
//         newSociedadeButton.addEventListener('click', function() {
//             console.log('Botão de nova sociedade clicado'); // Adicione este console.log para verificar se o evento de clique está sendo acionado
//             window.location.href = '/sociedade-interna/inserir';
//         });
//     }
// });

// Função para buscar e exibir sociedades internas
async function carregarSociedades() {
    const response = await fetch('/sociedade-interna');
    const sociedades = await response.json();

    const container = document.getElementById('sociedades-container');

    sociedades.forEach(sociedade => {
        const card = document.createElement('div');
        card.classList.add('sociedade', 'card');

        const campoImg = document.createElement('div');
        campoImg.classList.add('campo-img');

        const foto = document.createElement('img');
        foto.classList.add('campo-foto-card');
        foto.src = sociedade.foto_sociedade || '../assets/default-image.jpg'; // Se não houver foto, use uma imagem padrão
        foto.alt = sociedade.nome_sociedade;

        const texto = document.createElement('div');
        texto.classList.add('text-card');

        const nome = document.createElement('h2');
        nome.textContent = sociedade.nome_sociedade;

        texto.appendChild(nome);
        campoImg.appendChild(foto);

        card.appendChild(campoImg);
        card.appendChild(texto);

        container.appendChild(card);
    });
}

// Chamar a função para carregar as sociedades quando a página carregar
window.addEventListener('load', carregarSociedades);
