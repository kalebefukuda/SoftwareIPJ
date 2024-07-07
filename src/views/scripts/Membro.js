document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/membros/api/membros');
        const membros = await response.json();

        const membrosContainer = document.getElementById('membrosContainer');

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
                            <button class="edit-icon">
                                <ion-icon name="pencil-outline"></ion-icon>
                            </button>
                            <button class="delete-icon">
                                <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                    <div class="telefone-membro">
                        <ion-icon name="phone-portrait-outline"></ion-icon>
                        <h5>${membro.TELEFONE}</h5>
                    </div>
                </div>
            `;

            membrosContainer.appendChild(card);

            const editButton = card.querySelector('.edit-icon');
            editButton.addEventListener('click', function(event) {
                event.stopPropagation();
                window.location.href = `/membros/editar-membro/${membro.ID_MEMBRO}`;
            });

            const deleteButton = card.querySelector('.delete-icon');
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation();
                showDeleteModal(membro.ID_MEMBRO, event);
            });
        });
    } catch (error) {
        console.error('Erro ao carregar membros:', error);
    }

    setupModalControls();
});

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
        deleteMembro(id);
    };
}

async function deleteMembro(id) {
    console.log('Deletando membro ID:', id);
    const modal = document.getElementById("deleteModal");
    modal.style.display = "none";

    try {
        const response = await fetch(`/membros/api/deletar-membro/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Membro deletado com sucesso');
            window.location.reload();
        } else {
            console.error('Erro ao deletar membro');
        }
    } catch (error) {
        console.error('Erro ao deletar membro:', error);
    }
}
