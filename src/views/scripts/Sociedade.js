document.addEventListener('DOMContentLoaded', function () {
    fetchSociedades();
    setupModalControls();
});

document.getElementById('newSociedade').addEventListener('click', function (event) {
    event.stopPropagation(); // Assegura que não haja propagação do evento que possa interferir com outros elementos
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
                </div>
                <div class="action-icons">
                    <button type="button" class="edit-icon" onclick="editSociedade('${sociedade.ID_SOCIEDADE_INTERNA}', event)">
                        <ion-icon name="pencil-outline"></ion-icon>
                    </button>
                    <button type="button" class="delete-icon" onclick="showDeleteModal('${sociedade.ID_SOCIEDADE_INTERNA}', event)">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </div>`;

            button.addEventListener('click', function (event) {
                event.stopPropagation();
                window.location.href = `/sociedade-cadastrada/${sociedade.ID_SOCIEDADE_INTERNA}`;
            });

            button.setAttribute('data-id', sociedade.ID_SOCIEDADE_INTERNA);
            container.appendChild(button);
        });
    } catch (error) {
        console.error('Erro ao buscar sociedades:', error);
    }
}

function setupModalControls() {
    const modal = document.getElementById("deleteModal");
    const span = document.getElementsByClassName("close")[0];
    const cancelDelete = document.getElementById("cancelDelete");

    span.onclick = cancelDelete.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function showDeleteModal(id, event) {
    event.stopPropagation();
    const modal = document.getElementById("deleteModal");
    modal.style.display = "flex";

    const confirmDelete = document.getElementById("confirmDelete");
    confirmDelete.onclick = function (event) {
        event.stopPropagation();
        deleteSociedade(id);
    };
}

function editSociedade(id, event) {
    event.stopPropagation();
    window.location.href = `/editar-sociedade/${id}`;
}

function deleteSociedade(id) {
    console.log('Deletando sociedade ID:', id);
    const modal = document.getElementById("deleteModal");
    modal.style.display = "none";
    // Implementar chamada de API de exclusão aqui, se necessário
}
