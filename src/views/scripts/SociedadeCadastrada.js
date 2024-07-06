document.addEventListener('DOMContentLoaded', async function () {
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
        setupBusca(); // Configura os eventos de busca

    } catch (error) {
        console.error('Erro ao carregar sociedade:', error);
    }
});

function processarDados(data) {
    const sociedadeData = data.sociedade[0]; // Pegue o primeiro item para os dados da sociedade
    const membros = data.sociedade.map(item => ({
        NOME_MEMBRO: item.nome_membro,
        IDADE: item.idade,
        FOTO_MEMBRO: item.foto_membro // Adicione a chave correta se for diferente
    }));

    return {
        NOME_SOCIEDADE: sociedadeData.NOME_SOCIEDADE,
        FOTO_SOCIEDADE: sociedadeData.FOTO_SOCIEDADE,
        MEMBROS: membros
    };
}

function renderizarSociedade(sociedade) {
    document.title = sociedade.NOME_SOCIEDADE; // Atualiza o título da página
    const main = document.getElementById('info-sociedade');
    main.innerHTML = ''; // Limpa conteúdo existente

    const banner = document.createElement('div');
    banner.className = 'banner';
    banner.innerHTML = `
        <div class="banner-div-img div-image-dir">
            <img class="image-esq" src="${sociedade.FOTO_SOCIEDADE}" alt="${sociedade.NOME_SOCIEDADE}">
        </div>
        <div class="banner-div-texto">
            <h1>${sociedade.NOME_SOCIEDADE}</h1>
        </div>
    `;
    main.appendChild(banner);

    const pesquisaDiv = document.createElement('div');
    pesquisaDiv.className = 'pesquisa-div';
    pesquisaDiv.innerHTML = `
        <div class="busca-div">
            <input type="text" id="inputBuscaNome" placeholder="Digite o nome do membro...">
            <button class="search-btn">
                <ion-icon name="search-outline"></ion-icon>
            </button>
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
    divMembrosResultado.innerHTML = '<h2>Membros Cadastrados:</h2>';
    main.appendChild(divMembrosResultado);

    const resultadosBusca = document.createElement('div');
    resultadosBusca.id = 'resultadosBusca';
    main.appendChild(resultadosBusca);

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
            <button class= "delete">
                    <ion-icon name="trash-outline"></ion-icon>
                </button> 
        `;
        divMembrosResultado.appendChild(membrosCadastrados);
    });
}

function setupBusca() {
    const inputBusca = document.getElementById('inputBuscaNome');
    const searchButton = document.querySelector('.search-btn');

    searchButton.addEventListener('click', function() {
        realizarBusca(inputBusca.value);
    });

    inputBusca.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            realizarBusca(inputBusca.value);
        }
    });
}

async function realizarBusca(query) {
    console.log('Buscando por:', query);
    try {
        const response = await fetch(`/buscar?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();

        if (!data.ok) {
            console.error('Erro ao buscar membros:', data.error);
            return;
        }

        mostrarResultadosBusca(data.data);
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
    }
}

function mostrarResultadosBusca(membros) {
    const resultadosBusca = document.getElementById('resultadosBusca');
    if (!resultadosBusca) {
        console.error('Elemento resultadosBusca não encontrado');
        return;
    }
    resultadosBusca.innerHTML = ''; // Limpa resultados anteriores

    membros.forEach(membro => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'resultado-item';

        itemDiv.innerHTML = `
            <img src="${membro.FOTO_MEMBRO}" alt="Foto de ${membro.NOME_MEMBRO}">
            <div class="info">
                <span class="nome">${membro.NOME_MEMBRO}</span>
                <span class="detalhes">Idade: ${membro.IDADE}</span>
            </div>
        `;

        resultadosBusca.appendChild(itemDiv);
    });
}
