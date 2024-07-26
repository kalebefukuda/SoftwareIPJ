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
    `;
    main.appendChild(pesquisaDiv);

    const divMembrosResultado = document.createElement('div');
    divMembrosResultado.className = 'div-membros-resultado';
    divMembrosResultado.innerHTML = '<h2>Membros Cadastrados:</h2>';
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
            <button class="delete">
                <ion-icon name="trash-outline"></ion-icon>
            </button> 
        `;
        divMembrosResultado.appendChild(membrosCadastrados);
    });
}

function setupBusca() {
    const inputBusca = document.getElementById('inputBuscaNome');
    const searchButton = document.querySelector('.search-btn');
    const modal = document.getElementById("modalBusca");
    const span = document.getElementsByClassName("close")[0];

    searchButton.addEventListener('click', function() {
        realizarBusca(inputBusca.value);
    });

    inputBusca.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            realizarBusca(inputBusca.value);
        }
    });

    // Fechar a modal quando o usuário clicar no X
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Fechar a modal quando o usuário clicar fora dela
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

async function realizarBusca(query) {
    console.log('Buscando por:', query);
    try {
        const response = await fetch(`/membros/api/membros/buscar?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();

        if (!data.ok) {
            console.error('Erro ao buscar membros:', data.error);
            return;
        }

        mostrarResultadosBusca(data.data);
        abrirModal(); // Abre a modal com os resultados da busca

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
        const card = document.createElement('div');
        card.classList.add('card-result');

        let fotoSrc = '/assets/default.jpg';
        if (membro.FOTO_MEMBRO && membro.FOTO_MEMBRO.trim() !== '') {
            fotoSrc = membro.FOTO_MEMBRO.startsWith('uploads/')
                ? `/${membro.FOTO_MEMBRO}`
                : `${membro.FOTO_MEMBRO}`;
        }

        card.innerHTML = `
        
            <div class="img-result">
                <img class="campo-foto-card" src="${fotoSrc}" alt="Foto do membro">
            </div>
            <div class="text-result-membro">
                <div class="text-icon">
                    <h3 class="memberName">${membro.NOME}</h3>
                    <div class="icons-card-result">
                        <button class="btn-add-membro" data-id="${membro.ID_MEMBRO}">Adicionar</button>
                    </div>
                </div>
                <div class="telefone-membro">
                    <ion-icon name="phone-portrait-outline"></ion-icon>
                    <h5>${membro.TELEFONE}</h5>
                </div>
            </div>
        `;

        resultadosBusca.appendChild(card);
    });

    // Adiciona eventos de clique aos botões de adicionar membro
    document.querySelectorAll('.btn-add-membro').forEach(button => {
        button.addEventListener('click', function() {
            const idMembro = this.getAttribute('data-id');
            adicionarMembro(idMembro);
        });
    });
}

function abrirModal() {
    const modal = document.getElementById("modalBusca");
    modal.style.display = "block";
}

async function adicionarMembro(idMembro) {
    const idSociedade = window.location.pathname.split('/').pop(); // Captura o ID da URL
    try {
        const response = await fetch(`/api/sociedade-interna/${idSociedade}/adicionar-membro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idMembro })
        });

        if (response.ok) {
            alert('Membro adicionado com sucesso!');
            window.location.reload(); // Recarrega a página para atualizar a lista de membros
        } else {
            const errorData = await response.json();
            console.error('Erro ao adicionar membro:', errorData);
            alert('Erro ao adicionar membro.');
        }
    } catch (error) {
        console.error('Erro ao adicionar membro:', error);
        alert('Erro ao adicionar membro.');
    }
}
