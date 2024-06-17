document.addEventListener('DOMContentLoaded', async function() {
    const idSociedade = window.location.pathname.split('/').pop(); // Captura o ID da URL

    console.log('ID da sociedade:', idSociedade); // Log para verificar se o ID está correto

    if (!idSociedade) {
        console.error('ID da sociedade não encontrado na URL');
        return;
    }

    try {
        const response = await fetch(`/api/sociedade-cadastrada/${idSociedade}`);
        const data = await response.json();

        if (!data.ok) {
            console.error('Erro ao carregar sociedade:', data.error);
            return;
        }

        const sociedade = processarDados(data); // Processa os dados antes de renderizar
        renderizarSociedade(sociedade);

    } catch (error) {
        console.error('Erro ao carregar sociedade:', error);
    }
});

function processarDados(data) {
    const sociedadeData = data.sociedade[0]; // Pegue o primeiro item para os dados da sociedade
    const membros = data.sociedade.map(item => ({
        NOME_MEMBRO: item.nome_membro,
        IDADE: item.idade
    }));

    return {
        NOME_SOCIEDADE: sociedadeData.NOME_SOCIEDADE,
        FOTO_SOCIEDADE: sociedadeData.FOTO_SOCIEDADE,
        MEMBROS: membros
    };
}

function renderizarSociedade(sociedade) {
    const main = document.getElementById('info-sociedade');
    main.innerHTML = '';

    const banner = document.createElement('div');
    banner.className = 'banner';
    banner.innerHTML = `
        <div class="banner-div-img">
            <img src="${sociedade.FOTO_SOCIEDADE}" alt="">
        </div>
        <div class="banner-div-texto">
            <h1>${sociedade.NOME_SOCIEDADE}</h1>
        </div>
        <div class="banner-div-img">
            <img src="${sociedade.FOTO_SOCIEDADE}" alt="">
        </div>
    `;
    main.appendChild(banner);

    // Adicionando a funcionalidade de busca e adição de membros
    const pesquisaDiv = document.createElement('div');
    pesquisaDiv.className = 'pesquisa-div';
    pesquisaDiv.innerHTML = `
        <div class="busca-div">
            <input type="text" id="nome" placeholder="Digite o nome do membro...">
            <ion-icon name="search-outline"></ion-icon>
        </div>
        <div class="adicionar-membro">
            <button class="btn-add">
                Adicionar
            </button>
        </div>
    `;
    main.appendChild(pesquisaDiv);

    const divMembrosResultado = document.createElement('div');
    divMembrosResultado.className = 'div-membros-resultado';
    divMembrosResultado.innerHTML = `
        <h2>Membros Cadastrados:</h2>
    `;
    main.appendChild(divMembrosResultado);

    sociedade.MEMBROS.forEach(membro => {
        const membrosCadastrados = document.createElement('div');
        membrosCadastrados.className = 'membros-cadastrados';
        membrosCadastrados.innerHTML = `
            <div class="img-result">
                <img class="campo-foto-card" src="${membro.FOTO_MEMBRO}" alt="">
            </div>
            <div class="text-result-membro">
                <div class="text-icon">
                    <h3>${membro.NOME_MEMBRO}</h3>
                </div>
                <div class="idade-membro">
                    <h5>Idade:</h5>
                    <h5>${membro.IDADE}</h5>
                </div>
            </div>
        `;
        divMembrosResultado.appendChild(membrosCadastrados);
    });
}
