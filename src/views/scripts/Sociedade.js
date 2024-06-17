document.getElementById('newSociedade').addEventListener('click', function() {
    window.location.href = '/sociedade-interna/cadastro';
});

async function fetchSociedades() {
    try {
        const response = await fetch('/api/sociedade-interna');
        const sociedades = await response.json();
        const container = document.getElementById('sociedades-container');
        
        sociedades.forEach(sociedade => {
            const button = document.createElement('button');
            button.className = 'sociedade card card-sociedade-cadastrada';
            button.innerHTML = `
                <div class="campo-img">
                    <img class="campo-foto-card" src="${sociedade.FOTO_SOCIEDADE}" alt="">
                    <img class="campo-foto-card-white" src="${sociedade.FOTO_SOCIEDADE}" alt="">
                </div>
                <div class="text-card text-sociedade-cadastrada">
                    <h2>${sociedade.NOME_SOCIEDADE}</h2>
                </div>`;
            
            // Adiciona o atributo data-id com o ID_SOCIEDADE_INTERNA da sociedade
            button.setAttribute('data-id', sociedade.ID_SOCIEDADE_INTERNA);

            // Utiliza bind para passar o ID_SOCIEDADE_INTERNA para a função de clique
            button.addEventListener('click', function(event) {
                const sociedadeId = event.currentTarget.getAttribute('data-id');
                window.location.href = `/sociedade-cadastrada/${sociedadeId}`;
            });

            container.appendChild(button);
            console.log(sociedade)
        });
    } catch (error) {
        console.error('Erro ao buscar sociedades:', error);
    }
}

// Chama a função quando a página é carregada
window.onload = fetchSociedades;
