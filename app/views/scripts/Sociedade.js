document.getElementById('newSociedade').addEventListener('click', function() {
    window.location.href = '/sociedade-interna/cadastro';
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
    // Função para buscar e renderizar as sociedades
    async function fetchSociedades() {
        try {
            const response = await fetch('/api/sociedade-interna');
            const sociedades = await response.json();
            const container = document.getElementById('sociedades-container');
            console.log(sociedades)

            sociedades.forEach(sociedade => {
                const div = document.createElement('div');
                div.className = 'sociedade card card-sociedade-cadastrada';
                div.innerHTML = `
                    <div class="campo-img">
                        <img class="campo-foto-card" src="${sociedade.FOTO_SOCIEDADE}" alt="">
                        <img class="campo-foto-card-white" src="${sociedade.FOTO_SOCIEDADE}" alt="">
                        
                    </div>
                    <div class="text-card text-sociedade-cadastrada">
                        <h2>${sociedade.NOME_SOCIEDADE}</h2>
                    </div>`;
                container.appendChild(div);
                console.log(sociedade)
            });
        } catch (error) {
            console.error('Erro ao buscar sociedades:', error);
        }
    }

    // Chama a função quando a página é carregada
    window.onload = fetchSociedades;